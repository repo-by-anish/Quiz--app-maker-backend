const express=require("express");
const {createAnswere,updateAnswere} =require("../controller/answereController")
const router=express.Router();


router.route("/")
.post(createAnswere)
.patch(updateAnswere)


module.exports=router;

