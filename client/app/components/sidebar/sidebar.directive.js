(
    /*
     This directive is for the sidebar.
     */

    function() {

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
    function SidebarController($state, fileAPI, globalData) {
        var vm = this;
        vm.typeCategories = [];

        vm.getTypeCategories = getTypeCategories;
        vm.isActiveCategory = isActiveCategory;
        vm.isActiveState = isActiveState;
        vm.isActiveSubcategory = isActiveSubcategory;
        vm.selectCategory = selectCategory;
        vm.selectSubcategory = selectSubcategory;

        vm.getTypeCategories();

        function getTypeCategories() {
            fileAPI.getTypeCategories().then(function(data){
                vm.typeCategories = data;
                console.log('Received categories:', data);
            });
        }

        function isActiveCategory(category) {
            return category === globalData.getCategory();
        }

        function isActiveSubcategory(subcategory) {
            return subcategory === globalData.getSubcategory();
        }

        function isActiveState(state) {
            return $state.current.name === state;
        }

        function selectCategory(category) {
            globalData.setCategory(category);
        }

        function selectSubcategory(subcategory) {
            globalData.setSubcategory(subcategory);
        }
    }

})();