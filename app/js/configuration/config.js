'use strict';

angular.module('services.config', [])
    .constant('configuration', {
        apiEndpoint: 'http://192.168.11.141:8083/api',
        secure: 'false'
    });
