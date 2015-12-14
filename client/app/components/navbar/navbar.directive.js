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
                templateUrl: 'app/components/navbar/navbar.html'
            };

            return directive;
        }

    })();