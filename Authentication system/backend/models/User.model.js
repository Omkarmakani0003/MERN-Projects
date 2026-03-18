const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const userSchema = new mongoose.Schema({

    name : {
      type : String,
      required: [true,'Name is required'] 
    },

    email : {
        type : String,
        required: [true,'Email is required'] 
    },
     
    password : {
        type : String,
        required: [true,'Password is required'] 
    }

})

userSchema.pre('save',async function(){
     if(this.isModified('password')){
        const hash = await bcrypt.hash(this.password,10)
        return this.password = hash
     }
})

userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = async function() {
     return  jwt.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.JWT_SECRETE,
        {expiresIn:process.env.JWT_EXPIRE}
    )
} 

module.exports.user = mongoose.model('user',userSchema)