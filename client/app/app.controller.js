(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('MainController', MainController);

    /*@ngInject*/
    function MainController($scope, authService) {

        $scope.currentUser = null;
        $scope.setCurrentUser = setCurrentUser;

        if(authService.tryLoginWithCookies()) {
            $scope.currentUser = authService.getUser();
        }

        function setCurrentUser(user) {
            $scope.currentUser = user;
        }
    }


})();