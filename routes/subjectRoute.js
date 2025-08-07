const express = require('express');

// const {
//   getSubjectValidator,
//   createSubjectValidator,
//   updateSubjectValidator,
//   deleteSubjectValidator,
// } = require('../validators/subjectValidator');

const {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  uploadSubjectImage,
  resizeImage,
} = require('../services/subjectService');


const authService = require('../services/authService');

// const subcategoriesRoute = require('./subSubjectRoute');

const router = express.Router();

// Nested route
// router.use('/:category/subcategories', subcategoriesRoute);

router
  .route('/')
  .get(getSubjects)
  .post(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    uploadSubjectImage,
    resizeImage,
    // createSubjectValidator,
    createSubject
  );
router
  .route('/:id')
  .get(
    // getSubjectValidator,
     getSubject)
  .put(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    uploadSubjectImage,
    resizeImage,
    // updateSubjectValidator,
    updateSubject
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    // deleteSubjectValidator,
    deleteSubject
  );

module.exports = router;
