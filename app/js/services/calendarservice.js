'use strict';

angular.module('myApp')
        .factory('CalendarService', [
            function () {
                var formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                var dateOptions = {
                    formatYear: 'yy',
                    yearRange: 1,
                    startingDay: 1
                };
                var $scope;
                return{
                    getOptions: function (scope) {
                        $scope = scope;
                        return {
                            format: formats[0],
                            dateOptions: dateOptions,
                            open: function ($event, opened) {
                                $event.preventDefault();
                                $event.stopPropagation();
                                $scope.calendar[opened] = !$scope.calendar[opened];
                            },
                            disabled: function (date, mode) {
                                //deshabilita sabados y domingos
                                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                            }
                        };
                    }
                };
            }]);

