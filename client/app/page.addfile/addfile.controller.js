(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('AddFileController', AddFileController);

    /*@ngInject*/
    function AddFileController($state, fileAPI, toasty) {
        var vm = this;
        vm.fileInfo = {};
        vm.fileCategories = [];

        vm.getFileCategories = getFileCategories;
        vm.uploadFile = uploadFile;

        //Validation
        vm.isCategorySelected = isCategorySelected;
        vm.isFileUploaded = isFileUploaded;

        vm.getFileCategories();

        function getFileCategories() {
            fileAPI.getTypeCategories().then(function(data) {
                vm.fileCategories = data;
            });
        }

        function isCategorySelected() {
            return !!vm.fileInfo.type;
        }

        function isFileUploaded() {
            return !!vm.file;
        }

        function uploadFile() {
            if(!isCategorySelected()) {
                toasty.error({
                    msg: 'You must select a category!'
                });
                return;
            }
            if(!isFileUploaded()) {
                toasty.error({
                    msg: 'You must upload a file!'
                });
                return;
            }

            fileAPI.uploadFile(vm.fileInfo, vm.file).then(function(result) {
                toasty.success({
                    msg: 'File uploaded successfully!'
                });
                $state.go('browse');
            }, function(result) {
                toasty.error({
                    msg: 'Sorry, there was en error on server.'
                });
            });
        }
    }

})();