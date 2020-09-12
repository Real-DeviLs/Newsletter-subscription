const nodemailer=require("nodemailer");
require("dotenv").config();


const sendEmail=(username,subject,text)=>{
   var transporter=nodemailer.createTransport({
       service:'gmail',
       auth:{
           user:process.env.SENDER,
           pass:process.env.PASSWORD
       }
   });
   
   var mailOptions={
       from:process.env.SENDER,
       to:username,
       subject:subject,
       text:text
   };
//    calling the inbuilt function .sendMail of the transporter
   transporter.sendMail(mailOptions,(err,info)=>{
       if(err){
           console.error(err.message);
           return err.message;
       }else{
           console.log("Email sent :"+info.response);
           return info.accepted;
       }

   })

}

module.exports=sendEmail;