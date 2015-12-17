(function () {

    'use strict';

    angular
        .module('libApp')
        .controller('EditFileController', EditFileController);

    /*@ngInject*/
    function EditFileController($state, $stateParams, fileAPI, msgService) {
        var vm = this;
        vm.fileCategories = [];
        vm.fileId = $stateParams.id;
        vm.fileInfo = {};
        vm.allowedSubcategories = [];
        vm.tagList = [];

        vm.addTags = addTags;
        vm.editFile = editFile;
        vm.getFileCategories = getFileCategories;
        vm.getFileToEdit = getFileToEdit;
        vm.loadTagsToView = loadTagsToView;

        vm.getFileToEdit();

        function addTags() {
            vm.fileInfo.tags = [];
            vm.tagList.forEach(function (tag) {
                vm.fileInfo.tags.push(tag.text);
            });
        }

        function editFile() {
            vm.addTags();
            console.log('Info to be changed: ', vm.fileInfo);
            fileAPI.editFile(vm.fileId, vm.fileInfo).then(function () {
                msgService.success('File edited successfully!');
                $state.go('fileinfo', {id: vm.fileId});
            }, function () {
                msgService.error('Sorry, there was an error on server');
            });
        }

        function getFileCategories() {
            fileAPI.getTypeCategories().then(function(data) {
                vm.fileCategories = data;
                vm.fileCategories.forEach(function(item) {
                    if(item.type === vm.fileInfo.category) {
                        vm.allowedSubcategories = angular.copy(item.subcategories);
                    }
                });
            });
        }

        function getFileToEdit() {
            fileAPI.getFileById(vm.fileId).then(function (data) {
                vm.fileInfo = angular.copy(data);
                vm.loadTagsToView();
                vm.getFileCategories();
            });
        }

        function loadTagsToView() {
            vm.fileInfo.tags.forEach(function (tag) {
                vm.tagList.push({text: tag});
            });
        }
    }

})();