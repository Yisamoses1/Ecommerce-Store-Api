const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');


// get all users
const getUsers = asyncHandler( async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});
// get a single user
const getUser = asyncHandler( async(req, res) => {
   try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user)
   } catch (error) {
    res.status(500);
    throw new Error(error.message)
   }
});
// create a user
const createUser = asyncHandler( async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});
// update a user
const updateUser = asyncHandler( async(req, res) => {
   try {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id);
    if(!user){
        res.status(404)
        throw new Error(`cannot find user with the given id ${id}`)
    }
    const updatedUserUser = await User.findById(id)
    res.status(200).json(updatedUserUser)
   } catch (error) {
    res.status(500);
    throw new Error(error.message)
   }
});

// delete a user

const deleteUser = asyncHandler( async(req, res) => {
   try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        res.status(404)
        throw new Error(`cannot find user with the given id ${id}`)
    }
    res.status(200).json(user)
   } catch (error) {
    res.status(500);
    throw new Error(err.message)
   }

});



module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}