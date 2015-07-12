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