var proxy = require('../proxy_thunkify');
var User = proxy.User;
var hander = require('../lib/error_hander')
var uuid = require('node-uuid');
var _ = require('lodash');

exports.login = function *(next) {
    console.log('login');
    var code = 0, data = {};
    var login = this.request.body.login;
    var password = this.request.body.password;
    var user = yield User.findByLogin(login);
    if(!user) return hander.errLoginOrPassword(this);
    if(password !== user.password) return hander.errLoginOrPassword(this);
    var accesToken = uuid.v4();
    hander.ok(this, _.pick(user,['username', 'nickname', 'imageUrl', 'signature']), accesToken);
}