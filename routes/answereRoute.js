const express=require("express");
const {createAnswere,updateAnswere,getAllAnsweres} =require("../controller/answereController")
const router=express.Router();


router.route("/")
.get(getAllAnsweres)
.post(createAnswere)
.patch(updateAnswere)


module.exports=router;

