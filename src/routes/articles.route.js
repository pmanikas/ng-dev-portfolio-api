const express = require('express');
const passport = require('passport');

const articlesController = require('./../controllers/articles.controller');

const router = express.Router();
const authGuard = passport.authenticate('jwt', { session: false });

// Get All Articles
router.get(
  '/',
  articlesController.getAll
);

// Get Article by Id
router.get(
  '/:id',
  articlesController.getById
);

// Create Article
router.post(
  '/',
  authGuard,
  articlesController.create
);

// Update Article
router.put(
  '/:id',
  authGuard,
  articlesController.update
);

// Delete Article
router.delete(
  '/:id',
  authGuard,
  articlesController.deleteById
);

// Delete All Articles
// router.delete(
//   '/warning-delete-all',
//   authGuard,
//   articlesController.getAll
// );

module.exports = router;
