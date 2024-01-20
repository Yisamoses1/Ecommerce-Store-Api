const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/product');

const app = express();



app.use(express.json())
// To use form url encoded
app.use(express.urlencoded({extended: false}))


// connect to mongodb
mongoose.connect('mongodb+srv://project:user1234@tutorial.vyzvfiu.mongodb.net/Node-API?retryWrites=true&w=majority')
.then((result) => {
    const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening for request on port ${port}`)
})
})
.catch((err) => {
    console.log(err)
})


//routes

// route to get all product from datatbase

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


// route to find the product by their id

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//route to post a product
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
});

// to update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if it cannot find any product in the database
        if(!product){
            return req.status(404).json({message:`cannot find any product with the given ID ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({messahe: error.message})
    }
});
    
// to delete a product from database

app.delete('/products/:1d', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //  if it cannot find any product in the database;
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        };
        res.status(200).json(product )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
