const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const userSchema = new mongoose.Schema({

    fullname : {
      type : String,
      required: [true,'Name is required'] 
    },

    username : {
      type : String,
      required: [true,'username is required'], 
      unique:true
    },

    email : {
        type : String,
        required: [true,'Email is required'] 
    },

    bio : {
      type : String,
      default : null
    },

    profile_picture : {
      type : String,
      default : null
    },

    cover_image : {
      type : String,
      default : null
    },
    
    phone : {
      type : Number,
      default : null
    },

    date_of_birth : {
      type : Date,
      default : null
    },

    gender : {
        type : String,
        default : null
    },

    followes : {
        type : Number,
        default : 0
    },

    following : {
        type : Number,
        default : 0
    },

    post_count : {
        type : Number,
        default : 0
    },

    joining_date : {
      type : Date,
      default : Date.now()
    },

    is_online : {
        type : String,
        enum : [true,false],
        default : false
    },

    password : {
        type : String,
        required: [true,'Password is required'],
        select: false
    }

},
 {
  timestamps: true 
 }
)

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

module.exports.user = mongoose.model('users',userSchema)