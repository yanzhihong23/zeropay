(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('CardController', CardController)
    .controller('BankController', BankController);

  /** @ngInject */
  function CardController($scope, $rootScope, $state, $ionicLoading, $ionicPopup, $ionicModal, $log, userService, bankService, MSApi, NonoWebApi, utils, md5) {
    var user = userService.getUser(),
        sessionId = userService.getSessionId(),
        mId = userService.getMId(),
        resendCountdown = utils.resendCountdown($scope),
        payTosModal,
        entrustPayTosModal,
        kycPopup,
        addCardPopup,
        phoneAuthPopup,
        passwordPopup,
        params = {
          sessionId: sessionId,
          // realname: user.realname,
          // idNo: user.idNo,
          mId: mId,
          idType: 0,
          count: 1,
          key: null,
          type: null,
          payCode: 2,
          payMode: 1
        };

    $scope.user = {
      realname: user.realname,
      idNo: user.idNo,
      kyc: user.realname && user.idNo
    };

    $scope.bank = bankService.selected;
    $scope.card = {
      phone: user.phone
    };

    $ionicModal.fromTemplateUrl('app/card/pay.tos.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      payTosModal = modal;
    });

    $ionicModal.fromTemplateUrl('app/card/pay.entrust.tos.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      entrustPayTosModal = modal;
    });

    $scope.showPayTosModal = function() {
      payTosModal.show();
    };

    $scope.showEntrustPayTosModal = function() {
      entrustPayTosModal.show();
    };

    $scope.closePayTosModal = function() {
      payTosModal.hide();
    };

    $scope.closeEntrustPayTosModal = function() {
      entrustPayTosModal.hide();
    };

    $scope.showKycPopup = function() {
      if($scope.user.kyc) return;

      kycPopup = $ionicPopup.show({
        title: '实名信息',
        templateUrl: 'app/card/kyc.popup.html',
        scope: $scope,
        cssClass: 'popup-large'
      });
    };

  	$scope.showAddCardPopup = function() {
      addCardPopup = $ionicPopup.show({
        title: '银行卡信息',
        templateUrl: 'app/card/card.popup.html',
        scope: $scope,
        cssClass: 'popup-large'
      });
    };

    $scope.showPhoneAuthPopup = function() {
      if(!$scope.card.cardNo || !$scope.bank.name) {
        utils.alert({content: '请先添加银行卡信息'});
        return;
      }

      phoneAuthPopup = $ionicPopup.show({
        title: '手机验证',
        templateUrl: 'app/card/phone.popup.html',
        scope: $scope,
        cssClass: 'popup-large'
      });
    };

    $scope.sendVcode = function() {
      $ionicLoading.show();
      MSApi.generateOrderNo({sessionId:sessionId}).success(function(data) {
        if(data.flag === 1) {
          params.extRefNo = data.data;
          params.bankCardNo = $scope.card.cardNo;
          params.mobile = $scope.card.phone;

          params.realname = $scope.user.realname;
          params.idNo = $scope.user.idNo;

          $ionicLoading.show();
          MSApi.getPayVcode(params).success(function(data) {
            if(data.flag === 1) {
              resendCountdown();

              params.storablePan = data.storablePan;
              params.token = data.token;
              params.bankCode = $scope.bank.id;
            } else {
              phoneAuthPopup.close();
              utils.alert({
                content: data.msg
              });
            }
          })
        }
      })
    };

    $scope.selectBank = function() {
      addCardPopup.close();
      $state.go('banks');
    };

    // kyc popup
    $scope.submitKyc = function() {
      kycPopup.close();
    };

    // card popup
    $scope.submitBank = function() {
      addCardPopup.close();
    };

    // phone popup
    $scope.submitPhone = function() {
      phoneAuthPopup.close();
    };

    // bind card
    $scope.submit = function() {
      $ionicLoading.show();
      params.vcode = $scope.card.vcode;
      MSApi.bindAndPay(params).success(function(data) {
        if(data.flag === 1) {
          // save bind card success log
          NonoWebApi.saveActionLog({
            phone: user.phone,
            actionType: 6,
            actionResult: 1,
            remark: '绑卡成功'
          });
          activeCredit();
          payPasswordCheck();
        } else {
          utils.alert({
            title: 'sorry，还款卡绑定失败！',
            content: data.msg,
            okText: '我知道了'
          });
        }
      });
    };

    var payPasswordCheck = function() {
      if(user.hasPayPassword) {
        utils.alert({
          title: '快捷支付开通成功！',
          callback: function() {
            $state.go('account');
          }
        });
      } else {
        utils.confirm({
          title: '快捷支付开通成功！',
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
        if(+data.result === 1) {
          $log.info('active payment success');
        } else {
          $log.info('active payment failed');
        }
      })
    };

    $scope.$watch('bank', function(val) {
      if(val && val.name) {
        $scope.showAddCardPopup();
      }
    }, true);

    // save log
    NonoWebApi.saveActionLog({
      phone: user.phone,
      actionType: 6,
      actionResult: 2,
      remark: '进入绑卡流程'
    });
    userService.setProcess('bindCard');
  } // CardController end


  function BankController($scope, $rootScope, bankService, utils) {
    $scope.items = bankService.getBankList();

    $scope.select = function(index) {
      bankService.select(index);
      utils.goBack();
    };
  }
})();
