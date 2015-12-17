(function () {

    'use strict';

    angular
        .module('libApp')
        .factory('fileAPI', fileAPI);

    /*@ngInject*/
    function fileAPI($http) {

        var api = {
            deleteFileById: deleteFileById,
            downloadLink: downloadLink,
            editFile: editFile,
            getFiles: getFiles,
            getFileById: getFileById,
            getFilesByPage: getFilesByPage,
            getNumberOfFiles: getNumberOfFiles,
            getTypeCategories: getTypeCategories,
            findFiles: findFiles,
            uploadFile: uploadFile
        };

        return api;

        function deleteFileById(id) {
            return $http.delete('/api/file/' + id).then(function(result) {
                return result.data;
            });
        }

        function downloadLink(id) {
            return '/api/download_file/' + id;
        }

        function editFile(id, fileInfo) {
            return $http.put('/api/file/' + id, fileInfo).then(function(result) {
                return result.data;
            });
        }

        function getFiles() {
            return $http.get('/api/files').then(function (result) {
                return result.data;
            });
        }

        function getFileById(id) {
            return $http.get('/api/file/' + id).then(function (result) {
                return result.data;
            });
        }

        function getFilesByPage(pageNumber, pageSize, fileCategory, fileSubcategory) {
            return $http.get('/api/files/' + pageNumber + '/' + pageSize + '/' + fileCategory + '/' + fileSubcategory).then(function (result) {
                return result.data;
            });
        }

        function getNumberOfFiles(category, subcategory) {
            return $http.get('/api/files_number/' + category + '/' + subcategory).then(function (result) {
                return result.data;
            });
        }

        function getTypeCategories() {
            return $http.get('/api/type_categories').then(function (result) {
                return result.data;
            });
        }

        function findFiles(searchQuery) {
            return $http.post('/api/find_files', searchQuery).then(function (result) {
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
            }).then(function (result) {
                return result;
            });
        }

    }

})();