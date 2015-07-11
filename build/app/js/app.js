'use strict';
var app = angular.module('App', ['ngRoute', 'ngTemplate']);
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
.controller('topicEditorCtrl', ['$scope', '$routeParams', 'topic',
  function($scope, $routeParams, topic) {
    $scope.topic={title: '', content: ''}
    $scope.marked = function(){
        if(!$scope.editSelect) return;
        $scope.editSelect=false;
        console.log('~~~~~~~~~~~~');
    }
}])
'use strict';
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