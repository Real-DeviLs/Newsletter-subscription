const mongoose =require("mongoose")
const Schema =mongoose.Schema;
const MailSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
const Email=mongoose.model("email",MailSchema);
module.exports=Email;
