'use strict';

angular.module('myApp')
        .controller('LoginController', ['$scope', '$state', 'AuthService', 'MessageService',
            function ($scope, $state, AuthService, MessageService) {
                $scope.forma = {};
                $scope.usuario = {user: null, password: null};
                MessageService.iniScope($scope);

                $scope.ingresar = function () {
                    if ($scope.forma.form.$invalid) {
                        MessageService.error("Es necesario colocar el usuario y la contraseña");
                        return;
                    }
                    var permisos =[{permiso:"inicio"},{permiso:"tarjeta_basica"},{permiso: "consulta_tarjetas"},{permiso: "consulta_tarjetas_grid"},{permiso: "graficas"}];
                    AuthService.setDatosUsuario($scope.usuario, permisos);
                    $state.go("app.inicio");
                };

                $scope.close_message = function () {
                    MessageService.close();
                };

            }]);
