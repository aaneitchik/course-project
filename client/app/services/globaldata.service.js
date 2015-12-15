(function() {

    'use strict';

    angular
        .module('libApp')
        .factory('globalData', globalData);

    /*@ngInject*/
    function globalData($rootScope) {
        var service = {
            category: 'All',
            subcategory: 'All',
            getCategory: getCategory,
            getSubcategory: getSubcategory,
            setCategory: setCategory,
            setSubcategory: setSubcategory
        };

        function getCategory() {
            return service.category;
        }

        function getSubcategory() {
            return service.subcategory;
        }

        function setCategory(category) {
            service.category = category;
            service.subcategory = 'All';
            $rootScope.$broadcast('category/subcategory changed');
        }

        function setSubcategory(subcategory) {
            service.subcategory = subcategory;
            $rootScope.$broadcast('category/subcategory changed');
        }

        return service;
    }

})();