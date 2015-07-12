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
.controller('topicCtrl', ['$scope', '$routeParams', 'topic',
  function($scope, $routeParams, topic) {
    var topicID = $routeParams.id;
    $scope.contentTPL = 'topic.html';
    $scope.topic = {}
    $scope.editSelect = true;////////
    if(topicID) {
      topic.find(topicID).then(function(res){
        $scope.topic = res.data;
        $scope.$emit('markdown', res.data.content);
      }, console.log);
    }
    $scope.preview = function() {
      if (!$scope.editSelect) return;
      $scope.editSelect = false;
      $scope.$emit('markdown', $scope.topic.content)
    }
  }
])
.controller('topicEditorCtrl', ['$scope', '$routeParams', 'topic',
  function($scope, $routeParams, topic) {
    var topicID = $routeParams.id;
    $scope.topic = {}
    if(topicID) {
      topic.find(topicID).then(function(res){
        $scope.topic = res.data;
      }, console.log);
    }
    $scope.preview = function() {
      if (!$scope.editSelect) return;
      $scope.editSelect = false;
      $scope.$emit('markdown', $scope.topic.content)
    }
    $scope.commit = function() {
      topic.add($scope.topic).then(function(res){
        console.log(res);
      }, console.log)
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
			scope.$parent.$on('markdown', function(e, content) {
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
            return api.topic.get({code: 'find'}, {id: id}).$promise;
        }

        return {list: list, add: add, find: find};
    }
])