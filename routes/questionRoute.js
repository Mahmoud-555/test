const express = require('express');
const {
  getQuestionValidator,
  createQuestionValidator,
  updateQuestionValidator,
  deleteQuestionValidator,
} = require('../validators/QuestionValidator');

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  uploadQuestionImages,
  resizeQuestionImages,
} = require('../services/questionService');
const authService = require('../services/authService');

const router = express.Router();

// POST   /Questions/jkshjhsdjh2332n/reviews
// GET    /Questions/jkshjhsdjh2332n/reviews
// GET    /Questions/jkshjhsdjh2332n/reviews/87487sfww3
// router.use('/:QuestionId/reviews', reviewsRoute);


// (req,res)=>{console.log(req.body)},






router
  .route('/')
  .get( authService.protect,
    authService.allowedTo('admin', 'manager'),
    getQuestions)
  .post(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    uploadQuestionImages,
    resizeQuestionImages,
    // createQuestionValidator,
    createQuestion
  );
router
  .route('/:id')
  .get(getQuestionValidator, getQuestion)
  .put(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    uploadQuestionImages,
    resizeQuestionImages,
    updateQuestionValidator,
    updateQuestion
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteQuestionValidator,
    deleteQuestion
  );

module.exports = router;
