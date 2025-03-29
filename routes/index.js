var express = require('express');
var router = express.Router();
const Quiz = require('../models/quizModel');

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const questionRoute = require('./questionRoute');
const lectureRoute = require('./lectureRoute');
const moduleRoute = require('./moduleRoute');
const testRoute = require('./testRoute');
const challangeRoute = require('./challangeRoute');


// router.use("/",(req,res,next)=>{console.log(req.boy)});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/questions', questionRoute);
router.use('/api/v1/lectures', lectureRoute);
router.use('/api/v1/modules', moduleRoute);
router.use('/api/v1/tests', testRoute);
router.use('/api/v1/Challanges', challangeRoute);






















/* GET home page. */
router.get('/', isSignIn, function (req, res, next) {

  res.render('index', { "isSignIn": true });

});

router.get('/signUp', function (req, res, next) {
  res.render('index');

});
router.get('/login', function (req, res, next) {
  res.render('index');

});

router.get('/verify-email', function (req, res, next) {
  res.render('verify-email');

});



router.get('/test', function (req, res, next) {
  res.render('test');

});
router.get('/challenge', function (req, res, next) {
  res.render('challenge');

});
router.get('/challenge/invite', function (req, res, next) {
  res.render('invite');

});

router.get('/challenge/:id', async function (req, res, next) {

  competition = await Quiz.findOne({ _id: req.params.id, type: "challenge" });
  if (competition) {

    if (competition.status == "active") {

      res.render('challengeStart', { "challengeId": req.params.id });
      // res.render('Start', { "challengeId": req.params.id });

    } else {
      // send the result
      res.render('leaderBoard', { "challengeId": req.params.id });

      

    }




  } else {
    next()
  }




});

router.get('/challenge/:id/start', function (req, res, next) {
  res.render('Start', { "challengeId": req.params.id });

});






router.get('/reward', function (req, res, next) {
  res.render('reward');

});
router.get('/test/start', function (req, res, next) {
  res.render('testStart');

});



router.get('/forgot-password', function (req, res, next) {
  res.render('index');

});

















module.exports = router;
