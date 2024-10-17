var express = require('express');
var router = express.Router();

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const questionRoute = require('./questionRoute');
const lectureRoute = require('./lectureRoute');
const moduleRoute = require('./moduleRoute');
const testRoute = require('./testRoute');


// router.use("/",(req,res,next)=>{console.log(req.boy)});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/questions', questionRoute);
router.use('/api/v1/lectures', lectureRoute);
router.use('/api/v1/modules', moduleRoute);
router.use('/api/v1/tests', testRoute);




























































/* GET home page. */
router.get('/',isSignIn,function(req, res, next) {

  res.render('index',{"isSignIn":true});

}); 

router.get('/login', function(req, res, next) {
  res.render('index');

});

router.get('/test', function(req, res, next) {
  res.render('test');

});

router.get('/test/start', function(req, res, next) {
  res.render('testStart');

});


router.get('/signUp', function(req, res, next) {
  res.render('index');

});  

router.get('/forgot-password', function(req, res, next) {
  res.render('index');

});  

















module.exports = router;
