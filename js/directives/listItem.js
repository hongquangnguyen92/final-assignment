app.directive("listitem", function() {
  return {
    restrict: 'E',
    template: 
      '<div class="task form-control" ng-repeat="i in moduleService.listTasks[valueIndex].contentTask | filter:{statusTask:'+"a.itemStatusTask"+'}" ng-mouseover="hoverIn()" ng-mouseleave="hoverOut()">'+
            '<input type="checkbox" ng-click="changeStatusTask(i.taskId)" ng-checked="checked1">'+
            '<span class="checkTask" ng-class="delete">{{i.nameTask}}</span>'+
            '<span class="icon-pencil glyphicon glyphicon-pencil" ng-show="hoverEdit"></span>'+
      '</div>'
  };
});