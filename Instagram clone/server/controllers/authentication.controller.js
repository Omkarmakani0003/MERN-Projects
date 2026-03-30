const {user} = require('../models/user.model')
const asyncHandler = require('../utils/handlers/asyncHandler')
const apiError = require('../utils/handlers//apiError')
const apiResponse = require('../utils/handlers/apiResponse')


exports.signup = asyncHandler(async(req,res) =>{

    const {fullname, username, email, password} = req.body 

    if(!fullname || !username || !email || !password){
        throw new apiError(400,'all field are required')
    }

    const is_userExist = await user.findOne({email:email})

    if(is_userExist){
        throw new apiError(400,'Email already taken')
    }

    const is_usernameExist = await user.findOne({username: username})

    if(is_usernameExist){
        throw new apiError(400,`Enter a unique user name ${username} is already taken`)
    }

    const User = await user.create({
        fullname,
        username,
        email,
        password
    })

   return res.status(201).json(new apiResponse(201,'User register successfully',User))

})

exports.login = asyncHandler(async(req,res) => {

    const { email, password } = req.body
    
    if(!email || !password) throw new apiError(400,'Email and password must required')

    const User = await user.findOne({email}).select('+password')

    if(!User) throw new apiError(400,'Email and password incorrect')
 
    isPasswordVarify = await User.checkPassword(password)

    if(!isPasswordVarify) throw new apiError(400,'Email and password incorrect')

    const token = await User.generateToken()
    const loggedIn = await user.findById(User._id)

    res.cookie('token', token, {
        httpOnly: true,
        secure: false
    })

    return res.status(200).json(new apiResponse(200,'User login successfully',{user: loggedIn,token: token}))

})

