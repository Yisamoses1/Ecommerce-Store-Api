const express = require('express');
const Product = require('../model/product');
const {getProducts, getProduct, createProduct, updatedProduct, deleteProduct} = require('../controllers/productController')

const router = express.Router();

// route to get all products
router.get('/', getProducts);

// route to get a product by thier id
router.get('/:id', getProduct);


// route to add product
router.post('/', createProduct);


// route to update product
router.put('/:id', updatedProduct);



// route to delete product
router.delete('/:id', deleteProduct)


module.exports = router;