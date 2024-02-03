const User = require('../model/userModel')



const authRoles = (permission) => {
    return (req, res, next) => {
        const userRole = req.body.roles;
        if(permission.includes(userRole)) {
            next()
        }else(
             res.status(401).json('You dont have the permission to create a product!')
        )
    }
}


module.exports = {authRoles}