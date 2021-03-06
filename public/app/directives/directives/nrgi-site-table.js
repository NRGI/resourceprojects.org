'use strict';

angular
    .module('app')
    .directive('nrgiSiteTable', function() {
        return {
            restrict: 'EA',
            controller: 'nrgiSiteTableCtrl',
            scope: {
                name:'=',
                id:'=',
                commodity: '=',
                status: '=',
                countryid:'=',
                country: '=',
                type: '=',
                commoditytype: '=',
                company: '='
            },
            templateUrl: '/partials/directives/templates/nrgi-site-table'
        };
    });
