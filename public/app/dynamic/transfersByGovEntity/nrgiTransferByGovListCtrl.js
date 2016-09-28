'use strict';

angular.module('app')
    .controller('nrgiTransferByGovListCtrl', function (
        $scope,
        $rootScope,
        nrgiAuthSrvc,
        nrgiIdentitySrvc,
        nrgiTransfersByGovSrvc
    ) {
        var limit = 3000,
            currentPage = 0,
            totalPages = 0;

        var searchOptions = {skip: currentPage * limit, limit: limit};
        $scope.count =0;
        $scope.busy = false;
        $scope.transfers=[];
        var header_transfer = [];
        var fields = [];
        var country_name = '';
        var company_name = '';
        $scope.currency = '';
        $scope.year = '';
        $scope.load = function(searchOptions) {
            nrgiTransfersByGovSrvc.query(searchOptions, function (response) {
                var companies = [],
                    countries = [];
                $scope.count = response.count;
                $scope.transfers = response.data;
                totalPages = Math.ceil(response.count / limit);
                currentPage = currentPage + 1;
                $scope.year_selector = _.countBy(response.data, "transfer_year");
                $scope.currency_selector = _.countBy(response.data, "transfer_unit");
                _.each(response.data, function (transfer) {
                    companies.push(transfer.company);
                    countries.push(transfer.country);
                });
                $scope.company_selector = _.countBy(companies, "company_name");
                $scope.country_selector = _.countBy(countries, "name");
            });
        }

        $scope.load(searchOptions);

        $scope.$watch('year_filter', function(year) {
            $scope.year = year;
            if(year) {
                searchOptions.skip=0;
                searchOptions.limit= 0;
                searchOptions.transfer_year = year;
                if($scope.currency) {
                    searchOptions.transfer_unit = $scope.currency;
                }
                $scope.load(searchOptions);
            }
            if($scope.year=='' && $scope.currency){
                searchOptions = {skip:0, limit:0, transfer_unit:searchOptions.transfer_unit }
                $scope.load(searchOptions);
            } else if($scope.year=='' && $scope.currency==''){
                searchOptions = {skip:0, limit:0}
                $scope.load(searchOptions);
            }
        });
        $scope.$watch('currency_filter', function(currency) {
            $scope.currency = currency;
            if(currency) {
                searchOptions.skip=0;
                searchOptions.limit=0;
                searchOptions.transfer_unit = currency;
                if($scope.year) {
                    searchOptions.transfer_year = $scope.year;
                }
                $scope.load(searchOptions);
            }
            if($scope.currency=='' && $scope.year){
                searchOptions = {skip:0, limit:0, transfer_year:searchOptions.transfer_year }
                $scope.load(searchOptions);
            } else if($scope.year=='' && $scope.currency==''){
                searchOptions = {skip:0, limit:0}
                $scope.load(searchOptions);
            }
        });

        $scope.loadMore = function() {
            if ($scope.busy) return;
            $scope.busy = true;
            if(currentPage < totalPages) {
                nrgiTransfersByGovSrvc.query({skip: currentPage*limit, limit: limit}, function (response) {
                    $scope.transfers = _.union($scope.transfers, response.data);
                    currentPage = currentPage + 1;
                    $scope.busy = false;
                });
            }
        };

        var headers = [
            {name: 'Year', status: true, field: 'transfer_year'},
            {name: 'Paid by', status: true, field: 'company'},
            {name: 'Paid to', status: true, field: 'country'},
            {name: 'Gov entity', status: true, field: 'transfer_gov_entity'},
            {name: 'Level ', status: true, field: 'transfer_level'},
            {name: 'Payment Type', status: true, field: 'transfer_type'},
            {name: 'Currency', status: true, field: 'transfer_unit'},
            {name: 'Value ', status: true, field: 'transfer_value'}];
        angular.forEach(headers, function (header) {
            if (header.status != false && header.status != undefined) {
                header_transfer.push(header.name);
                fields.push(header.field);
            }
        });
        $scope.getHeaderTransfers = function () {
            return header_transfer
        };

        $scope.load_all = function(){
            if ($scope.busy) return;
            $scope.busy = true;
            nrgiTransfersByGovSrvc.query({skip: 0, limit: 0}, function (response) {
                $scope.csv_transfers = [];
                angular.forEach(response.data, function (transfer, key) {
                    $scope.csv_transfers[key] = [];
                    angular.forEach(fields, function (field) {
                        if (field == 'country') {
                            country_name = '';
                            if (transfer[field] != undefined) {
                                country_name = transfer[field].name.toString();
                                country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
                            }
                            $scope.csv_transfers[key].push(country_name);
                        }
                        if (field == 'company') {
                            company_name = '';
                            if (transfer[field] != undefined) {
                                company_name = transfer[field].company_name.toString();
                                company_name = company_name.charAt(0).toUpperCase() + company_name.substr(1);
                            }
                            $scope.csv_transfers[key].push(company_name);
                        }
                        if (field != 'company' && field != 'country') {
                            $scope.csv_transfers[key].push(transfer[field])
                        }
                    })
                });
            });
        }

    });