const express = require("express");

const router = express.Router();

const user = require("../controllers/user");

router.post("/signup", user.Signup);
router.post("/login", user.Login);

module.exports = router;
