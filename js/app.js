var app = angular.module('tasks', ["pageslide-directive", "jsonService", "ngAnimate"]);

angular.module('jsonService', ['ngResource'])
.factory('ItemService', function($resource) { 
    return $resource('../js/listTasks.json',{ }, {
        getData: {method:'GET', isArray: false}
    });  
})
.factory('LoginService', function($resource) {
    return $resource('../js/users.json',{ }, {
        getData: {method:'GET', isArray: false}
    });
});

//app.config(function($stateProvider, $urlRouterProvider) {
//
//  // For any unmatched url, send to /index
//  $urlRouterProvider.otherwise("html/login");
//
//  $stateProvider
//    .state('html/login', {
//      url: "/html/login",
//      templateUrl: "html/login.html",
//      controller: "TasksController"
//    })
//    .state('html/to_do_page', {
//      url: "/html/to_do_page",
//      templateUrl: "html/to_do_page.html",
//      //controller: "LoginCheckController"
//    });
//});

//app.controller('LoginCheckController', ['$scope', '$location', LoginCheckController]);
//
//function LoginCheckController($scope, $location) {
//
//  $scope.users = [{
//    UserName: 'chandra@go',
//    Password: 'hello'
//  }, {
//    UserName: 'Harish',
//    Password: 'hi'
//  }, {
//    UserName: 'Chinthu',
//    Password: 'hi'
//  }];
//
//  $scope.loginCheck = function() {
//      console.log("hello");
//    $location.path("SuccessPage");
//  };

//  $scope.go = function(path) {
//    $location.path("/SuccessPage");
//  };

//.factory("EveryService", ["ItemService", "LoginService", 
//    function(itemService, loginService) {
//        return {
//            'itemService': itemService, 
//            'loginService': loginService
//        };
//}]);

//    this.addTodayTask = function(){
//        var today = new Date();
//        var dd = today.getDate();
//        var mm = today.getMonth()+1; //January is 0!
//
//        var yyyy = today.getFullYear();
//        if(dd<10){
//            dd='0'+dd
//        } 
//        if(mm<10){
//            mm='0'+mm
//        } 
//        var todayDue = dd+'-'+mm+'-'+yyyy;
//        for(var i=0; i<this.listTasks.length; i++)
//        {
//            if(i!=1)
//            {
//                for(var j=0; j<this.listTasks[i].contentTask.length; j++)
//                {
//                    var todayDueDate = this.listTasks[i].contentTask[j].dueDay;
//                    if(todayDue==todayDueDate)
//                    {
//                        
////                        if(this.listTasks[1].contentTask.length==0)
////                            this.listTasks[1].contentTask.push( this.listTasks[i].contentTask[j]);
////                        else{
////                            for(var z=0; z<this.listTasks[1].contentTask.length; z++)
////                            {
////                                console.log(this.listTasks[i].contentTask[j].taskId);
////                                if(this.listTasks[1].contentTask[z].taskId == this.listTasks[i].contentTask[j].taskId){
////                                   break;
////                                   }
////                                else if(this.listTasks[1].contentTask[z].taskId != this.listTasks[i].contentTask[j].taskId)
////                                {
////                                    console.log("hello");
////                                    this.listTasks[1].contentTask.push( this.listTasks[i].contentTask[j]);  
////                                    break;
////                                }
////                            }
////                        }
//                        this.listTasks[1].contentTask.push( this.listTasks[i].contentTask[j]);
//                    }
//                }
//            }
//        }
//        if(this.listTasks[1].contentTask.length>=2)
//            for(var i=0; i<this.listTasks[1].contentTask.length-1; i++)
//            {
//                 console.log("hello");
//                for(var j=i+1; j<this.listTasks[1].contentTask.length; j++){
//                     console.log("hi");
//                    if(this.listTasks[1].contentTask[i].taskId == this.listTasks[1].contentTask[j].taskId){
//                        this.listTasks[1].contentTask.pop(this.listTasks[1].contentTask[j]);
//                        i--; j--;
//                        break;
//                    }
//                }
//            }
//    }
//    
//    this.totalTasks = function(){
//        var count = 0;
//        for(var i=0; i<this.listTasks.length; i++)
//        {
//            
//                for(var j=0; j<this.listTasks[i].contentTask.length; j++)
//                {
//                    count++;
//                }
//            
//        }
//        return count;
//    }
//    
//});

app.controller('TasksController', function($scope, $rootScope, $window, $location, ItemService, LoginService){
    ItemService.get(function(data){
        $scope.listTasks = data.collections;
    });
    LoginService.get(function(data){
            $scope.listUsers = data.listTask;
    });
    $scope.firstNameLetter = "P";
    $scope.loginCheck = function() {
      console.log("hello");
        $location.path("html/to_do_page");
//        scope.$apply(function() { 
//            $location.path("/to_do_page.html"); 
//        });
  };
//    $scope.loginCheck = function(){
//        // check id and password
//        for(var i =0; i<$scope.listUsers.length; i++)
//            if($scope.listUsers[i].userId == $scope.userId && $scope.listUsers[i].passWord == $scope.userPass)
//            {
//                $scope.currentUserName = $scope.listUsers[i].userName;
//                $scope.currentUserId = $scope.listUsers[i].userId;
//                $scope.firstNameLetter = $scope.currentUserName.substring(0,1);
//                var baseUrl = "file:///C:/Users/Win7x86/Desktop/Final_Assignment/html"+$location.path();
//                $location.path("to_do_page.html");
//                //$location.absUrl('file:///C:/Users/Win7x86/Desktop/Final_Assignment/html/to_do_page.html');
//                //$window.location.href = 'file:///C:/Users/Win7x86/Desktop/Final_Assignment/html/to_do_page.html';
//                 //window.location.assign('file:///C:/Users/Win7x86/Desktop/Final_Assignment/html/to_do_page.html');
//            }
//        
//         console.log($scope.firstNameLetter);
//        console.log($location.path());
//        console.log(baseUrl);
//    };

    $scope.a = {};
    $scope.a.itemNameTask = "";
    $scope.a.itemRenameTask = "";
    $scope.a.itemUpdateDueDate = "";
    $scope.a.itemDueDate = "";
    $scope.a.reminderTime = "";
    $scope.a.itemStatusTask = "inprogress";
    $scope.a.indexTask = "";
    $scope.valueIndex = 0;
    
    console.log($scope.firstNameLetter);
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var todayDue = dd+'-'+mm+'-'+yyyy;
//    $scope.numberReminder = 0;
//    $scope.tod = false;
    $scope.numberTasks = 0;
    
    // Add an item to the list
    $scope.addList = function() {
        if($scope.itemName!=null && $scope.itemName!=""){
            var jsonStr = $scope.listTasks;
            var new_obj = {"nameListTask":$scope.itemName, "taskListId":$scope.listTasks.length+1, "contentTask" : []};
            jsonStr.push( new_obj );
        }
        
        // Clear input fields after push
        $scope.itemName = null;
        // Set value id to choose task list
        $scope.valueIndex = $scope.listTasks.length-1;
    };
    
    // Edit an item to the list
    $scope.editList = function() {
        if($scope.editName!=null && $scope.editName!=""){
            $scope.listTasks[$scope.valueIndex].nameListTask = $scope.editName;
        }
    }
    
    // Set init name task for modal 
    $scope.setInitNameTask = function(){
        $scope.editName = $scope.listTasks[$scope.valueIndex].nameListTask;
    }
    
    // Choose task list
    $scope.choose = function(indexCurrent){
        var x = indexCurrent;
        $scope.valueIndex = x;
        $rootScope.checkedright = false;
        $rootScope.checkedleft = false;
        
        if(x==1){
            for(var i=0; i<this.listTasks.length; i++)
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
                                    console.log($scope.listTasks[i].contentTask[j].taskId);
                                    if($scope.listTasks[1].contentTask[z].taskId == $scope.listTasks[i].contentTask[j].taskId){
                                       break;
                                       }
                                    else if($scope.listTasks[1].contentTask[z].taskId != $scope.listTasks[i].contentTask[j].taskId && ($scope.listTasks[1].contentTask.length-1) == z)
                                    {
                                        console.log("hello");
                                        $scope.listTasks[1].contentTask.push( this.listTasks[i].contentTask[j]);  
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
    
    $scope.addTask = function(indexCurrent) {
        for(var i=0; i<$scope.listTasks.length; i++){
            for(var j=0; j<$scope.listTasks[i].contentTask.length; j++){
                $scope.numberTasks = $scope.numberTasks +1;
            }
        }
        console.log($scope.numberTasks);
        var jsonStr = $scope.listTasks[indexCurrent].contentTask;
            //console.log(abc);
        var new_obj = {
            "nameTask": $scope.a.itemNameTask,
            "dueDay": $scope.a.itemDueDate,
            "statusTask": "inprogress",
            "taskId": $scope.numberTasks,
            "checkedTask": false
        };
        jsonStr.push( new_obj );
        
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
    
//    // Update due date
//    $scope.updateTimeTask = function(indexCurrent){
//        $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].dueDay = $scope.a.itemUpdateDueDate;
//    }
    
//    // Set reminder
//    $scope.remindTimeTask = function(indexCurrent){
//        $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].reminder = $scope.a.reminderTime;
//    }
    
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
//    $scope.changeStatusTask = function(indexCurrent){
//        if($scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask=="inprogress"){
//            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask = "completed";
//            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].checkedTask = true;
//        }
//        else{
//            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].statusTask = "inprogress";
//            $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].checkedTask = false;
//        }
//    }
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
    
    //
//    var total = 0;
//    var todaySS = new Date();
//    for(var i=0; i<ItemService.listTasks.length; i++)
//    {
//        for(var j=0; j<ItemService.listTasks[i].contentTask.length; j++)
//        {
//            var timeSS = new Date(ItemService.listTasks[i].contentTask[j].reminder);
//            if(timeSS<=todaySS && ItemService.listTasks[i].contentTask[j].remindActive == true){
//                $scope.numberReminder = $scope.numberReminder+1;
//                console.log(true);
//            }
//        }
//    }
});  

app.controller('pageslideCtrl',['$scope', '$rootScope',function($scope, $rootScope){
//    $scope.checkedright = false; // This will be binded using the ps-open attribute
//    $scope.checkedleft = false;
    
    // Show or close pageslide task
//    $scope.toggle = function(indexCurrent, position){
//        if(($scope.a.indexTask==indexCurrent || ($scope.a.indexTask!=indexCurrent && $scope.checkedright==false)) && position=="right"){
//            $scope.checkedright = !$scope.checkedright;
//            $scope.checkedleft = false;
//        }
//        if( position=="left"){
//            $scope.checkedleft = !$scope.checkedleft;
//            $scope.checkedright = false;
//        }
//        $scope.a.indexTask = indexCurrent;
//        $scope.a.itemUpdateDueDate = $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].dueDay;
//        $scope.a.reminderTime = $scope.moduleService.listTasks[$scope.valueIndex].contentTask[indexCurrent].reminder;
//    }
    $scope.toggle = function(indexCurrent, position){
        for(var i=0; i<$scope.listTasks[$scope.valueIndex].contentTask.length; i++){
            if($scope.listTasks[$scope.valueIndex].contentTask[i].taskId==indexCurrent){
                if(($scope.a.indexTask==i || ($scope.a.indexTask!=i && $scope.checkedright==false)) && position=="right"){
                    $rootScope.checkedright = !$rootScope.checkedright;
                    $rootScope.checkedleft = false;
                }
                
                $scope.a.indexTask = i;
                $scope.a.itemUpdateDueDate = $scope.listTasks[$scope.valueIndex].contentTask[i].dueDay;
                $scope.a.reminderTime = $scope.listTasks[$scope.valueIndex].contentTask[i].reminder;
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
        for(var i=0; i<$scope.listTasks[$scope.valueIndex].contentTask.length; i++){
            if($scope.listTasks[$scope.valueIndex].contentTask[i].taskId==indexCurrent){
                if($scope.listTasks[$scope.valueIndex].contentTask[i].statusTask=="inprogress"){
                    $scope.listTasks[$scope.valueIndex].contentTask[i].statusTask = "completed";
                    $scope.listTasks[$scope.valueIndex].contentTask[i].checkedTask = true;
                }
                $rootScope.checkedright = false;
            }
        }
    }
    
    $scope.saveInfoTask = function(indexCurrent){
        for(var i=0; i<$scope.listTasks[$scope.valueIndex].contentTask.length; i++){
            if($scope.listTasks[$scope.valueIndex].contentTask[i].taskId==indexCurrent){
                if($scope.a.itemRenameTask!=null && $scope.a.itemRenameTask!="")
                    $scope.listTasks[$scope.valueIndex].contentTask[i].nameTask = $scope.a.itemRenameTask;
                $scope.listTasks[$scope.valueIndex].contentTask[i].dueDay = $scope.a.itemUpdateDueDate;
                $scope.listTasks[$scope.valueIndex].contentTask[i].reminder = $scope.a.reminderTime;
            }
        }
        $scope.a.itemRenameTask = "";
        $rootScope.checkedright = false;
        $rootScope.checkedleft = false;
        if($scope.listTasks[1].contentTask.length > 0){
            for(var z=0; z<$scope.listTasks[1].contentTask.length; z++)
            {
                var dueDate = $scope.listTasks[1].contentTask[z].dueDay;
                if(todayDue!=dueDate)
                    $scope.listTasks[1].contentTask.pop($scope.listTasks[1].contentTask[z]);
            }
        }
    }
    
}]);

