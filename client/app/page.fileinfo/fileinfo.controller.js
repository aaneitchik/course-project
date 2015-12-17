(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('FileinfoController', FileinfoController);

    /*@ngInject*/
    function FileinfoController($state, $stateParams, fileAPI, msgService) {
        var vm = this;
        vm.contentLoaded = false;
        vm.file = {};
        vm.fileId = $stateParams.id;

        vm.deleteFile = deleteFile;
        vm.downloadFile = downloadFile;
        vm.getFileById = getFileById;

        vm.getFileById();

        function deleteFile() {
            fileAPI.deleteFileById(vm.fileId).then(function() {
                msgService.success('File deleted successfully!');
                $state.go('browse');
            }, function() {
                msgService.error('Sorry, there was an error on server');
            });
        }

        function downloadFile() {
            $('#downloadBtn').attr('href', vm.downloadLink).attr("download", vm.file.filename);
        }

        function getFileById() {
            vm.contentLoaded = false;
            fileAPI.getFileById(vm.fileId).then(function(data) {
                vm.file = angular.copy(data);
                vm.downloadLink = fileAPI.downloadLink(vm.file._id);
                console.log('File received: ', data);
            }).finally(function() {
                vm.contentLoaded = true;
            });
        }
    }

})();