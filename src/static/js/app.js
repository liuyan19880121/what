'use strict';
var app = angular.module('App', ['ngRoute', 'ngResource', 'ngCookies', 'ngTemplate', 'ngSanitize']);

app.run(['$cookieStore','user', 'global', 
    function($cookieStore, user, global){
        var accessToken = $cookieStore.get('accessToken');
        global.user = null;
        user.info(accessToken).then(function(res){
            console.log(res);
            if(res.code != 'ok') {
                global.user = null;
                return;
            }
            global.user = res.data;
        }, console.log)
    }
])