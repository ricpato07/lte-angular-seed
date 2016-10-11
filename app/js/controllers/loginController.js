'use strict';

angular.module('myApp')
        .controller('LoginController', ['$scope', '$state',
            function ($scope,$state) {
                
                $scope.ingresar = function(){
                    $state.go("app.tarjeta_basica");
                };
            
            }]);
