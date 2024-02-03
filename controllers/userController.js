const User = require('../model/userModel');
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    let errors = { email: '',  password: '', roles: ''};
    // Incorrect email 
    if(err.message === 'incorrect email'){
        errors.email = 'That email is not registered'
    }
    // Incorrect paasword
    if(err.message === 'incorrect pasword'){
        errors.password = 'That password is incorrect'
    }

    // error for roles
    if(err.message === 'incorrect roles'){
        errors.roles = 'That roles is incorrect'
    }
    //duplicate error code
    if(err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors
    }

    // validation errors

    if(err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            // the properties in this case is to get the error properties for both the email and password
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


// three days
const maxAge = 3*24*60*60

const createToken = (id) => {
    return jwt.sign({ id }, 'product secret', {
        expiresIn: maxAge
        // the header is automatically applied
    });
}


//
const signup_get =  async(req, res) => {
    try {
        const user = await User.find({})
        res.status(201).json(user)
    } catch (error) {
        throw new Error(err.message)
    }
};

const signup_post = async(req, res) => {
    try {
        const {email, password, roles} = req.body;
        const user = await User.create({email, password, roles});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000 })
        res.status(201).json({user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
};

const login_get =  async(req, res) => {
    try {
        const user = await User.find({})
        res.status(201).json(user)
    } catch (error) {
        throw new Error(err.message)
    }
};

const login_post =  async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000 })    
      res.status(200).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors });
    }
};

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge:1})
    res.redirect('/')

}




module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}