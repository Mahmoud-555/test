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
      ],"_id");
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
    let test =await Quiz.findOne({_id:req.params.id,creator:req.user._id}).populate("questions",["question","answers"])
    res.status(200).json({ questions: test.questions });

  } catch (error) {
    console.log(error)
  }


});

exports.checkAnsers = asyncHandler(async (req, res, next) => {
 userAnswers=req.body.userAnswers
 score=0
 
  try {
    let test =await Quiz.findOne({_id:req.params.id,creator:req.user._id}).populate("questions",["question","answers","correct"])
    if (test) {
     for (const question of test.questions) {
      if (question.correct.length>0) {
          if (question.correct[0]===(userAnswers[question._id]) ) {
            score+=1

          }
        
      }
     }
     res.status(200).json({score:score,testAnswers:test.questions})

    } else {
      
    }
    
  } catch (error) {
    console.log(error)
  }
});
