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

