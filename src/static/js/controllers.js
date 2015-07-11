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