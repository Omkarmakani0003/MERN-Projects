const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null,`public/upload/${file.fieldname}`),
    filename: (req,file,cb) => {
        const name = Date.now() +  '-' + Math.round(Math.random() * 10)
        cb(null,name + '_' + file.originalname)
    }
})

const profile = multer({storage:storage, limits: {fileSize: 5 * 1024 * 1024}})
module.exports = profile