const Quiz = require("../models/Quiz");

const asyncHandeler = require("express-async-handler");

const getAllquizes = asyncHandeler(async (req, res) => {
    const quizes = await Quiz.find().lean();
    if (!quizes?.length) {
        return res.status(400).json({ message: "No Quizes Found" });
    } else {
        res.json(quizes);
    }
})

const createNewQuiz = asyncHandeler(async (req, res) => {
    const { quizId, quizName, quizDesc, quizGrade, quizDuration, quizQnDatas } = req.body;
    if (!quizId && !quizName && !quizDesc && !quizGrade && !quizDuration && !quizQnDatas) {
        return res.status(400).json({ message: "All feild are required" });
    }

    const duplicateQuiz=await Quiz.findOne({quizId}).lean().exec()
    if (duplicateQuiz) {
        return res.status(409).json({message:"A Quiz already exist with same Id"});
    }

    const quizObject = { quizId, quizName, quizDesc, quizGrade, quizDuration, quizQnDatas };
    const quiz = await Quiz.create(quizObject);
    if (quiz) {
        res.status(200).json({ message: "new quiz created" });
    } else {
        res.status(400).json({ message: "Receved invalid data" })
    }
})


const deleteQuiz = asyncHandeler(async (req, res) => {
    const { quizId } = req.body;
    if (!quizId) {
        res.status(400).json({ message: "Id is Required" });
    }
    const quiz = await Quiz.findOne({quizId }).exec();

    if (!quiz) {
        res.status(400).json({ message: "No Quiz Found" });
    }

    const result = await quiz.deleteOne();
    const reply = `Quiz ${result.quizName} with id: ${result.quizId} is deleted`;
    res.status(200).json({ message: reply });

})


const updateQuiz = asyncHandeler(async (req, res) => {
    const { id, quizName, quizDesc, quizGrade, quizDuration, quizQnDatas } = req.body;
    if (!id&&!quizName && !quizDesc && !quizGrade && !quizDuration && !Array.isArray(quizQnDatas)) {
        return res.status(400).json({ message: "All feild are required" });
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
        return res.status(400).json({ message: "Couldn't Find any Quiz" });
    }

    quiz.quizName = quizName;
    quiz.quizDesc = quizDesc;
    quiz.quizGrade = quizGrade;
    quiz.quizDuration = quizDuration;
    quiz.quizQnDatas = quizQnDatas;

    const result = await quiz.save();
    res.json({ message: "Quiz Updated" });
})

module.exports = {
    getAllquizes,
    createNewQuiz,
    updateQuiz,
    deleteQuiz
}