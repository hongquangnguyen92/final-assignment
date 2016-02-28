var app = angular.module('tasks', []);
    
app.service('ItemService', function() {
    var haveDefaultItems = true;

    this.disableDefaultItems = function() {
        haveDefaultItems = false;
    };
    
    this.listTasks = [];
        if (haveDefaultItems) {
            this.listTasks = [
                {
                    taskListId : 0,
                    nameListTask : "Inbox",
                    contentTask:
                                [
                                    {
                                        taskId : 0,
                                        nameTask : "Task 1",
                                        dueDay : "11-03-2016",
                                        statusTask : "inprogress"
                                    },
                                    {
                                        taskId : 1,
                                        nameTask : "Task 2", 
                                        dueDay : "13-03-2016",
                                        statusTask : "completed"
                                    },
                                    {
                                        taskId : 2,
                                        nameTask : "Task 3",
                                        dueDay : "19-03-2016",
                                        statusTask : "inprogress"
                                    }
                                ]
                },
                {
                    taskListId : 1,
                    nameListTask : "Wake Up",
                    contentTask:
                                [
                                    {
                                        taskId : 0,
                                        nameTask : "Task 4",
                                        dueDay : "11-03-2016",
                                        statusTask : "inprogress"
                                    },
                                    {
                                        taskId : 1,
                                        nameTask : "Task 5",
                                        dueDay : "13-03-2016",
                                        statusTask : "completed"
                                    }
                                ]
                },
                {
                    taskListId : 2,
                    nameListTask : "Study",
                    contentTask:
                                [
                                    {
                                        taskId : 0,
                                        nameTask : "Task 6",
                                        dueDay : "11-03-2016",
                                        statusTask : "inprogress"
                                    },
                                    {
                                        taskId : 1,
                                        nameTask : "Task 7",
                                        dueDay : "13-03-2016",
                                        statusTask : "inprogress"
                                    }
                                ]
                }
            ];

        }
    this.add = function(item) {
        this.listTasks.push(item);
    };

    this.addNewTask = function(obJ,item, index){
       for(var i=0; i<this.listTasks.length; i++)
       {
           if(i==index)
           {
               obJ.push(item);
           }
       }
    };

});

app.controller('TasksController', function($scope, ItemService){
    $scope.moduleService = ItemService;
    $scope.a = {};
    $scope.a.itemNameTask = "";
    $scope.a.itemDueDate = "";
    $scope.a.itemStatusTask = "inprogress";
    $scope.list = function() {
      return ItemService.list();
    };

    // Add an item to the list
    $scope.addList = function() {
        if($scope.itemName!=null && $scope.itemName!=""){
        ItemService.add({
            nameListTask: $scope.itemName,
            contentTask: []
        });}
        // Clear input fields after push
        $scope.itemName = "";
    };
    
    // Choose task list
    $scope.valueIndex = 0;
    $scope.choose = function(indexCurrent){
        var i = indexCurrent;
        $scope.valueIndex = i;
    };
    
    // Add task to list
   	$scope.addTask = function(indexCurrent) {
        if($scope.a.itemNameTask!=null && $scope.a.itemNameTask!=""){
           $scope.moduleService.addNewTask($scope.moduleService.listTasks[indexCurrent].contentTask,{
               nameTask: $scope.a.itemNameTask,
               dueDay: $scope.a.itemDueDate,
               statusTask: "inprogress",
               taskId: $scope.moduleService.listTasks[indexCurrent].contentTask.length
           }, indexCurrent);

           // Clear input fields after push
           $scope.a.itemNameTask = "";
           $scope.a.itemDueDate = "";
        }
   };
    
    // Show pencil when hover in
    $scope.hoverIn = function(){
        if($scope.a.itemStatusTask=="inprogress")
            this.hoverEdit = true;
    }
    
    // Hide pencil when hover out
    $scope.hoverOut = function(){
         this.hoverEdit = false;
    }
    
    // Show tasks in progress
    $scope.inProgressTask = function(){
        $scope.a.itemStatusTask = "inprogress";     
        $scope.delete = "nonDeleteTask";
        $scope.checked1 = false;        
    }
    
    // Show completed tasks
    $scope.completedTask = function(){
        $scope.a.itemStatusTask = "completed";     
        $scope.delete = "deleteTask";
        $scope.checked1 = true; 
    }
    
    // Change status task
    $scope.changeStatusTask = function(indexCurrent){
        if($scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask=="inprogress")
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask = "completed";
        else
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask = "inprogress";
    }
    
});  

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
