const mongoose = require("mongoose");

const answereSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    studentEmail:{
        type:String,
        required:true
    },
    studentSection:{
        type:String,
        required:true
    },
    studentRollno:{
        type:Number,
        required:true
    },
    submittedTime:{
        type:Date,
        default:new Date().toLocaleDateString()
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz"
    },
    answeres:{
        type:[],
        required:true
    },
    score:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("Answere",answereSchema);