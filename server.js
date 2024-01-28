require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute')
const errorMiddleware  = require('./middleware/errorMiddleware');



const app = express();
//middlware for json
app.use(express.json());
// middleware to support XML
app.use(express.urlencoded({extended: false}))
//middleware for the product route
app.use('/products', productRoute)
//middleware for the user route
app.use('/user', userRoute);



// middleware for error
app.use(errorMiddleware);

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