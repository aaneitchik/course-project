(function () {

    'use strict';

    angular
        .module('libApp')
        .config(httpProviderConfig)
        .factory('authInterceptor', authInterceptor);

    /*@ngInject*/
    function httpProviderConfig($httpProvider) {
        $httpProvider.interceptors.push(['$injector', function($injector) {
            return $injector.get('authInterceptor');
        }]);
    }

    /*@ngInject*/
    function authInterceptor($injector, $rootScope, $q) {
        var interceptor = {
            responseError: responseError
        };

        return interceptor;

        function responseError(response) {
            var $state = $injector.get('$state');
            switch(response.status) {
                case 401:
                    $state.go('login');
                    break;
                default:
                    $state.go('error', {status: response.status});
            }
            return $q.reject(response);
        }
    }

})();