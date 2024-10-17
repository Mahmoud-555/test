const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadMixOfImages } = require('../common/uploadImageMiddleware');
const factory = require('./handlersFactory');
const Question = require('../models/questionModel');

exports.uploadQuestionImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

exports.resizeQuestionImages = asyncHandler(async (req, res, next) => {
  //2- Image processing for images

  if (req.files && req.files.images && req.files.images.length > 0) {

    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `Question-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/question/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    return next();
  }
  next();

});

// @desc    Get list of Questions
// @route   GET /api/v1/Questions
// @access  Public
exports.getQuestions = factory.getAll(Question, 'Question');

// @desc    Get specific Question by id
// @route   GET /api/v1/Questions/:id
// @access  Public
exports.getQuestion = factory.getOne(Question);

// @desc    Create Question
// @route   POST  /api/v1/Questions
// @access  Private
exports.createQuestion = factory.createOne(Question);
// @desc    Update specific Question
// @route   PUT /api/v1/Questions/:id
// @access  Private
exports.updateQuestion = factory.updateOne(Question);

// @desc    Delete specific Question
// @route   DELETE /api/v1/Questions/:id
// @access  Private
exports.deleteQuestion = factory.deleteOne(Question);



function exam(req, res) {
  console.log(req.body)
  let filter = req.body.filter
  question.find(filter).then((questions) => {
    if (questions[0]) {
      function random_num(max_n, min_n) {
        return Math.floor(Math.random() * (max_n - min_n) + min_n)
      };

      let q_index = random_num(questions.length, 0);
      let rQuistion = questions[q_index];


      answer1_index = random_num(4, 0);

      do {
        answer2_index = random_num(4, 0)
      }
      while (answer2_index == answer1_index);

      do {
        answer3_index = random_num(4, 0)

      } while (answer3_index == answer1_index || answer3_index == answer2_index);

      do {
        answer4_index = random_num(4, 0)

      } while ((answer4_index == answer1_index) || answer4_index == answer2_index || answer4_index == answer3_index);
      console.log(answer1_index, answer2_index, answer3_index, answer4_index)


      let answers = []

      answers[answer1_index] = rQuistion.answer[0]
      answers[answer2_index] = rQuistion["wrong"][0]
      answers[answer3_index] = rQuistion["wrong"][1]
      answers[answer4_index] = rQuistion["wrong"][2]



      // respons

      if (rQuistion.images[0]) {
        res.json({ questionId: rQuistion._id, question: rQuistion.question, answers: answers, questionImages: rQuistion.images })

      } else {
        res.json({ questionId: rQuistion._id, question: rQuistion.question, answers: answers })
      }

    } else {
      res.json({ message: "there is no questions" })

    }

  })


}



