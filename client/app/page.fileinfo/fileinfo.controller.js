(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('FileinfoController', FileinfoController);

    /*@ngInject*/
    function FileinfoController($stateParams, fileAPI) {
        var vm = this;
        vm.file = {};

        vm.getFileById = getFileById;

        vm.getFileById();

        function getFileById() {
            fileAPI.getFileById($stateParams.id).then(function(data) {
                vm.file = angular.copy(data);
                console.log('File received: ', data);
            });
        }
    }

})();