const express = require('express');
var router = express.Router();

const {
  createModule,
  getModule,
  getModules,
  updateModule,
  deleteModule,
  setModuleIdToBody,
  createFilterObj,
} = require('../services/moduleService');
// const {
//   createModuleValidator,
//   getModuleValidator,
//   updateModuleValidator,
//   deleteModuleValidator,
// } = require('../validators/moduleValidator');

const authService = require('../services/authService');

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
// const router = express.Router({ mergeParams: true });


router
  .route('/')
  .post(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    // setModuleIdToBody,
    // createModuleValidator,
    createModule
  )
  .get(
    
    // createFilterObj ,
     getModules);
router
  .route('/:id')
  .get(
    // getModuleValidator, 
    getModule)
  .put(
    authService.protect,
    authService.allowedTo('admin', 'manager'),
    // updateModuleValidator,
    updateModule
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    // deleteModuleValidator,
    deleteModule
  );

module.exports = router;
