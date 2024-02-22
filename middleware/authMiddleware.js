const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const requireAuth = (req, res, next) => {
  const authorizationHeader = req.headers?.authorization;
  if (!authorizationHeader) {
    res.status(401).send("Unauthorized");
  }
  try {
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, "product secret");
    res.locals.User = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// check current user
const checkUser = (req, res, next) => {
  const authorizationHeader = req.headers?.authorization;
  const token = authorizationHeader.split(" ")[1];
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
