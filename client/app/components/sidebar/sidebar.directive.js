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
    function SidebarController(fileAPI) {
        var vm = this;
        vm.typeCategories = [];

        vm.getTypeCategories = getTypeCategories;

        vm.getTypeCategories();

        function getTypeCategories() {
            fileAPI.getTypeCategories().then(function(data){
                vm.typeCategories = data;
                console.log('Received categories:', data);
            });
        }
    }

})();