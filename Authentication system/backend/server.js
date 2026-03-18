const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieparser = require('cookie-parser')
const app = express()
const connection = require('./config/connection')
const userRoutes = require('./routes/user.route')
const {globleErrorHandler} = require('./utils/globleErrorHandler')


connection()

app.use(cors())
app.use(express.json())
app.use(cookieparser())

app.use('/api/',userRoutes)


app.use(globleErrorHandler)

app.listen(process.env.PORT || 5000 ,()=>{ 
    console.log(`Server is running on port ${process.env.PORT || 5000}`)
 })
