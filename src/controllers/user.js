var proxy = require('../proxy_thunkify');
var User = proxy.User;
var hander = require('../common/error_hander');
var _ = require('lodash');
var tools = require('../common/tools');

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
    hander.ok(this, _.pick(user,['username', 'nickname', 'imageUrl', 'signature']), this.sessionId);
}