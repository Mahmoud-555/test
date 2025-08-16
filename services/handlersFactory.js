const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../common/apiFeatures');
var createError = require('http-errors');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    // console.log(document);

    if (!document) {
      return next(createError(404, `No document for this id ${req.params.id}`))

    }

    // Trigger "remove" event when update document
    // document.remove();
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(createError(404, `No document for this id ${req.params.id}`))


    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // 1) Build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    // 2) Execute query
    const document = await query;

    if (!document) {
      return next(createError(404, `No document for this id ${req.params.id}`))

    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = '', populateOptions = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      // .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    let { mongooseQuery, paginationResult } = apiFeatures;
    if (populateOptions) {
      mongooseQuery = mongooseQuery.populate(populateOptions);
    }


    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

exports.aggregateAll = (Model, modelName = '', populateStages = []) =>
  asyncHandler(async (req, res) => {



    const { page = 1, limit = 10, sort, fields, keyword, module, subject,type, ...filters } = req.query;
    const skip = (page - 1) * limit;
    const pipeline = [];
    console.log(req.query);


    // ✅ Filtering
    if (Object.keys(filters).length > 0) {
      const matchStage = {};
      for (const key in filters) {
        matchStage[key] = filters[key];
      }
      pipeline.push({ $match: matchStage });
    }

    // ✅ Search (regex on a model-specific field)
    if (keyword && modelName) {
      pipeline.push({
        $match: {
          [modelName]: { $regex: keyword, $options: 'i' }
        }
      });
    }

    // ✅ Add population stages (e.g., $lookup)
    if (populateStages.length > 0) {
      pipeline.push(...populateStages);
    }


    if (module) {
      pipeline.push(...
        [
         {
            '$lookup': {
              'as': 'modules',
              'from': 'modules',
              'foreignField': '_id',
              'localField': 'module'
            }
          }, {
            '$match': {
              'modules.module': module
            }
          }
        ]);

    }
    if (subject) {
      pipeline.push(...
        [
          {
            '$lookup': {
              'as': 'subjects',
              'from': 'subjects',
              'foreignField': '_id',
              'localField': 'subject'
            }
          }, {
            '$match': {
              'subjects.subject': subject
            }
          }
        ]);

    }
    if (type) {
      pipeline.push(...
        [
          {
            '$match': {
              'type': type
            }
          }
        ]);

    }

    // ✅ Sorting
    if (sort) {
      const sortStage = {};
      sort.split(',').forEach(field => {
        const direction = field.startsWith('-') ? -1 : 1;
        sortStage[field.replace('-', '')] = direction;
      });
      pipeline.push({ $sort: sortStage });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } }); // default sort
    }

    // ✅ Field limiting
    if (fields) {
      const projectStage = {};
      fields.split(',').forEach(field => {
        projectStage[field] = 1;
      });
      pipeline.push({ $project: projectStage });
    }

    // ✅ Pagination
    // const totalDocs = await Model.countDocuments(); // optionally filter this count
    // pipeline.push({ $skip: skip });
    // pipeline.push({ $limit: parseInt(limit) });

    // ✅ Execute
    const documents = await Model.aggregate(pipeline);
    console.log(documents);

    res.status(200).json({
      results: documents.length,
      // paginationResult: {
      //   currentPage: +page,
      //   limit: +limit,
      //   totalPages: Math.ceil(totalDocs / limit),
      //   totalDocs
      // },
      data: documents
    });
  });
