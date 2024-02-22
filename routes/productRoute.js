const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const { authRoles } = require("../middleware/authRoles");

const router = express.Router();
// to all the route
router.get("*", checkUser);

// get all product
router.get("/", requireAuth, getProducts);

// get a single product
router.get("/:id", requireAuth, getProduct);

// create a product
//router.post('/', authRoles, createProduct)
router.post("/", requireAuth, authRoles("Admin"), createProduct);

// route to update product
router.put("/:id", requireAuth, authRoles("Admin"), updateProduct);

// route to delete product
router.delete("/:id", requireAuth, authRoles("Admin"), deleteProduct);

module.exports = router;
