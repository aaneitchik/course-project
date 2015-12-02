(function () {

    'use strict';

    angular
        .module('libApp')
        .controller('BrowseController', BrowseController);

    /*@ngInject*/
    function BrowseController(fileAPI) {
        var vm = this;
        vm.fileList = [];

        //pagination
        vm.currentPage = 1;
        vm.maxSize = 5;
        vm.pageSize = 10;

        vm.getFiles = getFiles;
        vm.getFilesByPage = getFilesByPage;
        vm.getNumberOfFiles = getNumberOfFiles;
        vm.pageChanged = pageChanged;

        vm.getFiles();
        vm.getNumberOfFiles();
        vm.getFilesByPage(1);

        //////////////////////////

        function getFiles() {
            fileAPI.getFiles().then(function (data) {
                console.log('Files received: ', data);
            });
        }

        function getFilesByPage() {
            fileAPI.getFilesByPage(vm.currentPage, vm.pageSize).then(function (data) {
                vm.fileList = angular.copy(data);
                console.log('Files on page ' + vm.currentPage + ' received: ', data);
            });
        }

        function getNumberOfFiles() {
            fileAPI.getNumberOfFiles().then(function (data) {
                vm.totalItems = data;
                console.log('Total number of files: ', data);
            });
        }

        function pageChanged() {
            console.log('Page changed!');
            vm.getFilesByPage();
        }
    }

})();