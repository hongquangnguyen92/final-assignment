var app = angular.module('tasks', ["pageslide-directive"]);
    
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
                                        dueDay : "03-07-2016",
                                        statusTask : "inprogress",
                                        checkedTask : false
                                    },
                                    {
                                        taskId : 1,
                                        nameTask : "Task 2", 
                                        dueDay : "03-09-2016",
                                        statusTask : "completed",
                                        checkedTask : true
                                    },
                                    {
                                        taskId : 2,
                                        nameTask : "Task 3",
                                        dueDay : "03-13-2016",
                                        statusTask : "inprogress",
                                        checkedTask : false
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
                                        dueDay : "03-07-2016",
                                        statusTask : "inprogress",
                                        checkedTask : false
                                    },
                                    {
                                        taskId : 1,
                                        nameTask : "Task 5",
                                        dueDay : "03-13-2016",
                                        statusTask : "completed",
                                        checkedTask : true
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
                                        dueDay : "03-07-2016",
                                        statusTask : "inprogress",
                                        checkedTask : false
                                    },
                                    {
                                        taskId : 1,
                                        nameTask : "Task 7",
                                        dueDay : "03-13-2016",
                                        statusTask : "inprogress",
                                        checkedTask : false
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
    $scope.a.itemRenameTask = "";
    $scope.a.itemUpdateDueDate = "";
    $scope.a.itemDueDate = "";
    $scope.a.itemStatusTask = "inprogress";
    $scope.a.indexTask = "";
    $scope.valueIndex = 0;
    //$scope.checked = false; // This will be binded using the ps-open attribute
    $scope.list = function() {
      return ItemService.list();
    };

    // Add an item to the list
    $scope.addList = function() {
        if($scope.itemName!=null && $scope.itemName!=""){
        ItemService.add({
            nameListTask: $scope.itemName,
            taskListId: $scope.moduleService.listTasks.length,
            contentTask: []
        });}
        // Clear input fields after push
        $scope.itemName = "";
        // Set value id to choose task list
        $scope.valueIndex = $scope.moduleService.listTasks.length-1;
    };
    
    // Set init name task for modal 
    $scope.setInitNameTask = function(){
        $scope.itemName = $scope.moduleService.listTasks[$scope.valueIndex].nameListTask;
    }
    
    // Choose task list
    $scope.choose = function(indexCurrent){
        var i = indexCurrent;
        $scope.valueIndex = i;
        if($scope.checked==true)
            $scope.checked = false;
    };
    
    // Add task to list
   	$scope.addTask = function(indexCurrent) {
        if($scope.a.itemNameTask!=null && $scope.a.itemNameTask!=""){
           $scope.moduleService.addNewTask($scope.moduleService.listTasks[indexCurrent].contentTask,{
               nameTask: $scope.a.itemNameTask,
               dueDay: $scope.a.itemDueDate,
               statusTask: "inprogress",
               taskId: $scope.moduleService.listTasks[indexCurrent].contentTask.length,
               checkedTask: false
           }, indexCurrent);

           // Clear input fields after push
           $scope.a.itemNameTask = "";
           $scope.a.itemDueDate = "";
        }
    };
    
    // Rename task
    $scope.renameTask = function(indexCurrent){
        if($scope.a.itemRenameTask!=null && $scope.a.itemRenameTask!=""){
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].nameTask = $scope.a.itemRenameTask;
        }
        
        // Clear input fields after push
        $scope.a.itemRenameTask = "";
    }
    
    // Update due date
    $scope.updateTimeTask = function(indexCurrent){
        if($scope.a.itemUpdateDueDate!=null && $scope.a.itemUpdateDueDate!=""){
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].dueDay = $scope.a.itemUpdateDueDate;
        }
        
        // Clear input fields after push
        $scope.a.itemUpdateDueDate = "";
    }
    
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
        if($scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask=="inprogress"){
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask = "completed";
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].checkedTask = true;
        }
        else{
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask = "inprogress";
            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].checkedTask = false;
        }
    }
    
    // Show or close pageslide task
//    $scope.toggle = function(indexCurrent){
//        if($scope.a.indexTask==indexCurrent || ($scope.a.indexTask!=indexCurrent && $scope.checked==false)){
//            $scope.checked = !$scope.checked;
//        }
//        $scope.a.indexTask = indexCurrent;
//        $scope.a.itemUpdateDueDate = $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].dueDay;
//    }
    
});  

app.controller('pageslideCtrl',['$scope',function($scope){
    $scope.checked = false; // This will be binded using the ps-open attribute
    
    // Show or close pageslide task
    $scope.toggle = function(indexCurrent){
        if($scope.a.indexTask==indexCurrent || ($scope.a.indexTask!=indexCurrent && $scope.checked==false)){
            $scope.checked = !$scope.checked;
        }
        $scope.a.indexTask = indexCurrent;
        $scope.a.itemUpdateDueDate = $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].dueDay;
    }
    
    $scope.toggle2 = function(){
        $scope.checked = !$scope.checked;
    }
}]);
