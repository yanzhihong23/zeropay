(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('StudentAuthController', StudentAuthController)
    .controller('StudentAuthFailController', StudentAuthFailController);

  /** @ngInject */
  function StudentAuthController($scope, $state, $ionicActionSheet, $ionicPopup, $ionicLoading, $filter, $log, NonoWebApi, localStorageService, userService, utils) {
    var authInfo = userService.getAuthInfo();

    $scope.user = authInfo || {phone: userService.getUser().phone};

  	var initSchoolList = function() {
  		$scope.schoolList = localStorageService.get('schoolList') || [];
  		if(!$scope.schoolList.length) {
  			NonoWebApi.getSchoolList().success(function(data) {
  				if(+data.result === 1) {
  					data.list.map(function(obj) {
              $scope.schoolList.push(obj.name || obj);
  					});

  					localStorageService.add('schoolList', $scope.schoolList);
  					$log.debug($scope.schoolList);
  				}
  			});
  		}
  	};

  	initSchoolList();

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
					$scope.user.year = buttons[index].text;
					return true;
				}
			});
    };

    $scope.selectDegree = function() {
    	var buttons = [
				{ text: '专科' },
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

    // check whether school in valid
    $scope.$watch('user.school', function(val) {
      $scope.user.validSchool = false;

      if(val) {
        $filter('filter')($scope.schoolList, val).forEach(function(str) {
          if(str === val) {
            $scope.user.validSchool = true;
            return;
          }
        })
      }
    }, true);

    var saveAuthInfo = function() {
      userService.setAuthInfo($scope.user);
    };

    $scope.submit = function() {
      if(!$scope.user.validSchool) {
        utils.alert({
          content: '学校名称不存在，请再次确认~'
        });
        return;
      }

    	$ionicLoading.show();

    	NonoWebApi.authenticateSchoolRoll($scope.user)
    		.success(function(data) {
    			if(+data.result === 1) {
    				$log.info('school auth success');

            // save user credit info
            var credit = data.map.creditLine;
            var user = userService.getUser();
            // save realname and idNo for add card
            user.realname = $scope.user.realname;
            user.idNo = $scope.user.idNo;
            user.credit = credit;
            userService.setUser(user);

            // need to fix android webview issue
            $state.go('card');
    				// Math.random()*10000 > 5000 ? $state.go('card') : $state.go('id');
    			} else if(+data.result === 2) {
            saveAuthInfo();
            utils.alert({content: data.message});
          } else {
            $log.error('school auth fail', data.message);

            saveAuthInfo();
    				$state.go('studentAuth:fail');
    			}
    		});
    };
  }

  function StudentAuthFailController($scope, $state, $ionicPopup, $ionicLoading, $log, utils, userService, MSApi) {
  	var myPopup;

  	$scope.data = {
  		sessionId: userService.getSessionId()
  	};

  	$scope.back = function() {
  		utils.goBack();
  	};

  	$scope.submit = function() {
  		$log.debug('code', $scope.data.code);

      $ionicLoading.show();
  		MSApi.studentCodeAuth($scope.data).success(function(data) {
  			if(data.flag === 1) {
  				$log.info('school auth success');

          // save user credit info
          var user = userService.getUser();
          user.credit = data.data.creditLine;
          userService.setUser(user);

          $state.go('card');
  				// Math.random()*10000 > 5000 ? $state.go('card') : $state.go('id');
  			} else {
  				$log.error('school auth fail', data.msg);

  				utils.alert({
            content: data.msg,
            callback: function() {
              $scope.codeAuth();
            }
          });
  			}
  		}).finally(function() {
  			myPopup.close();
  		});
  	};

  	$scope.codeAuth = function() {
  		// An elaborate, custom popup
  		myPopup = $ionicPopup.show({
  		  templateUrl: 'app/student/code.auth.popup.html',
  		  title: '学籍码',
  		  scope: $scope,
  		  cssClass: 'popup-large'
  		});
  	};

    $scope.getCode = function() {
      myPopup.close();
      utils.alert({
        title: '学信网查询码获得流程',
        contentUrl: 'app/student/code.get.popup.html',
        cssClass: 'popup-large',
        callback: function() {
          $scope.codeAuth();
        }
      })
    };
  }
})();
