const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema (
  {
    email:{
        type: String,
        require: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Minimum password is 8 characters']
    },
    roles: {
      type: String,
      required: [true, 'Please enter a role']
    }
  
    },
  
  {
    timeStamps: true
  }
)

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email});
  if(user) {
   const auth = await bcrypt.compare(password, user.password)
   if(auth){
    return user;
   }
   throw Error('Incorrect password')
  }
  throw Error('Incorrect email')
}

const User = mongoose.model('User', userSchema);

module.exports = User;