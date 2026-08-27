import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
   email:{
    type:String,
    required:[true,"Email Is Required"]
   },
   user:{
    type:String,
    ref:"users",
    required:[true,"User is required"]
   },
   otpHash:{
    type:String,
    required:[true,"OTP hash is required"]
   }
},{
    timestamps:true
})

const otpModel = mongoose.model("otps",otpSchema)
export default otpModel