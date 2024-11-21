const express = require('express');
const passport = require('passport');

const usersController = require('./../controllers/user.controller');

const router = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

// Validate
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE')
    .then(_data => res.send())
    .catch(error => res.status(500).send({ message: error.message }));
});

// Authenticate
router.post('/authenticate', usersController.authenticate);

// Get All Users
router.get(
  '/',
  authGuard,
  usersController.getAll
);

// Get Profile of current User
router.get(
  '/profile',
  authGuard,
  (req, res, next) => { res.json(req.user) }
);

// Get User by Id
router.get(
  '/:id',
  authGuard,
  usersController.getById
);

// Create User
router.post(
  '/',
  authGuard,
  usersController.create
);

// Update User
router.put(
  '/:id',
  authGuard,
  usersController.update
);

// Delete User
router.delete(
  '/:id',
  authGuard,
  usersController.deleteById
);

// Delete All Users
// router.delete(
//   '/warning-delete-all',
//   authGuard,
//   usersController.getAll
// );

module.exports = router;
