var express = require('express');
var router = express.Router();
var Course = require('../model/Course');
var Teacher = require('../model/Teacher');

/* GET home page. */
router.get('/', function(req, res, next) {
  Course.find({}).populate('teacher_id').exec((err,rtn)=>{
    if(err) throw err;
    Teacher.find({},(err2,rtn2)=>{
      if(err2) throw err2;
      res.render('index', { title: 'Express',teacher:rtn2, course: rtn });
    });
  });

});
router.get('/tdetail', function(req, res, next) {
  res.render('teacher/t-detail', { title: 'Express' });
});

module.exports = router;
