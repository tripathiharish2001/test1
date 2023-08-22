const express = require("express");
const User = require("../models/userModel");
// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);
// signuo route
router.post("/signup", signupUser);

module.exports = router;
