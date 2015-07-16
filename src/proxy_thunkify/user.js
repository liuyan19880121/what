var models = require('../models');
var User  = models.User;

exports.findByLogin = function(login) {
    return function(cb) {
        User.findOne({'$or':[{username: login},{email: login}]}, cb);
    }
}


// var User       = new User();
// User.username   = 'admin';
// User.password   = 'admin';
// User.nickname   = 'feiyu';
// User.email      = 'feiyu@sina.com';
// User.imageUrl   = '';
// User.signature  = 'what';
// User.save(function(){});