//  steps to define express server
// Leads .env file into process.env
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const router = require('./routes/router')
require('./database/dbConnection')

const serverTest = express()

serverTest.use(cors())
serverTest.use(express.json())
serverTest.use(router)

const PORT = 4000 || process.env.PORT

// listen is a method of express server
serverTest.listen(PORT,()=>{
    console.log(`serverTest started at ${PORT} and waiting for client request!!!`);
})

// resolving request
serverTest.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;"> serverTest started at port and waiting for client request!!!</h1>`)
})

// serverTest.post('/',(req,res)=>{
//     res.status(200).send("POST REQUEST")
// })