const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
  {
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }

  },
  
  {
    timeStamps: true
  }
)

const User = mongoose.model('User', userSchema);

module.exports = User;