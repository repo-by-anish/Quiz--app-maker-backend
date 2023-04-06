const Answere=require("../models/Answere");
const asyncHandler=require("express-async-handler");

const getAllAnsweres=asyncHandler(async (req,res)=>{
const answeres=await Answere.find().lean();
if(!answeres?.length){
    res.status(400).json({message:"No Answeres Found"});
}else{
    res.json(answeres)
}
})

const createAnswere=asyncHandler(async (req,res)=>{
    const {studentName,studentEmail,studentSection,studentRollno,answeres,quizId}=req.body;
    if (!studentName&&!studentEmail&&!studentRollno&&!studentSection&&!quizId) {
        return res.status(400).json({message:"All feild are required"});
    }
    const answere=await Answere.create({studentName,studentEmail,studentSection,studentRollno,quizId,answeres})
    if(answere){
        res.status(200).json({id:answere.id});
    }else{
        res.status(400).json({message:"receved Invalid Data"});
    }
})

const updateAnswere=asyncHandler(async (req,res)=>{
    const {id,answeres}=req.body;
    if (!id&&!answeres) {
        return res.status(400).json({message:"All feild are required"});
    }
    const answere=await Answere.findById(id);
    if(!answere){
        return res.status(400).json({message:"Couldn't find quiz"})
    }
    answere.answeres=answeres;
    const result = await answere.save();
    if(result){
        return res.status(200).json({message:"Answere Updated"});
    }else{
        return res.status(400).json({message:"Answere couldn't updated"});
    }
})

module.exports={
    getAllAnsweres,
    createAnswere,
    updateAnswere
}