(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('BillsController', BillsController);

  /** @ngInject */
  function BillsController($scope, $state, $ionicLoading, $ionicPopup, $log, UserApi) {
    $scope.date = moment();

    $scope.items = [
      {
        desc: '消费',
        amount: '-108.23',
        orderNo: '30221426320930',
        date: '2015.05.11'
      }
    ];


    $scope.month = function(num) {
      $scope.date.add(num, 'months');

      $log.debug($scope.date.startOf('month').format('YYYY-MM-DD'));
      $log.debug($scope.date.endOf('month').format('YYYY-MM-DD'));
    };
  }
})();
