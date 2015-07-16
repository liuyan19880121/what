var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connect(config.mongoConnectString, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.mongoConnectString, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./topic');

exports.User  = mongoose.model('User');
exports.Topic  = mongoose.model('Topic');

