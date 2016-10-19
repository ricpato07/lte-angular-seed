'use strict';

angular.module('myApp')
        .controller('ConsultaTarjetagridController', ['$scope', '$modal', '$timeout', 'ConsultaService', 'UtilService', 'uiGridConstants',
            function ($scope, $modal, $timeout, ConsultaService, UtilService, uiGridConstants) {

                $scope.gridOptions = UtilService.gridOptions();
                $scope.gridOptions.columnDefs = [{field: 'llave_cliente', displayName: 'BCA / folio', headerCellClass: 'cell_center', cellClass: 'cell_center'},
                    {field: 'usuario', displayName: 'Usuario', headerCellClass: 'cell_center'},
                    {field: 'getNombreCompleto()', displayName: 'Cliente', headerCellClass: 'cell_center'},
                    {field: 'rfc', displayName: 'RFC', headerCellClass: 'cell_center', enableFiltering: false},
                    {field: 'nom_empresa', displayName: 'Empresa', headerCellClass: 'cell_center'},
                    {field: 'rfc_empresa', displayName: 'RFC Empresa', headerCellClass: 'cell_center', cellClass: 'cell_center', enableFiltering: false},
                    {displayName: 'IFE', name: 'ife', cellTemplate: '<div> <a ng-click="grid.appScope.openmodal(row.entity.ife_docum.ruta_documento)">' +
                                '<i class="fa fa-download" aria-hidden="true"></a>' +
                                '</div>', headerCellClass: 'cell_center', cellClass: 'cell_center', enableFiltering: false}
                ];

                $scope.cargainfo = function () {
                    //var metodo = "consultas/registros";
                    var name = "data";
                    //ConsultaService.getRestAngular(metodo)
                    ConsultaService.getLocalJSON(name)
                            .then(function (promise) {
                                var result = promise.data;
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

                                $scope.result = result;
                                console.log($scope.result);

                                angular.forEach($scope.result, function (row) {
                                    row.getNombreCompleto = function () {
                                        return this.nombre_uno + ' ' + (this.nombre_dos==null?'':(this.nombre_dos + ' ')) + ' ' + this.ap_paterno + ' ' + this.ap_materno;
                                    };
                                    row.getLink = function () {
                                        return  this.ife_docum.ruta_documento;
                                    };
                                });

                                $scope.result_excel = [];
                                for (var i = 0; i < $scope.result.length; i++) {
                                    $scope.result_excel.push(
                                            {'BCA / Folio': $scope.result[i].llave_cliente,
                                                'Usuario': $scope.result[i].usuario,
                                                'Cliente':  $scope.result[i].nombre_uno + ' ' + ($scope.result[i].nombre_dos==null?'':($scope.result[i].nombre_dos + ' ')) +  $scope.result[i].ap_paterno + ' ' +  $scope.result[i].ap_materno,
                                                'RFC': $scope.result[i].rfc,
                                                'Empresa': $scope.result[i].nom_empresa,
                                                'RFC Empresa': $scope.result[i].rfc_empresa
                                            });
                                }

                            })
                            .catch(function (men) {
                                console.log("Exception: " + men);
                            });
                };
                $scope.cargainfo();


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

                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                };

                $scope.mostrar_filtros = function () {
                    $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
                    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                };
                
                var options_excel = {
                    headers: true,
                    sheetid: 'Datos'
                };

                $scope.exportarExcel = function () {
                    var file_name = "lista.xlsx";
                    var res = window.confirm("¿En verdad deseas exportar a Excel?");
                    if (res == true) {
                        alasql.promise('SELECT * INTO XLSX("' + file_name + '",?) FROM ?', [options_excel, $scope.result_excel])
                                .then(function (data) {
                                })
                                .catch(function (err) {
                                    console.log('Error: ', err);
                                });
                    }
                };


            }])
        .controller('modalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {

                $scope.close = function () {
                    $modalInstance.close();
                };

            }]);
