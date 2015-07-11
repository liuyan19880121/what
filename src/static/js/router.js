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