var models = require('../models');
var User  = models.User;
//var bcrypt = require('bcrypt');

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

// User.findOne({'$or':[{username: 'admin'},{email: 'admin'}]}, function(err, user) {
//     var new_password = bcrypt.hashSync(user.password, 10);
//     user.password = new_password;
//     user.save(function(){})
// });