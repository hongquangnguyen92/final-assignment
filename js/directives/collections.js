app.directive("collection", function() {
  return {
    restrict: 'E',
    template: 
      '<div class="chooseTask" ng-repeat="itemS in moduleService.listTasks" ng-click="choose($index)">'+
        '<h4 class="glyphicon glyphicon-tasks"></h4> {{itemS.nameListTask}}'+
      '</div>'
  };
});