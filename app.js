var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require('cors')
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const { adminAuth, userAuth, } = require("./common/authorization")

dotenv.config()



// routers
const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboardRouter');

// Ensure friendRoute is NOT imported here to avoid duplicate declaration error
// Remove any line like:
// const friendRoute = require('./routes/friendRoute');



// connect to mongodb
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('connected')
  console.log("http://localhost:3000")
}).catch((err) => {

  console.log(err)
});


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'ejs');






app.use(cors({ origin: "http://192.168.1.8:5500", }));


// compress all responses
app.use(compression());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.get('/uploads/posts/videos/:id', (req, res) => {
//   try {
//     const videoPath = path.join(__dirname, 'frontend/public/uploads/posts/videos', req.params.id);
//     console.log("work")
//     const stat = fs.statSync(videoPath);
//     const fileSize = stat.size;
//     const range = req.headers.range;
//     if (range) {
//       console.log(`Range request: ${range}`);
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//       const chunksize = (end - start) + 1;
//       // const file = fs.createReadStream(videoPath, { start, end });
//       const head = {
//         'Accept-Ranges': 'bytes',
//         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//         'Content-Length': chunksize,
//         'Content-Type': 'video/mp4',
//       };
//       // res.setHeader('Cache-Control', 'no-store');

//       res.writeHead(206, head);
//       fs.createReadStream(videoPath, { start, end }).pipe(res);
//       console.log(`Responded with 206 Partial Content: bytes ${start}-${end}/${fileSize}`);
//       //  console.log(res)

//     } else {
//       console.log('No range header, sending entire file');
//       const head = {
//         'Content-Length': fileSize,
//         'Content-Type': 'video/mp4',

//       };
//       res.writeHead(200, head);
//       fs.createReadStream(videoPath).pipe(res);
//       console.log('Responded with 200 OK, full content');
//     }
//   } catch (error) {
//     console.log(error)
//   }

// });
app.get('/uploads/posts/videos/:id', (req, res) => {
  try {
    const videoPath = path.resolve(__dirname, 'frontend/public/uploads/posts/optimizedvid/uploads/posts/videos', req.params.id);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      console.log(`Range request: ${range}`);
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const CHUNK_SIZE = 1024 * 1024; // 1MB

      const end = Math.min(start + CHUNK_SIZE - 1, fileSize - 1);

      if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, {
          'Content-Range': `bytes */${fileSize}`
        });
        return res.end();
      }

      const chunksize = (end - start) + 1;
      const head = {
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      // res.setHeader('Cache-Control', 'no-store');
      // res.setHeader('Connection', 'close');
      res.writeHead(206, head);

      const fileStream = fs.createReadStream(videoPath, { start, end });

      res.flushHeaders(); // ensures headers are sent immediately

      fileStream.pipe(res);
 
      fileStream.on('open', (m) => {
        // res.end();
        console.log(m)
        console.log(`opened streaming chunk ${start}-${end} of ${req.params.id}`);
      });
      fileStream.on('end', () => {
        // res.end();
        console.log(`Finished streaming chunk ${start}-${end} of ${req.params.id}`);
      });

      fileStream.on('error', (err) => {
        // console.error('Stream error:', err);
        res.sendStatus(500);
      });
     
      // fileStream.on("data",(chunk)=>{
      //   console.log("data",data)
      // })


      // fileStream.pipe(res);
      // console.log(`Start: ${start}, End: ${end}, ChunkSize: ${chunksize}, FileSize: ${fileSize}`);

      // console.log(`Responded with 206 Partial Content: bytes ${start}-${end}/${fileSize}`);
    } else {
      console.log('No range header, sending entire file');
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);


      fs.createReadStream(videoPath).pipe(res);
      console.log('Responded with 200 OK, full content');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.use(express.static(path.join(__dirname, 'frontend/public')));

// app.get('/uploads/posts/videos/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, 'frontend/public/uploads/posts/videos', filename);

//   if (!fs.existsSync(filePath)) {
//     return res.sendStatus(404);
//   }

//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;

//   if (!range) {
//     // Must respond with 416 if Range header is required
//     return res.writeHead(416, {
//       'Content-Range': `bytes */${fileSize}`
//     }).end();
//   }

//   const parts = range.replace(/bytes=/, '').split('-');
//   const start = parseInt(parts[0], 10);
//   const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

//   const chunkSize = end - start + 1;
//   const file = fs.createReadStream(filePath, { start, end });

//   res.writeHead(206, {
//     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//     'Accept-Ranges': 'bytes',
//     'Content-Length': chunkSize,
//     'Content-Type': 'video/mp4',
//   });

//   file.pipe(res);
// });



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
app.use('/', (req, res, next) => {
  console.log(req.body)
  // console.log("momomomo",app.onlineUsers)
  // app.io.emit("mmm", "mmm")
  req.io = app.io
  req.onlineUsers = app.onlineUsers
  next()
}, indexRouter);

app.use('/add', (req, res, next) => {
  res.render("add")
});

// dashboard
// access : admin
app.use('/dashboard', adminAuth, dashboardRouter);




// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.json(err)
  // res.render('error');
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = createError(404)
  res.status(404);

  res.render('error', { message: err.message, status: err.status, stack: err.stack })
});








module.exports = app;
