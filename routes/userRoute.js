const express = require("express");
const {
  signup_get,
  signup_post,
  login_get,
  login_post,
} = require("../controllers/userController");

const router = express.Router();

router.get("/signup", signup_get);

router.get("/login", login_get);

router.post("/signup", signup_post);

router.post("/login", login_post);

module.exports = router;
