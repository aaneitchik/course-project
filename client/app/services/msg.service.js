(function() {
	
	'use strict';

	angular
		.module('libApp')
		.factory('msgService', msgService);

	/*@ngInject*/
	function msgService(toasty) {
		var service = {
			error: error,
			success: success
		};

		return service;

		function error(msg) {
			toasty.error({
				msg: msg
			});
		}

		function success(msg) {
			toasty.success({
				msg: msg
			});
		}
	}

})();