const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
var createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS
    }
});




// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
    //   1-check user email in db or not
    User.findOne({ email: req.body.email })
        .then((userData) => {
            if (userData) {

                return next(createError(400, "email is alredy exist"))
            } else {

                User.findOne({ username: req.body.username })
                    .then((userData2) => {
                        if (userData2) {

                            return next(createError(400, "username is alredy exist"))
                        } else {

                            bcrypt.hash(req.body.password, 12)
                                .then((hash) => {

                                    req.body.password = hash
                                    req.body.uniqueString = uuidv4()
                                    const newUser = new User(req.body)
                                    newUser.save()
                                        .then((userData3) => {

                                            const token = jwt.sign({ userId: userData3._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });
                                            link = `${process.env.DOMAIN_NAME}/verify-email/?id=${userData3._id}&token=${token}`

                                            var mailOptions = {
                                                from: process.env.MY_EMAIL,
                                                to: userData3.email,
                                                subject: ' Email verification',
                                                html: `
                       <div>
                       <h2 >verify email</h2>
                       <p> click on the link below to verify your email </p>
                       <a href=${link}>click here</a>
                       </div>
                      `

                                            }
                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    console.log(error);
                                                    return next(createError(500, 'There is an error in sending email'))
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                    res.status(201).json({ "message": `we have sent verification email to ${userData3.email}` });
                                                }
                                            });

                                            console.log('saved')
                                            console.log(link)

                                        })
                                        .catch((err) => {
                                            res.json(err)
                                        })


                                })
                                .catch((err => {
                                    res.json(err)
                                    console.log(err)
                                }))

                        }

                    }).catch((error) => {
                        res.json(err)
                        console.log(err)

                    })
            }

        })
        .catch((err) => {
            res.json(err)
            console.log(err)

        })
});

// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct


    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(createError(401, "Incorrect email or password"))

    }

    //  check if user verified
    if (!user.verified) {
        return next(createError(403, "this email is not verified check your email to verify it"))

    }
    console.log(req.body)

    // 3) generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });

    res.cookie("token", token, {
        maxAge: 86400000, httpOnly: true,

        // until deploying
        secure: false
    })

    res.status(200).json(
        {
            username: user.username,
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
            role: user.role,
            balance: user.balance,
            verified: user.verified,
        }

    )

});

// @desc   make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
    // 1) Check if token exist, if exist get
    let token;
    if (req.cookies.token) {
        token = req.cookies.token

    }

    if (!token) {
        return next(createError(401, 'You are not login, Please login to get access this route'))
    }

    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
        return next(
            createError(401, 'The user that belong to this token does no longer exist')

        );
    }

    // 4) Check if user change his password after token created
    if (currentUser.passwordChangedAt) {
        const passChangedTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000,
            10
        );
        // Password changed after token created (Error)
        if (passChangedTimestamp > decoded.iat) {
            return next(
                createError(401, 'User recently changed his password. please login again..')
            );
        }
    }

    req.user = currentUser;
    next();
});

// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.allowedTo = (...roles) =>
    asyncHandler(async (req, res, next) => {
        // 1) access roles
        // 2) access registered user (req.user.role)
        if (!roles.includes(req.user.role)) {
            return next(createError(403, 'You are not allowed to access this route'))
        }
        next();
    });

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(createError(404, `There is no user with this email ${req.body.email}`))
    }

    // 2) If user exist, Generate token 
    secret = process.env.JWT_SECRET_KEY + user.password
    token = jwt.sign({ userId: user._id }, secret, { expiresIn: "10m" });
    link = `${process.env.DOMAIN_NAME}/reset-password/?id=${userData3._id}&token=${token}`

    // 3) Send the reset link via email

    var mailOptions = {
        from: process.env.MY_EMAIL,
        to: user.email,
        subject: 'Reset password',
        html: `
      <div>
      <h2>Reset password</h2>
      <p> Hi ${user.name},\n We received a request to reset the password on your stethoscope Account. \n click link below to reset your password </p>
      <a href=${link}>click here</a>
      </div>
      `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

            return next(createError(500, 'There is an error in sending email'))
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ status: 'Success', message: 'Reset link sent to email' });

        }
    });
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    const id = req.query.id;
    const token = req.query.token;

    if (!token || !id) {
        return next(createError(401, `invalid or expired token`))
    }



    // 1) Get user based on id
    const user = await User.findOne({ _id: id });
    if (!user) {
        return next(createError(401, `invalid or expired token`))
    }

    // 2) Verify token (no change happens, expired token)
    secret = process.env.JWT_SECRET_KEY + user.password
    const decoded = jwt.verify(token, secret);

    user.password = req.body.newPassword;
    user.passwordChangedAt = Date.now()
    await user.save();

    // 3) if everything is ok, generate token
    // const token = createToken(user._id);
    res.status(200).json({
        status: "success",
        message: "Password changed successfully."
    });
});


// @desc    Verify email reset code
// @route   POST /api/v1/auth/verifyEmail
// @access  Public
exports.verifyEmail = asyncHandler(async (req, res, next) => {
    const id = req.body.id;
    const token = req.body.token;

    User.findOne({ _id: id })
        .then((userData) => {
            if (userData) {
                if (userData.verified) {
                    res.status(200).json({
                        status: 'Success',
                        message: "already verified"
                    });
                } else {
                    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                        if (err) {
                            return next(createError(401, `invalid or expired token`))
                        } else {
                            const userId = decoded.userId

                            User.findOneAndUpdate({ _id: userId }, { verified: true })
                                .then((userData) => {
                                    res.status(200).json({
                                        status: 'Success',
                                        message: "verified"
                                    });
                                })
                                .catch((err) => {
                                    res.json(err)
                                })

                        }

                    })

                }

            } else {
                return next(createError(401, `invalid or expired token`))
            }
        })

});