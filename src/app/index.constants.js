(function() {
  'use strict';

  angular
    .module('zeropay')
    .constant('HOST', 'http://openapi.test.nonobank.com')
    .constant('MERCHANT', '10000') // anlaiye
    .constant('PRODUCTID', '90')
    .value('OPENID', '9527')
    .factory('APISERVER', function(HOST, $location) {
    	var host = /nonobank.com/.test($location.host()) ? $location.protocol() + '://' + $location.host() : HOST;
    	return {
    		MSAPI: host + '/msapi',
    		NONOWEB: host + '/nono-web'
    	};
    })
    .constant('$ionicLoadingConfig', {
	    template: '<ion-spinner icon="bubbles" class="spinner-assertive"></ion-spinner>'
	  })

})();
