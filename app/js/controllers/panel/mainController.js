'use strict';

angular.module('myApp')
        .controller('MainController', ['$scope','$rootScope','AuthService',
            function ($scope,$rootScope,AuthService) {

                $rootScope.class_menu = "sidebar-mini";
                $scope.bcollapse = false;
                
                $scope.collapse = function(){
                    if(!$scope.bcollapse){
                       $rootScope.class_menu = "sidebar-mini sidebar-collapse"; 
                    }else{
                        $rootScope.class_menu = "sidebar-mini"; 
                    }
                    $scope.bcollapse = !$scope.bcollapse;
                };
                
                $scope.logout = function(){
                    AuthService.logout();
                };
                
                $scope.getUserLogged = function(){
                    $rootScope.usuario = AuthService.getDatosUsuario();
                };
                
                
            }]);

