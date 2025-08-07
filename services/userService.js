const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const sharp = require('sharp');
var createError = require('http-errors');
// const { formatDistanceToNow } = require('date-fns');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../common/uploadImageMiddleware');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');



// Upload single image
exports.uploadUserImage = uploadSingleImage('profileImage');
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    console.log("path",req.file.path)
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`./frontend/public/images/uploads/users/${filename}`);

    // Save image into our db
    req.body.profileImage = filename;
  }

  next();
});

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser = factory.getOne(User);

// @desc    Get  user notifications
// @route   GET /api/v1/users/notifications
// @access  Private/Admin
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id,active:true }, ["message", "avatar", "type", "href", "time","from","friendRequestStatus"]).sort({ createdAt: -1 })
    res.status(200).json(
      {
        notifications: notifications
      }
    )
  } catch (error) {
    console.error(error);
  }
}

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private/Admin
exports.createUser = factory.createOne(User);

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {

  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },

    {
      new: true,
    }
  );

  if (!document) {

    return next(createError(404, 'No document for this id ${req.params.id}'))
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(createError(404, `No document for this id ${req.params.id}`))

  }
  res.status(200).json({ data: document });
});

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = factory.deleteOne(User);

// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  // req.params.id = req.user._id;
  // next();
  res.status(200).json({
    data: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      name: req.user.name,
      profileImage: req.user.profileImage,
      role: req.user.role,
      balance: req.user.balance,
      verified: req.user.verified,
    }
  });
});

// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.user._id)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
  res.cookie("token", token, {
    maxAge: 86400000, httpOnly: true,

    // until deploying
    secure: false
  })
  res.status(200).json(
    {
      username: userData.username,
      email: userData.email,
      name: userData.name,
      profileImage: userData.profileImage,
      role: userData.role,
      balance: userData.balance,
      verified: userData.verified,
    }

  )
});

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      // email: req.body.email,
      // phone: req.body.phone,
      profileImg: req.body.profileImage,

    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
// exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user._id, { active: false });

//   res.status(204).json({ status: 'Success' });
// });
