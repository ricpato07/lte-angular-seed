'use strict';

angular.module('myApp', [
    'ui.router',
    'services.config',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.pagination',
    'restangular',
    'ui.bootstrap',
    'naif.base64',
    'webcam',
    'angular-bind-html-compile'
])
        .config(['$stateProvider', '$urlRouterProvider', 'configuration', '$httpProvider', 'RestangularProvider','$provide',
            function ($stateProvider, $urlRouterProvider, configuration, $httpProvider, RestangularProvider,$provide) {

                RestangularProvider.setBaseUrl(configuration.apiEndpoint);

                $httpProvider.interceptors.push('myMaskInterceptor');
                
                //configurar ui-grid para que tenga textos en español
                $provide.decorator('GridOptions', ['$delegate', 'i18nService', function ($delegate, i18nService) {
                        var gridOptions;
                        gridOptions = angular.copy($delegate);
                        gridOptions.initialize = function (options) {
                            var initOptions;
                            initOptions = $delegate.initialize(options);
                            return initOptions;
                        };
                        //es is the language prefix you want
                        i18nService.setCurrentLang('es');
                        return gridOptions;
                    }]);

                $urlRouterProvider.otherwise('/login');
                $stateProvider
                         .state('login', {
                            url: '/login',
                            templateUrl: 'views/login.html',
                            controller: 'LoginController'
                        })
                        .state('app', {
                            url: '/panel',
                            templateUrl: 'views/panel/layout.html',
                            controller: 'MainController'
                        })
                        .state('app.404', {
                            url: '/404',
                            templateUrl: '404.html'
                        })
                        .state('app.inicio', {
                            url: '/inicio',
                            templateUrl: 'views/panel/inicio.html'
                        })
                        .state('app.tarjeta_basica', {
                            url: '/tarjeta_basica',
                            templateUrl: 'views/panel/tarjeta_basica.html',
                            controller: 'TarjetaBasicaController'
                        })
                         .state('app.tarjeta_basicat', {
                            url: '/tarjeta_basicat',
                            templateUrl: 'views/panel/tarjeta_basicat.html',
                            controller: 'TarjetaBasicaController'
                        })
                         .state('app.consulta_tarjetas', {
                            url: '/consulta_tarjetas',
                            templateUrl: 'views/panel/consulta_tarjetas.html',
                            controller: 'ConsultaTarjetaController'
                        })
                          .state('app.consulta_tarjetas_grid', {
                            url: '/consulta_tarjetas_grid',
                            templateUrl: 'views/panel/consulta_tarjetas_grid.html',
                            controller: 'ConsultaTarjetagridController'
                        })

            }]);
