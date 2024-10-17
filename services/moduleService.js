const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../common/uploadImageMiddleware');
const Module = require('../models/moduleModel');

// Upload single image
exports.uploadModuleImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `subject-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getModules = factory.getAll(Module);

// @desc    Get specific subject by id
// @route   GET /api/v1/Modules/:id
// @access  Public
exports.getModule = factory.getOne(Module);

// @desc    Create subject
// @route   POST  /api/v1/Modules
// @access  Private/Admin-Manager
exports.createModule = factory.createOne(Module);

// @desc    Update specific subject
// @route   PUT /api/v1/Modules/:id
// @access  Private/Admin-Manager
exports.updateModule = factory.updateOne(Module);

// @desc    Delete specific subject
// @route   DELETE /api/v1/Modules/:id
// @access  Private/Admin
exports.deleteModule = factory.deleteOne(Module);
