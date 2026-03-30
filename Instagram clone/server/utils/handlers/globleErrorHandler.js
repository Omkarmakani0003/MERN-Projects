const apiResponse = require('./apiResponse')
const apiError = require('./apiError')

const globleErrorHandler = (error, req, res, next)=>{
    if(!error) return
    if(error instanceof apiError){
        return res.status(error.statusCode).json(new apiResponse(error.statusCode,error.message,error.data))
    }else{
        return res.status(500).json(new apiResponse(500,error._message ?? error.message ?? "internal Server Error"))
    }
}

module.exports = globleErrorHandler