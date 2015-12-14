(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('FileinfoController', FileinfoController);

    /*@ngInject*/
    function FileinfoController($stateParams, fileAPI) {
        var vm = this;
        vm.contentLoaded = false;
        vm.file = {};

        vm.downloadFile = downloadFile;
        vm.getFileById = getFileById;

        vm.getFileById();

        function downloadFile() {
            $('#downloadBtn').attr('href', vm.downloadLink).attr("download", vm.file.filename);
        }

        function getFileById() {
            vm.contentLoaded = false;
            fileAPI.getFileById($stateParams.id).then(function(data) {
                vm.file = angular.copy(data);
                vm.downloadLink = fileAPI.downloadLink(vm.file._id);
                console.log('File received: ', data);
            }).finally(function() {
                vm.contentLoaded = true;
            });
        }
    }

})();