const Service = require("../models/service.model");

const service = Service;

// Retrieve all Services from the database.
exports.getAll = (req, res) => {
  service.find({})
    .then(data => res.send(data))
    .catch(error => res.status(500).send({ message: error.message }));
};

// Find a single Service with an id
exports.getById = (req, res) => {
  const id = req.params.id;
  service.findById(id)
    .then(data => {
      if (!data) res.status(404).send({ message: `Service with id ${id} was not found!` });

      else res.send(data);
    })
    .catch(error => res.status(500).send({ message: error.message }));
};

// Create a new Service
exports.create = async (req, res) => {
  service.create(req.body)
    .then(data => res.send(data))
    .catch(error => res.status(500).send({ message: error.message }));
};


// Update a Service by the id in the request
exports.update = async (req, res) => {
  service.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) res.status(404).send({ message: `Service with id ${id} was not found!` });

      else res.send(req.body);
    })
    .catch(error => res.status(500).send({ message: error.message }));
};

// Delete a Service with the specified id in the request
exports.deleteById = (req, res) => {
  const id = req.params.id;
  service.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Service with id ${id} was not found!`
        });
      }

      else res.send();
    })
    .catch(error => res.status(500).send({ message: error.message }));
};

// Delete all Services from the database.
exports.deleteAll = (req, res) => {
  service.deleteMany()
    .then(_data => res.send())
    .catch(error => res.status(500).send({ message: error.message }));
};
