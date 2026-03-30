const sharp = require('sharp')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath('C:\\ffmpeg\\ffmpeg-8.1-full_build\\bin\\ffmpeg.exe');
const path = require('path');
const apiError = require('../utils/handlers/apiError');

exports.resizeUploads = async(data)=>{
    
    if(!data) return false

    const filetype = data.mimetype.split('/')[0]

    if(!filetype) throw new apiError(400,'something went wrong cant uploaded post')

    if(filetype == 'image'){

        if(data.field == 'stories'){
            await sharp(data.buffer)
              .resize(1080,1920)
              .jpeg({quality:80})
              .toFile(data.filepath)
        }else{
            await sharp(data.buffer)
              .resize(1080,1350)
              .jpeg({quality:80})
              .toFile(data.filepath)
        }
        
    }else if(filetype == 'video'){
        const tempPath = path.join(__dirname,'..', '/public/upload/temp/', data.filename)  
        fs.writeFileSync(tempPath,data.buffer)
        
        const compressed = path.join(__dirname,'..', `/public/upload/${data.field}/`, data.filename)
        
        let duration = 0;
    
        if(data.field == 'stories'){
            duration = 15
        }else{
            duration = 30
        }

        ffmpeg(tempPath)
        .outputOptions([
            '-vcodec libx264',
            '-crf 28',
            '-preset fast',
        ])
        
        .setDuration(duration)
        .on('end',()=>{
            fs.unlinkSync(tempPath)
        })
        .on('error',(e)=>{
            console.log(e)  
        })
            
        .save(compressed)

    }else{
       throw new apiError(200,'only image and video file allowed')
    }

}