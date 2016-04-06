'use strict';

angular
    .module('app')
    .directive('nrgiProductionTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiProductionTableCtrl',
            scope: {
                projectlink: '=',
                id:'=',
                type:'='
            },
            templateUrl: '/partials/directives/templates/nrgi-production-table'
        };
    });
