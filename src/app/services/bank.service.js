(function() {
  'use strict';

  angular
    .module('zeropay')
    .service('bankService', bankService);

    /** @ngInject */
    function bankService(localStorageService, userService, MSApi, $log) {
      var self = this;

      this.bankList = [
        {"name":"中国工商银行","id":"ICBC"},
        {"name":"中国农业银行","id":"ABC"},
        {"name":"中国银行","id":"BOC"},
        {"name":"中国建设银行","id":"CCB"},
        {"name":"招商银行","id":"CMBCHINA"},
        {"name":"中国光大银行","id":"CEB"},
        {"name":"中国邮政储蓄银行","id":"POST"},
        {"name":"上海浦东发展银行","id":"SPDB"},
        {"name":"广东发展银行","id":"GDB"},
        {"name":"中国民生银行","id":"CMBC"},
        {"name":"深圳发展银行","id":"SDB"},
        {"name":"平安银行","id":"SDB"},
        {"name":"交通银行","id":"BOCO"},
        {"name":"兴业银行","id":"CIB"},
        {"name":"中信银行","id":"ECITIC"},
        {"name":"上海银行","id":"SHB"},
        {"name":"华夏银行","id":"HXB"},
        {"name":"北京银行","id":"BCCB"}
      ];

      this.selected = {};

      this.select = function(index) {
        var bank = self.bankList[index];
        self.selected.name = bank.name;
        self.selected.id = bank.id;
      };

      this.getBankList = function() {
        return self.bankList;

        // return localStorageService.get('bankList') || [];
      };

      // this.updateBankList = function() {
      //   var sessionId = userService.getSessionId();
      //   MSApi.getBankListForKQ({sessionId: sessionId})
      //     .success(function(data) {
      //       if(data.flag === 1) {
      //         $log.info('get bank list success');
      //         self.bankList = data.data.map(function(obj) {
      //           return {
      //             name: obj.name,
      //             id: obj.id
      //           };
      //         });

      //         localStorageService.add('bankList', self.bankList);
      //       }
      //     });
      // };

      // if(!this.bankList || !this.bankList.length) {
      //   this.updateBankList();
      // }
    }
})();