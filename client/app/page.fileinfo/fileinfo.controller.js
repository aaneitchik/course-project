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
        vm.downloadLink = 'http://192.168.12.230:3000/api/download_file/';

        vm.downloadFile = downloadFile;
        vm.getFileById = getFileById;

        vm.getFileById();

        function downloadFile() {
            $("#downloadBtn").attr("href", vm.downloadLink + vm.file._id).attr("download", vm.file.filename);
        }

        function getFileById() {
            vm.contentLoaded = false;
            fileAPI.getFileById($stateParams.id).then(function(data) {
                vm.file = angular.copy(data);
                console.log('File received: ', data);
            }).finally(function() {
                vm.contentLoaded = true;
            });
        }
    }

})();