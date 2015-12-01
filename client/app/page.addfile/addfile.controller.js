(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('AddFileController', AddFileController);

    /*@ngInject*/
    function AddFileController($scope, fileAPI) {
        var vm = this;
        vm.fileInfo = {};
        vm.fileCategories = [];
        //$scope.filesToUpload = [];

        vm.getFileCategories = getFileCategories;
        vm.saveFiles = saveFiles;
        vm.uploadFile = uploadFile;


        vm.getFileCategories();

        function getFileCategories() {
            fileAPI.getTypeCategories().then(function(data) {
                vm.fileCategories = data;
            });
        }

        function saveFiles() {
            //vm.fileInfo.files = angular.copy($scope.filesToUpload);
        }


        function uploadFile() {
            //vm.saveFiles();
            fileAPI.uploadFile(vm.fileInfo, vm.file).then(function(data) {
                console.log('File uploaded successfully!');
            });
        }
    }

})();