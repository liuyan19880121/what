'use strict';
var app = angular.module('App', ['ngRoute', 'ngResource', 'ngCookies', 'ngTemplate', 'ngSanitize', 'angular-growl', 'cgBusy']);

app.constant('app', {});

app.run(['app', '$rootScope', '$location', '$cookieStore', '$q', '$timeout', 'user', 'notification',
    function(app, $rootScope, $location, $cookieStore, $q, $timeout, user, notification){
        var global = $rootScope.global = {};
        //init app
        app.notification = notification;
        app.global = global;
        app.q = $q;
        app.timeout = $timeout;

        var accessToken = $cookieStore.get('accessToken');
        global.user = null;
        global.sidebarPromise = user.info(accessToken).then(function(res){
            console.log(res);
            if(!res.data._id) {
                global.user = {};
            } else {
                global.user = res.data;
            }
        });

        global.logout = function() {
            user.logout().then(function(res){
                if(res.code != 'ok');
                global.user = {};
                $location.path('/');
            })
        }
    }
])

app.config(['app', '$httpProvider', 
    function(app, $httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                response: function(res){
                    console.log('res', res);
                    var data = res.data;
                    if(angular.isObject(data) && data.code != 'ok') {
                        app.notification.error(data.msg);
                    }
                    return res;
                },
                responseError: function(rejection) {
                    console.log('rejection', rejection);
                    var msg = '未知错误！';
                    if(rejection.status == 0){
                        msg = '无法连接远程服务器';
                    } else if(angular.isString(rejection.data)){
                        msg = rejection.data;
                    }
                    app.notification.error(msg);
                    return app.q.reject(rejection.data||rejection);
                }
            }
        });
    }
]);
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
    $scope.sidebarTPL = 'sidebar-index.html';
    $scope.contentPromise = topic.list().then(function(res){
      $scope.topicList = res.data;
    })
  }
])
.controller('logonCtrl', ['app', '$scope', '$routeParams', '$cookieStore', '$location', 'user',
  function(app, $scope, $routeParams, $cookieStore, $location, user) {
    $scope.user = {};
    $scope.commit = function() {
      user.logon($scope.user).then(function(res){
        console.log(res);
        if(res.code !== 'ok') return;
        $cookieStore.put('accessToken', res.accessToken);
      })
    }
  }
])
.controller('loginCtrl', ['app', '$scope', '$routeParams', '$cookieStore', '$location', 'user',
  function(app, $scope, $routeParams, $cookieStore, $location, user) {
    var global = app.global;
    $scope.user = {};
    $scope.commit = function() {
      user.login($scope.user).then(function(res){
        console.log(res);
        if(res.code !== 'ok') return;
        $cookieStore.put('accessToken', res.accessToken);
        global.user = res.data;
        $location.path('/');
      })
    }
  }
])
.controller('topicCtrl', ['app', '$scope', '$routeParams', 'topic',
  function(app, $scope, $routeParams, topic) {
    var topicID = $routeParams.id;
    $scope.topic = {};
    $scope.user  = {};
    $scope.contentTPL = 'loading.html';
    if(topicID) {
      $scope.loadPromise = topic.find(topicID).then(function(res){
        console.log(res);
        if(res.code != 'ok') return;
        $scope.contentTPL = 'topic.html';

        var topic, user;
        topic = res.data.topic;
        user  = res.data.user;
        $scope.topic = topic;
        $scope.user  = user;
      });
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
        if(res.code != 'ok') return;
        $scope.topic = res.data.topic;
      });
      isEdit = true;
    }
    $scope.preview = function(editSelect) {
      if(!editSelect) return;
      $scope.$broadcast('markdownContentUpdate');
    }
    $scope.commit = function() {
      if(!isEdit) {
        topic.add($scope.topic).then(function(res){
          console.log(res);
          if(res.code != 'ok') return;
          $location.path('/topic/' + res.data._id);
        });
      } else {
        topic.update($scope.topic).then(function(res){
          console.log(res);
          if(res.code != 'ok') return;
          $location.path('/topic/' + topicID);
        });
      }
    }
  }
])
'use strict';
app.directive('markdown', ['$parse',
	function($parse) {
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
			template: '<div class="markdown-body"></div>',
			link: function(scope, element, attr) {
				var content = '';
				function updateContent() {
					var value = attr.content && scope.$eval(attr.content);
					value = value || '';
					if(content == value) return;
					element.html(marked(value));
					content = value;
				}
				updateContent();
				scope.$on('markdownContentUpdate', updateContent)
			}
		}
	}
])
'use strict';
'use strict';

app
.factory('notification', ['growl',
    function(growl) {
        return {
            error: function(msg) {
                growl.addErrorMessage(msg, {ttl: 3000})
            }
        }
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

/**
 * angular-growl - v0.4.0 - 2013-11-19
 * https://github.com/marcorinck/angular-growl
 * Copyright (c) 2013 Marco Rinck; Licensed MIT
 */
angular.module('angular-growl', []);
angular.module('angular-growl').directive('growl', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      restrict: 'A',
      template: '<div class="growl">' + '\t<div class="growl-item alert" ng-repeat="message in messages" ng-class="computeClasses(message)">' + '\t\t<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>' + '       <div ng-switch="message.enableHtml">' + '           <div ng-switch-when="true" ng-bind-html="message.text"></div>' + '           <div ng-switch-default ng-bind="message.text"></div>' + '       </div>' + '\t</div>' + '</div>',
      replace: false,
      scope: true,
      controller: [
        '$scope',
        '$timeout',
        'growl',
        function ($scope, $timeout, growl) {
          var onlyUnique = growl.onlyUnique();
          $scope.messages = [];
          function addMessage(message) {
            $scope.messages.push(message);
            if (message.ttl && message.ttl !== -1) {
              $timeout(function () {
                $scope.deleteMessage(message);
              }, message.ttl);
            }
          }
          $rootScope.$on('growlMessage', function (event, message) {
            var found;
            if (onlyUnique) {
              angular.forEach($scope.messages, function (msg) {
                if (message.text === msg.text && message.severity === msg.severity) {
                  found = true;
                }
              });
              if (!found) {
                addMessage(message);
              }
            } else {
              addMessage(message);
            }
          });
          $scope.deleteMessage = function (message) {
            var index = $scope.messages.indexOf(message);
            if (index > -1) {
              $scope.messages.splice(index, 1);
            }
          };
          $scope.computeClasses = function (message) {
            return {
              'alert-success': message.severity === 'success',
              'alert-error': message.severity === 'error',
              'alert-danger': message.severity === 'error',
              'alert-info': message.severity === 'info',
              'alert-warning': message.severity === 'warn'
            };
          };
        }
      ]
    };
  }
]);
angular.module('angular-growl').provider('growl', function () {
  'use strict';
  var _ttl = null, _enableHtml = false, _messagesKey = 'messages', _messageTextKey = 'text', _messageSeverityKey = 'severity', _onlyUniqueMessages = true;
  this.globalTimeToLive = function (ttl) {
    _ttl = ttl;
  };
  this.globalEnableHtml = function (enableHtml) {
    _enableHtml = enableHtml;
  };
  this.messagesKey = function (messagesKey) {
    _messagesKey = messagesKey;
  };
  this.messageTextKey = function (messageTextKey) {
    _messageTextKey = messageTextKey;
  };
  this.messageSeverityKey = function (messageSeverityKey) {
    _messageSeverityKey = messageSeverityKey;
  };
  this.onlyUniqueMessages = function (onlyUniqueMessages) {
    _onlyUniqueMessages = onlyUniqueMessages;
  };
  this.serverMessagesInterceptor = [
    '$q',
    'growl',
    function ($q, growl) {
      function checkResponse(response) {
        if (response.data[_messagesKey] && response.data[_messagesKey].length > 0) {
          growl.addServerMessages(response.data[_messagesKey]);
        }
      }
      function success(response) {
        checkResponse(response);
        return response;
      }
      function error(response) {
        checkResponse(response);
        return $q.reject(response);
      }
      return function (promise) {
        return promise.then(success, error);
      };
    }
  ];
  this.$get = [
    '$rootScope',
    '$filter',
    function ($rootScope, $filter) {
      var translate;
      try {
        translate = $filter('translate');
      } catch (e) {
      }
      function broadcastMessage(message) {
        if (translate) {
          message.text = translate(message.text);
        }
        $rootScope.$broadcast('growlMessage', message);
      }
      function sendMessage(text, config, severity) {
        var _config = config || {}, message;
        message = {
          text: text,
          severity: severity,
          ttl: _config.ttl || _ttl,
          enableHtml: _config.enableHtml || _enableHtml
        };
        broadcastMessage(message);
      }
      function addWarnMessage(text, config) {
        sendMessage(text, config, 'warn');
      }
      function addErrorMessage(text, config) {
        sendMessage(text, config, 'error');
      }
      function addInfoMessage(text, config) {
        sendMessage(text, config, 'info');
      }
      function addSuccessMessage(text, config) {
        sendMessage(text, config, 'success');
      }
      function addServerMessages(messages) {
        var i, message, severity, length;
        length = messages.length;
        for (i = 0; i < length; i++) {
          message = messages[i];
          if (message[_messageTextKey] && message[_messageSeverityKey]) {
            switch (message[_messageSeverityKey]) {
            case 'warn':
              severity = 'warn';
              break;
            case 'success':
              severity = 'success';
              break;
            case 'info':
              severity = 'info';
              break;
            case 'error':
              severity = 'error';
              break;
            }
            sendMessage(message[_messageTextKey], undefined, severity);
          }
        }
      }
      function onlyUnique() {
        return _onlyUniqueMessages;
      }
      return {
        addWarnMessage: addWarnMessage,
        addErrorMessage: addErrorMessage,
        addInfoMessage: addInfoMessage,
        addSuccessMessage: addSuccessMessage,
        addServerMessages: addServerMessages,
        onlyUnique: onlyUnique
      };
    }
  ];
});