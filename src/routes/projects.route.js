const express = require('express');
const passport = require('passport');

const projectsController = require('./../controllers/project.controller');

const router = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

// Get All Projects
router.get(
  '/',
  projectsController.getAll
);

// Get Project by Id
router.get(
  '/:id',
  projectsController.getById
);

// Create Project
router.post(
  '/',
  authGuard,
  projectsController.create
);

// Update Project
router.put(
  '/:id',
  authGuard,
  projectsController.update
);

// Delete Project
router.delete(
  '/:id',
  authGuard,
  projectsController.deleteById
);

// Delete All Projects
// router.delete(
//   '/warning-delete-all',
//   authGuard,
//   projectsController.getAll
// );

module.exports = router;
