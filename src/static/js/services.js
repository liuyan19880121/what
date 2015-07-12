'use strict';

app
.factory('topic', ['$http',
    function ($http) {
        var getList = function(cb) {
            return cb(null, [
                {_id: '342424', title: 'How to use a streaming JSON parser with Koa?'},
                {_id: '342425', title: 'Add a silent option'},
                {_id: '342425', title: 'adding support for specifying headers in ctx.onerror'},
                {_id: '342425', title: 'es7 async function feedback'},
            ])
        }
        return {getList: getList};
    }
])
.factory('markdown', function(){
    var serv = {}, action=function(){};
    serv.update = function(content) {
        action(content);
    }
    serv.register = function(cb) {
        action = cb
    }
    return serv;
})