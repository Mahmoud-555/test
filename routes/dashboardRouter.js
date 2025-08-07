
var express = require('express');
var router = express.Router();
const {}=require('../services/subjectService')








// dashboard
router.get('/',function(req,res,next) {
    res.render('dashboard')
    
  })
  


  router.get('/clints',function(req,res,next) {
    res.render('dashboard')
    
  }) 
  
  router.get('/questions',function(req,res,next) {
    res.render('dashboard')
    
  })

  router.get('/posts',function(req,res,next) {
    res.render('dashboard')
    
  })

  router.get('/clints',function(req,res,next) {
    res.render('dashboard')
    
  })
  
  
  router.get('/subjects',)



  module.exports = router;