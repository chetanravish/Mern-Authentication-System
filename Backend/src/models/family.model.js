import mongoose from "mongoose";

const familySchema  = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    relation:{
        type:String,
        required:true,
        enum: [
        "Self",
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Spouse",
        "Son",
        "Daughter",
        "Other",
      ],
    }
},
{timestamps:true})

export default mongoose.model("FamilyMember",familySchema)