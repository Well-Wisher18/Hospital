const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const hospitalSchema=new Schema({email:String,password:String,uname:String});
const Hospital=mongoose.model('Hospital',hospitalSchema);
module.exports=Hospital;
