var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connect(config.mongoConnectString, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.mongoConnectString, err.message);
    process.exit(1);
  }
});

// models
require('./topic');

exports.Topic  = mongoose.model('Topic');

