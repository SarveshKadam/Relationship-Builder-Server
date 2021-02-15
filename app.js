const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const personRoute = require('./router/person')
const relationRoute = require('./router/relation')
const mongoose = require('mongoose');
dotenv.config({path : './config.env'});
app.use(express.json())

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.DATABASE ,{useUnifiedTopology : true , useNewUrlParser : true,useCreateIndex: true})

const db = mongoose.connection

db.on('error',error => console.error(error))
db.once('open',()=>{console.log('Database is connected')})

app.use('/persons',personRoute)
app.use('/relations',relationRoute)

app.listen(process.env.PORT,()=>{
    console.log("Server is listening");
})