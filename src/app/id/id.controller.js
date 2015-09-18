(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('IdController', IdController);

  /** @ngInject */
  function IdController($scope, $rootScope, $state, $ionicLoading, $ionicPopup, $log, utils, userService, NonoWebApi, MSApi, md5) {
  	var frontPopup, 
  			holdPopup, 
        passwordPopup, 
  			authSuc = false, 
  			failCounter = +userService.getIdAuthFailCounter() || 0, 
  			user = userService.getUser(),
        sessionId = userService.getSessionId();

  	$scope.file = {};

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
  		$ionicPopup.show({
  			title: '错误提示',
  			template: '审核未通过已达3次！您的申请将转由人工审核。如审核通过，将于1-3个工作日内短信通知您',
  			scope: $scope,
  			cssClass: 'popup-no-title text-center'
  		});
  	};

  	$scope.$watch('file.front', function (newVal) {
      if (newVal) {
      	$log.debug(newVal);

      	frontPopup && frontPopup.close();

        $rootScope.$on('front', function(evt, data){
          var params = {
            idNo: user.idNo,
            phone: user.phone,
            file: data,
            filename: newVal.filename
          };

          $ionicLoading.show();
          NonoWebApi.uploadCertPhoto(params).success(function(data) {
            if(+data.result === 1) {
              $log.info('cert photo auth success');
              authSuc = true;

              $scope.file.front.uploaded = true;
            } else {
              utils.alert({content: data.message});
            }
          }).error(function(data) {
            $log.error('upload cert photo fail');
          });
        });

        // resize image
        utils.resizeImg(newVal, 'front');
      }
    });

    $scope.$watch('file.hold', function (newVal) {
      if (newVal) {
      	$log.debug(newVal);

      	holdPopup && holdPopup.close();

        $rootScope.$on('hold', function(evt, data){
          var params = {
            phone: user.phone,
            file: data,
            filename: newVal.filename
          };

          $ionicLoading.show();
          NonoWebApi.uploadHoldCertPhoto(params).success(function(data) {
            if(+data.result === 1) {
              $scope.file.hold.uploaded = true;
            } else {
              utils.alert({content: data.message});
            }
          }).error(function(data) {
            $log.error('upload hold photo fail');
          });
        });

        utils.resizeImg(newVal, 'hold');
      }
    });

    $scope.submit = function() {
    	if(authSuc) {
        // save upload success log
        NonoWebApi.saveActionLog({
          phone: user.phone,
          actionType: 5,
          actionResult: 1,
          remark: '上传身份证成功'
        });
        // active credit
        activeCredit();
        payPasswordCheck();
    	} else {
    		$scope.authFail = true;
    		$scope.file = {};
    		failCounter += 1;
        // save counter
        userService.setIdAuthFailCounter(failCounter);
    		if(failCounter === 3) {
    			$scope.showMultiAuthFailAlert();
    		}
    	}
    };

    var payPasswordCheck = function() {
      if(user.hasPayPassword) {
        utils.alert({
          title: '身份资料上传成功！',
          callback: function() {
            $state.go('account');
          }
        });
      } else {
        utils.confirm({
          title: '身份资料上传成功！',
          content: '请童鞋设置支付密码 ，此密码将在您消费购物、充值提现时使用哦~',
          okText: '马上设置',
          cancelText: '下次再设置',
          onOk: function() {
            $scope.enablePayPaswordCheck = true;
          },
          onCancel: function() {
            $state.go('account');
          }
        });
      }
    };

    // active credit payment
    var activeCredit = function() {
      NonoWebApi.activePayment({
        phone: user.phone
      }).success(function(data) {
        if(!data.result === 1) {
          $log.info('active payment success');
        } else {
          $log.info('active payment failed');
        }
      })
    };

    var init = function() {
      $ionicLoading.show();
      // check whether cert photo is uploaded
      NonoWebApi.isCertPhotoUploaded({phone: user.phone})
        .success(function(data) {
          $scope.file.front = $scope.file.front || {};

          if(+data.result === 1) {
            $scope.file.front.uploaded = true;
            authSuc = true;
          }
        }).finally(function() {
          // check whether hold cert photo is uploaded
          $ionicLoading.show();
          NonoWebApi.isHoldCertPhotoUploaded({phone: user.phone})
            .success(function(data) {
              $scope.file.hold = $scope.file.hold || {};

              if(+data.result === 1) {
                $scope.file.hold.uploaded = true;
              }
            }).finally(function() {
              if(!$scope.file.front.uploaded && !$scope.file.hold.uploaded) {
                // init check
                if(failCounter === 3) {
                  $scope.showMultiAuthFailAlert();
                  return;
                } else {
                  // save log
                  NonoWebApi.saveActionLog({
                    phone: user.phone,
                    actionType: 5,
                    actionResult: 2,
                    remark: '进入上传身份证流程'
                  });
                  userService.setProcess('uploadId');
                }
              }
            })
        });
    };

    init();
  }
})();
