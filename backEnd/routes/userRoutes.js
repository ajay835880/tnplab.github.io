const express = require("express");
const router = express.Router();
const { post } = require("../userController/userController");

// Jobs routes
router.post('/post', post);

module.exports = router