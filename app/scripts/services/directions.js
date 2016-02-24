'use strict';

/**
 * @ngdoc service
 * @name distanceDirectionApp.Directions
 * @description
 * # Directions
 * Service in the distanceDirectionApp.
 */
angular.module('distanceDirectionApp')
  .service('Directions', function ($http, AppConfig) {

    var app_url = AppConfig.URL;
    var app_language = AppConfig.LANGUAGE;
    var app_key = AppConfig.DIRECTIONS_KEY;

    var obj = {};

    obj.getDirections = function (data, callback) {
      $http.get(app_url + 'directions/json?origin=' + data.origin + '&destination=' + data.destination + '&alternatives=' + data.alternatives + '&language=' + app_language)
        .success(function (data) {
          console.log('Success getDirections: ', data);
          callback(data);
        }).error(function (error) {
        console.log('Error getDirections: ', error);
      });
    };

    return obj;
  });
