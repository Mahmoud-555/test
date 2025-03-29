const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const mongoose = require("mongoose")

const { uploadMixOfImages } = require('../common/uploadImageMiddleware');
const factory = require('./handlersFactory');
const Question = require('../models/questionModel');
const Quiz = require('../models/quizModel');

exports.createTest = asyncHandler(async (req, res, next) => {
  try {

    let Result = []

    for (const lectureId of req.body.selectedLectures) {
      limit = 10
      console.log(lectureId)
      const questions = await Question.aggregate([
        { $match: { lecture: new mongoose.Types.ObjectId(lectureId) } },
        { $sample: { size: limit } }
      ], "_id");
      Result.push(...questions);
    }
    const newDoc = await Quiz.create({ type: "test", questions: Result, creator: req.user._id });
    res.status(201).json({ testId: newDoc._id });


  } catch (error) {
    console.log(error)
  }





});

exports.getTest = asyncHandler(async (req, res, next) => {
  try {
    let test = await Quiz.findOne({ _id: req.params.id, creator: req.user._id }).populate("questions", ["question", "answers"])
    res.status(200).json({ questions: test.questions });

  } catch (error) {
    console.log(error)
  }


});


exports.checkAnsers = asyncHandler(async (req, res, next) => {
  userAnswers = req.body.userAnswers

  try {
    let test = await Quiz.findOne({ _id: req.params.id, creator: req.user._id }).populate("questions", ["question", "answers", "correct"]);
    if (test) {
      let score = 0;
      let testAnswers = test.questions.map(question => {
        const userAnswer = userAnswers[question._id] || null; // تأكد من وجود قيمة للإجابة
        let isCorrect = false;
    
        if (question.correct.length > 0 && question.correct[0] === userAnswer) {
          score += 1;
          isCorrect = true;
        }
    
        return {
          ...question.toObject(), // تحويل الكائن إلى كائن بسيط
          userAnswer, // إضافة userAnswer
          isCorrect // يمكنك إضافة حقل آخر إذا أردت معرفة ما إذا كانت الإجابة صحيحة أم لا
        };
      });
    
      res.status(200).json({ score, testAnswers });
    } else {
      res.status(404).json({ message: "Test not found." });
    }

  } catch (error) {
    console.log(error)
  }
});
