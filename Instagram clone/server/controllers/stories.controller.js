const asyncHandler = require('../utils/handlers/asyncHandler')
const apiError = require('../utils/handlers/apiError')
const apiResponse = require('../utils/handlers/apiResponse')
const { follow } = require('../models/follow.model')
const { stories } = require('../models/stories.model')
const {resizeUploads} = require('../middlewares/resizeUploads')
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

        is_storyExist.stories.push({ story_url: data?.filepath })
        is_storyExist.save()

        return res.status(201).json(new apiResponse(201, 'story uploaded successfully', is_storyExist))

    } else {

        const storyData = [
                { story_url: data?.filepath }
            ]
        

        const new_story = await stories.create({
            stories: storyData,
            user_id: req.user._id,
        })

        return res.status(201).json(new apiResponse(201, 'story uploaded successfully', new_story))

    }

}) 


exports.storyList = asyncHandler(async(req,res)=>{
    
    const getStory = await follow.aggregate([
    
            {$match:{'follower_id':{$eq:req.user._id}}},
    
            {
                $lookup:{
                    'from': 'stories',
                    'localField': 'following_id',
                    'foreignField': 'user_id',
                    as:'story',
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
            $project: {
                story : 1
            }
        },
        {
            $unwind:{
                path: '$story'
            }
        },

    ])

    return res.status(200).json(new apiResponse(200,'stories list fetch successfully',getStory))

})
