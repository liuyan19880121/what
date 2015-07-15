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
.factory('topic', ['api',
    function (api) {
        return {
            list: function () {
                return api.topic.get({code: 'list'}).$promise;
            },
            add: function(data) {
                return api.topic.save({code: 'add'}, data).$promise;
            },
            find: function(id) {
                return api.topic.get({code: 'find', _id: id}).$promise;
            },
            update: function(data) {
                return api.topic.save({code: 'update'}, data).$promise;
            }
        }
    }
])
.factory('user', ['api',
    function (api) {
        var user = {};
        var methods = 'login logout logon active reset'.split(' ');
        angular.forEach(methods, function(name){
            user[name] = function(data){
                return api.user.save({code: name}, data).$promise;
            }
        })
        return user;
    }
])