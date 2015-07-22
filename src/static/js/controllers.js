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
    if(topicID) {
      topic.find(topicID).then(function(res){
        console.log(res);
        if(res.code != 'ok') return;
        $scope.contentTPL = 'topic.html';

        var topic, user;
        topic = res.data.topic;
        user  = res.data.user;
        $scope.topic = topic;
        $scope.user  = user;
        app.timeout(function(){
          $scope.$broadcast('markdown', topic.content);
        });
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
      $scope.$broadcast('markdown', $scope.topic.content)
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