var proxy = require('../proxy_thunkify');
var User = proxy.User;
var hander = require('../common/error_hander');
var _ = require('lodash');
var tools = require('../common/tools');

exports.logon = function *(next) {
    console.log('logon');
    var username = this.request.body.username;
    var email    = this.request.body.email;
    var password = this.request.body.password;

    var user, passhash, result;
    user = yield User.findByNameOrEmail(username, email);

    if(user) return hander.existsNameOrEmail(this);

    passhash = yield tools.hash(password);

    result = yield User.add(username, email, passhash);

    user = result[0];

    //generate new token
    yield this.regenerateSession;

    //store user to redis, the key is accessToken(sessionid)
    this.session.user = user;

    hander.ok(this, user);
}

exports.login = function *(next) {
    console.log('login');
    //get login information
    var login = this.request.body.login;
    var password = this.request.body.password;

    //validation

    //get user
    var user = yield User.findByLogin(login);

    //check exists
    if(!user) return hander.errLoginOrPassword(this);

    //check password
    var isEqual = yield tools.compare(password, user.password);
    if(!isEqual) return hander.errLoginOrPassword(this);

    //generate new token
    yield this.regenerateSession;

    //store user to redis, the key is accessToken(sessionid)
    this.session.user = user;

    //respond to client
    hander.ok(this, _.pick(user,['_id', 'username', 'nickname', 'imageUrl', 'signature']), this.sessionId);
}

exports.logout = function *() {
    console.log('logout');
    //clear session
    this.session = null;

    hander.ok(this);
}

exports.info = function *(next) {
    console.log('info');
    var user = this.session.user || {};
    hander.ok(this, user);
}