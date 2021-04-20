require('dotenv').config();

const express = require('express');
const router = express.Router();

const passport = require('passport');
const authGuard = passport.authenticate('jwt', { session: false });

const uploadController = require('../controllers/upload.controller');

const s3Config = require('../config/s3uploader.config');

router.post(
  '/',
  authGuard,
  s3Config.single('image'),
  uploadController.upload
);

module.exports = router;