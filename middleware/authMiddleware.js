const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check if json web token exist and is verified
  if (token) {
    jwt.verify(token, "product secret", (err, decodedToken) => {
      if (err) {
        res.status(401).json("you must be logged in to access this page");
      } else {
        next();
      }
    });
  } else {
    res.status(401).json('you must be logged in to access this page');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "product secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
