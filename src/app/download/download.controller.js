(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('DownloadController', DownloadController);

  /** @ngInject */
  function DownloadController($scope, $log) {
  	var bridge;

    if(window.WebViewJavascriptBridge) {
    	bridge = WebViewJavascriptBridge;
    } else {
    	document.addEventListener('WebViewJavascriptBridgeReady', function() {
    		bridge = WebViewJavascriptBridge;
    	}, false);
    }

    $scope.download = function() {
    	if(bridge) {
    		$log.info('downloadApp');
    		bridge.callHandler('downloadApp', {'foo': 'bar'}, function(response) {
    			$log.info('downloadApp responsed');
    		});
    	} else {
    		$log.info('no js bridge');
    	}
    };
  }
})();
