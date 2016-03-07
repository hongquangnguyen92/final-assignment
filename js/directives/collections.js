app.directive("collection", function() {
  return {
    restrict: 'E',
    template: 
      '<div class="chooseTask" ng-repeat="itemS in listTasks" ng-click="choose($index)">'+
        '<div><h4 class="glyphicon glyphicon-tasks"></h4> {{itemS.nameListTask}}</div>'+
      '</div>'
  };
});