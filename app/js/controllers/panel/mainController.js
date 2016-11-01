'use strict';

angular.module('myApp')
        .controller('MainController', ['$scope', '$rootScope', 'AuthService',
            function ($scope, $rootScope, AuthService) {
                
                console.log("Sesión iniciada");
                console.log(new Date());

                $rootScope.class_menu = "sidebar-mini";
                $scope.bcollapse = false;

                $scope.collapse = function () {
                    if (!$scope.bcollapse) {
                        $rootScope.class_menu = "sidebar-mini sidebar-collapse";
                    } else {
                        $rootScope.class_menu = "sidebar-mini";
                    }
                    $scope.bcollapse = !$scope.bcollapse;
                };

                $scope.logout = function () {
                    AuthService.logout();
                };

                $scope.getUserLogged = function () {
                    $rootScope.usuario = AuthService.getDatosUsuario();
                };

                // se activa cuando termina el tiempo de IdleProvider.idle
                $scope.$on('IdleStart', function () {
                    console.log("IdleStart");
                    console.log(new Date());
                });
                //se activa cuanto termina el tiempo de IdleProvider.timeout
                $scope.$on('IdleTimeout', function () {
                    console.log("IdleTimeout");
                    console.log(new Date());
                    $scope.heart_beat();
                });
                //se activa cuanto se interrumpe el tiempo de IdleProvider.timeout
                $scope.$on('IdleEnd', function () {
                    console.log("IdleEnd");
                    console.log(new Date());
                });

                $scope.heart_beat = function () {
                    //manda llamar al token del backend para saber si sigue vigente
                    console.log("heartbeat");
                    console.log(new Date());
                    AuthService.logout();
                };

            }]);

