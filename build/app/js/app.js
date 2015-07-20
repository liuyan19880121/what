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
'use strict';
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { templateUrl: 'index.html', controller: 'indexCtrl' })
      .when('/topic/new', { templateUrl: 'topic-editor.html', controller: 'topicEditorCtrl' })
      .when('/topic/edit/:id', { templateUrl: 'topic-editor.html', controller: 'topicEditorCtrl' })
      .when('/topic/:id', { templateUrl: 'index.html', controller: 'topicCtrl' })
      .when('/logon', { templateUrl: 'logon.html', controller: 'logonCtrl' })
      .when('/login', { templateUrl: 'login.html', controller: 'loginCtrl' })
      .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode({enabled: true, requireBase: false});
}]);
'use strict';
app
.controller('indexCtrl', ['$scope', '$routeParams', 'topic',
  function($scope, $routeParams, topic) {
    $scope.contentTPL = 'topic-list.html';
    topic.list().then(function(res){
      $scope.topicList = res.data;
    }, function(err){
      console.log(err);
    })
  }
])
.controller('logonCtrl', ['$scope', '$routeParams', '$cookieStore', '$location', 'user', 'global',
  function($scope, $routeParams, $cookieStore, $location, user, global) {
    $scope.user = {};
    $scope.commit = function() {
      user.logon($scope.user).then(function(res){
        console.log(res);
        if(res.code !== 'ok') return;
        $cookieStore.put('accessToken', res.accessToken);
      }, console.log)
    }
  }
])
.controller('loginCtrl', ['$scope', '$routeParams', '$cookieStore', '$location', 'user', 'global',
  function($scope, $routeParams, $cookieStore, $location, user, global) {
    $scope.user = {};
    $scope.commit = function() {
      user.login($scope.user).then(function(res){
        console.log(res);
        if(res.code !== 'ok') return;
        $cookieStore.put('accessToken', res.accessToken);
        global.user = res.data;
        $location.path('/');
      }, console.log)
    }
  }
])
.controller('topicCtrl', ['$scope', '$routeParams', 'topic',
  function($scope, $routeParams, topic) {
    var topicID = $routeParams.id;
    $scope.contentTPL = 'topic.html';
    $scope.topic = {}
    if(topicID) {
      topic.find(topicID).then(function(res){
        console.log(res);
        $scope.topic = res.data;
        $scope.$broadcast('markdown', res.data.content);
      }, console.log);
    }
  }
])
.controller('topicEditorCtrl', ['$scope', '$routeParams', '$location','topic',
  function($scope, $routeParams, $location, topic) {
    var topicID = $routeParams.id;
    var isEdit = false;
    $scope.topic = {}
    if(topicID) {
      topic.find(topicID).then(function(res){
        $scope.topic = res.data;
      }, console.log);
      isEdit = true;
    }
    $scope.preview = function(editSelect) {
      if(!editSelect) return;
      $scope.$broadcast('markdown', $scope.topic.content)
    }
    $scope.commit = function() {
      if(!isEdit) {
        topic.add($scope.topic).then(function(res){
          console.log(res);
          $location.path('/topic/' + res.data._id);
        }, console.log);
      } else {
        topic.update($scope.topic).then(function(res){
          console.log(res);
          $location.path('/topic/' + topicID);
        }, console.log);
      }
    }
  }
])
'use strict';
app.directive('markdown', function() {
	var renderer = new marked.Renderer();

	marked.setOptions({
		renderer: renderer,
		gfm: true,
		tables: true,
		breaks: true,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		highlight: function(code) {
			return hljs.highlightAuto(code).value;
		}
	});
	return {
		scope: true,
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div ng-bind-html="htmlContent" class="markdown-body"></div>',
		link: function(scope, element, attr) {
			var oldContent = "";
			scope.$on('markdown', function(e, content) {
				if(oldContent == content) return;
				scope.htmlContent = marked(content);
				oldContent = content;
			})
		}
	}
})
'use strict';
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
