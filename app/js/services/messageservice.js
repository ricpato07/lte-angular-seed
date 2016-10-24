'use strict';

angular.module('myApp')
        .factory('MessageService', function () {
            var $scope;
            return {
                iniScope: function (scope) {
                    $scope = scope;
                },
                getMessage: function (text, type) {
                    var message = '<div ng-if="true">\n\
                                       <div class="alert alert-content.type alert-dismissible" role="alert">\n\
                                        <button type="button" class="close" ng-click="close_message()" aria-label="Close"><span\n\
                                            aria-hidden="true">&times;</span></button>\n\
                                            content.text\n\
                                            </div>\n\
                                       </div>';
                    message = message.replace("content.show", "true");
                    message = message.replace("content.text", text);
                    message = message.replace("content.type", type);
                    return message;
                },
                success: function (text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'success');
                },
                error: function ( text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'danger');
                },
                warning: function (text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'warning');
                },
                info: function (text) {
                    $scope.message = {};
                    $scope.message.html = this.getMessage(text, 'info');
                },
                close: function () {
                    $scope.message.html = null;
                }
            };
        });
