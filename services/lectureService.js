const factory = require('./handlersFactory');
const Lecture = require('../models/lectureModel');

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route (Create)
  
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};


// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getLectures = factory.getAll(Lecture,"Lecture",{ path: 'subject', select: 'subject' });



exports.aggregateLectures = factory.aggregateAll(Lecture,"lecture", 
   [
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

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getLecture = factory.getOne(Lecture);

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createLecture = factory.createOne(Lecture);

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateLecture = factory.updateOne(Lecture);

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteLecture = factory.deleteOne(Lecture);
