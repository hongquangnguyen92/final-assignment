app.directive("collection", function() {
  return {
    restrict: 'E',
    template: 
      '<div class="chooseTask" ng-repeat="itemS in listTasks" ng-click="choose(itemS.taskListId)">'+
        '<div><h4 class="glyphicon glyphicon-tasks"></h4> {{itemS.nameListTask}}</div>'+
      '</div>'
  };
});