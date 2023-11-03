const mongoose=require("mongoose")
const patient=mongoose.model("Patients",{
    Roll_No:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Symptoms:{
        type:String,
        required:true
    },
    Remarks:{
        type:String,
        required:true
    }
})
module.exports=patient