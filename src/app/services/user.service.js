(function() {
  'use strict';

  angular
    .module('zeropay')
    .service('userService', userService);

    /** @ngInject */
    function userService(localStorageService, MSApi, OPENID, $timeout, $log) {
      $log.debug('userService');

      var self = this,
          USER = 'user_' + OPENID,
          SESSIONID = 'sessionId_' + OPENID,
          MID = 'mId_' + OPENID,
          PROGRESS = 'progress_' + OPENID,
          AUTHINFO = 'authInfo_' + OPENID,
          COUNTER = 'counter_' + OPENID;

      this.setUser = function(user) {
        localStorageService.add(USER, user);
        self.autoLogin();
      };

      this.getUser = function() {
        return localStorageService.get(USER);
      };

      this.setSessionId = function(sessionId) {
        localStorageService.add(SESSIONID, sessionId);
      };

      this.getSessionId = function() {
        return localStorageService.get(SESSIONID);
      };

      this.setMId = function(mId) {
        localStorageService.add(MID, mId);
      };

      this.getMId = function() {
        return localStorageService.get(MID);
      };

      this.setIdAuthFailCounter = function(counter) {
        localStorageService.add(COUNTER, counter);
      };

      this.getIdAuthFailCounter = function() {
        return localStorageService.get(COUNTER);
      };

      this.setProcess = function(process) {
        localStorageService.add(PROGRESS, process);
      };

      this.getProcess = function() {
        return localStorageService.get(PROGRESS);
      };

      this.setAuthInfo = function(info) {
        localStorageService.add(AUTHINFO, info);
      };

      this.getAuthInfo = function() {
        return localStorageService.get(AUTHINFO);
      };


      this.autoLogin = function() {
        var user = self.getUser();
        if(user) {
          var login = function() {
            MSApi.login(user)
              .success(function(data) {
                if(data.flag === 1) {
                  $log.info('auto login suc');
                  self.setSessionId(data.data.session_id);
                  self.setMId(data.data.m_id);

                  $timeout(login, 1200000); // 20 min
                } else {
                  localStorageService.remove(USER);
                }
              });
          };

          login();
        }
      };
    }
})();