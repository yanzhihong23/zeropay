(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope, $state, $stateParams, $ionicLoading, $log, utils, NonoWebApi, userService) {
  	var resendCountdown = utils.resendCountdown($scope);

    $scope.user = {
    	phone: $stateParams.phone
    };

    $scope.sendSms = function() {
    	$ionicLoading.show();

    	NonoWebApi.sendSms($scope.user).success(function(data) {
    		if(+data.result === 1) {
    			resendCountdown();
    		} else {
    			utils.alert({content: data.message});
    		}
    	});
    };

    $scope.register = function() {
    	$ionicLoading.show();

    	NonoWebApi.register($scope.user).success(function(data) {
    		if(+data.result === 1) {
    			$log.info('register success');

    			var phone = $scope.user.phone;
    			var encrypt = phone.substr(0,3) + '****' + phone.substr(-4);

          // save user info
          userService.setUser({
            phone: $scope.user.phone,
            password: data.map.password
          });

          userService.setSessionId(data.map.sessionId);

    			utils.alert({
    				title: '亲爱的用户' + encrypt,
    				content: '您已成功注册名校贷，默认登录密码已发至您的手机！' + 
											'完成学生身份认证即可获得<span class="assertive">150~300元</span>的信用额度' + 
											'最高享<span class="assertive">39天免息</span>哦~',
						okText: '马上去做认证~',
						cssClass: 'popup-large text-center',
						callback: function() {
							$state.go('studentAuth');
						}
    			});

    		} else {
    			utils.alert({content: data.message});
    		}
    	})
    }

  }
})();
