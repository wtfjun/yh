var validator = require('validator');
const utils = require('utility');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var session = require('express-session');
var User = require('../models').User;
var News = require('../models').News;

var express = require('express');
var router = express.Router();
app = express();

var msg ='';

//后台登陆界面
router.get('/login', function(req, res, next) {
  res.render('admin/login', {
    _layoutFile: false,
    error: ''
  })
});
//后台登陆操作
router.post('/login', function(req, res, next) {
  var user_name = req.body.user_name;
  var password = req.body.password;
  password = utils.sha256(new Buffer(password));

  User.findOne({'user_name': user_name, 'password': password}, function(err, person) {
    if(err) {
      return handleError(err);
    }
    if(person) {
      req.session.user_name = user_name;
      //console.log(req.session.user_name);
      return res.redirect('/admin/');
    }
  });
});
//注销登陆
router.get('/loginOut', function(req, res) {
  req.session.destroy();
  res.redirect('/admin/login');
});
//验证登陆
function hadLogin(req, res) {
  if (!req.session.user_name) {
    res.render('admin/login', {
      _layoutFile: false,
      error: ''
    })
    return false;
  }
  return true;
}

/** 注册 **/

//后台注册界面,上线后改功能不可用
router.get('/signup', function(req, res, next) {
  res.render('admin/signup', {
    _layoutFile: false,
    error :''
  })
});

//后台注册操作
router.post('/signup', function(req, res, next) {
  var user_name = validator.escape(validator.trim(req.body.user_name)).toLowerCase();
  var password = validator.escape(validator.trim(req.body.password));  
  password = utils.sha256(new Buffer(password));

  User.findOne({'user_name': user_name}, function(err, person) {
    if(err) {
      return handleError(err);
    }
    if(person) {
      console.log(person);
      res.render('admin/signup', {
        _layoutFile: false,
        error: '用户已存在。'
      });
    }
    else {
      //创建用户
      var user = new User({
        user_name: user_name,
        password: password
      });
      user.save(function(err) {
        if(err) {
          return handleError(err);
        }
        res.redirect('/admin/login');
      });
    }
  });
});

/** 注册end **/

//后台主界面
router.get('/', function(req, res) {
	if(!hadLogin(req, res)) {
    return;
  }
  else {
    res.render('admin/index', { 
    	title: 'Express',
     	_layoutFile: 'admin/layout.html',
      user_name: req.session.user_name
    });
  }
});

//添加新闻
router.get('/addNews', function(req, res) {
  if(!hadLogin(req, res)) {
    return;
  }
  else {
    res.render('admin/add_news', { 
      title: 'Express',
      _layoutFile: 'admin/layout.html',
      user_name: req.session.user_name,
      type: req.query.type
    });
  }
});
//添加新闻


router.post('/addNews', function(req, res) {
  if(!hadLogin(req, res)) {
    return;
  }
  else {
    var type = req.body.type;
    var title = req.body.title;
    var desc = req.body.desc;
    var user_name = req.session.user_name;   
    var news = new News({
        title: title,
        desc: desc,
        user_name: user_name,
        type: type
      });
    news.save(function(err) {
      if(err) {
        return handleError(err);
      }
      //console.log(user_name);
      msg = '成功添加一条新闻！';
      res.redirect('/admin/news?type='+type);
    });        
  }   
});
      
  

//后台公司新闻界面
router.get('/news', function(req, res) {
  if(!hadLogin(req, res)) {
    return;
  }
  var page = (req.query.p)?req.query.p:1;
  var perPage = (req.query.pr)?req.query.pr:10;
  var count;
  var type = req.query.type;

  News.find({'type': type}, function(err, docs) {
    count = docs.length;
  });
  var news = News.find({'type': type}).sort({'_id':-1}).skip((page-1)*perPage).limit(perPage).exec(function(err,news){
    if(err) {
      return handleError(err);
    }
    
    res.render('admin/news', {
        _layoutFile: 'admin/layout',
        news: news,
        type: type,
        title: '公司新闻',
        user_name: req.session.user_name,
        count: count,
        current_page: page,
        msg: msg
      });
    msg = '';
    });
});
//删除新闻
router.get('/delNews', function(req, res) {
  if(!hadLogin(req, res)) {
    return;
  }
  var type = req.query.type;
  News.findById(req.query.id, function(err, news) {
    if(err) {
      return handleError(err);
    }
    news.remove();
    msg = '成功删除一条新闻！';
    res.redirect('/admin/news?type='+type);
  })
});
//编辑新闻
router.get('/reNews', function(req, res) {
  if(!hadLogin(req, res)) {
    return;
  }
  News.findById(req.query.id, function(err, news) {
    if(err) {
      return handleError(err);
    }
    res.render('admin/re_news', {
      _layoutFile: 'admin/layout',
      user_name: req.session.user_name,
      news: news
    });
  });
});
//编辑新闻提交
router.post('/reNews', function(req, res) {
  if(!hadLogin(req, res)) {
    return;
  }

  News.findById(req.body.id, function(err, news) {
    if(err) {
      return handleError(err);
    }
    else {
      news.type = req.body.type;
      news.title = req.body.title;
      news.desc = req.body.desc;
      news.user_name = req.session.user_name;   
      
      news.save(function(err) {
        if(err) {
          return handleError(err);
        }
        //console.log(user_name);
        msg = '成功编辑一条新闻！';
        res.redirect('/admin/news?type='+req.body.type);
      });
           
    }   
  });     
});



//账号设置

module.exports = router;
