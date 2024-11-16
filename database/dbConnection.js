const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Connection Succefully With serverTest");
}).catch(err=>{
    console.log("MongoDb Atlas Connection failed");
    console.log(err);
})
