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
    if(topicID) {
      topic.find(topicID).then(function(res){
        $scope.topic = res.data;
        $scope.$broadcast('markdown', res.data.content);
      }, console.log);
    }
  }
])
.controller('topicEditorCtrl', ['$scope', '$routeParams', 'topic',
  function($scope, $routeParams, topic) {
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
        }, console.log);
      } else {
        topic.update($scope.topic).then(function(res){
          console.log(res);
        }, console.log);
      }
    }
  }
])