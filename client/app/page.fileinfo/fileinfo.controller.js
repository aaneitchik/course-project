(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('FileinfoController', FileinfoController);

    /*@ngInject*/
    function FileinfoController($stateParams, fileAPI) {
        var vm = this;
        vm.file = {};

        vm.downloadFile = downloadFile;
        vm.getFileById = getFileById;

        vm.getFileById();

        function downloadFile() {
            $("#downloadBtn").attr("href", vm.file.file).attr("download", vm.file.filename);
        }

        function getFileById() {
            fileAPI.getFileById($stateParams.id).then(function(data) {
                vm.file = angular.copy(data);
                console.log('File received: ', data);
            });
        }
    }

})();