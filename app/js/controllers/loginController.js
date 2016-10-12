'use strict';

angular.module('myApp')
        .controller('LoginController', ['$scope', '$state', 'AuthService',
            function ($scope, $state, AuthService) {

                $scope.usuario = {user: null, password: null};

                $scope.ingresar = function () {
                    AuthService.setDatosUsuario($scope.usuario);
                    $state.go("app.tarjeta_basica");
                };

            }]);
