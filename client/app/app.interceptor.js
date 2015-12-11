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
    function authInterceptor($rootScope, $q, AUTH_EVENTS) {
        var interceptor = {
            responseError: responseError
        };

        return interceptor;

        function responseError(response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout
            }[response.status], response);
            return $q.reject(response);
        }
    }

})();