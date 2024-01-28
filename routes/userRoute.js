const express = require('express');
const {getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController')


const router = express.Router();

// route to get all users
router.get('/', getUsers);

// route to get a single user
router.get('/:id', getUser);

// route to create user
router.post('/', createUser);

// route to update user
router.put('/:id', updateUser);

// route to delete user
router.delete('/:id', deleteUser)








module.exports = router;