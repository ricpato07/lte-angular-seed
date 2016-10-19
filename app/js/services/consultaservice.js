'use strict';

angular.module('myApp')
        .factory('ConsultaService', ['$q', '$http', 'configuration', 'Restangular',
            function ($q, $http, configuration, Restangular) {
                //Método general para hacer una llamada tipo GET al server declarado en configuration.apiEndpoint y con la url enviada por parámetro
                //configuration.apiEndpoint :  nombre del servidor que realiza las consultas a la bd ejem. http://localhost:8082/pruebaloginric/web/
                //url: nombre del método a llamar despues del nombre del servidor ejem. edades
                return{
                    getBlobURL: function (url) {
                        var str = "onmessage = function (event) { \
                                var xhr = new XMLHttpRequest(); \
                                xhr.onreadystatechange=function(){\
                                if (xhr.readyState==4 && xhr.status==200){\
                                    postMessage(xhr.responseText);\
                                }\
                            }; \
                            xhr.open('GET', '" + configuration.apiEndpoint + url + "' , false); \
                            xhr.send(); \
                            }";
                        return URL.createObjectURL(new Blob([str]), {type: 'application/javascript'});
                    },
                    //método para envía 1 parámetro al método getBlobURL
                    //url: nombre del método ejem: edades
                    //param:  nombre del parámitro ejem:edad
                    //value: valor del parámetro ejem: 20
                    getBlobURLParam1: function (url, param, value) {
                        return this.getBlobURL(url + "?" + param + "=" + value);
                    },
                    //método para enviar 1 o más parámetros el método getBlobURL
                    //url: nombre del método ejem: edades
                    //params: arreglo con los parámetros a agregar al método ejem: [{label:"edad",value:12},label:"nombre", value="juan"]
                    getBlobURLParams: function (url, params) {
                        if (params != undefined && params != null) {
                            var str = "";
                            for (var i = 0; i < params.length; i++) {
                                str += params[i].label + "=" + params[i].value + (i != params.length - 1 ? "&" : "");
                            }
                            return this.getBlobURL(url + "?" + str);
                        } else {
                            return this.getBlobURL(url);
                        }
                    },
                    /** 
                     * @description
                     * Método para mandar llamar una petición GET mediante un worker con el nombre y parámetros enviados
                     * 
                     * @param {string} metodo nombre del método
                     * @param {array} params arreglo con los parámetros a agregar al método ejem: [{label:"edad",value:12},label:"nombre", value="juan"]
                     * @returns {json} respuesta del llamado al método
                     */
                    getWorkerParams: function (metodo, params) {
                        var worker = new Worker(this.getBlobURLParams(metodo, params));
                        var defer = $q.defer();

                        worker.addEventListener('message', function (e) {
                            defer.resolve(JSON.parse(e.data));
                        }, false);
                        worker.postMessage("");

                        return defer.promise;
                    },
                    /** 
                     * @description
                     * Método para mandar llamar una petición GET mediante un worker con el nombre y parámetros enviados
                     * 
                     * @param {string} metodo nombre del método
                     * @returns {json} respuesta del llamado al método
                     */
                    getWorker: function (metodo) {
                        return this.getWorkerParams(metodo, null);
                    },
                    /** 
                     * @description
                     * Método que realiza una petición GET mediante la libreria Restangular
                     * 
                     * @param {string} metodo nombre del método
                     * @returns {json} respuesta del llamado al método
                     */
                    getRestAngular: function (metodo) {
                        return Restangular.one(metodo).get();
                    },
                    /** 
                     * @description
                     * Método que realiza una petición POST con la libreria Restangular
                     * 
                     * @param {string} metodo nombre del método
                     * @param {string} params objeto con los parámetros para realizar el POST ejem: {nombre:"Juan", ap_paterno:"Robles", edad:20}
                     * @returns {json} respuesta del llamado al método
                     */
                    setRestAngular: function (metodo, params) {
                        return Restangular.all(metodo).post(params);
                    },
                    /** 
                     * @description
                     * Método que obtiene la ruta absoluta del sitio
                     * 
                     * @param {string} url url que se agrega a la ruta absoluta ejem:url=/resources/ quedaría como: http://localhost:3000/resources/
                     * @returns {json} url absoluta con el url al final de la dirección
                     */
                    getAbsoluteUrl: function (url) {
                        var a;
                        if (!a)
                            a = document.createElement('a');
                        a.href = url;
                        return a.href;
                    },
                    /** 
                     * @description
                     * Método que obtiene la información dada por un json desde la ruta /resources
                     * 
                     * @param {string} name nombre del archivo json a obtener
                     * @returns {promise} información del llamado como promise para la información se obtiene como data
                     */
                    getLocalJSON: function (name) {
                        return $http.get(this.getAbsoluteUrl("/resources/") + name + '.json');
                    }
                }
            }]);

