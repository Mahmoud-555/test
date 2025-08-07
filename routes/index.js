
var express = require('express');
var router = express.Router();

const friendRoute = require('./friendRoute');
const postRoute = require('./postRoute');

const Quiz = require('../models/quizModel');
const User = require('../models/userModel');

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const questionRoute = require('./questionRoute');
const lectureRoute = require('./lectureRoute');
const subjectRoute = require('./subjectRoute');
const moduleRoute = require('./moduleRoute');
const testRoute = require('./testRoute');
const challangeRoute = require('./challangeRoute');
// const friendRoute = require('./friendRoute');
const authService = require('../services/authService');



// router.use("/",(req,res,next)=>{console.log(req.body)});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/questions', questionRoute);
router.use('/api/v1/lectures', lectureRoute);
router.use('/api/v1/subjects', subjectRoute);
router.use('/api/v1/modules', moduleRoute);
router.use('/api/v1/tests', testRoute);
router.use('/api/v1/Challanges', challangeRoute);
router.use('/api/v1/friends',friendRoute);
router.use('/api/v1/posts', postRoute);




















router.use(isSignIn);

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { "isSignIn": req.isSignIn });

});
router.get('/posts', function (req, res, next) {
  res.render('posts');

});
router.get('/posts/:id', function (req, res, next) {
  res.render('posts');

});
router.get('/friends', function (req, res, next) {

  res.render('friends');

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

router.get('/profile', function (req, res, next) {
  if (req.isSignIn) {
    res.redirect(`/profile/${req.user._id}`)
  } else {
    res.redirect("/")

  }


});
router.get('/profile/:id', async function (req, res, next) {
  console.log(req.isSignIn)
  if (req.isSignIn) {

    if (req.params.id == req.user._id) {
      res.render('profile', { "myProfile": true, "user": req.user });
    } else {
      try {
        const friend = await User.findById(req.params.id);
        if (friend) {
          console.log(req.user)

          if (req.user.friends.includes(req.params.id)) {

            res.render('profile', { "myProfile": false, "user": friend, "friendStatus": "friended" });

          } else if (req.user.sentFriendRequests.some(fr => fr.user.toString() === req.params.id)) {
            res.render('profile', { "myProfile": false, "user": friend, "friendStatus": "requested" });

          } else {
            res.render('profile', { "myProfile": false, "user": friend, "friendStatus": "add" });

          }

        } else {
          res.redirect("/")

        }



      } catch (error) {
        console.log(error)
        res.redirect("/")

      }



    }
  } else {
    res.redirect("/")

  }




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
  if (req.isSignIn) {
    try {
      competition = await Quiz.findOne({ _id: req.params.id, type: "challenge" });
      if (competition) {
        if (competition.status == "active") {
          res.render('challengeStart', { "challengeId": req.params.id, "userId": req.user._id });
        } else {
          // send the result
          res.render('leaderBoard', { "challengeId": req.params.id, "userId": req.user._id });
        }




      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      next()
    }

  } else {
    // res.render('index', { "isSignIn": req.isSignIn });
    res.redirect("/")
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
