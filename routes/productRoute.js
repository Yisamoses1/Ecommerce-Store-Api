const express = require('express');
const Product = require('../model/product')

const router = express.Router();

// route to get all products
router.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// rpoute to get a product by thier id
router.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.messasge})
    }
});


// route to post or add product
router.post('/products', async(req, res) => {
   try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
   } catch (error) {
    res.status(500).json({message: error.message});
   }
});


// route to update product
router.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            res.status(404).json(`cannot find the product with the given ID ${id}`);
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



// route to delete product
router.delete('/products/:id', async(req, res) => {
 try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        res.status(404).json(`cannot find product with the given ID ${id}`)
    }
    res.status(200).json(product)
 } catch (error) {
    res.status(500).json({message: error.message})
 }
})


module.exports = router;