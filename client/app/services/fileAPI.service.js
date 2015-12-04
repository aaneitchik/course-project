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
            getTypeCategories: getTypeCategories,
            uploadFile: uploadFile
        };

        return api;

        function getFiles() {
            return $http.get('/api/files').then(function(result) {
                return result.data;
            });
        }

        function getFileById(id) {
            return $http.get('/api/file/' + id).then(function(result) {
                return result.data;
            });
        }

        function getFilesByPage(pageNumber, pageSize, fileType) {
            return $http.get('/api/files/' + pageNumber + '/' + pageSize + '/' + fileType).then(function(result) {
                return result.data;
            });
        }

        function getNumberOfFiles(category) {
            return $http.get('/api/files_number/' + category).then(function(result) {
                return result.data;
            });
        }

        function getTypeCategories() {
            return $http.get('/api/type_categories').then(function(result) {
                return result.data;
            });
        }

        function uploadFile(fileData, file) {
            var fd = new FormData();
            fd.append('fileInfo', JSON.stringify(fileData));
            fd.append('file', file);
            return $http.post('/api/file_upload', fd, {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            }).then(function(result) {
               return result;
            });
        }

    }

})();