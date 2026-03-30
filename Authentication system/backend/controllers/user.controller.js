const {user} = require('../models/User.model')
const {asyncHandler} = require('../utils/asyncHandler')
const apiError = require('../utils/apiError')
const apiResponse = require('../utils/apiResponse')

exports.signUp = asyncHandler(async(req,res) =>{

    const {name, email, password} = req.body 

    if(!name || !email || !password){
        throw new apiError(400,'all field are required')
    }

    const userExist = await user.findOne({email:email})

    if(userExist){
        throw new apiError(400,'Email already taken')
    }

    const User = await user.create({
        name,
        email,
        password
    })

   return res.status(201).json(new apiResponse(201,'User register successfully',User))

})

exports.login = asyncHandler(async(req,res) => {
    const { email, password } = req.body
    
    if(!email || !password) throw new apiError(400,'Email and password must required')

    const User = await user.findOne({email})

    if(!User) throw new apiError(400,'Email and password incorrect')

    isPasswordVarify = await User.checkPassword(password)

    if(!isPasswordVarify) throw new apiError(400,'Email and password incorrect')

    const token = await User.generateToken()
    const loggedIn = await user.findById(User._id).select('-password')

    res.cookie('token', token, {
        httpOnly: true,
        secure: false
    })

    return res.status(200).json(new apiResponse(200,'User login successfully',{user: loggedIn,token: token}))

}) 


exports.dashboard = asyncHandler(async(req,res)=>{
     return res.status(200).json(new apiResponse(200,`Welcome ${req.user.name}`,req.user))
})