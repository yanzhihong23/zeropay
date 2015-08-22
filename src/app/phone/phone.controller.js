(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('PhoneController', PhoneController);

  /** @ngInject */
  function PhoneController($scope, $state, $ionicLoading, UserApi) {
  	$scope.user = {};

  	// UserApi.cors();

  	$scope.checkPhone = function() {
  		$ionicLoading.show();

  		UserApi.isRegister({phone: $scope.user.phone})
  			.success(function(data) {
  				if(+data.result === 1) {
  					$state.go('login');
  				} else {
  					$state.go('register');
  				}
  			});


			// UserApi.isAuthenticatedSchoolRoll({phone: $scope.user.phone})
  	};
  }
})();
