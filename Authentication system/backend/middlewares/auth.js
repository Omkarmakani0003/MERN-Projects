const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const {user} = require('../models/User.model')
const {asyncHandler} = require('../utils/asyncHandler')
const apiError = require('../utils/apiError')

exports.auth = asyncHandler(async(req,res,next)=>{
   const token = req.header('Authorization')?.replace('Bearer ','')

   if(!token) throw new apiError(500,'Unauthorize')
    console.log(token)
   const decoded = await jwt.verify(token,process.env.JWT_SECRETE)
   
   const User = await user.findById(decoded._id).select('-password')
   if(!User) throw new apiError(401,'Invalid credentials')
   req.user = User

   next()
   
})