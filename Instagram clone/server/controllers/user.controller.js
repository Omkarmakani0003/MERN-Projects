const {user} = require('../models/user.model')
const {follow} = require('../models/follow.model')
const {post} = require('../models/posts.model')
const {save} = require('../models/save.model')
const mongoose = require('mongoose')
const asyncHandler = require('../utils/handlers/asyncHandler')
const apiError = require('../utils/handlers/apiError')
const apiResponse = require('../utils/handlers/apiResponse')
const fs = require('fs').promises
const path = require('path')


exports.getProfile = asyncHandler(async(req,res)=>{
    
    const username = (req.query && req.query.username != undefined) ? req.query.username : req.user.username

    if(!username) throw new apiError(400,'username not match')
    

    const profile = await user.findOne({username:username})
    if(!profile) throw new apiError(400,'Something went wrong')
    
    return res.status(200).json(new apiResponse(200,'User fetch successfully',profile))    
})

exports.getSuggestedUsers = asyncHandler(async(req,res)=>{

    const followingUsers = await follow.find({$or:[{follower_id:req.user._id},{following_id:req.user._id}]})
    
    const followingUsersIds = followingUsers.map((e)=> {
        if(e.following_id.toString() == req.user._id.toString()){
            return e.follower_id
        }else if(e.follower_id.toString() == req.user._id.toString()){
            return e.following_id
        }
    })

    const suggestedUsers = await user.find(
        {
            _id:{
                $nin: [...followingUsersIds,req.user._id]
            }
        }
    ).select('-email -bio -cover_image -phone -date_of_birth -gender -followes -following -post_count -joining_date -is_online -createdAt -updatedAt').limit(5)

    return res.status(200).json(new apiResponse(200,'Suggested users fetch successfully',suggestedUsers))

})

exports.follow = asyncHandler(async(req,res)=>{

    const {user_id} = req.body

    if(user_id == req.user._id) throw new apiError(400,'you can not follow yourself')

    const is_followed = await follow.find({$and:[{follower_id:req.user._id},{following_id:user_id}]})

    if(is_followed && is_followed.length > 0){
        await follow.deleteOne({$and:[{follower_id:req.user._id},{following_id:user_id}]})

        await user.findByIdAndUpdate(req.user._id,{
          $inc: { following : -1 }
        })

        await user.findByIdAndUpdate(user_id,{
          $inc: { followes : -1 }
        })
  
        return res.status(200).json(new apiResponse(201,'unfollowed successfully'))
    }

    await follow.create({
        follower_id : req.user._id,
        following_id : user_id
    }) 

    await user.findByIdAndUpdate(req.user._id,{
         $inc: { following : 1 }
    })

    await user.findByIdAndUpdate(user_id,{
         $inc: { followes : 1 }
    })


    return res.status(200).json(new apiResponse(201,'followed successfully'))

}) 

exports.updateProfile = asyncHandler(async(req,res)=>{
    
    const profile = await user.findById(req.user._id)

    if(!profile) throw new apiError(401,'User not found')

    const fields  = [
        'fullname',
        'bio',
        'phone',
        'date_of_birth',
        'gender',
        'followes',
        'following',
        'post_count',
    ]

    fields.forEach((f)=>{
        if(req.body?.[f] != undefined){
           profile[f] = req.body[f]
        }
    })

    if(req.files){
        
        if(req.files['profile_picture']?.[0]){
            try{
                await fs.unlink(path.join(__dirname,'..','public',profile.profile_picture))
                profile.profile_picture = `upload/profile_picture/${req.files['profile_picture'][0].filename}`
            }catch(error){
                throw new apiError(400,error.message)
            }
        }
            

        if(req.files['cover_image']?.[0]){
            try{
                await fs.unlink(path.join(__dirname,'..','public',profile.cover_image))
                profile.cover_image  = `upload/cover_image/${req.files['cover_image'][0].filename}`
            }catch(error){
                throw new apiError(400,error.message)
            }   
        }

    }    

    profile.save()

    return res.status(200).json(new apiResponse(200,'Profile updated successfully',profile))
    
})

exports.getSpecificUsersPost = asyncHandler(async(req,res)=>{

      const {user_id} = req.body

      if(!user_id) throw new apiError(400,"user_ID is must required")

      const options = {page : parseInt(req.query?.page) || 1, limit: 9}

      const posts = await post.aggregatePaginate(post.aggregate({$match: {user_id:{$eq: user_id} } }),options)  
      console.log(posts)
      return res.status(200).json(new apiResponse(200,"post fetched successfully",posts))

})

exports.getUserSave = asyncHandler(async(req,res)=>{

      const user_id = req.user._id

      if(!user_id) throw new apiError(400,"user_ID is must required")

      const options = {page : parseInt(req.query?.page) || 1, limit: 9}
      
      const Save = await save.paginate({user_id: user_id},options)  
      
      return res.status(200).json(new apiResponse(200,"save fetched successfully",Save))

})

exports.getfollowers = asyncHandler(async(req,res)=>{

      const {user_id} = req.body

      if(!user_id) throw new apiError(400,"user_id is must required")

      const options = {page : parseInt(req.query?.page) || 1, limit: 10}
      
      const followes = await follow.aggregatePaginate(
        follow.aggregate([
            {$match: {following_id: new mongoose.Types.ObjectId(user_id) }},
            {
                $lookup:{
                    from:'users',
                    localField: 'follower_id',
                    foreignField: '_id',
                    as: 'followers'
                }
            },
            {
                $unwind:{
                    path:'$followers'
                }
            },
            {
                $project:{
                    'followers': 1
                }
            }
        ]),
        options
      )  
      
      return res.status(200).json(new apiResponse(200,"save fetched successfully",followes))

})

exports.getfollowings = asyncHandler(async(req,res)=>{

      const {user_id} = req.body

      if(!user_id) throw new apiError(400,"user_id is must required")

      const options = {page : parseInt(req.query?.page) || 1, limit: 10}
      
      const followings = await follow.aggregatePaginate(
        follow.aggregate([
            {$match: {follower_id: new mongoose.Types.ObjectId(user_id) }},
            {
                $lookup:{
                    from:'users',
                    localField: 'following_id',
                    foreignField: '_id',
                    as: 'followings'
                }
            },
            {
                $unwind:{
                    path:'$followings'
                }
            },
            {
                $project:{
                    'followings': 1
                }
            }
        ]),
        options
      )  
      
      return res.status(200).json(new apiResponse(200,"save fetched successfully",followings))

})