const express = require('express');
const router = express.Router();
const passport = require('passport');
const servicesController = require('../controllers/service.controller');

const authGuard = passport.authenticate('jwt', { session: false });

// Get All Services
router.get(
  '/',
  servicesController.getAll
);

// Get Service by Id
router.get(
  '/:id',
  authGuard,
  servicesController.getById
);

// Create Service
router.post(
  '/',
  authGuard,
  servicesController.create
);

// Update Service
router.put(
  '/:id',
  authGuard,
  servicesController.update
);

// Delete Service
router.delete(
  '/:id',
  authGuard,
  servicesController.deleteById
);

// Delete All Services
// router.delete(
//   '/warning-delete-all',
//   authGuard,
//   servicesController.getAll
// );

module.exports = router;