(function () {

    'use strict';

    angular
        .module('libApp')
        .controller('BrowseController', BrowseController);

    /*@ngInject*/
    function BrowseController($scope, $rootScope, fileAPI) {
        var vm = this;
        vm.fileList = [];

        //pagination
        vm.currentPage = 1;
        vm.maxSize = 5;
        vm.pageSize = 10;
        vm.selectedCategory = 'All';

        vm.getFiles = getFiles;
        vm.getFilesByPage = getFilesByPage;
        vm.getNumberOfFiles = getNumberOfFiles;
        vm.pageChanged = pageChanged;
        vm.watchCategory = watchCategory;

        vm.getNumberOfFiles();
        vm.watchCategory();

        //////////////////////////

        function getFiles() {
            fileAPI.getFiles().then(function (data) {
                console.log('Files received: ', data);
            });
        }

        function getFilesByPage() {
            fileAPI.getFilesByPage(vm.currentPage, vm.pageSize, vm.selectedCategory).then(function (data) {
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
            vm.getFilesByPage();
        }

        function watchCategory() {
            $rootScope.$watch('globalData.selectedCategory', function() {
                vm.selectedCategory = $rootScope.globalData.selectedCategory;
                vm.getFilesByPage();
            });
        }
    }

})();