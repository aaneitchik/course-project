(function() {
	'use strict';

	angular
		.module('libApp', [
			'ui.bootstrap',
			'ui.router'
	]);

	angular
		.module('libApp')
		.config(routeConfig);

	function routeConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('browse', {
				url: '/',
				templateUrl: 'app/page.browse/browse.html'
			}).state('fileinfo', {
				url: '/fileinfo',
				templateUrl: 'app/page.fileinfo/fileinfo.html'
			});

		$urlRouterProvider.otherwise('/');
	}
})();