(function() {

    'use strict';

    angular
        .module('libApp')
        .run(runBlock);

    /*@ngInject*/
    function runBlock($rootScope) {
        $rootScope.globalData = {
          selectedCategory: 'All'
        };

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                $rootScope.globalData.selectedCategory = 'All';
            });
    }

})();