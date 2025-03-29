const { check, body } = require('express-validator');
const validatorMiddleware = require('../validators/validationMiddleware');

exports.getLectureValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.createLectureValidator = [
  check('lecture')
    .notEmpty()
    .withMessage('Lecture required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
  validatorMiddleware,
];


exports.updateLectureValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  body('name')
    .optional(),
  validatorMiddleware,
];

exports.deleteLectureValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];
