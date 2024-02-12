const User = require("../model/userModel");

const authRoles = (permission) => {
  return async (req, res, next) => {
    const userRole = await User.roles;

    if (permission.includes((userRole = "Admin"))) {
      next();
    } else
      res
        .status(401)
        .json("You don't have the permission to create a product!");
  };
};

module.exports = { authRoles };
