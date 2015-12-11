(function () {

    'use strict';

    angular
        .module('libApp')
        .controller('SignupController', SignupController);

    /*@ngInject*/
    function SignupController($state, authService, msgService) {
        var vm = this;
        vm.userInfo = {};

        vm.signup = signup;

        function signup() {
            authService.signup(vm.userInfo).then(function (user) {
                msgService.success('Signed up successfully!');
                $scope.setCurrentUser(user);
                $state.go('browse');
            }, function () {
                msgService.error('Sorry, there was an error while logging in.');
            });
        }
    }

})();