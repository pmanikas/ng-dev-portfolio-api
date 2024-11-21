const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("./../models/user.model");
const config = require('./../config/database');

const user = User;

const TOKEN_EXPIRATION = 604800; // 1 week

const comparePassword = (candidatePassword, user, res) => {
  bcrypt.compare(candidatePassword, user.password)
    .then(isMatch => {
      if (isMatch) {
        const token = jwt.sign(
          { data: user },
          config.secret,
          { expiresIn: TOKEN_EXPIRATION }
        );
        res.json({ token: 'JWT ' + token });

      } else res.status(404).send({ message: `Credentials don't match` });
    })
    .catch(error => res.status(500).send({ message: error.message }))
};

const getEncryptedPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Authenticate
exports.authenticate = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = { username };

  return user.findOne(query).select('+password')
    .then(data => {
      if (!data) return res.status(404).send({ message: `User not found!` });

      comparePassword(password, data, res);
    })
    .catch(error => res.status(500).send({ message: error.message }))
}

// Retrieve all Users from the database.
exports.getAll = (req, res) => {
  user.find({})
    .then(data => res.send(data))
    .catch(error => res.status(500).send({ message: error.message }));
};

// Find a single User with an id
exports.getById = (req, res) => {
  const id = req.params.id;
  user.findById(id)
    .then(data => {
      if (!data) res.status(404).send({ message: `User with id ${id} was not found!` });

      else res.send(data);
    })
    .catch(error => res.status(500).send({ message: error.message }));
};

// Create a new User
exports.create = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    image: req.body.image,
  });

  newUser.password = await getEncryptedPassword(newUser.password);

  user.create(newUser)
    .then(data => res.send(data))
    .catch(error => res.status(500).send({ message: error.message }));
};


// Update a User by the id in the request
exports.update = async (req, res) => {
  const password = req.body.password;

  if(password === null || password === '') delete req.body.password;

  else if (password) req.body.password = await getEncryptedPassword(password);

  user.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) res.status(404).send({ message: `User with id ${id} was not found!` });

      else res.send(req.body);
    })
    .catch(error => res.status(500).send({ message: error.message }));
};

// Delete a User with the specified id in the request
exports.deleteById = (req, res) => {
  const id = req.params.id;
  user.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${id} was not found!`
        });
      }

      else res.send();
    })
    .catch(error => res.status(500).send({ message: error.message }));
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  user.deleteMany()
    .then(_data => res.send())
    .catch(error => res.status(500).send({ message: error.message }));
};
