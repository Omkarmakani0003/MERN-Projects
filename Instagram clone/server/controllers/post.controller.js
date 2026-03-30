const asyncHandler = require('../utils/handlers/asyncHandler')
const apiError = require('../utils/handlers/apiError')
const apiResponse = require('../utils/handlers/apiResponse')
const {follow} = require('../models/follow.model')
const {post} = require('../models/posts.model')
const {likes} = require('../models/likes.model')
const {save} = require('../models/save.model')
const {comments} = require('../models/comments.model')
const {resizeUploads} = require('../middlewares/resizeUploads')
const path = require('path')

exports.uploadPost = asyncHandler(async(req,res)=>{

    /* Get input */
    const upload = req.file
    const text = req.body?.text

    /* Input validation */
    if(!upload && !text) throw new apiError(400,'Please enter text or image / video')

    /* Defind object to store file data */
    const data = {}  

    if(upload){
        
        /* Store filename and filepath in variable */
        const filename = Date.now()+'-'+req.file.originalname;
        const filepath = path.join(__dirname,'..', '/public/upload/posts/', filename);

        /* append data in object */
        data.filename = filename,
        data.filepath = filepath,
        data.buffer = req.file.buffer
        data.mimetype = upload.mimetype

        /* Resize file and store in folder  */
        await resizeUploads(data)

    }

    /* Create post */
    const uploaded_post = await post.create({
        user_id: req.user._id,
        post: data?.filepath,
        text: text
    })    

    return res.status(201).json(new apiResponse(201,'post uploaded successfully',uploaded_post))
   
})  

exports.postList = asyncHandler(async(req,res)=>{
    
    const getPost = await follow.aggregate([

        {$match:{'follower_id':{$eq:req.user._id}}},

        {
            $lookup:{
                'from': 'posts',
                'localField': 'following_id',
                'foreignField': 'user_id',
                as:'post',
                pipeline : [
                    {
                        $lookup: {
                            'from': 'users',
                            'localField': 'user_id',
                            'foreignField': '_id',
                            'as':'user'
                        },
                    },
                ],
            
        }
    },
    {
        $unwind:{
            path: '$post'
        }
    },
    {
        $project:{
            'post': 1
        }
    },
])

return res.status(200).json(new apiResponse(200,'post list fetch successfully',getPost))

})

exports.like = asyncHandler(async(req,res)=>{
    /* Get input */
    const {post_id,auther_id} = req.body

    /* Input validation */
    if(!post_id || !auther_id){
        throw new apiError(401,"Something went wrong Ids is required")
    }

    /* Check post Exist or not */
    let isPostExist = await post.findOne({post_id})
    if(!isPostExist) throw new apiError(404,"Post not found")

    /* Check post already liked or not */
    let islikeExist = await likes.findOne({post_id},{user_id:req.user._id}) 
    
    /* Defind variable to check like and dislike */
    let isLiked

    if(!islikeExist){
        /* Save like if it not exist */
        await likes.create({
            post_id,
            auther_id,
            user_id : req.user._id
        })
        await post.findByIdAndUpdate(post_id,{$inc: { likes_count : 1 }})
        isLiked = true
    }else{
        /* dislike if exist */
        await islikeExist.deleteOne()
        await post.findByIdAndUpdate(post_id,{$inc: { likes_count : -1 }})
        isLiked = false 
    }

    return res.status(201).json(new apiResponse(201,"Post like successfuly",isLiked))
})


exports.comment = asyncHandler(async(req,res)=>{

    /* Get user input  */
    const {post_id,auther_id,comment} = req.body

    /* Comment validation */
    if(!comment || !comment.trim()){
       throw new apiError(400,"Comment is required") 
    }

    /* Ids validation */
    if(!post_id || !auther_id){
        throw new apiError(400,"Something went wrong Ids is required")
    }

    /* Check Post exist or not */
    const postExist = await post.findOne({post_id})
    if(!postExist){
        throw new apiError(404,"Post is not found")
    }

    /* Create comment */
    const Comment = await comments.create({
        post_id,
        auther_id,
        comment,
        user_id : req.user._id
    })

    /* update comment count in post collection */
    await post.findByIdAndUpdate(post_id,{$inc: { comments_count : 1 }})
    
    return res.status(201).json(new apiResponse(201,"comment added successfuly",Comment))

})

exports.removeComment = asyncHandler(async(req,res)=>{

    /* Get input */
    const {comment_id} = req.body

    /* input validation */
    if(!comment_id){
       throw new apiError(401,"Comment id is required") 
    }

    /* Check Comment is exist or not */
    const isCommentExist = await comments.findById(comment_id)
    if(!isCommentExist) throw new apiError(404,"Comment not found") 

    /* Check authorization */
    if(isCommentExist.user_id.toString() !== req.user._id.toString()) {
        throw new apiError(403,"You cant delete this comment")
    }   

    /* Delete comment */
    await comments.deleteOne({_id : comment_id})

    /* update comment count in post collection */
    await post.findByIdAndUpdate(isCommentExist.post_id,{$inc: { comments_count : -1 }})

    return res.status(200).json(new apiResponse(200,"comment remove successfuly"))

})


exports.save = asyncHandler(async(req,res)=>{

    /* Get input */
    const {post_id} = req.body

    /* Input validation */
    if(!post_id) throw new apiError(401,"Something went wrong Ids is required")

    /* Check post is exist or not */
    const isPostExist = await post.findOne({_id:post_id})
    if(!isPostExist) throw new apiError(404,"Post is not found")

    /* Check post already save or not */
    const isSaveExist = await save.findOne({post_id},{user_id : req.user._id})
  
    /* defind variable to check post save or not */
    let isSave;

    if(!isSaveExist){
        /* Save post if not already saved */
        await save.create({
            post_id,
            user_id : req.user._id
        })
        isSave = true
    }else{
       /* Remove post if already saved */
       await save.deleteOne({post_id},{user_id : req.user._id})
       isSave = false
    }

    return res.status(201).json(new apiResponse(201,"Post saved successfuly",isSave))

})
