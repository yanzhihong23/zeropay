(function() {
  'use strict';

  angular
    .module('zeropay')
    .service('UserApi', UserApi);

  /** @ngInject */
  function UserApi($http, md5, utils, APISERVER) {
  	var v = 'm.nonobank.com/msapi/'+ utils.getDate(),
  			vMd5 = md5.createHash(v),
  			headers = {'Authorization': vMd5,'Content-Type': 'application/x-www-form-urlencoded'};

		this.cors = function() {
			return $http({
				method: 'POST',
				url: 'http://openapi.test.nonobank.com/nono-web/ruyiFenqi/optimiseSessionId_old',
				headers: headers,
				withCredentials: true,
				data: utils.param({
					sessionId: 126356
				})
			})
		}
		this.isRegister = function(obj) {
			return $http({
  			method: 'POST',
  			url: APISERVER + '/isRegister',
  			headers: headers,
  			data: utils.param({
  				request: JSON.stringify({
  					mobile: obj.phone
  				})
  			})
  		});
		};

		this.isAuthenticatedSchoolRoll = function(obj) {
			var openId = '9a7769cb-3e44-4bbb-bc8c-94f8d16482a0',
					merchant = '10000',
					msgKey = md5.createHash(openId + merchant + obj.phone);

			return $http({
  			method: 'POST',
  			url: APISERVER + '/isAuthenticatedSchoolRoll',
  			headers: headers,
  			data: utils.param({
  				request: JSON.stringify({
  					openId: openId,
  					merchant: merchant,
  					mobile: obj.phone,
  					msgKey: msgKey
  				})
  			})
  		});
		};

  	this.sendSms = function(obj) {
  		return $http({
  			method: 'POST',
  			url: APISERVER + '/user/sendMessage',
  			headers: headers,
  			data: utils.param({
  				phone: obj.phone
  			})
  		});
  	};

  	this.login = function(obj) {
  		return $http({
  			method: 'POST',
  			url: APISERVER + '/user/login',
  			headers: headers,
  			data: utils.param({
  				username: obj.username,
  				password: obj.password
  			})
  		});
  	};

  	this.logout = function(obj) {
  		return $http({
  			method: 'POST',
  			url: APISERVER + '/user/logout',
  			headers: headers,
  			data: utils.param({
  				sessionId: obj.sessionId
  			})
  		});
  	};

  	this.register = function(obj) {
  		return $http({
  			method: 'POST',
  			url: APISERVER + '/user/register',
  			headers: headers,
  			data: utils.param({
  				mobile: obj.mobile,
  				validatemobile: obj.vcode,
  				password: obj.password,
  				sessionId: obj.sessionId,
  				borrowtype: obj.borrowtype || '理财',
  				approach: obj.approach || 'dfd',
  				am_id: obj.amId || 'dfd'
  			})
  		});
  	};

  }
})();
