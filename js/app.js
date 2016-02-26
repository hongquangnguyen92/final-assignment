var app = angular.module('tasks', []);

function ItemService(opt_items) {
  var items = opt_items || [];
    
  this.list = function() {
    return items;
  };
  this.add = function(item) {
    items.push(item);
  };
    
//    this.addNewTask = function(obJ,item, index){
//        for(var i=0; i<items.length; i++)
//        {
//            if(i==index)
//            {
//                items[i].obJ.push(item);
//            }
//        }
//    }
}
    
app.provider('ItemService', function() {
    var haveDefaultItems = true;

    this.disableDefaultItems = function() {
        haveDefaultItems = false;
    };
    
    // This function gets our dependencies, not the
    // provider above
    this.$get = [function() {
        var listTask = [];
            if (haveDefaultItems) {
                listTask = [
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
        return new ItemService(listTask);

    }];

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
    var self = this;
    self.list = function() {
      return ItemService.list();
    };

    // Add an item to the list
    self.addList = function() {
        if($scope.itemName!=null && $scope.itemName!=""){
        ItemService.add({
            nameListTask: $scope.itemName
        });}
        // Clear input fields after push
        $scope.itemName = "";
    };
    
    // Choose task list
    self.valueIndex = 0;
    self.choose = function(indexTemp){
        var abc = indexTemp;
        self.valueIndex = abc;
    };
    
    // Add task to list
//    $scope.addTask = function(keyEvent,indexCurrent) {
//      if (keyEvent.which === 13){
//        
//        ItemService.addNewTask($scope.contentTask,{
//            nameTask: $scope.itemNameTask,
//            dueDay: $scope.itemDueDate
//        }, indexCurrent);}
//        // Clear input fields after push
//        $scope.itemNameTask = "";
//        $scope.itemDueDate = "";
//    };
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
