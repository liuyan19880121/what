'use strict';

app
.factory('api', ['$resource', 
  function($resource) {
      return {
          topic: $resource('/api/topic/:code')
      }
  }
])
.factory('topic', ['api',
    function (api) {
        var list = function () {
            return api.topic.get({code: 'list'}).$promise;
        },  add = function(data) {
            return api.topic.save({code: 'add'}, data).$promise;
        },  find = function(id) {
            return api.topic.get({code: 'find', id: id}).$promise;
        },  update = function(data) {
            return api.topic.save({code: 'update'}, data).$promise;
        }

        return {list: list, add: add, find: find, update: update};
    }
])