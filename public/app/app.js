'use strict';
angular.module('app', [
    'angular.filter',
    'angular-underscore',
    'iso-3166-country-codes',
    'angular-google-analytics',
    'leaflet-directive',
    'ngDialog',
    'ngResource',
    'ngRoute',
    'tableSort',
    'ngCsv',
    'ngSanitize',
    'angularSpinner',
    'infinite-scroll',
    'nvd3',
    'textAngular'
]);

angular.module('app')
    .config(function($routeProvider, $locationProvider, AnalyticsProvider) {

        AnalyticsProvider
            .setAccount([{ tracker: 'UA-59246536-4', name: "resourceprojects.org" }])
            .logAllCalls(true)
            .startOffline(true);
        // role checks
        var routeRoleChecks = {
            supervisor: {auth: function(nrgiAuthSrvc) {
                return nrgiAuthSrvc.authorizeCurrentUserForRoute('admin')
            }},
            //researcher: {auth: function(nrgiAuthSrvc) {
            //    return nrgiAuthSrvc.authorizeCurrentUserForRoute('researcher')
            //}},
            //reviewer: {auth: function(nrgiAuthSrvc) {
            //    return nrgiAuthSrvc.authorizeCurrentUserForRoute('reviewer')
            //}},
            user: {auth: function(nrgiAuthSrvc) {
                return nrgiAuthSrvc.authorizeAuthenticatedUserForRoute()
            }}
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'nrgiMainCtrl'
            })
            ///////////////////
            ////ADMIN ROUTES///
            ///////////////////
            // Data Management
            .when('/admin/etl/datasets', {
                templateUrl: '/partials/admin/etl/datasets',
                controller: 'nrgiEtlCtrl'/*,
                resolve: routeRoleChecks.supervisor -- TODO */
            })
            .when('/admin/etl/datasets/new', {
                templateUrl: '/partials/admin/etl/create-dataset',
                controller: 'nrgiDatasetCreateCtrl'/*,
                resolve: routeRoleChecks.supervisor -- TODO */
            })
            .when('/admin/reconcile', {
                templateUrl: '/partials/admin/etl/reconcile',
                controller: 'nrgiReconcileCtrl'/*,
                 resolve: routeRoleChecks.supervisor -- TODO */
            })
            // Users
            .when('/admin/create-user', {
                templateUrl: '/partials/admin/users/create-user',
                controller: 'nrgiUserAdminCreateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/user-admin', {
                templateUrl: '/partials/admin/users/user-admin',
                controller: 'nrgiUserAdminCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/user-admin/:id', {
                templateUrl: '/partials/admin/users/user-admin-update',
                controller: 'nrgiUserAdminUpdateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            // Entity Management
            .when('/admin/sourceType-admin', {
                templateUrl: '/partials/admin/sourceTypes/sourceType-admin',
                controller: 'nrgiSourceTypeAdminCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/create-sourceType', {
                templateUrl: '/partials/admin/sourceTypes/create-sourceType',
                controller: 'nrgiSourceTypeAdminCreateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/sourceType-admin/:id', {
                templateUrl: '/partials/admin/sourceTypes/sourceType-admin-update',
                controller: 'nrgiSourceTypeAdminUpdateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/edit-about-page', {
                templateUrl: '/partials/admin/cms/aboutPage/edit-about-page',
                controller: 'nrgiAboutPageUpdateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/edit-glossary-page', {
                templateUrl: '/partials/admin/cms/glossaryPage/edit-glossary-page',
                controller: 'nrgiGlossaryPageUpdateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            .when('/admin/edit-landing-page', {
                templateUrl: '/partials/admin/cms/landingPage/edit-landing-page',
                controller: 'nrgiLandingPageUpdateCtrl',
                resolve: routeRoleChecks.supervisor
            })
            // // Unused
            // .when('/admin/commodity-admin', {
            //     templateUrl: '/partials/admin/commodities/commodity-admin',
            //     controller: 'nrgiCommodityAdminCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/create-commodity', {
            //     templateUrl: '/partials/admin/commodities/create-commodity',
            //     controller: 'nrgiCommodityAdminCreateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/commodity-admin/:id', {
            //     templateUrl: '/partials/admin/commodities/commodity-admin-update',
            //     controller: 'nrgiCommodityAdminUpdateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/company-admin', {
            //     templateUrl: '/partials/admin/companies/company-admin',
            //     controller: 'nrgiCompanyAdminCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/create-company', {
            //     templateUrl: '/partials/admin/companies/create-company',
            //     controller: 'nrgiCompanyAdminCreateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/company-admin/:id', {
            //     templateUrl: '/partials/admin/companies/company-admin-update',
            //     controller: 'nrgiCompanyAdminUpdateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/concession-admin', {
            //     templateUrl: '/partials/admin/concessions/concession-admin',
            //     controller: 'nrgiConcessionAdminCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/create-concession', {
            //     templateUrl: '/partials/admin/concessions/create-concession',
            //     controller: 'nrgiConcessionAdminCreateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/concession-admin/:id', {
            //     templateUrl: '/partials/admin/concessions/concession-admin-update',
            //     controller: 'nrgiConcessionAdminUpdateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/country-admin', {
            //     templateUrl: '/partials/admin/countries/country-admin',
            //     controller: 'nrgiCountryAdminCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/create-country', {
            //     templateUrl: '/partials/admin/countries/create-country',
            //     controller: 'nrgiCountryAdminCreateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/country-admin/:id', {
            //     templateUrl: '/partials/admin/countries/country-admin-update',
            //     controller: 'nrgiCountryAdminUpdateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/group-admin', {
            //     templateUrl: '/partials/admin/groups/group-admin',
            //     controller: 'nrgiGroupAdminCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/create-group', {
            //     templateUrl: '/partials/admin/groups/create-group',
            //     controller: 'nrgiGroupAdminCreateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/group-admin/:id', {
            //     templateUrl: '/partials/admin/groups/group-admin-update',
            //     controller: 'nrgiGroupAdminUpdateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/project-admin', {
            //     templateUrl: '/partials/admin/projects/project-admin',
            //     controller: 'nrgiProjectAdminCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/create-project', {
            //     templateUrl: '/partials/admin/projects/create-project',
            //     controller: 'nrgiProjectAdminCreateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/project-admin/:id', {
            //     templateUrl: '/partials/admin/projects/project-admin-update',
            //     controller: 'nrgiProjectAdminUpdateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            //.when('/admin/site-admin', {
            //    templateUrl: '/partials/admin/sites/site-admin',
            //    controller: 'nrgiSiteAdminCtrl',
            //    resolve: routeRoleChecks.supervisor
            //})
            //.when('/admin/create-site', {
            //    templateUrl: '/partials/admin/sites/create-site',
            //    controller: 'nrgiSiteAdminCreateCtrl',
            //    resolve: routeRoleChecks.supervisor
            //})
            //.when('/admin/site-admin/:id', {
            //    templateUrl: '/partials/admin/sites/site-admin-update',
            //    controller: 'nrgiSiteAdminUpdateCtrl',
            //    resolve: routeRoleChecks.supervisor
            //})
            // .when('/admin/source-admin', {
            //     templateUrl: '/partials/admin/sources/source-admin',
            //     controller: 'nrgiSourceAdminCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/create-source', {
            //     templateUrl: '/partials/admin/sources/create-source',
            //     controller: 'nrgiSourceAdminCreateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            // .when('/admin/source-admin/:id', {
            //     templateUrl: '/partials/admin/sources/source-admin-update',
            //     controller: 'nrgiSourceAdminUpdateCtrl',
            //     resolve: routeRoleChecks.supervisor
            // })
            //////////////////////////
            ////User Account Routes///
            //////////////////////////
            .when('/login', {
                templateUrl: '/partials/account/login',
                controller: 'nrgiLoginCtrl'
            })
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'nrgiProfileCtrl',
                resolve: routeRoleChecks.supervisor
            })
            //Entity Routes
            .when('/companies', {
                templateUrl: '/partials/dynamic/companies/company-list',
                controller: 'nrgiCompanyListCtrl'
            })
            .when('/company/:id', {
                templateUrl: '/partials/dynamic/companies/company-detail',
                controller: 'nrgiCompanyDetailCtrl'
            })
            .when('/concessions', {
                templateUrl: '/partials/dynamic/concessions/concession-list',
                controller: 'nrgiConcessionListCtrl'
            })
            .when('/concession/:id', {
                templateUrl: '/partials/dynamic/concessions/concession-detail',
                controller: 'nrgiConcessionDetailCtrl'
            })
            //.when('/concessions/map', {
            //    templateUrl: '/partials/projects/map'
            //})
            .when('/contracts', {
                templateUrl: '/partials/dynamic/contracts/contract-list',
                controller: 'nrgiContractListCtrl'
            })
            .when('/contract/:id', {
                templateUrl: '/partials/dynamic/contracts/contract-detail',
                controller: 'nrgiContractDetailCtrl'
            })
            .when('/fields', {
                templateUrl: '/partials/dynamic/sites/site-list',
                controller: 'nrgiSiteListCtrl'
            })
            .when('/field/:id', {
                templateUrl: '/partials/dynamic/sites/site-detail',
                controller: 'nrgiSiteDetailCtrl'
            })
            .when('/fields/map', {
                templateUrl: '/partials/dynamic/sites/mapSiteAndProject',
                controller: 'nrgiMapSiteCtrl'
            })
            .when('/projects', {
                templateUrl: '/partials/dynamic/projects/project-list',
                controller: 'nrgiProjectListCtrl'
            })
            .when('/project/:id', {
                templateUrl: '/partials/dynamic/projects/project-detail',
                controller: 'nrgiProjectDetailCtrl'
            })
            .when('/projects/map', {
                templateUrl: '/partials/dynamic/projects/map',
                controller: 'nrgiMapCtrl'
            })
            .when('/sites', {
                templateUrl: '/partials/dynamic/sites/site-list',
                controller: 'nrgiSiteListCtrl'
            })
            .when('/site/:id', {
                templateUrl: '/partials/dynamic/sites/site-detail',
                controller: 'nrgiSiteDetailCtrl'
            })
            .when('/sites/map', {
                templateUrl: '/partials/dynamic/sites/mapSiteAndProject',
                controller: 'nrgiMapSiteCtrl'
            })
            .when('/transfers', {
                templateUrl: '/partials/dynamic/transfers/transfer-list',
                controller: 'nrgiTransferListCtrl'
            })
            .when('/transfers_by_gov', {
                templateUrl: '/partials/dynamic/transfersByGovEntity/transferByGov-list',
                controller: 'nrgiTransferByGovListCtrl'
            })
            /////////////////////
            ////Helper groups////
            /////////////////////
            .when('/commodities', {
                templateUrl: '/partials/dynamic/commodities/commodity-list',
                controller: 'nrgiCommodityListCtrl'
            })
            .when('/commodity/:id', {
                templateUrl: '/partials/dynamic/commodities/commodity-detail',
                controller: 'nrgiCommodityDetailCtrl'
            })
            .when('/countries', {
                templateUrl: '/partials/dynamic/countries/country-list',
                controller: 'nrgiCountryListCtrl'
            })
            .when('/country/:id', {
                templateUrl: '/partials/dynamic/countries/country-detail',
                controller: 'nrgiCountryDetailCtrl'
            })
            .when('/groups', {
                templateUrl: '/partials/dynamic/groups/group-list',
                controller: 'nrgiGroupListCtrl'
            })
            .when('/group/:id', {
                templateUrl: '/partials/dynamic/groups/group-detail',
                controller: 'nrgiGroupDetailCtrl'
            })
           .when('/sources', {
                templateUrl: '/partials/dynamic/sources/source-list',
                controller: 'nrgiSourceListCtrl'
            })
            .when('/source/:id', {
                templateUrl: '/partials/dynamic/sources/source-detail',
                controller: 'nrgiSourceDetailCtrl'
            })
            .when('/source_types', {
                templateUrl: '/partials/dynamic/sourceTypes/sourceType-list',
                controller: 'nrgiSourceTypeListCtrl'
            })
            .when('/source_type/:id', {
                templateUrl: '/partials/dynamic/sourceTypes/sourceType-detail',
                controller: 'nrgiSourceTypeDetailCtrl'
            })

            /////////////
            ////Other////
            /////////////
            .when('/glossary', {
                templateUrl: '/partials/static/glossary/glossary',
                controller: 'nrgiGlossaryCtrl'
            })
            .when('/contribute', {
                templateUrl: '/partials/static/contribute'
            })
            .when('/about', {
                templateUrl: '/partials/static/about/about',
                controller: 'nrgiAboutCtrl'
            })
            .when('/pie-chart', {
                templateUrl: '/partials/dynamic/pieChart/pie-chart',
                controller: 'nrgiPieChartCtrl'
            })
            //.when('/model', {
            //    templateUrl: '/partials/main/dataModel'
            //})
            //.when('/namedGraphs', {
            //    templateUrl: '/partials/main/namedGraphs'
            //})
            //.when('/classes', {
            //    templateUrl: '/partials/main/classes'
            //})
            //.when('/instances/:id', {
            //    templateUrl: '/partials/main/instances'
            //})
            .otherwise('/', {
                templateUrl: '/partials/main/main',
                controller: 'nrgiMainCtrl'
            })
    });
    // .run(['$rootScope', '$location', '$window', function(
    // $rootScope,
    // $location,
    // $window
    // ){
    //
    // }

angular.module('app')
    .run(function(
        $rootScope,
        $routeParams,
        $location,
        $window,
        $http,
        nrgiAuthSrvc,
        nrgiNotifier
    ) {
        $rootScope._ = _;
        $rootScope.Object = Object;
        $rootScope.keys = $rootScope.Object.keys;
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            if(rejection === 'not authorized') {
                $location.path('/');
            }
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            var output=$location.path()+"?";
            angular.forEach($routeParams,function(value,key){
                output+=key+"="+value+"&";
            });
            output=output.substr(0,output.length-1);

            //console.log(output);
            $window.ga(['_trackPageview', output]);
        });
    });