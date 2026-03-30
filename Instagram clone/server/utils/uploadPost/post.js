const multer = require('multer')
const apiError = require('../handlers/apiError')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb)=>{
    
    if(file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')){
       cb(null,true)
    }else{
        cb(new apiError(400,'Only image and video allowed'))
    }
}

const postImage = multer({storage:storage,fileFilter})
module.exports = postImage