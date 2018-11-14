var express = require('express');
var router = express.Router();
var Course = require('../model/Course');
var Teacher = require('../model/Teacher');
var multer = require('multer');
const path = require('path');
var mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');

const mongoURI = 'mongodb://yethuaung:zikimi95@ds163013.mlab.com:63013/techhousedb';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
router.get('/image/:filename', (req, res) => {
  console.log('calllllll');
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});
/* GET home page. */
router.get('/cdetail/:id', function(req, res, next) {
  Course.findById(req.params.id).populate('teacher_id').exec((err,rtn)=>{
    if(err) throw err;
    console.log(rtn);
    res.render('course/course-detail', { title: 'Express',course:rtn });
  });

});
router.get('/clist', function(req, res, next) {
  Course.find({}).populate('teacher_id').exec((err,rtn)=>{
    if(err) throw err;
    res.render('course/course-list', { title: 'Express', course: rtn });
  })

});

module.exports = router;
