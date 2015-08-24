(function() {
  'use strict';

  angular
    .module('zeropay')
    .factory('utils', utils);

  /** @ngInject */
  function utils($ionicHistory, $timeout, $ionicPopup) {
		return {
			param: function(obj) {
				var str = [];
        for(var p in obj) {
        	str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        
        return str.join("&");
			},
			getDate: function(dateObj) {
				var now = dateObj ? new Date(dateObj) : new Date();
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				var appendZero = function(obj) {
					return (obj < 10 ? '0' : '') + obj;
				};
				
				return year + '-' + appendZero(month) + '-' + appendZero(date);
			},
			addMonth: function(dateObj, num) {
				var currentMonth = dateObj.getMonth();
		    dateObj.setMonth(dateObj.getMonth() + num)

		    if (dateObj.getMonth() != ((currentMonth + num) % 12)){
		        dateObj.setDate(0);
		    }
		    return dateObj;
			},
			disableBack: function() {
				$ionicHistory.nextViewOptions({
				  disableAnimate: false,
				  disableBack: true
				});
			},
			goBack: function(depth) {
				$ionicHistory.goBack(depth);
			},
			resendCountdown: function($scope) {
				$scope.resendCountdown = 0;
				
				return function() {
					$scope.resendCountdown = 60;
					var countdown = function() {
					  if($scope.resendCountdown > 0) {
					    $scope.resendCountdown += -1;
					    $timeout(countdown, 1000);
					  }
					};
					countdown();
				};
			},
			alert: function(obj) {
				var alertPopup = $ionicPopup.alert({
				  title: obj.title || '温馨提示',
				  cssClass: obj.cssClass || 'text-center',
				  subTitle: obj.subTitle || '',
				  template: obj.content || '',
				  templateUrl: obj.contentUrl || '',
				  okText: obj.okText || '确认',
				  okType: obj.okType || 'button-assertive'
				});
				alertPopup.then(function(res) {
					obj.callback && obj.callback();
				});
			},
			confirm: function(obj) {
				var confirmPopup = $ionicPopup.confirm({
				  title: obj.title || '温馨提示',
				  template: obj.content || '',
				  cssClass: obj.cssClass || 'text-center',
				  okText: obj.okText || '确认',
				  okType: obj.okType || 'button-assertive',
				  cancelText: obj.cancelText || '取消'
				});
				confirmPopup.then(function(res) {
					if(res) {
						obj.onOk && obj.onOk();
					} else {
						obj.onCancel && obj.onCancel();
					}
				});
			}
		}
  }

})();