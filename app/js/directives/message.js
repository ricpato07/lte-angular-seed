'use strict';

angular.module('myApp')
    .directive('message', function () {
        return {
            template: '<div bind-html-compile="message.html"></div>',
            restrict: 'E',
            replace: true
        }
    });