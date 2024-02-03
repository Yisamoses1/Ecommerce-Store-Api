const Product = require('../model/product');
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel');



// get all product
const getProducts = asyncHandler (async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
});

// get a single product
const getProduct = asyncHandler(async(req, res) => {
   try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product)

   } catch (error) {
    res.status(500);
    throw new Error(error.message)
   }
});
// create product
const createProduct = asyncHandler(async(req, res) => {
    try {
          const product = await Product.create(req.body);
          res.status(200).json(product)
        
       
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
});

//update product

const updateProduct = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id);
    if(!product){
        res.status(404)
        throw new Error(`cannot find any product with the given ID ${id}`)
  }
  const updatedProduct = await Product.findById(id);
  res.status(200).json(updatedProduct)
}
   catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
    
});

// delete product

const deleteProduct = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        res.status(404)
        throw new Error(`cannot find the product with the given ID ${id}`)
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}