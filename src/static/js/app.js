'use strict';
var app = angular.module('App', ['ngRoute', 'ngResource', 'ngCookies', 'ngTemplate', 'ngSanitize', 'angular-growl']);

app.constant('app', {});

app.run(['app', '$rootScope', '$location', '$cookieStore', '$q', '$timeout', 'user', 'notification',
    function(app, $rootScope, $location, $cookieStore, $q, $timeout, user, notification){
        var global = $rootScope.global = {};
        //init app
        app.notification = notification;
        app.global = global;
        app.q = $q;
        app.timeout = $timeout;

        var accessToken = $cookieStore.get('accessToken');
        global.user = null;
        user.info(accessToken).then(function(res){
            console.log(res);
            if(!res.data._id) {
                global.user = {};
            } else {
                global.user = res.data;
            }
        });

        global.logout = function() {
            user.logout().then(function(res){
                if(res.code != 'ok');
                global.user = {};
                $location.path('/');
            })
        }
    }
])

app.config(['app', '$httpProvider', 
    function(app, $httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                response: function(res){
                    console.log('res', res);
                    var data = res.data;
                    if(angular.isObject(data) && data.code != 'ok') {
                        app.notification.error(data.msg);
                    }
                    return res;
                },
                responseError: function(rejection) {
                    console.log('rejection', rejection);
                    var msg = '未知错误！';
                    if(rejection.status == 0){
                        msg = '无法连接远程服务器';
                    } else if(angular.isString(rejection.data)){
                        msg = rejection.data;
                    }
                    app.notification.error(msg);
                    return app.q.reject(rejection.data||rejection);
                }
            }
        });
    }
]);