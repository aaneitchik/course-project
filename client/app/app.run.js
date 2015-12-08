(function() {

    'use strict';

    angular
        .module('libApp')
        .run(runBlock);

    /*@ngInject*/
    function runBlock($rootScope) {
        $rootScope.globalData = {
          selectedCategory: 'All',
            selectedSubcategory: 'All'
        };

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $rootScope.globalData.selectedCategory = 'All';
                $rootScope.globalData.selectedSubcategory = 'All';
            });
    }

})();