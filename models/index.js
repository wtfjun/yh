var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect('mongodb://'+config.host+'/'+config.db);

//models
require('./user');
require('./news');

exports.User = mongoose.model('users');
exports.News = mongoose.model('news');
