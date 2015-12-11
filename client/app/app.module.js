(function() {
    'use strict';

    angular
        .module('libApp', [
            'ui.bootstrap',
            'ui.bootstrap.pagination',
            'ui.router',
            'file-model',
            'angular-toasty',
            'ngTagsInput'
        ])
        .config(toastyConfig);

    /*@ngInject*/
    function toastyConfig(toastyConfigProvider) {
        toastyConfigProvider.setConfig({
            clickToClose: true,
            timeout: 5000,
            shake: false,
            theme: 'material',
            position: 'top-right'
        });
    }
})();