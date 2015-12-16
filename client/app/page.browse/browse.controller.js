(function () {

    'use strict';

    angular
        .module('libApp')
        .controller('BrowseController', BrowseController);

    /*@ngInject*/
    function BrowseController($scope, $stateParams, fileAPI, globalData, EVENTS) {
        var vm = this;
        vm.contentLoaded = false;
        vm.fileList = [];

        //pagination
        vm.currentPage = 1;
        vm.maxSize = 5;
        vm.pageSize = 6;

        globalData.setCategory($stateParams.category);
        globalData.setSubcategory($stateParams.subcategory);

        vm.selectedCategory = globalData.getCategory();
        vm.selectedSubcategory = globalData.getSubcategory();

        vm.getFiles = getFiles;
        vm.getFilesByPage = getFilesByPage;
        vm.getNumberOfFiles = getNumberOfFiles;
        vm.pageChanged = pageChanged;
        vm.watchCategoryAndSubcategory = watchCategoryAndSubcategory;

        vm.getNumberOfFiles();
        vm.getFilesByPage();
        vm.watchCategoryAndSubcategory();

        function getFiles() {
            fileAPI.getFiles().then(function (data) {
                console.log('Files received: ', data);
            });
        }

        function getFilesByPage() {
            vm.contentLoaded = false;
            fileAPI.getFilesByPage(vm.currentPage, vm.pageSize, vm.selectedCategory, vm.selectedSubcategory).then(function (data) {
                vm.fileList = angular.copy(data);
                console.log('Files on page ' + vm.currentPage + ' received: ', data);
            }).finally(function() {
                vm.contentLoaded = true;
            });
        }

        function getNumberOfFiles() {
            fileAPI.getNumberOfFiles(vm.selectedCategory, vm.selectedSubcategory).then(function (data) {
                vm.totalItems = data;
                console.log('Total number of files: ', data);
            });
        }

        function pageChanged() {
            vm.getFilesByPage();
        }

        function watchCategoryAndSubcategory() {
            $scope.$on(EVENTS.categoryOrSubcategoryChanged, function() {
                vm.selectedCategory = globalData.getCategory();
                vm.selectedSubcategory = globalData.getSubcategory();
                vm.currentPage = 1;
                vm.getNumberOfFiles();
                vm.getFilesByPage();
            });
        }
    }

})();