(function() {
  'use strict';

  angular
    .module('zeropay')
    .directive('banner', banner)
    .directive('bannerCard', bannerCard)
    .directive('bannerId', bannerId);

  /** @ngInject */
  function banner() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/banner/banner.html'
    };

    return directive;
  }

  /** @ngInject */
  function bannerCard() {
    var directive = {
      restrict: 'E',
      template: '<img src="assets/images/banner-02.png" width="100%" alt="">'
    };

    return directive;
  }

  /** @ngInject */
  function bannerId() {
    var directive = {
      restrict: 'E',
      template: '<img src="assets/images/banner-03.png" width="100%" alt="">'
    };

    return directive;
  }

})();
