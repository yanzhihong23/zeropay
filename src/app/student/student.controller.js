(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('StudentAuthController', StudentAuthController);

  /** @ngInject */
  function StudentAuthController($scope, $ionicActionSheet, $ionicPopup, $ionicLoading, $log) {
  	$scope.user = {};

    $scope.selectYear = function() {
    	var buttons = [
    		{ text: '2015' },
    		{ text: '2014' },
    		{ text: '2013' },
    		{ text: '2012' },
    		{ text: '2011' },
    		{ text: '2010' },
    		{ text: '2009' }
    	];
    	// Show the action sheet
			var hideSheet = $ionicActionSheet.show({
			 	buttons: buttons,
				// destructiveText: 'Delete',
				titleText: '选择入学年份',
				cancelText: '取消',
				cancel: function() {
			    // add cancel code..
			  },
				buttonClicked: function(index) {
					$scope.user.year = buttons[index].text + '年';
					return true;
				}
			});
    };

    $scope.selectDegree = function() {
    	var buttons = [
				{ text: '本科' },
				{ text: '硕士研究生' },
				{ text: '博士研究生' }
			]
    	// Show the action sheet
			var hideSheet = $ionicActionSheet.show({
				buttons: buttons,
				// destructiveText: 'Delete',
				titleText: '选择学历',
				cancelText: '取消',
				cancel: function() {
			    // add cancel code..
			  },
				buttonClicked: function(index) {
					$scope.user.degree = buttons[index].text;
					return true;
				}
			});
    };

    $scope.codeAuth = function() {
    	$scope.data = {};
    	$scope.submit = function() {
    		$log.debug('code', $scope.data.code);
    		myPopup.close();
    	};
    	// An elaborate, custom popup
    	var myPopup = $ionicPopup.show({
    	  templateUrl: 'app/student/code.auth.popup.html',
    	  title: '学籍码',
    	  // subTitle: '6-16位，至少包含数字、字母、符号中的2种',
    	  scope: $scope,
    	  cssClass: 'popup-large',

    	  // move button to template, as button couldn't be disabled here.
    	  // buttons: [
    	  //   {
    	  //     text: '<b>确定</b>',
    	  //     type: 'button-assertive',
    	  //     onTap: function(e) {
    	  //       if (!$scope.data.code) {
    	  //         //don't allow the user to close unless he enters wifi password
    	  //         e.preventDefault();
    	  //       } else {
    	  //         return $scope.data.code;
    	  //       }
    	  //     }
    	  //   }
    	  // ]
    	});

    	myPopup.then(function(res) {
    	  console.log('Tapped!', res);
    	  // $ionicLoading.show();
    	});
    }

  }
})();
