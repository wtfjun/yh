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
    title: '阳航科技官网', 
    _layoutFile: 'client/layout'
  });
});

/* 全员分销 */
router.get('/fenxiao', function(req, res, next) {
  res.render('client/fenxiao', { 
    title: '全员分销-阳航科技', 
    _layoutFile: 'client/layout.html'
  });
});

/* 联盟平台 */
router.get('/lianmeng', function(req, res, next) {
  res.render('client/lianmeng', { 
    title: '联盟平台-阳航科技', 
    _layoutFile: 'client/layout.html'
  });
});

/* 平台硬件 */
router.get('/yingjian', function(req, res, next) {
  res.render('client/yingjian', { 
    title: '平台硬件-阳航科技', 
    _layoutFile: 'client/layout.html'
  });
});

/* 运营服务 */
router.get('/fuwu', function(req, res, next) {
  res.render('client/fuwu', { 
    title: '运营服务-阳航科技', 
    _layoutFile: 'client/layout.html'
  });
});


//新闻页面
router.get('/news', function(req, res, next) {
  var page = (req.query.p)?req.query.p:1;
  var perPage = (req.query.pr)?req.query.pr:10;
  var count;
  var type = req.query.type;
  News.find({'type': type}).sort({'_id':-1}).exec(function(err, docs) {
    count = docs.length;
      if(page <= 0 || page >= (Math.ceil(count/10)+1)) {
      res.redirect('/news?type='+type+'&p=1');
      return;
    }
    var news = News.find({'type': type}).sort({'_id':-1}).skip((page-1)*perPage).limit(perPage).exec(function(err,news){
      if(err) {
        return handleError(err);
      }
      console.log(news);
      res.render('client/news', {
        _layoutFile: 'client/layout',
        news: news,
        type: type,
        title: '公司新闻',
        count: count,
        current_page: page,
        lately_news: docs

      });
    });
  }); 
});

//公司简介页面
router.get('/about', function(req, res, next) {
  res.render('client/about', { 
    title: 'Express',
    _layoutFile: 'client/layout.html'
  });
});


//新闻详情页面
router.get('/newsPage', function(req, res ,next) {
  var id = req.query.id;
  var type = req.query.type;
  News.find({'type': type}).sort({'_id':-1}).exec(function(err, docs) {  
    News.findById(id, function(err, news) {
      if(err) {
        return handleError(err);
      }
      console.log(docs);
      res.render('client/newsPage', {
        title: 'Express',
        _layoutFile: 'client/layout.html',
        news: news,
        lately_news: docs
      });
    });
  });
});

module.exports = router;
