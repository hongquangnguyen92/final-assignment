app.directive("listitem", function() {
  return {
    restrict: 'E',
    template: 
        '<div ng-controller="pageslideCtrl">'+
            '<div class="task form-control" ng-repeat="i in moduleService.listTasks[valueIndex].contentTask | filter:{statusTask:'+"a.itemStatusTask"+'}" ng-mouseover="hoverIn()" ng-mouseleave="hoverOut()">'+
                '<input type="checkbox" ng-click="changeStatusTask(i.taskId)" ng-checked="checked1">'+
                '<span class="checkTask" ng-class="delete">{{i.nameTask}}</span>'+             
                '<span class="icon-pencil glyphicon glyphicon-pencil" ng-show="hoverEdit" ng-click="toggle(i.taskId)"></span>'+
                '<span class="dueDate">{{i.dueDay}}</span>'+
            '</div>'+
   
            '<div pageslide ps-open="checked" ps-side="right" id="pageslide">'+
                '<div class="sidePage">'+
                    
                    '<div class="titleSidePage">'+
                        '<div class="leftTitleSidePage">'+
                            '<input class="leftInputSidePage" type="checkbox" ng-click="changeStatusTask( moduleService.listTasks[valueIndex].contentTask[a.indexTask].taskId)" ng-checked="moduleService.listTasks[valueIndex].contentTask[a.indexTask].checkedTask">'+
                        '</div>'+
                        '<div class="nameSidePage">{{moduleService.listTasks[valueIndex].contentTask[a.indexTask].nameTask}}</div>'+
                    '</div>'+
                    '<div class="editNameSidePage">'+
                        '<div class="leftIconSidePage"><span class="form-control glyphicon glyphicon-edit"></span></div>'+
                        '<div class="contentSidePage">'+
                            '<input class="form-control" type="text" placeholder="Rename task" ng-enter="renameTask(a.indexTask)" ng-model="a.itemRenameTask">'+
                        '</div>'+
                    '</div>'+
                    '<div class="timeSidePage">'+
                        '<div class="leftIconSidePage"><span class="form-control glyphicon glyphicon-calendar"></span></div>'+
                        '<div class="contentSidePage">'+
                            '<input class="form-control" id="datepickerUpdate" data-date-format="mm-dd-yyyy" type="text" placeholder="Set due date" ng-enter="updateTimeTask(a.indexTask)" ng-model="a.itemUpdateDueDate">'+
                        '</div>'+
                    '</div>'+
                    '<div class="remindSidePage">'+
                        '<div class="leftIconSidePage"><span class="form-control glyphicon glyphicon-time"></span></div>'+
                        '<div class="contentSidePage"><input class="form-control" type="text" placeholder="Remind me"></div>'+
                    '</div>'+
                    '<span ng-click="toggle(moduleService.listTasks[valueIndex].contentTask[a.indexTask].taskId)" class="button">'+
                        '<span class="glyphicon glyphicon-remove"></span>Close menu'+
                    '</span>'+
                '</div>'+
            '</div>'+
        '</div>'
  };
});