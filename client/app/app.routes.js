(function() {
    'use strict';

    angular
        .module('libApp')
        .config(routeConfig);

    /*@ngInject*/
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('browse', {
                url: '/',
                params: {
                    category: 'All',
                    subcategory: 'All'
                },
                controller: 'BrowseController',
                controllerAs: 'browse',
                templateUrl: 'app/page.browse/browse.html',
                authenticate: true
            }).state('addfile', {
                url: '/addfile',
                controller: 'AddFileController',
                controllerAs: 'addfile',
                templateUrl: 'app/page.addfile/addfile.html',
                authenticate: true
            }).state('editfile', {
                url: '/editfile/:id',
                params: {
                    id: null
                },
                controller: 'EditFileController',
                controllerAs: 'editfile',
                templateUrl: 'app/page.editfile/editfile.html',
                authenticate: true
            }).state('error', {
                url: '/error/:status',
                params: {
                    status: null
                },
                controller: 'ErrorController',
                controllerAs: 'error',
                templateUrl: 'app/page.error/error.html',
                authenticate: true
            }).state('fileinfo', {
                url: '/fileinfo/:id',
                params: {
                    id: null
                },
                controller: 'FileinfoController',
                controllerAs: 'fileinfo',
                templateUrl: 'app/page.fileinfo/fileinfo.html',
                authenticate: true
            }).state('login', {
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'login',
                templateUrl: 'app/page.login/login.html',
                authenticate: false
            }).state('search', {
                url: '/search',
                controller: 'SearchController',
                controllerAs: 'search',
                params: {
                  tag: null
                },
                templateUrl: 'app/page.search/search.html',
                authenticate: true
            }).state('signup', {
                url: '/signup',
                controller: 'SignupController',
                controllerAs: 'signup',
                templateUrl: 'app/page.signup/signup.html',
                authenticate: false
            });

        $urlRouterProvider.otherwise('/');
    }
})();