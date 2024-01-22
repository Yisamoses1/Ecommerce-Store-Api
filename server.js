require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/product');
const productRoute = require('./routes/productRoute')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

const MONGO_URL = process.env.MONGO_URL

// connect to mongodb
mongoose.connect(MONGO_URL)
.then((result) => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Listening for request on port ${port}`);
    })
})
.catch((err) => {
    console.log(err)
});

