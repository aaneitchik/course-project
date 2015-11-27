(function() {

    'use strict';

    angular
        .module('libApp')
        .controller('BrowseController', BrowseController);

    /*@ngInject*/
    function BrowseController(fileAPI) {
        var vm = this;
        vm.currentPage = 1;
        vm.totalPageNumber = 0;

        vm.getFiles = getFiles;
        vm.getFilesByPage = getFilesByPage;
        vm.getNumberOfFiles = getNumberOfFiles;
        vm.pageChanged = pageChanged();

        vm.getFiles();
        vm.getNumberOfFiles();

        var pageSize = 1;

        //////////////////////////

        function getFiles() {
            fileAPI.getFiles().then(function(data) {
                console.log('Files received: ', data);
            });
        }

        function getFilesByPage(pageNumber) {
            fileAPI.getFilesByPage(pageNumber).then(function(data) {
                console.log('Files on page ' + pageNumber + ' received: ', data);
            });
        }

        function getNumberOfFiles() {
            fileAPI.getNumberOfFiles().then(function(data) {
                vm.totalPageNumber = data/pageSize;
                console.log('Total number of files: ', data);
            });
        }

        function pageChanged() {
            vm.getFilesByPage(vm.currentPage);
            console.log('Page changed!');
        }
    }

})();