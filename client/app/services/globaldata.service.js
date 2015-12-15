(function() {

    'use strict';

    var EVENTS = {
        categoryOrSubcategoryChanged: 'category/subcategory changed',
        userChanged: 'user changed'
    };

    angular
        .module('libApp')
        .constant('EVENTS', EVENTS)
        .factory('globalData', globalData);

    /*@ngInject*/
    function globalData($rootScope, EVENTS) {
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
            $rootScope.$broadcast(EVENTS.categoryOrSubcategoryChanged);
        }

        function setSubcategory(subcategory) {
            service.subcategory = subcategory;
            $rootScope.$broadcast(EVENTS.categoryOrSubcategoryChanged);
        }

        return service;
    }

})();