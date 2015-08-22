(function() {
  'use strict';

  angular
    .module('zeropay')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Enable cors
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push(function($rootScope) {
      return {
        request: function(config) {
          return config;
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide')
          return response;
        }
      }
    });
  }

})();
