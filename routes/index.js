var validator = require('validator');
const utils = require('utility');
var session = require('express-session');
var User = require('../models').User;
var News = require('../models').News;

var express = require('express');
var router = express.Router();
app = express();

var msg ='';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/index', { 
  	title: 'Express', 
    _layoutFile: 'layout.html'
  });
});

//新闻页面
router.get('/news', function(req, res, next) {
  res.render('client/news', { 
  	title: 'Express',
    _layoutFile: 'layout.html'
  });
});

//公司简介页面
router.get('/about', function(req, res, next) {
  res.render('client/about', { 
  	title: 'Express',
    _layoutFile: 'layout.html'
  });
});

module.exports = router;
