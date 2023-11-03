const mongoose=require("mongoose")
const login=mongoose.model('Login',{
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})
module.exports=login