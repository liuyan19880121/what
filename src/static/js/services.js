'use strict';

app
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
        createPostMethod(user, 'user', 'login logout logon active reset');
        return user;
    }
])