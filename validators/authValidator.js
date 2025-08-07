
const { check } = require("express-validator")
const validtionMiddleware = require("./validationMiddleware")


exports.signupValidator = [
    // check('name')
    //     .notEmpty()
    //     .withMessage('name required')
    //     .isLength({ min: 3 })
    //     .withMessage('Too short name'),
    // check('username')
        // .notEmpty()
        // .withMessage('Username required')
        // .isLength({ min: 3 })
        // .withMessage('Too short User name'),

    check("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .withMessage("Invalid email address"),

    check("password")
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),
    validtionMiddleware
]


exports.loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address'),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    validtionMiddleware
]

