var _  = require('lodash')
var codeDefine = {
    ok: '成功',
    topicNotExists: '该主题不存在',
    errLoginOrPassword: '用户名或密码错误',
    notTopicOwner: '没有权限编辑该主题',
    noLogin: '未登陆'
};
var hander = {}

_.forEach(codeDefine, function(value, key) {
    hander[key] = function(ctx, data, accessToken) {
        if(!accessToken) {
            ctx.body = {code: key, msg: value, data: data||{}};
        } else {
            ctx.body = {code: key, msg: value, accessToken: accessToken, data: data||{}};
        }
    }
});

module.exports = exports = hander