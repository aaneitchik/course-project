(
    /*
     This directive is for the navbar.
     */

    function () {

        'use strict';

        angular
            .module('libApp')
            .directive('navbar', navbar);

        /*@ngInject*/
        function navbar() {
            var directive = {
                restrict: 'E',
                controller: NavbarController,
                controllerAs: 'navbar',
                templateUrl: 'app/components/navbar/navbar.html'
            };

            return directive;
        }

        /*@ngInject*/
        function NavbarController($scope, EVENTS) {
            var vm = this;
            vm.currentUser = $scope.currentUser;
            $scope.$on(EVENTS.userChanged, function() {
                console.log('changed user');
                console.log($scope.currentUser);
                vm.currentUser = $scope.currentUser;
            });
        }

    })();