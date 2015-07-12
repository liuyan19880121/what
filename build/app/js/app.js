'use strict';
var app = angular.module('App', ['ngRoute', 'ngTemplate', 'ngSanitize']);
'use strict';
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { templateUrl: 'index.html', controller: 'indexCtrl' })
      .when('/topic/:id', { templateUrl: 'index.html', controller: 'indexCtrl' })
      .when('/add', { templateUrl: 'topic-editor.html', controller: 'topicEditorCtrl' })
      .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode({enabled: true, requireBase: false});
}]);
'use strict';
app
.controller('indexCtrl', ['$scope', '$routeParams', 'topic',
  function($scope, $routeParams, topic) {
    $scope.contentTPL = 'topic.html';
    topic.getList(function(err, data){
        $scope.topicList = data;
    })
}])
.controller('topicEditorCtrl', ['$scope', '$routeParams', 'topic', 'markdown',
  function($scope, $routeParams, topic, markdown) {
    
    $scope.topic={title: '', content: '<p>hi</p>'}
    $scope.preview = function(){
        if(!$scope.editSelect) return;
        $scope.editSelect=false;
        //$scope.htmlContent = marked($scope.topic.content);
        markdown.update($scope.topic.content);
    }
}])


'use strict';
app.directive('markedown', ['markdown', function(markdown) {
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
		scope: {
			mdContent: '='
		},
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div ng-bind-html="htmlContent" class="markdown-body"></div>',
		link: function(scope, element, attr) {
			// var content = scope.$eval(attr.mdContent);
			// console.log(content);
			markdown.register(function() {
				scope.htmlContent = marked(scope.mdContent);
			});
		}
	}
}])
'use strict';
'use strict';

app
.factory('topic', ['$http',
    function ($http) {
        var getList = function(cb) {
            return cb(null, [
                {_id: '342424', title: 'How to use a streaming JSON parser with Koa?'},
                {_id: '342425', title: 'Add a silent option'},
                {_id: '342425', title: 'adding support for specifying headers in ctx.onerror'},
                {_id: '342425', title: 'es7 async function feedback'},
            ])
        }
        return {getList: getList};
    }
])
.factory('markdown', function(){
    var serv = {}, action=function(){};
    serv.update = function(content) {
        action(content);
    }
    serv.register = function(cb) {
        action = cb
    }
    return serv;
})