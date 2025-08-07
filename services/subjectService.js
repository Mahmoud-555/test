const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../common/uploadImageMiddleware');
const Subject = require('../models/subjectModel');

// Upload single image
exports.uploadSubjectImage = uploadSingleImage('image');

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
// exports.getSubjects = factory.getAll(Subject);
exports.getSubjects = factory.aggregateAll(Subject,"Subject",  [
    // Lookup subcategories
    {
      $lookup: {
        from: 'lectures',
        localField: '_id',
        foreignField: 'subject',
        as: 'lectures'
      }
    },
    // Lookup subsubcategories for each subcategory
    {
      $lookup: {
        from: 'questions',
        localField: 'lectures._id',
        foreignField: 'lecture',
        as: 'questions'
      }
    },
    // Add counts
    {
      $addFields: {
        lectureCount: { $size: '$lectures' },
        questionCount: { $size: '$questions' }
      }
    },
    // Optionally remove arrays if you only want counts
    {
      $project: {
        lectures: 0,
        questions: 0
      }
    }
  ]);


// exports.getSubjects = asyncHandler(async (req, res, next) => {
//   const subjects = await Subject.aggregate(
//     [
//     // Lookup subcategories
//     {
//       $lookup: {
//         from: 'lectures',
//         localField: '_id',
//         foreignField: 'subject',
//         as: 'lectures'
//       }
//     },
//     // Lookup subsubcategories for each subcategory
//     {
//       $lookup: {
//         from: 'questions',
//         localField: 'lectures._id',
//         foreignField: 'lecture',
//         as: 'questions'
//       }
//     },
//     // Add counts
//     {
//       $addFields: {
//         lectureCount: { $size: '$lectures' },
//         questionCount: { $size: '$questions' }
//       }
//     },
//     // Optionally remove arrays if you only want counts
//     {
//       $project: {
//         lectures: 0,
//         questions: 0
//       }
//     }
//   ])
//     .sort('-createdAt');
//   res
//     .status(200)
//     .json({ results: subjects.length, data: subjects });



// })


// @desc    Get specific subject by id
// @route   GET /api/v1/Subjects/:id
// @access  Public
exports.getSubject = factory.getOne(Subject);

// @desc    Create subject
// @route   POST  /api/v1/Subjects
// @access  Private/Admin-Manager
exports.createSubject = factory.createOne(Subject);

// @desc    Update specific subject
// @route   PUT /api/v1/Subjects/:id
// @access  Private/Admin-Manager
exports.updateSubject = factory.updateOne(Subject);

// @desc    Delete specific subject
// @route   DELETE /api/v1/Subjects/:id
// @access  Private/Admin
exports.deleteSubject = factory.deleteOne(Subject);
