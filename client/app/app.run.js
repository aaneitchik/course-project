(function () {

    'use strict';

    angular
        .module('libApp')
        .run(runBlock);

    /*@ngInject*/
    function runBlock($state, $rootScope, authService) {
        $rootScope.loginOrSignupPage = loginOrSignupPage;

        $rootScope.globalData = {
            selectedCategory: 'All',
            selectedSubcategory: 'All'
        };

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.globalData.selectedCategory = 'All';
                $rootScope.globalData.selectedSubcategory = 'All';
                if (toState.authenticate && !authService.isAuthenticated()) {
                    console.log('not authenticated');
                    $state.go('login');
                    event.preventDefault();
                }
            });

        function loginOrSignupPage() {
            return $state.includes('login') || $state.includes('signup');
        }

    }

})();