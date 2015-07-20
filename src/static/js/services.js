'use strict';

app
.factory('global', ['$rootScope', '$location', 'user',
    function($rootScope, $location, user) {
        var global = $rootScope.global = {};
        global.logout = function() {
            user.logout().then(function(res){
                if(res.code != 'ok') console.log(res);
                global.user = null;
                $location.path('/');
            }, console.log)
        }
        return global;
    }
])
.factory('api', ['$resource', 
  function($resource) {
      return {
          topic: $resource('/api/topic/:code'),
          user:  $resource('/api/user/:code')
      }
  }
])
.factory('createPostMethod', ['api', '$cookieStore',
    function(api, $cookieStore) {
        return function(result, resource, methods) {
            angular.forEach(methods.split(' '), function(name){
                result[name] = function(data){
                    var accessToken = $cookieStore.get('accessToken');
                    data = data || {}
                    if(accessToken) data.accessToken = accessToken;
                    return api[resource].save({code: name}, data).$promise;
                }
            });
        }
    }
])
.factory('topic', ['api', '$cookieStore', 'createPostMethod', 
    function (api, $cookieStore, createPostMethod) {
        var topic = {};
        topic.list = function () {
            return api.topic.get({code: 'list'}).$promise;
        };
        topic.find = function(id) {
            return api.topic.get({code: 'find', _id: id}).$promise;
        };
    
        createPostMethod(topic, 'topic', 'add update');

        return topic;
    }
])
.factory('user', ['api', '$cookieStore', 'createPostMethod',
    function (api, $cookieStore, createPostMethod) {
        var user = {};
        user.info = function(accessToken) {
            return api.user.get({code: 'info', accessToken: accessToken}).$promise;
        };
        createPostMethod(user, 'user', 'login logout logon active reset');
        return user;
    }
])
