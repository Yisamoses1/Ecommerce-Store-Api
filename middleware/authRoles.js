const authRoles = (permission) => {
  return async (req, res, next) => {
    const userRole = req.body.roles;

    if (permission.includes(userRole)) {
      next();
    } else
      res
        .status(401)
        .json("You don't have the permission to create a product!");
  };
};

module.exports = { authRoles };
