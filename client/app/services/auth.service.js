(function () {

    'use strict';

    var AUTH_EVENTS = {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    };

    angular
        .module('libApp')
        .constant('AUTH_EVENTS', AUTH_EVENTS)
        .factory('authService', authService);

    /*@ngInject*/
    function authService($http, $cookies, Session) {
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
            return $cookies.getObject('user');
        }

        function login(userInfo) {
            return $http.post('/api/login', userInfo).then(function (res) {
                Session.create(res.data._id, res.data.local);
                $cookies.putObject('user', res.data);
                return res.data.local.email;
            });
        }

        function logout() {
            return $http.post('/api/logout').then(function(res) {
                Session.destroy();
                $cookies.remove('user');
                return res;
            });
        }

        function signup(userInfo) {
            return $http.post('/api/signup', userInfo).then(function (res) {
                Session.create(res.data._id, res.data.local);
                $cookies.putObject('user', res.data);
                return res.data.local.email;
            });
        }

        function tryLoginWithCookies() {
            if($cookies.getObject('user')) {
                var user = $cookies.getObject('user');
                console.log(user);
                Session.create(user._id, user.local.email);
                return true;
            }
            return false;
        }
    }

})();