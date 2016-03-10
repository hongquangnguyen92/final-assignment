var app = angular.module('tasks', ["jsonService"]);

angular.module('jsonService', ['ngResource'])
.factory('LoginService', function($resource) {
    return $resource('../js/users.json',{ }, {
        getData: {method:'GET', isArray: false}
    });
});

app.controller('LoginController', function($scope, $rootScope, $window, LoginService){

    LoginService.get(function(data){
            $rootScope.listUsers = data.listTask;
            $scope.lengthListUser = $scope.listUsers.length;
    });
    $scope.loginCheck = function(){
        // check id and password
        for(var i =0; i<$scope.listUsers.length; i++)
            if($scope.listUsers[i].userId == $scope.userId && $scope.listUsers[i].passWord == $scope.userPass)
            {
                
                $scope.currentUserName = $scope.listUsers[i].userName;
                $scope.currentUserId = $scope.listUsers[i].userId;
                //var user = [$scope.currentUserId, $scope.currentUserName];
                $scope.firstNameLetter = $scope.currentUserName.substring(0,1);
                localStorage.setItem("idUser", $scope.currentUserId);
                $window.location.href = 'file:///C:/Users/Win7x86/Desktop/Final_Assignment/html/to_do_page.html';
            }
    };
}); 