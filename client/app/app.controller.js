(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('MainController', MainController);

    /*@ngInject*/
    function MainController($rootScope, $scope, $state, authService, EVENTS) {

        $scope.currentUser = null;
        $scope.logout = logout;
        $scope.setCurrentUser = setCurrentUser;

        authService.tryLoginWithCookies().then(function(user) {
            $scope.setCurrentUser(user);
        });

        function logout() {
            authService.logout();
            $state.go('login');
        }

        function setCurrentUser(user) {
            $scope.currentUser = user;
            $rootScope.$broadcast(EVENTS.userChanged);
        }
    }


})();