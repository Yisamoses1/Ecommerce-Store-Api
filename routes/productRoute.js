const express = require('express');
const Product = require('../model/product');
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')


const router = express.Router();


// get all product 
router.get('/', getProducts)

// get a single product

router.get('/:id', getProduct)

// create a product
router.post('/', createProduct)

// route to update product
router.put('/:id', updateProduct)

// route to delete product
router.delete('/:id', deleteProduct)

module.exports = router;