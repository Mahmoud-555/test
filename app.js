var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const dotenv =require("dotenv")
const bodyParser = require("body-parser")
const cors=require('cors')
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const {adminAuth,userAuth,}=require("./common/authorization")

dotenv.config()


// routers
const indexRouter = require('./routes/index');
const dashboardRouter =require('./routes/dashboardRouter');


// connect to mongodb
mongoose.connect(process.env.MONGO_URI).then( ()=>{
  console.log('connected')
  console.log("http://localhost:3000")
}).catch((err)=>{

console.log(err)
});


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'ejs');






app.use(cors({origin:"http://192.168.1.8:5500",}));
 

// compress all responses
app.use(compression());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}


// Limit each IP to 100 requests per `window` (here, per 15 minutes)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message:
//     'Too many accounts created from this IP, please try again after an hour',
// });

// Apply the rate limiting middleware to all requests

// app.use('/', limiter);








// routing
app.use('/',(req,res,next)=>{console.log(req.body)
  next()
}, indexRouter);
app.use('/add', (req,res,next)=>{
res.render("add")
});

// dashboard
// access : admin
app.use('/dashboard',adminAuth,dashboardRouter);











// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err)
  // res.render('error');
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err= createError(404)
  res.status(404);
 
   res.render('error',{message:err.message,status:err.status,stack:err.stack})
});








module.exports = app;
