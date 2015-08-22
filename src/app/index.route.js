(function() {
  'use strict';

  angular
    .module('zeropay')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('phone', {
        url: '/phone',
        templateUrl: 'app/phone/phone.html',
        controller: 'PhoneController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController'
      })
      .state('register:suc', {
        url: '/register:suc',
        templateUrl: 'app/register/register.suc.html',
        controller: 'RegisterController'
      })
      .state('password:forgot', {
        url: '/forgot',
        templateUrl: 'app/password/forgot.html',
        controller: 'PasswordController'
      })
      .state('password:reset', {
        url: '/reset',
        templateUrl: 'app/password/reset.html',
        controller: 'PasswordController'
      })
      .state('studentAuth', {
        url: '/studentAuth',
        templateUrl: 'app/student/student.html',
        controller: 'StudentAuthController'
      })
      .state('studentAuth:fail', {
        url: '/studentAuth:fail',
        templateUrl: 'app/student/fail.html',
        controller: 'StudentAuthController'
      })
      .state('card', {
        url: '/card',
        templateUrl: 'app/card/card.html',
        controller: 'CardController'
      })
      .state('id', {
        url: '/id',
        templateUrl: 'app/id/id.html',
        controller: 'IdController'
      })

    $urlRouterProvider.otherwise('/');
  }

})();
