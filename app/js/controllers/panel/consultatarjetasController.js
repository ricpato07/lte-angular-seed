'use strict';

angular.module('myApp')
        .controller('ConsultaTarjetaController', ['$scope', '$stateParams', '$modal', 'ConsultaService', '$timeout', 'UtilService',
            function ($scope, $stateParams, $modal, ConsultaService, $timeout, UtilService) {

                $scope.filteredlist = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                $scope.maxSize = 5;
                $scope.lista = [];

                $scope.cargainfo = function () {
                    var metodo = "consultas/registros";
                    console.log(metodo);
                    ConsultaService.getRestAngular(metodo)
                            .then(function (result) {
                                console.log("result");
                                console.log(result);
                                $scope.lista = result;
                                //colocar documentos en arreglo principal
                                for (var i = 0; i < result.length; i++) {
                                    for (var j = 0; j < result[i].documentos.length; j++) {
                                        //ife
                                        if (result[i].documentos[j].id_documento == 1) {
                                            result[i].ife_docum = result[i].documentos[j];
                                        } else
                                        //comprobante domicilio
                                        if (result[i].documentos[j].id_documento == 2) {
                                            result[i].domicilio_docum = result[i].documentos[j];
                                        } else
                                        //comprobante ingresos
                                        if (result[i].documentos[j].id_documento == 3) {
                                            result[i].ingresos_docum = result[i].documentos[j];
                                        }
                                    }
                                }
                                $scope.pagination(1);
                            })
                            .catch(function (men) {
                                console.log("Exception: " + men);
                            })
                };
                $scope.cargainfo();


                $scope.pagination = function (currentPage) {
                    $scope.currentPage = currentPage;
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                            , end = begin + $scope.numPerPage;

                    $scope.filteredlist = $scope.lista.slice(begin, end);
                };

                $scope.openmodal = function (image) {
                    var modalInstance = $modal.open({
                        animation: true,
                        template: "<div style='text-align:right' class='modal-header'>\n\
                            <button class = 'btn btn-primary' ng-click = 'close()'> X </button>\n\
                            </div> \n\
                            <div class='modal-body' style='text-align:center;margin:0px;width:595px;height: 450px;overflow-y:scroll;'>\n\
                               <img class='img-responsive' class='col-xs-12' ng-src='" + image + "'>\n\
                            </div>",
                        controller: 'modalController'
                    });
                };


            }])
        .controller('modalController',['$scope','$modalInstance', function ($scope, $modalInstance) {

            $scope.close = function () {
                $modalInstance.close();
            };

        }]);
