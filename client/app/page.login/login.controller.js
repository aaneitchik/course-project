(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('LoginController', LoginController);

    /*@ngInject*/
    function LoginController($rootScope, $scope, $state, authService, msgService, AUTH_EVENTS) {
        var vm = this;
        vm.userInfo = {};

        vm.login = login;

        function login() {
            authService.login(vm.userInfo).then(function(user) {
                console.log(user);
                msgService.success('Logged in successfully!');
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $state.go('browse');
            }, function() {
                msgService.error('Sorry, there was an error while logging in.');
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        }
    }

})();