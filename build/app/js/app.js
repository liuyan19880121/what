'use strict';
var app = angular.module('App', ['ngRoute', 'ngResource', 'ngTemplate', 'ngSanitize']);
'use strict';
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { templateUrl: 'index.html', controller: 'indexCtrl' })
      .when('/topic/new', { templateUrl: 'topic-editor.html', controller: 'topicEditorCtrl' })
      .when('/topic/edit/:id', { templateUrl: 'topic-editor.html', controller: 'topicEditorCtrl' })
      .when('/topic/:id', { templateUrl: 'index.html', controller: 'topicCtrl' })
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
.controller('loginCtrl', ['$scope', '$routeParams', 'user',
  function($scope, $routeParams, user) {
    $scope.user = {};
    $scope.commit = function() {
      user.login($scope.user).then(function(res){
        console.log(res);
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