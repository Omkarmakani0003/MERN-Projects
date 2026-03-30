const express = require('express')
const dotenv = require('dotenv').config()
const connection = require('./config/connection')
const cors = require('cors')
const path = require('path')
const cookieparser = require('cookie-parser')
const userRoutes = require('./routes/user.route')
const globleErrorHandler = require('./utils/handlers/globleErrorHandler')


const app = express()
connection()
app.use(express.json())
app.use(cookieparser())
app.use(cors({ origin: 'http://localhost:5173',credentials: true }))
app.use(express.static(path.join(__dirname,'public')))


app.use('/api/',userRoutes)

app.use(globleErrorHandler)

app.listen(process.env.PORT || 5000 ,()=>{ 
    console.log(`Server is running on port ${process.env.PORT || 5000}`)
 })
