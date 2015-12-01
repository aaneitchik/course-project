(function() {

    'use strict';

    angular
        .module('libApp')
        .factory('fileAPI', fileAPI);

    /*@ngInject*/
    function fileAPI($http) {

        var api = {
            getFiles: getFiles,
            getFileById: getFileById,
            getFilesByPage: getFilesByPage,
            getNumberOfFiles: getNumberOfFiles,
            getTypeCategories: getTypeCategories
        };

        return api;

        function getFiles() {
            return $http.get('/api/files').then(function(result) {
                return result.data;
            });
        }

        function getFileById() {
            return $http.get('/api/files/:id').then(function(result) {
                return result.data;
            });
        }

        function getFilesByPage(pageNumber, pageSize) {
            return $http.get('/api/files/' + pageNumber + '/' + pageSize).then(function(result) {
                return result.data;
            });
        }

        function getNumberOfFiles() {
            return $http.get('/api/files_number').then(function(result) {
                return result.data;
            });
        }

        function getTypeCategories() {
            return $http.get('/api/type_categories').then(function(result) {
                return result.data;
            });
        }

    }

})();