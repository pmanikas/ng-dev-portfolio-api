require("dotenv").config();

const express = require("express");
const passport = require("passport");
const uploadController = require("./../controllers/upload.controller");
const s3Config = require("./../config/s3uploader.config");

const router = express.Router();
const authGuard = passport.authenticate("jwt", { session: false });

router.post("/", authGuard, s3Config.single("image"), uploadController.upload);

module.exports = router;
