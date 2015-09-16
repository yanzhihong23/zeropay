(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('AgreementsController', AgreementsController);

  /** @ngInject */
  function AgreementsController($scope, $log, NonoWebApi, APISERVER) {
    $scope.contractType = 0; // 0: 委托支付协议, 1: 借款担保协议
    $scope.link = APISERVER.NONOWEB + '/delegateContractController/getDeleContract?';

  	NonoWebApi.getBillIdList().success(function(data) {
      if(+data.result === 1) {
        $scope.items = data.list;
      }
    });
  }
})();
