(function() {

    'use strict';

    angular
        .module('libApp')
        .directive('libPagination', pagination);

    function pagination() {
        var directive = {
            restrict: 'E',
            scope: {
                ngModel: '=',
                totalItems: '@'
            },
            controller: PaginationController,
            controllerAs: pagination,
            templateUrl: 'app/components/pagination/pagination.html'
        };

        return directive;
    }

    /*@ngInject*/
    function PaginationController($scope) {
        var vm = this;
        vm.maxSize = 5;
    }

})();