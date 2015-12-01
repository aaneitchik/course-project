(function() {
    'use strict';

    angular
        .module('libApp')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('browse', {
                url: '/',
                controller: 'BrowseController',
                controllerAs: 'browse',
                templateUrl: 'app/page.browse/browse.html'
            }).state('addfile', {
                url: '/addfile',
                controller: 'AddFileController',
                controllerAs: 'addfile',
                templateUrl: 'app/page.addfile/addfile.html'
            }).state('fileinfo', {
                url: '/fileinfo/:id',
                params: {
                    id: null
                },
                controller: 'FileinfoController',
                controllerAs: 'fileinfo',
                templateUrl: 'app/page.fileinfo/fileinfo.html'
            });

        $urlRouterProvider.otherwise('/');
    }
})();