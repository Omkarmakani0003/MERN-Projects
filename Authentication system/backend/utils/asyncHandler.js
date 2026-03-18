const { request } = require("express");

//===================== Method 1 ========================================================

// const asyncHandler = (requestHandle) =>  {
//     (req,res,next)=>{
//         Promise.resolve(requestHandle(req,res,next)).catch((error)=>{
//             console.log(error.message)
//         })
//     }
// }

//===================== Method 2 ========================================================

// const asyncHandler = (requestFn) => async(req,res,next) =>{
//     try{
//         await requestFn(req,res,next)
//     }catch(error){
//         console.log(error.message)
//     }
// }


//===================== Method 3 ========================================================

exports.asyncHandler = (requestHandle) => (req,res,next)=>{
    Promise.resolve(requestHandle(req,res,next)).catch((error)=>{
        next(error)
    })
}
