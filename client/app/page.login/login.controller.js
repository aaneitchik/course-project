(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('LoginController', LoginController);

    /*@ngInject*/
    function LoginController($scope, $state, authService, msgService) {
        var vm = this;
        vm.userInfo = {};

        vm.login = login;

        function login() {
            authService.login(vm.userInfo).then(function(user) {
                msgService.success('Logged in successfully!');
                $scope.setCurrentUser(user);
                $state.go('browse');
            }, function() {
                msgService.error('Sorry, there was an error while logging in.');
            });
        }
    }

})();