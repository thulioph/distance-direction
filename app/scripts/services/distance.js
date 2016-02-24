'use strict';

/**
 * @ngdoc service
 * @name distanceDirectionApp.Distance
 * @description
 * # Distance
 * Service in the distanceDirectionApp.
 */
angular.module('distanceDirectionApp')
  .service('Distance', function ($http, AppConfig) {

    var app_url = AppConfig.URL;
    var app_language = AppConfig.LANGUAGE;
    var app_key = AppConfig.DISTANCE_KEY;

    var obj = {};

    obj.getDistance = function (data, callback) {
      $http.get(app_url + 'distancematrix/json?origins=' + data.origin + '&destinations=' + data.destination + '&mode=' + data.mode + '&language=' + app_language)
        .success(function (data) {
          console.log('Success getDistance: ', data);
          callback(data);
        }).error(function (error) {
        console.log('Error getDistance: ', error);
      });
    };

    return obj;

  });
