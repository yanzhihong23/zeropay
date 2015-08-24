(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('IdController', IdController);

  /** @ngInject */
  function IdController($scope, $state, $ionicLoading, $ionicPopup, $log, utils, UserApi) {
  	// $scope.authFail = true;

  	var frontPopup, holdPopup;
  	$scope.showFrontPopup = function() {
  		frontPopup = $ionicPopup.show({
  			title: '身份证正面上传',
  			templateUrl: 'app/id/front.popup.html',
  			scope: $scope,
  			cssClass: 'popup-large'
  		});
  	};

  	$scope.showHoldPopup = function() {
  		holdPopup = $ionicPopup.show({
  			title: '手持身份证示例',
  			templateUrl: 'app/id/hold.popup.html',
  			scope: $scope,
  			cssClass: 'popup-large'
  		});
  	};

  	$scope.showMultiAuthFailAlert = function() {
  		utils.alert({
  			content: '审核未通过已达3次！您的申请将转由人工审核。如审核通过，将于1- 3个工作日内短信通知您',
  			cssClass: 'popup-large'
  		});
  	};

  	$scope.file = {};

  	$scope.$watch('file.front', function (newVal) {
      if (newVal) {
      	frontPopup.close();
        $log.debug(newVal);
      }
    });

    $scope.$watch('file.hold', function (newVal) {
      if (newVal) {
      	holdPopup.close();
        $log.debug(newVal);
      }
    });
  }
})();
