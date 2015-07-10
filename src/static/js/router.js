'use strict';
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { templateUrl: 'index.html', controller: 'MainCtrl' })
      .when('/index', { templateUrl: 'index.html', controller: 'MainCtrl' })
      .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode({enabled: true, requireBase: false});
}]);