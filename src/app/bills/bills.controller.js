(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('BillsController', BillsController);

  /** @ngInject */
  function BillsController($scope, $state, $ionicLoading, $ionicPopup, $log, NonoWebApi) {
    $scope.date = moment();

    // $scope.items = [
    //   {
    //     type: '消费',
    //     amount: '-108.23',
    //     billId: '30221426320930',
    //     exchangeTime: '2015.05.11'
    //   }
    // ];

    $scope.month = function(num) {
      $scope.date.add(num, 'months');
      getBillDetail();
    };

    var getBillDetail = function() {
      $ionicLoading.show();
      NonoWebApi.getBillDetail({
        fromDate: $scope.date.startOf('month').format('YYYY-MM-DD'),
        toDate: $scope.date.endOf('month').format('YYYY-MM-DD')
      }).success(function(data) {
        if(+data.result === 1) {
          $scope.items = data.list.map(function(obj) {
            switch(obj.type) {
              case '0':
                obj.type = '消费';
                break;
              case '1':
                obj.type = '还款';
                break;
              case '2':
                obj.type = '退款';
                break;
            }
            return obj;
          })
        }
      })
    };

    // init
    getBillDetail();
  }
})();
