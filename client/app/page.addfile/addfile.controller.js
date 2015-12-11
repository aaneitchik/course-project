(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('AddFileController', AddFileController);

    /*@ngInject*/
    function AddFileController($state, fileAPI, msgService) {
        var vm = this;
        vm.fileInfo = {};
        vm.fileCategories = [];
        vm.allowedSubcategories = [];
        vm.tagList = [];

        vm.addTags = addTags;
        vm.getFileCategories = getFileCategories;
        vm.uploadFile = uploadFile;

        //Validation
        vm.isCategorySelected = isCategorySelected;
        vm.isFileUploaded = isFileUploaded;

        vm.getFileCategories();

        function addTags() {
            vm.fileInfo.tags = [];
            vm.tagList.forEach(function(tag) {
                vm.fileInfo.tags.push(tag.text);
            });
        }

        function getFileCategories() {
            fileAPI.getTypeCategories().then(function(data) {
                vm.fileCategories = data;
                console.log(vm.fileCategories);
            });
        }

        function isCategorySelected() {
            return !!vm.fileInfo.category;
        }

        function isFileUploaded() {
            return !!vm.file;
        }

        function uploadFile() {
            if(!isCategorySelected()) {
                msgService.error('You must select a category!');
                return;
            }
            if(!isFileUploaded()) {
                msgService.error('You must upload a file!');
                return;
            }
            vm.addTags();
            fileAPI.uploadFile(vm.fileInfo, vm.file).then(function() {
                msgService.success('File uploaded successfully!');
                $state.go('browse');
            }, function() {
                msgService.error('Sorry, there was an error on server.');
            });
        }
    }

})();