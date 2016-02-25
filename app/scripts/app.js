'use strict';

/**
 * @ngdoc overview
 * @name distanceDirectionApp
 * @description
 * # distanceDirectionApp
 *
 * Main module of the application.
 */
angular
  .module('distanceDirectionApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        controllerAs: 'mapa'
        // templateUrl: 'views/main.html',
        // controller: 'MainCtrl',
        // controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/mapa', {
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl',
        controllerAs: 'mapa'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
