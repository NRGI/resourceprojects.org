'use strict';

angular
    .module('app')
    .directive('nrgiCompanyTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiCompanyTableCtrl',
            scope: {
                companies: '=',
                group: '=',
                stake: '=',
                project:'=',
                site:'=',
                contract:'=',
                concession:'=',
                incorporated: '=',
                operation: '='
            },
            templateUrl: '/partials/directives/templates/nrgi-company-table'
        };
    });
