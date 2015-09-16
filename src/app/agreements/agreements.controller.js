(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('AgreementsController', AgreementsController);

  /** @ngInject */
  function AgreementsController($scope, $log, NonoWebApi, APISERVER) {
    $scope.tab = 0;

  	NonoWebApi.getBillIdList().success(function(data) {
      if(+data.result === 1) {
        $scope.entrustItems = data.list.map(function(obj) {
          obj.link = APISERVER.NONOWEB + '/delegateContractController/getDeleContract?contractType=0&billId=' + obj.billId; // 委托支付协议
          return obj;
        });
      }
    });
  }
})();
