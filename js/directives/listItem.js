app.directive("listitem", function() {
  return {
    restrict: 'E',
    template: 
        '<div ng-controller="pageslideCtrl">'+  
            '<div class="task form-control" ng-repeat="i in listTasks[valueIndex].contentTask | filter:{statusTask:'+"a.itemStatusTask"+'}" ng-mouseover="hoverIn()" ng-mouseleave="hoverOut()">'+
                '<input type="checkbox" ng-click="changeStatusTask(i.taskId)" ng-checked="checked1">'+
                '<span class="checkTask" ng-class="delete">{{i.nameTask}}</span>'+             
                '<span class="icon-pencil glyphicon glyphicon-pencil" ng-show="hoverEdit" ng-click="toggle(i.taskId,'+"'right'"+')"></span>'+
                '<span class="dueDate">{{i.dueDay}}</span>'+
            '</div>'+
   
            '<div pageslide ps-open="$root.checkedright" ps-side="right" id="pageslide" ps-key-listener="true">'+
                '<div class="sidePage">'+
                    '<span ng-click="toggle(listTasks[valueIndex].contentTask[a.indexTask].taskId,'+"'right'"+')" class="closePageSlider">'+
                            '<span class="glyphicon glyphicon-remove"></span>'+
                    '</span>'+
                    '<div class="titleSidePage">'+
                        '<div class="nameSidePage">{{listTasks[valueIndex].contentTask[a.indexTask].nameTask}}</div>'+
                        
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
                            '<input class="form-control" id="datepickerUpdate" data-date-format="dd-mm-yyyy" type="text" placeholder="Set due date" ng-model="a.itemUpdateDueDate">'+
                        '</div>'+
                    '</div>'+
                    '<div class="remindSidePage">'+
                        '<div class="leftIconSidePage"><span class="form-control glyphicon glyphicon-time"></span></div>'+
                        '<div class="contentSidePage">'+
                            '<input class="form-control form_datetime" type="text" placeholder="Remind me" ng-model="a.reminderTime">'+
                        '</div>'+
                    '</div>'+
                    '<div class="remindSidePage">'+
                        '<div class="completeButton" ng-click="changeStatusTaskPageSlide( listTasks[valueIndex].contentTask[a.indexTask].taskId)">'+
                            '<span class="form-control">Complete task<span class="glyphicon glyphicon-ok"></span></span>'+
                        '</div>'+
                        '<div class="saveButton" ng-click="saveInfoTask( listTasks[valueIndex].contentTask[a.indexTask].taskId)">'+
                            '<span class="form-control">Save info <span class="glyphicon glyphicon-floppy-saved"></span></span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="rim"></div>'+
                '</div>'+
            '</div>'+
        '</div>'
  };
});
//'<div class="leftTitleSidePage">'+
//                            '<input class="leftInputSidePage" type="checkbox" ng-click="changeStatusTask( moduleService.listTasks[valueIndex].contentTask[a.indexTask].taskId)" ng-checked="moduleService.listTasks[valueIndex].contentTask[a.indexTask].checkedTask">'+
//                        '</div>'+