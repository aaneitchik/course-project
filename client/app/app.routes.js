(function() {
    'use strict';

    angular
        .module('libApp')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('browse', {
                url: '/browse',
                templateUrl: 'app/page.browse/browse.html',
                controller: 'BrowseController',
                controllerAs: 'browse'
            }).state('fileinfo', {
                url: '/fileinfo',
                templateUrl: 'app/page.fileinfo/fileinfo.html'
            }).state('homepage', {
                url: '/',
                templateUrl: 'app/page.homepage/homepage.html'
            });

        $urlRouterProvider.otherwise('/');
    }
})();