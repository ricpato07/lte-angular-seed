'use strict';

angular.module('myApp')
        .controller('GraficasController', ['$scope', 'ConsultaService', 'UtilService',
            function ($scope, ConsultaService, UtilService) {

                $scope.options_pie = UtilService.pieChart();
                $scope.options_pie.chart.height = 450;
                //$scope.options_pie.chart.color = ['#4995C1', '#dd4b39', '#0EA6CB'];
                $scope.options_pie.chart.legendPosition = "top";
                $scope.options_pie.chart.pie = {
                    dispatch: {
                        elementClick: function (t, u) {
                            console.log('elementClick');
                        }
                    }
                };

                $scope.options_bar = UtilService.barChart();
                $scope.options_bar.chart.xAxis.axisLabel = "Nombres";
                $scope.options_bar.chart.yAxis.axisLabel = "Edades";
                $scope.options_bar.chart.rotateLabels = -45;
                $scope.options_bar.chart.height = 430;
//                $scope.option_bar.chart.color = ["#605ca8", "#FF55D4"];
                $scope.options_bar.chart.xAxis.axisLabelDistance = 100;
                $scope.options_bar.chart.discretebar = {
                    dispatch: {
                        elementClick: function (t, u) {
                            console.log('elementClick');
                            console.log(t);
                        }
                    }
                };


                $scope.data_pie = [];
                $scope.data_bar = [
                    {
                        key: "Edades",
                        values: []
                    }
                ];

                //inicializa api para actualizar la gráfica
                $scope.callback = function (scope, element) {
                    $scope.api = scope.api;
                };

                $scope.cargainfo = function () {
                    var name = "datos_graficas";
                    ConsultaService.getLocalJSON(name)
                            .then(function (result) {
                                var data = result.data;
                                var data_pie = [];
                                var data_bar = [];

                                for (var i = 0; i < data.length; i++) {
                                    data_pie.push({key: data[i].nombre, y: data[i].edad});
                                    data_bar.push({label: data[i].nombre, value: data[i].edad});
                                }
                                $scope.data_pie = data_pie;
                                $scope.data_bar[0].values = data_bar;
                                $scope.api.update();
                            })
                            .catch(function (men) {
                                console.log("Exception: " + men);
                            });
                };
                $scope.cargainfo();

            }]);

