'use strict';

// Karma configuration
// Generated on Thu Apr 02 2015 17:02:14 GMT-0400 (EDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon-chai'],


        // list of files / patterns to load in the browser
        files: [
            'public/vendor/jquery/dist/jquery.js',
            'public/vendor/angular/angular.js',
            'public/vendor/angular-route/angular-route.js',
            'public/vendor/angular-mocks/angular-mocks.js',
            'public/vendor/angular-resource/angular-resource.js',
            'public/vendor/ngDialog/js/ngDialog.js',
            'public/vendor/toastr/toastr.js',
            'public/vendor/angular-nvd3/dist/angular-nvd3.min.js',
            'public/vendor/d3/d3.min.js',
            'node_modules/underscore/underscore.js',
            'public/vendor/angular-filter/dist/angular-filter.js',
            'public/vendor/iso-3166-country-codes-angular/dist/iso-3166-country-codes-angular.min.js',
            // 'public/vendor/angular-leaflet-directive/dist/angular-leaflet-directive.js',
            // 'public/vendor/leaflet/dist/leaflet.js',
            // 'public/vendor/ng-csv/build/ng-csv.js',
            // 'public/vendor/angular-tablesort/js/angular-tablesort.js',
            // 'public/vendor/angular-sanitize/angular-sanitize.js',
            // 'public/vendor/angular-route/angular-route.js',
            'public/vendor/angular-spinner/angular-spinner.js',
            'tests/unit/app.js',
            'public/app/**/*.js',
            'public/app/**/**/*.js',
            'tests/unit/common/**/*.spec.js',
            'tests/unit/controllers/**/*.spec.js',
            'tests/unit/directives/**/*.spec.js',
            'tests/unit/services/**/*.spec.js',
            'tests/unit/admin/**/*.spec.js'
            // 'tests/unit/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [
            'public/app/app.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit', 'coverage'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'public/app/**/*.js': ['coverage']
        },

        coverageReporter: {
            type : 'cobertura',
            // type : 'html',
            dir : './shippable/codecoverage'
        },

        // the default configuration
        junitReporter: {
            outputDir: './shippable/testresults', // results will be saved as $outputDir/$browserName.xml
            outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: true, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element,
            properties: {} // key value pair of properties to add to the <properties> section of the report
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome', 'PhantomJS', 'Safari'],
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
