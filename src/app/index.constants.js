(function() {
  'use strict';

  angular
    .module('zeropay')
    .constant('HOST', 'http://openapi.test.nonobank.com')
    .constant('MERCHANT', '10002') // yyhl
    .constant('PRODUCTID', '90')
    .factory('OPENID', function($location, utils, $log) {
      $log.debug('factory');
      var search = utils.getLocationSearch(),
          $search = $location.search();

      return search.openId || $search.openId || '9527';
    })
    .factory('APISERVER', function(HOST, $location) {
    	var host = /nonobank.com/.test($location.host()) ? $location.protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '') : HOST;
    	return {
    		MSAPI: host + '/msapi',
    		NONOWEB: host + '/nono-web'
    	};
    })
    .constant('$ionicLoadingConfig', {
	    template: '<ion-spinner icon="bubbles" class="spinner-assertive"></ion-spinner>'
	  })

})();
