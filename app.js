require("dotenv").config();
const express=require('express');
const mongoose=require("mongoose");
const path =require('path');
const app=express();

//this helps the person to parse the url encoded information and the converts the req.body() into json format
app.use(express.urlencoded({extended:false}));

//express.json() and bodyParser.json() dose the same job
app.use(express.json());
// app.use(bodyParser.json());
const mailRouter=require("./routes/mailRouter");
app.set("views",path.join(__dirname,'views'))
app.use('/static',express.static('static'))
app.set("view engine","pug");


mongoose.connect(process.env.MONGOURI,
    {
        dbName:"newsletter",//giving the database name 
        user:process.env.USER,
        pass:process.env.PASS,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    })
    .then(()=>{
        console.log("Mongodb connected...");
    })
    .catch(()=>{
        console.log("Connection failed...")
    });

app.use('/',mailRouter);

// error handling
// app.use((req,res,next)={
//     const err = new Error(404,"Some error occured");
    
// })


app.listen(80 || process.env.PORT,()=>{
console.log("The server started running on the port 80")});