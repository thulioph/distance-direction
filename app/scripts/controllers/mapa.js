'use strict';

/**
 * @ngdoc function
 * @name distanceDirectionApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the distanceDirectionApp
 */
angular.module('distanceDirectionApp')
  .controller('MapaCtrl', function ($scope, Distance, Directions) {

    // ====
    $scope.place = {};
    $scope.error_message = null;

    $scope.search = function() {
      var distance = {
        origin: $scope.place.origin,
        destination: $scope.place.destination,
        mode: $scope.place.mode
      };

      var directions = {
        origin: $scope.place.origin,
        destination: $scope.place.destination,
        mode: $scope.place.mode,
        alternatives: $scope.place.alternatives
      };

      Distance.getDistance(distance, function(result) {
        // console.warn(result);

        if (result.status === 'OK') {
          for (var i = 0; i < result.rows.length; i++) {
            angular.forEach(result.rows[i].elements, function(p) {
              $scope.data = p
            });
          }
        } else {
          $scope.error_message = result.error_message;
          $scope.status = result.status;
        }
      });

      Directions.getDirections(directions, function(result) {
        console.warn(result);

        var y = [];

        angular.forEach(result.routes, function(p) {
          y.push({
            summary: p.summary,
            distance: p.legs[0].distance.text,
            duration: p.legs[0].duration.text,
            steps: p.legs[0].steps
          });
          return y;
        });

        $scope.routes = y;
      });
    };
    // ====

    // ====
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {
          lat: -8.0869234,
          lng: -34.8922305
        }
      });

      directionsDisplay.setMap(map);
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route({
        origin: $scope.place.origin,
        destination: $scope.place.destination,
        travelMode: $scope.place.mode.toUpperCase()
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    initMap();

    $scope.openMap = function(rt) {
      console.log(rt);
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    // ====

    // ====
    $scope.rows = [];

    $scope.addRow = function() {
      $scope.rows.push({
        origin: '',
        destination: ''
      });
    };
    // ====

  });
