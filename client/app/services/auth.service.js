(function () {

    'use strict';

    angular
        .module('libApp')
        .factory('authService', authService);

    /*@ngInject*/
    function authService($http, $cookies, $q, Session) {
        var service = {
            isAuthenticated: isAuthenticated,
            getUser: getUser,
            login: login,
            logout: logout,
            signup: signup,
            tryLoginWithCookies: tryLoginWithCookies
        };

        return service;

        function isAuthenticated() {
            return !!Session.user;
        }

        function getUser() {
            return $cookies.getObject('sessionId');
        }

        function login(userInfo) {
            return $http.post('/api/login', userInfo).then(function (res) {
                Session.create(res.data.sessionId, res.data.user);
                $cookies.putObject('sessionId', res.data.sessionId);
                return Session.user;
            });
        }

        function logout() {
            return $http.post('/api/logout').then(function(res) {
                Session.destroy();
                $cookies.remove('sessionId');
                return res;
            });
        }

        function signup(userInfo) {
            return $http.post('/api/signup', userInfo).then(function (res) {
                Session.create(res.data.sessionId, res.data.user);
                $cookies.putObject('sessionId', res.data.sessionId);
                return Session.user;
            });
        }

        function tryLoginWithCookies() {
            var tryLogin = $q.defer();
            if($cookies.getObject('sessionId')) {
                var sessionId = $cookies.getObject('sessionId');
                $http.post('/api/login_with_cookies').then(function(res) {
                    Session.create(sessionId, res.data);
                    tryLogin.resolve(Session.user);
                }, function() {
                    tryLogin.reject();
                });
            }
            else {
                tryLogin.reject();
            }
            return tryLogin.promise;
        }
    }

})();