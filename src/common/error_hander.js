var _  = require('lodash')

var codeDefine = {
    ok: '成功',
    topicNotExists: '该话题不存在',
    errLoginOrPassword: '用户名或密码错误',
    notTopicOwner: '没有权限编辑该话题',
    noLogin: '未登陆',
    existsNameOrEmail: '用户名或邮箱已经存在',
    missingAuthor: '该话题缺少作者信息'
};
var hander = {}

_.forEach(codeDefine, function(value, key) {
    hander[key] = function(ctx, data, accessToken) {
        data = data || {};
        if(!accessToken) {
            ctx.body = {code: key, msg: value, data: data};
        } else {
            ctx.body = {code: key, msg: value, accessToken: accessToken, data: data};
        }
    }
});

module.exports = exports = hander