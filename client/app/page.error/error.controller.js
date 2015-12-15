(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('ErrorController', ErrorController);

    /*@ngInject*/
    function ErrorController($stateParams) {
        var vm = this;
        vm.status = $stateParams.status;
    }

})();