(function () {

    'use strict';

    angular
        .module('libApp')
        .directive('selectDropdown', selectDropdown);

    function selectDropdown() {
        var directive = {
            restrict: 'E',
            scope: {
                title: '=',
                items: '=',
                selectedItem: '=',
                ngModel: '='
            },
            controller: SelectDropdownController,
            controllerAs: 'select',
            templateUrl: 'app/components/select-dropdown/dropdown.html'
        };

        return directive;
    }

    /*@ngInject*/
    function SelectDropdownController($scope) {
        var vm = this;
        vm.selectItem = selectItem;

        function selectItem(item) {
            $scope.selectedItem = item.type || item;
            //change subcategories if this is category dropdown
            if(item.type) {
                $scope.ngModel = item.subcategories;
            }
        }
    }

})();