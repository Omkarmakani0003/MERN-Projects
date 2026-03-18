const mongoose = require('mongoose')
const {asyncHandler} = require('../utils/asyncHandler')
const dotenv = require('dotenv').config()


const connection = asyncHandler(()=>{
    mongoose.connect(process.env.DBURI)
    .then(()=>{console.log('Database connection succesfully')})
    .catch(()=>{ console.log('Database connection faild') })
})

module.exports = connection