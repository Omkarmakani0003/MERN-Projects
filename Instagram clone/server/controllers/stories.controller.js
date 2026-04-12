const asyncHandler = require('../utils/handlers/asyncHandler')
const apiError = require('../utils/handlers/apiError')
const apiResponse = require('../utils/handlers/apiResponse')
const { follow } = require('../models/follow.model')
const { stories } = require('../models/stories.model')
const {resizeUploads} = require('../middlewares/resizeUploads')
const fs = require('fs')
const path = require('path')



exports.uploadStory = asyncHandler(async (req, res) => {

    /* Get input */
    const upload = req.file

    /* Input validation */
    if (!upload) throw new apiError(400, 'Please upload image or video')

    const data = {}

    if (upload) {

        const filename = Date.now() + '-' + req.file.originalname;
        const filepath = path.join(__dirname, '..', '/public/upload/stories/', filename);

        data.filename = filename,
        data.filepath = filepath,
        data.buffer = req.file.buffer
        data.mimetype = upload.mimetype
        data.field = 'stories'


        /* Resize and upload in folder */
        await resizeUploads(data)

    }

    const is_storyExist = await stories.findOne({ user_id: req.user._id })

    if (is_storyExist) {

        is_storyExist.stories.push({ story_url: `upload/stories/${data.filename}` })
        is_storyExist.save()

        return res.status(201).json(new apiResponse(201, 'story uploaded successfully', is_storyExist))

    } else {

        const storyData = [
                { story_url: `upload/stories/${data.filename}` }
            ]
        

        const new_story = await stories.create({
            stories: storyData,
            user_id: req.user._id,
        })

        return res.status(201).json(new apiResponse(201, 'story uploaded successfully', new_story))

    }

}) 


exports.storyList = asyncHandler(async(req,res)=>{
    
    // const getStory = await follow.aggregate([
    
    //         {$match:{'follower_id':{$eq:req.user._id}}},
    
    //         {
    //             $lookup:{
    //                 'from': 'stories',
    //                 'localField': 'following_id',
    //                 'foreignField': 'user_id',
    //                 as:'story',
    //                 pipeline : [
    //                     {
    //                         $lookup: {
    //                             'from': 'users',
    //                             'localField': 'user_id',
    //                             'foreignField': '_id',
    //                             'as':'user'
    //                         },
    //                     },
    //                 ],
                
    //         }
    //     },
    //     {
    //         $project: {
    //             story : 1
    //         }
    //     },
    //     {
    //         $unwind:{
    //             path: '$story'
    //         }
    //     },
    //     { $replaceRoot: { newRoot: "$story" } }

    // ])

    // const myStories = await stories.find({user_id:req.user._id})

    // const allStories = [...myStories, ...getStory];

    const getStory = await follow.aggregate([
    {
        $match: { follower_id: req.user._id }
    },
    {
        $group: {
            _id: null,
            followingIds: { $addToSet: "$following_id" }
        }
    },
    {
        $addFields: {
            allUserIds: {
                $concatArrays: ["$followingIds", [req.user._id]] // 👈 include self
            }
        }
    },
    {
        $lookup: {
            from: "stories",
            localField: "allUserIds",
            foreignField: "user_id",
            as: "stories",
            pipeline: [
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                }
            ]
        }
    },
    {
        $unwind: "$stories"
    },
    {
        $replaceRoot: { newRoot: "$stories" }
    },
    {
        $sort: { createdAt: -1 } // optional but recommended
    }
]);

    return res.status(200).json(new apiResponse(200,'stories list fetch successfully',getStory))

})

exports.deleteStory = asyncHandler(async(req,res)=>{

    /** Get input */
    const {stories_id,story_id} = req.body

    /** Input validation */
    if(!stories_id || !story_id) throw new apiError(400,"Story_id and stories_id are required")

    /* Check post in exist or not */
    const isStoryExist = await stories.findById(stories_id)
    if(!isStoryExist) throw new apiError(404,"Story not found")

    /* Check authorization */  
    if(isStoryExist.user_id.toString() !== req.user._id.toString()){
        throw new apiError(400,"You can not delete this Story")
    }
 

    const getStory = isStoryExist.stories.filter((e)=> e.id.toString() == story_id.toString())
 
    if(!getStory || getStory.length == 0) throw new apiError(404,"Story not found")

    /* remove */

    await fs.unlink(path.join(__dirname,'..','public',getStory[0].story_url),(err)=>{
            if(err){
                console.log(err)
                throw new apiError(400,"Something went wrong file not remove from folder")
            }
            console.log('file removed successfully')
        })

    if(isStoryExist.stories.length > 1){
        const oldStories = isStoryExist.stories.filter((e)=> e.id.toString() !== story_id.toString())
        await stories.findByIdAndUpdate(
            {_id: stories_id, user_id: req.user._id},
            { stories : oldStories }
        )
    }else{
        await stories.deleteOne({_id: stories_id, user_id: req.user._id})
    } 

    return res.status(200).json(new apiResponse(200,"Story deleted successfully"))

})

exports.updateStoryView = asyncHandler(async(req,res)=>{
      const {stories_id,specific_story_id} = req.body
      
      if(!stories_id || !specific_story_id) throw new apiError(400,"stories_id and specific_story_id must required")

      const Stories = await stories.findOne({_id : stories_id})

      const specific_story = Stories.stories.map((e)=>{ 
        if(e._id == specific_story_id){
            return e.view.push(req.user._id)
        }else{
            return e
        }
      })
      console.log(specific_story)
})
