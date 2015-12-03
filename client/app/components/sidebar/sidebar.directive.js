(function() {

    'use strict';

    angular
        .module('libApp')
        .directive('sidebar', sidebar);

    /*@ngInject*/
    function sidebar() {
        var directive = {
            restrict: 'E',
            controller: SidebarController,
            controllerAs: 'sidebar',
            templateUrl: 'app/components/sidebar/sidebar.html'
        };

        return directive;
    }

    /*@ngInject*/
    function SidebarController($rootScope, $state, fileAPI) {
        var vm = this;
        vm.typeCategories = [];

        vm.getTypeCategories = getTypeCategories;
        vm.isActiveState = isActiveState;
        vm.selectCategory = selectCategory;

        vm.getTypeCategories();

        function getTypeCategories() {
            fileAPI.getTypeCategories().then(function(data){
                vm.typeCategories = data;
                console.log('Received categories:', data);
            });
        }

        function isActiveState(state) {
            return $state.current.name === state;
        }

        function selectCategory(category) {
            $rootScope.globalData.selectedCategory = category;
        }
    }

})();