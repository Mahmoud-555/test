const { check, body } = require('express-validator');
const validatorMiddleware = require('../validators/validationMiddleware');

exports.getQuestionValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.createQuestionValidator = [
  check('name')
    .notEmpty()
    .withMessage('Question required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
  validatorMiddleware,
];


exports.updateQuestionValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  body('name')
    .optional(),
  validatorMiddleware,
];

exports.deleteQuestionValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];
