var app = angular.module('tasks', 
        ["pageslide-directive", "jsonService", "ui.router", "ngAnimate", "ui.bootstrap", "ui.bootstrap.datetimepicker"]);

angular.module('jsonService', ['ngResource'])
.factory('LoginService', function($resource) {
    return $resource('js/json/users.json',{ }, {
        getData: {method:'GET', isArray: false}
    });
});

app.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, send to /index
  $urlRouterProvider.otherwise("html/login");

  $stateProvider
    .state('html/login', {
      url: "/html/login",
      templateUrl: "html/login.html",
      controller: "LoginController"
    })
    .state('html/to_do_page', {
      url: "/html/to_do_page",
      templateUrl: "html/to_do_page.html",
      controller: "TasksController"
    });
});

app.directive("datepicker", function () {
    return {
        restrict: "A",
        link: function (scope, el, attr) {
            el.datepicker({
                dateFormat: 'dd-mm-yy'
            });
        }
    };
});

app.controller('TasksController', function($scope, $rootScope, $window, $location, LoginService, $uibModal, $timeout){
      
    LoginService.get(function(data){
        $rootScope.idUser = localStorage.getItem('idUser');
        if($scope.idUser!=null){
             
            $scope.listUsers = data.listTask;
            for(var i =0; i<$scope.listUsers.length; i++)
            {
                if($scope.idUser == $scope.listUsers[i].userId )
                {
                    $scope.userCurrent = $scope.listUsers[i];
                    $rootScope.listTasks = $scope.userCurrent.collection;
                }
            }

        $rootScope.firstNameLetter = $scope.userCurrent.userName.substring(0,1);
        $rootScope.fullName = $scope.userCurrent.userName;
        $scope.listTaskId = $scope.listTasks.taskListId;
            // chosen list
            $rootScope.valueIndex = 0;
            for(var i=0; i<$scope.listTasks.length; i++)
            {
                if($rootScope.listTaskId == $scope.listTasks[i].taskListId)
                    $rootScope.valueIndex = i;
            }
            // number of list task
            $rootScope.numberOfList = 0;
            for(var i=0; i<$scope.listUsers.length; i++)
                for(var j=0; j<$scope.listUsers[i].collection.length; j++)
                    $rootScope.numberOfList = $rootScope.numberOfList +1;
        
        }
       
        
    });
    
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.openAdd = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalAdd.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
            items: function () {
                    return $scope.items;
                }
            }
        });
    };
    
    $scope.openEdit = function (size) {
        $rootScope.editName = $scope.listTasks[$scope.valueIndex].nameListTask;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalEdit.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
            items: function () {
                    return $scope.items;
                }
            }
        });
    };
    
    $scope.dynamicPopover = {
        templateUrl: 'myPopoverTemplate.html',
        title: 'Attention'
    };

    $scope.a = {};
    $scope.a.itemNameTask = "";
    $scope.a.itemRenameTask = "";
    $scope.a.itemUpdateDueDate = "";
    $scope.a.itemDueDate = "";
    $scope.a.reminderTime = $rootScope.datetimeRemind;
    //console.log($scope.a.reminderTime);
    $scope.a.itemStatusTask = "inprogress";
    $scope.a.indexTask = "";
    $scope.view_tab = "tabInprogress";
    $scope.numberPopup = 0;
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    var hhs = today.getHours();
    var mms = today.getMinutes();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var todayDue = dd+'-'+mm+'-'+yyyy;
    var timeToday = dd+'-'+mm+'-'+yyyy+' '+hhs+':'+mms;

    $rootScope.dueToday = todayDue;
    $scope.numberTasks = 0;
    
    $scope.synx = function(){
        $scope.numberPopup = 0;
        $scope.listReminder = [];
        for(var i=0; i< $scope.listTasks.length; i++)
            if(i!=1)
                for(var j=0; j<$scope.listTasks[i].contentTask.length; j++)
                {
                    console.log($scope.listTasks[i].contentTask.length);
                    //$scope.datetimeReminder = new Date($scope.listTasks[i].contentTask[j].reminder);
                    //console.log($scope.listTasks[i].contentTask[j].reminder);
                    if($scope.listTasks[i].contentTask[j].reminder!="" && $scope.listTasks[i].contentTask[j].reminder!= null)
                        if($scope.listTasks[i].contentTask[j].reminder <= today)
                        {
                            $scope.numberPopup = $scope.numberPopup + 1;
                            $scope.listReminder.push($scope.listTasks[i].contentTask[j]);
                            console.log($scope.listReminder);
                        }
                }
        console.log("popup:" +$scope.numberPopup);

    }
    
    // Choose task list
    $scope.choose = function(indexCurrent){
        var x = indexCurrent;
        $rootScope.listTaskId = x;
        $rootScope.checkedright = false;
        $rootScope.checkedleft = false;
        
        // chosen list
        for(var i=0; i<$scope.listTasks.length; i++)
        {
            if($rootScope.listTaskId == $scope.listTasks[i].taskListId)
                $rootScope.valueIndex = i;
        }
        
        // due today
        if($scope.valueIndex==1){
            for(var i=0; i<$scope.listTasks.length; i++)
            {
                if(i!=1)
                {
                    for(var j=0; j<$scope.listTasks[i].contentTask.length; j++)
                    {
                        var todayDueDate = $scope.listTasks[i].contentTask[j].dueDay;
                        if(todayDue==todayDueDate)
                        {

                            if($scope.listTasks[1].contentTask.length==0)
                                $scope.listTasks[1].contentTask.push( $scope.listTasks[i].contentTask[j]);
                            else{
                                for(var z=0; z<$scope.listTasks[1].contentTask.length; z++)
                                {
                                    if($scope.listTasks[1].contentTask[z].taskId == $scope.listTasks[i].contentTask[j].taskId){
                                       break;
                                       }
                                    else if($scope.listTasks[1].contentTask[z].taskId != $scope.listTasks[i].contentTask[j].taskId && ($scope.listTasks[1].contentTask.length-1) == z)
                                    {
                                        $scope.listTasks[1].contentTask.push( $scope.listTasks[i].contentTask[j]);  
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if($scope.listTasks[1].contentTask.length > 0){
            for(var z=0; z<$scope.listTasks[1].contentTask.length; z++)
            {
                var dueDate = $scope.listTasks[1].contentTask[z].dueDay;
                if(todayDue!=dueDate)
                    $scope.listTasks[1].contentTask.pop($scope.listTasks[1].contentTask[z]);
            }
        }
    };
    
    // Add new task to list
    $scope.addTask = function(indexCurrent) {
        // number of tasks
            for(var i=0; i<$scope.listUsers.length; i++)
                for(var j=0; j<$scope.listUsers[i].collection.length; j++)
                    for(var z=0; z<$scope.listUsers[i].collection[j].contentTask.length; z++)
                        $scope.numberTasks = $scope.numberTasks +1;
        if($scope.a.itemNameTask!=null && $scope.a.itemNameTask!=""){
            var jsonStr = $scope.listTasks[indexCurrent].contentTask;
            var new_obj = {
                "nameTask": $scope.a.itemNameTask,
                "dueDay": $scope.a.itemDueDate,
                "statusTask": "inprogress",
                "taskId": $scope.numberTasks,
                "checkedTask": false
            };
            jsonStr.push( new_obj );
        }
        //console.log($scope.listTasks[indexCurrent].contentTask);
        $scope.numberTasks = 0;
        // Clear input fields after push
        $scope.a.itemNameTask = "";
        $scope.a.itemDueDate = "";
    }
    
    // Rename task
    $scope.renameTask = function(indexCurrent){
        if($scope.a.itemRenameTask!=null && $scope.a.itemRenameTask!=""){
            $scope.listTasks[$scope.valueIndex].contentTask[indexCurrent].nameTask = $scope.a.itemRenameTask;
        }
        
        // Clear input fields after push
        $scope.a.itemRenameTask = "";
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
    $scope.inProgressTask = function(tab){
        $scope.a.itemStatusTask = "inprogress";     
        $scope.delete = "nonDeleteTask";
        $scope.checked1 = false;      
        $scope.view_tab = tab;
    }
    
    // Show completed tasks
    $scope.completedTask = function(tab){
        $scope.a.itemStatusTask = "completed";     
        $scope.delete = "deleteTask";
        $scope.checked1 = true; 
        $scope.view_tab = tab;
    }
    
    // Change status task
    $scope.changeStatusTask = function(indexCurrent){
        for(var i=0; i<$scope.listTasks[$scope.valueIndex].contentTask.length; i++){
            if($scope.listTasks[$scope.valueIndex].contentTask[i].taskId==indexCurrent){
                if($scope.listTasks[$scope.valueIndex].contentTask[i].statusTask=="inprogress")
                {
                    $scope.listTasks[$scope.valueIndex].contentTask[i].statusTask = "completed";
                    $scope.listTasks[$scope.valueIndex].contentTask[i].checkedTask = true;
                }
                else
                {
                    $scope.listTasks[$scope.valueIndex].contentTask[i].statusTask = "inprogress";
                    $scope.listTasks[$scope.valueIndex].contentTask[i].checkedTask = false;
                }
            }
        }
    }
 
    // Sign out
    $scope.signOut = function(){   
        $location.path("html/login");
    }

    
    
    
    //
    
});  

app.controller('pageslideCtrl',function($scope, $rootScope, $location, $timeout){
//    $scope.checkedright = false; // This will be binded using the ps-open attribute
//    $scope.checkedleft = false;
    
    $scope.outToClose = function(){
        $rootScope.checkedleft = false;
        $rootScope.checkedright = false;
        $location.path("html/login");
    }
    
    $scope.toggle = function(indexCurrent, position){
        for(var i=0; i<$rootScope.listTasks[$rootScope.valueIndex].contentTask.length; i++){
            if($rootScope.listTasks[$rootScope.valueIndex].contentTask[i].taskId==indexCurrent){
                if(($scope.a.indexTask==i || ($scope.a.indexTask!=i && $scope.checkedright==false)) && position=="right"){
                    $rootScope.checkedright = !$rootScope.checkedright;
                    $rootScope.checkedleft = false;
                }
                
                $scope.a.indexTask = i;
                $scope.a.itemUpdateDueDate = $rootScope.listTasks[$rootScope.valueIndex].contentTask[i].dueDay;
                $scope.a.reminderTime = $rootScope.listTasks[$rootScope.valueIndex].contentTask[i].reminder;
            }
        }
        if( position=="left"){
            $rootScope.checkedleft = !$rootScope.checkedleft;
            $rootScope.checkedright = false;
//            $scope.checkedleft = $rootScope.checkedleft;
//            $scope.checkedright = $rootScope.checkedright;
        }
    }
    
    $scope.changeStatusTaskPageSlide = function(indexCurrent){
        for(var i=0; i<$rootScope.listTasks[$rootScope.valueIndex].contentTask.length; i++){
            if($rootScope.listTasks[$rootScope.valueIndex].contentTask[i].taskId==indexCurrent){
                if($rootScope.listTasks[$rootScope.valueIndex].contentTask[i].statusTask=="inprogress"){
                    $rootScope.listTasks[$rootScope.valueIndex].contentTask[i].statusTask = "completed";
                    $rootScope.listTasks[$rootScope.valueIndex].contentTask[i].checkedTask = true;
                }
                $rootScope.checkedright = false;
            }
        }
    }
    
    $scope.saveInfoTask = function(indexCurrent){
        for(var i=0; i<$rootScope.listTasks[$rootScope.valueIndex].contentTask.length; i++){
            if($rootScope.listTasks[$rootScope.valueIndex].contentTask[i].taskId==indexCurrent){
                if($scope.a.itemRenameTask!=null && $scope.a.itemRenameTask!="")
                    $rootScope.listTasks[$rootScope.valueIndex].contentTask[i].nameTask = $scope.a.itemRenameTask;
                $rootScope.listTasks[$rootScope.valueIndex].contentTask[i].dueDay = $scope.a.itemUpdateDueDate;
                $rootScope.listTasks[$rootScope.valueIndex].contentTask[i].reminder = $rootScope.datetimeRemind;
            }
        }
       
        $scope.a.itemRenameTask = "";
        $rootScope.checkedright = false;
        $rootScope.checkedleft = false;
        if($rootScope.listTasks[1].contentTask.length > 0){
            for(var z=0; z<$rootScope.listTasks[1].contentTask.length; z++)
            {
                var dueDate = $rootScope.listTasks[1].contentTask[z].dueDay;
                if($rootScope.dueToday!=dueDate)
                    $rootScope.listTasks[1].contentTask.pop($rootScope.listTasks[1].contentTask[z]);
            }
        }
    }
    
    //
    // datetimepicker
    
    $scope.dateTimeNow = function() {
        $scope.date = new Date();
      };
      $scope.dateTimeNow();

      $scope.toggleMinDate = function() {
        var minDate = new Date();
        // set to yesterday
        minDate.setDate(minDate.getDate() - 1);
        $scope.minDate = $scope.minDate ? null : minDate;
      };

      $scope.toggleMinDate();

      $scope.dateOptions = {
        showWeeks: false
      };

      // Disable weekend selection
      $scope.disabled = function(calendarDate, mode) {
        return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
      };

      $scope.open = function($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.dateOpened = true;
        console.log('opened');
      };

      $scope.dateOpened = false;
      $scope.hourStep = 1;
      $scope.format = "dd-MMM-yyyy";
      $scope.minuteStep = 15;

      $scope.timeOptions = {
        hourStep: [1, 2, 3],
        minuteStep: [1, 5, 10, 15, 25, 30]
      };

      $scope.showMeridian = false;
      $scope.timeToggleMode = function() {
        $scope.showMeridian = !$scope.showMeridian;
      };

      $scope.$watch("date", function(date) {
        $rootScope.datetimeRemind = date;
          console.log($rootScope.datetimeRemind);
      }, true);

      $scope.resetHours = function() {
        $scope.date.setHours(1);
      };
});

app.controller('ModalInstanceCtrl', function ($scope, $rootScope, $uibModalInstance, items) {

   
    // Add an item to the list
    $scope.addList = function() {
        if($scope.itemName!=null && $scope.itemName!=""){
            var jsonStr = $rootScope.listTasks;
            var new_obj = {"nameListTask":$scope.itemName, "taskListId":$rootScope.numberOfList+1, "contentTask" : []};
            jsonStr.push( new_obj );
            JSON.stringify(new_obj);
        }
        
        $rootScope.numberOfList = $rootScope.numberOfList +1;
        // Clear input fields after push
        $scope.itemName = null;
        // Set value id to choose task list
        $rootScope.listTaskId = new_obj.taskListId;
        for(var i=0; i<$scope.listTasks.length; i++)
        {
            if($rootScope.listTaskId == $scope.listTasks[i].taskListId)
                $rootScope.valueIndex = i;
        }
        $uibModalInstance.close($scope.selected.item);
        $rootScope.checkedleft = false;
    };
    
    // Edit an item to the list
    $scope.editList = function() {
        if($scope.editName!=null && $scope.editName!=""){
            $rootScope.listTasks[$scope.valueIndex].nameListTask = $scope.editName;
        }
        $uibModalInstance.close($scope.selected.item);
    }
    
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('LoginController', function($scope, $rootScope, $window, LoginService, $location){

    LoginService.get(function(data){
            $rootScope.listUsers = data.listTask;
            $scope.lengthListUser = $rootScope.listUsers.length;
           
    });
    $scope.loginCheck = function(){
        // check id and password
        for(var i =0; i<$rootScope.listUsers.length; i++)
            if($rootScope.listUsers[i].userId == $scope.userId && $rootScope.listUsers[i].passWord == $scope.userPass)
            {
                
                $scope.currentUserName = $rootScope.listUsers[i].userName;
                $scope.currentUserId = $rootScope.listUsers[i].userId;
                //var user = [$scope.currentUserId, $scope.currentUserName];
                $scope.firstNameLetter = $scope.currentUserName.substring(0,1);
                localStorage.setItem("idUser", $scope.currentUserId);
                $location.path("html/to_do_page");
            }
        
    };
}); 