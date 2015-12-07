(function () {

    'use strict';

    angular
        .module('libApp')
        .controller('BrowseController', BrowseController);

    /*@ngInject*/
    function BrowseController($rootScope, fileAPI) {
        var vm = this;
        vm.contentLoaded = false;
        vm.fileList = [];

        //pagination
        vm.currentPage = 1;
        vm.maxSize = 5;
        vm.pageSize = 6;
        vm.selectedCategory = 'All';

        vm.getFiles = getFiles;
        vm.getFilesByPage = getFilesByPage;
        vm.getNumberOfFiles = getNumberOfFiles;
        vm.pageChanged = pageChanged;
        vm.watchCategory = watchCategory;

        vm.getNumberOfFiles('All');
        vm.watchCategory();

        //////////////////////////

        function getFiles() {
            fileAPI.getFiles().then(function (data) {
                console.log('Files received: ', data);
            });
        }

        function getFilesByPage() {
            vm.contentLoaded = false;
            fileAPI.getFilesByPage(vm.currentPage, vm.pageSize, vm.selectedCategory).then(function (data) {
                vm.fileList = angular.copy(data);
                console.log('Files on page ' + vm.currentPage + ' received: ', data);
            }).finally(function() {
                vm.contentLoaded = true;
            });
        }

        function getNumberOfFiles(category) {
            fileAPI.getNumberOfFiles(category).then(function (data) {
                vm.totalItems = data;
                console.log('Total number of files: ', data);
            });
        }

        function pageChanged() {
            vm.getFilesByPage();
        }

        function watchCategory() {
            $rootScope.$watch('globalData.selectedCategory', function() {
                vm.selectedCategory = $rootScope.globalData.selectedCategory;
                vm.currentPage = 1;
                vm.getNumberOfFiles(vm.selectedCategory);
                vm.getFilesByPage();
            });
        }
    }

})();