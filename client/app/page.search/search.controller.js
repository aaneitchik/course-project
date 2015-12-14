(function () {

    'use strict';

    angular
        .module('libApp')
        .controller('SearchController', SearchController);

    /*@ngInject*/
    function SearchController($scope, $stateParams, fileAPI) {
        var vm = this;
        vm.contentLoaded = false;
        vm.fileList = [];
        vm.fileCategories = [];
        vm.allowedSubcategories = [];
        vm.searchQuery = {};
        vm.searchResults = [];
        vm.searchText = '';
        vm.tagList = $stateParams.tag ? [{text: $stateParams.tag}] : [];

        vm.addTags = addTags;
        vm.getFileCategories = getFileCategories;
        vm.findFiles = findFiles;
        vm.watchCategory = watchCategory;

        vm.getFileCategories();
        vm.watchCategory();

        function addTags() {
            if (vm.tagList.length !== 0) {
                vm.searchQuery.tags = [];
                vm.tagList.forEach(function (tag) {
                    vm.searchQuery.tags.push(tag.text);
                });
            }
        }

        function getFileCategories() {
            fileAPI.getTypeCategories().then(function (data) {
                vm.fileCategories = data;
            });
        }

        function findFiles() {
            vm.addTags();
            vm.contentLoaded = false;
            fileAPI.findFiles(vm.searchQuery).then(function (data) {
                vm.searchResults = data;
                console.log('Found files: ', data);
            }).finally(function () {
                vm.contentLoaded = true;
                vm.searchQuery.tags = undefined;
            });
        }

        //Function to clear subcategory if category changed
        function watchCategory() {
            $scope.$watch(function () {
                return vm.allowedSubcategories;
            }, function () {
                console.log('cleared!');
                vm.searchQuery.subcategory = undefined;
            });
        }

    }

})();