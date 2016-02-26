var app = angular.module('tasks', []);

function ItemService(opt_items) {
  var items = opt_items || [];
    
  this.list = function() {
    return items;
  };
  this.add = function(item) {
    items.push(item);
  };
    
   this.addNewTask = function(obJ,item, index){
       for(var i=0; i<items.length; i++)
       {
           if(i==index)
           {
               items[i].obJ.push(item);
           }
       }
   }
}
    
app.service('ItemService', function() {
    var haveDefaultItems = true;

    this.disableDefaultItems = function() {
        haveDefaultItems = false;
    };
    
    // This function gets our dependencies, not the
    // provider above
    // this.$get = [function() {
    this.listTask = [];
        if (haveDefaultItems) {
            this.listTask = [
                {
                    taskListId : 0,
                    nameListTask : "Inbox",
                    contentTask:
                                [
                                    {
                                        taskId : 1,
                                        nameTask : "Task 1",
                                        dueDay : "11-03-2016"
                                    },
                                    {
                                        taskId : 2,
                                        nameTask : "Task 2",
                                        dueDay : "13-03-2016"
                                    }
                                ]
                },
                {
                    taskListId : 1,
                    nameListTask : "Wake Up",
                    contentTask:
                                [
                                    {
                                        taskId : 1,
                                        nameTask : "Task 3",
                                        dueDay : "11-03-2016"
                                    },
                                    {
                                        taskId : 2,
                                        nameTask : "Task 4",
                                        dueDay : "13-03-2016"
                                    }
                                ]
                },
                {
                    taskListId : 2,
                    nameListTask : "Study",
                    contentTask:
                                [
                                    {
                                        taskId : 1,
                                        nameTask : "Task 5",
                                        dueDay : "11-03-2016"
                                    },
                                    {
                                        taskId : 2,
                                        nameTask : "Task 6",
                                        dueDay : "13-03-2016"
                                    }
                                ]
                }
            ];

        }
        this.add = function(item) {
		    this.listTask.push(item);
		  };

		this.addNewTask = function(obJ,item, index){
	       for(var i=0; i<this.listTask.length; i++)
	       {
	           if(i==index)
	           {
	               obJ.push(item);
	           }
	       }
	   }

    // }];

});

app.config(['ItemServiceProvider',
    function(ItemServiceProvider) {
      // To see how the provider can change
      // configuration, change the value of
      // shouldHaveDefaults to true and try
      // running the example
    var shouldHaveDefaults = true;

      // Get configuration from server
      // Set shouldHaveDefaults somehow
      // Assume it magically changes for now
    if (!shouldHaveDefaults) {
        ItemServiceProvider.disableDefaultItems();
    }
}])

app.controller('TasksController', function($scope, ItemService){
    $scope.moduleService = ItemService;
    $scope.a = {};
    $scope.a.itemNameTask = "";
    $scope.a.itemDueDate = "";
    $scope.list = function() {
      return ItemService.list();
    };

    // Add an item to the list
    $scope.addList = function() {
        if($scope.itemName!=null && $scope.itemName!=""){
        ItemService.add({
            nameListTask: $scope.itemName
        });}
        // Clear input fields after push
        $scope.itemName = "";
    };
    
    // Choose task list
    $scope.valueIndex = 0;
    $scope.choose = function(indexTemp){
        var abc = indexTemp;
        $scope.valueIndex = abc;
    };
    
    // Add task to list
   	$scope.addTask = function(indexCurrent) {
       $scope.moduleService.addNewTask($scope.moduleService.listTask[0].contentTask,{
           nameTask: $scope.a.itemNameTask,
           dueDay: $scope.a.itemDueDate
       }, indexCurrent);

       // Clear input fields after push
       $scope.a.itemNameTask = "";
       $scope.a.itemDueDate = "";
   };
});  
app.directive('myElement', function () {
  return {
    scope: {
      itemS: '=myElement'
    },
    restrict: 'EA',
    template:
      '<h4 class="glyphicon glyphicon-tasks"></h4> {{itemS.nameListTask}}'
    };
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
