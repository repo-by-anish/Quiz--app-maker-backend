const express = require("express");
const quizController=require("../controller/quizController");

const router=express.Router();

router.route("/")
.get(quizController.getAllquizes)
.post(quizController.createNewQuiz)
.patch(quizController.updateQuiz)
.delete(quizController.deleteQuiz);

module.exports=router;