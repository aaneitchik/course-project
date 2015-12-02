(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('AddFileController', AddFileController);

    /*@ngInject*/
    function AddFileController(fileAPI) {
        var vm = this;
        vm.fileInfo = {};
        vm.fileCategories = [];

        vm.getFileCategories = getFileCategories;
        vm.uploadFile = uploadFile;

        vm.getFileCategories();

        function getFileCategories() {
            fileAPI.getTypeCategories().then(function(data) {
                vm.fileCategories = data;
            });
        }

        function uploadFile() {
            fileAPI.uploadFile(vm.fileInfo, vm.file).then(function(data) {
                console.log('File uploaded successfully!');
            });
        }
    }

})();