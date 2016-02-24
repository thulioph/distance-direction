'use strict';

angular.module('distanceDirectionApp')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  }])
  .constant('AppConfig', {
    'URL': 'https://maps.googleapis.com/maps/api/',
    'DISTANCE_KEY': 'AIzaSyDhYgr3oSOFPtTNynI7fOxMxJkU2LPQnQk',
    'LANGUAGE': 'pt-BR',
    'DIRECTIONS_KEY': 'AIzaSyCWmTGDejJLsv4LLNv2T8qkiazU5Y5l4X4'
  });
