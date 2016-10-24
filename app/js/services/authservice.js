'use strict';

angular.module('myApp')
        .factory('AuthService', ['$state', '$rootScope', '$window',
            function ($state, $rootScope, $window) {
                return {
                    login: function (session) {
                        //subir como objeto json
                        $window.sessionStorage.setItem('session', JSON.stringify(session));
                    },
                    logout: function () {
                        $rootScope.session = undefined;
                        $window.sessionStorage.clear();
                        $state.go('login');
                    },
                    getSession: function () {
                        //convertir cadena a json
                        $rootScope.session = JSON.parse($window.sessionStorage.getItem('session'));
                        return $rootScope.session;
                    },
                    isLoggedIn: function () {
                        var session = this.getSession();
                        if (session === null) {
                            $state.go('login');
                        }
                        return true;
                    },
                    getPermisos: function () {
                        return this.getSession().permisos;
                    },
                    getDatosUsuario: function () {
                        return this.getSession().datosUsuario;
                    },
                    setDatosUsuario: function (datos_usuario, permisos) {
                        if (datos_usuario != undefined && datos_usuario != null) {
                            $rootScope.session = {};
                            $rootScope.session.datosUsuario = datos_usuario;
                            $rootScope.session.permisos = permisos;
                            $rootScope.session.logged = true;
                            this.login($rootScope.session);
                        }
                    },
                    validaPermiso: function (permiso) {
                        if (this.isLoggedIn()) {
                            var bencontrado = false;
                            var session = this.getSession();
                            if (session !== null) {
                                var permisos = session.permisos;
                            }
                            for (var i = 0; i < permisos.length; i++) {
                                if (permiso.indexOf(permisos[i].permiso) !== -1) {
                                    bencontrado = true;
                                    break;
                                }
                            }
                            return bencontrado;
                        }
                    }
                };
            }]);