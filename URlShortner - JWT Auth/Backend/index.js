const express=require('express')
const { MongoConnection } = require('./connection')
const urlroutes=require('./routes/Urlroutes')
const userroutes=require("./routes/Useroutes")
const cors=require('cors')
const cookieParser=require('cookie-parser')
const { VerifyCookie } = require('./middlewares/UserAuth')
const { SecureUserroutes } = require('./routes/SecureUserroutes')
const app=express()
const port =500

// Database 

const url="mongodb://127.0.0.1:27017/URL-Shortner-Url"

MongoConnection(url)
.then(()=>{
    return console.log("Mongodb Connected Successfully ")})
.catch((err)=>{
    return console.log("Mongodb Error :" ,err)})



// Middlewares

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(cors({credentials:true, origin:"http://localhost:5173"}))    



// Routes

app.use('/',SecureUserroutes)
app.use('/url',urlroutes)
app.use('/user',userroutes)





app.listen(port,()=>{   
console.log(`Server started at port : ${port}`)
} )

