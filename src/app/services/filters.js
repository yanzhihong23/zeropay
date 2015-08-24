(function() {
  'use strict';

  angular
    .module('zeropay')
    .filter('moment', function() {
    	return function(date, token) {
    		return moment(date).format(token);
    	};
    });
})();