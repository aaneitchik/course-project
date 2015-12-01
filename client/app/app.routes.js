(function() {
    'use strict';

    angular
        .module('libApp')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('browse', {
                url: '/',
                templateUrl: 'app/page.browse/browse.html',
                controller: 'BrowseController',
                controllerAs: 'browse'
            }).state('fileinfo', {
                url: '/fileinfo/:id',
                params: {
                    id: null
                },
                templateUrl: 'app/page.fileinfo/fileinfo.html'
            });

        $urlRouterProvider.otherwise('/');
    }
})();