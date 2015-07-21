'use strict';
var app = angular.module('App', ['ngRoute', 'ngResource', 'ngCookies', 'ngTemplate', 'ngSanitize', 'angular-growl']);

app.constant('app', {});

app.run(['app', '$rootScope', '$location', '$cookieStore', '$q', 'user', 'notification',
    function(app, $rootScope, $location, $cookieStore, $q, user, notification){
        var global = $rootScope.global = {};
        //init app
        app.notification = notification;
        app.global = global;
        app.q = $q;

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
                if(res.code != 'ok') console.log(res);
                global.user = {};
                $location.path('/');
            })
        }
    }
])

app.config(['app', '$httpProvider', 
    function(app, $httpProvider) {
        $httpProvider.defaults.transformResponse.push(function (data) {
            if(angular.isObject(data) && data.code != 'ok') {
                app.notification.error(data.msg);
            }
            return data;
        });
        $httpProvider.interceptors.push(function () {
            return {
                responseError: function(rejection) {
                    console.log('rejection', rejection);
                    app.notification.error('未知错误！');
                    return app.q.reject(rejection.data||rejection);
                }
            }
        });
    }
]);