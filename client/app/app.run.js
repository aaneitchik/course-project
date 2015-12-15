(function () {

    'use strict';

    angular
        .module('libApp')
        .run(runBlock);

    /*@ngInject*/
    function runBlock($state, $rootScope, authService, globalData) {
        $rootScope.loginOrSignupPage = loginOrSignupPage;

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                globalData.setCategory('All');
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