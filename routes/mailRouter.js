const express=require("express");
const router=express.Router();
const Email=require("../models/profileModel");

const sendMail=require("../utils/mailSender");

router.get('/',(req,res)=>{
    // res.send("this is tha mail router");
    res.status(200).render('index');
});

router.get('/admin',async(req,res)=>{
    if(req.query.pass=="123"){

        try {
            const emailList=await Email.find({},{_id:0,__v:0});
            res.render("admin",{emailList:emailList})
        } catch (err) {
            console.error(err.message);   
        }
    }
    else if(req.query.sent=="123"){
        console.log(req.body.subject);
        res.send("mail sent sucessfully......")
    }
    else{
        res.send("404 Error wrong route!!")
    }
});

router.post("/admin",async (req,res)=>{
    if(req.body.sent=="123"){
        try {
            var arr=[];
            const emailList=await Email.find({},{_id:0,__v:0,name:0}); //this is tha array of objects 
            emailList.forEach(id => {
                arr.push(sendMail(id.email,req.body.subject,req.body.content));
            });
            res.send({status : arr});
        } catch (err) {
            
        }
    }
})

router.post('/sucess',async (req,res)=>{
    try {
        const email=new Email(req.body);
        const subscription=await email.save();
        res.send(subscription+" "+"added sucessfull to the databese");
        console.log(subscription+"sucess");
    } catch (err) {
            console.error(err.message);
            res.redirect("/");
    }

    
})

module.exports=router;  