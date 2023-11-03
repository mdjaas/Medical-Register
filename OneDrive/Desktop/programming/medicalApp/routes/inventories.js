const mongoose=require("mongoose")
// inv=mongoose.model("Inventories")
// const inve=[]
// inv.find({}).then((inventory)=>{
//     inve.push(inventory)
//     console.log
// })

const inv=mongoose.model('Inventories', {
    Sr_No:{
        type:Number,
        required:false,
    },
    Product_Id:{
        type:Number,
        required:true
    },
    Product:{
        type:String,
        required:true
    },
    Qty:{
        type:Number,
        required:true
    }
})

module.exports=inv
