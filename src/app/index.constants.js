/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('zeropay')
    .constant('HOST', 'http://192.168.1.150:8089')
    .factory('APISERVER', function(HOST, $location) {
    	var host = /nonobank.com/.test($location.host()) ? $location.protocol() + '://' + $location.host() : HOST;
    	return host + '/nono-web/creditAuth';
    })
    .constant('$ionicLoadingConfig', {
	    template: '<ion-spinner icon="bubbles" class="spinner-assertive"></ion-spinner>'
	  })

})();
