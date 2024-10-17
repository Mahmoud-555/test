const express = require('express');
// var router = express.Router();

const {
  createLecture,
  getLecture,
  getLectures,
  updateLecture,
  deleteLecture,
  // setLectureIdToBody,
  createFilterObj,
} = require('../services/lectureService');
const {
  createLectureValidator,
  getLectureValidator,
  updateLectureValidator,
  deleteLectureValidator,
} = require('../validators/lectureValidator');

const authService = require('../services/authService');

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true });


router
  .route('/')
  .post(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    // setLectureIdToBody,
    createLectureValidator,
    createLecture
  )
  .get(createFilterObj, getLectures);
router
  .route('/:id')
  .get(getLectureValidator, getLecture)
  .put(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    updateLectureValidator,
    updateLecture
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteLectureValidator,
    deleteLecture
  );

module.exports = router;
