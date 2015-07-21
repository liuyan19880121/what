var models = require('../models');
var User  = models.User;
var bcrypt = require('bcrypt');

exports.findById = function(id) {
    return function(cb) {
        User.findOne({_id: id}, cb);
    }
}

exports.findByLogin = function(login) {
    return function(cb) {
        User.findOne({'$or':[{username: login},{email: login}]}, cb);
    }
}

exports.findByNameOrEmail = function(username, email) {
    return function(cb) {
        User.findOne({'$or':[{username: username},{email: email}]}, cb);
    }
}

exports.add = function(username, email, password) {
    return function( cb ) {
        var user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.save( cb );
    }
}


/*var User       = new User();
User.username   = 'admin';
User.password   = bcrypt.hashSync('admin', 10);
User.nickname   = 'feiyu';
User.email      = 'feiyu@sina.com';
User.imageUrl   = '';
User.signature  = 'what';
User.save(function(err){if(err) console.log(err)});*/

/*User.findOne({'$or':[{username: 'admin'},{email: 'admin'}]}, function(err, user) {
	if(err || !user) return console.log('not find user')
    var new_password = bcrypt.hashSync('admin', 10);
    console.log(new_password);
    user.password = new_password;
    user.save(function(){})
});*/