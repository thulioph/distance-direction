'use strict';

/**
 * @ngdoc function
 * @name distanceDirectionApp.controller:MapaCtrl
 * @description
 * # MapaCtrl
 * Controller of the distanceDirectionApp
 */
angular.module('distanceDirectionApp')
  .controller('MapaCtrl', function ($scope, Distance, Directions, $http) {

    // ====
    // Get user location
    function getLocation() {
      if (navigator.geolocation) {
        console.log('Get userlocation...');
        navigator.geolocation.getCurrentPosition(initMap, error);
      } else {
        window.alert('Geolocation is not supported.');
      }
    }

    function error(err) {
      window.alert('Error: ', err);
    }

    getLocation();
    // ====


    // ====
    // Get distance and directions
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

        if (result.status === 'OK') {
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
        } else {
          $scope.error_message = result.error_message;
          $scope.status = result.status;
        }
      });
    };
    // ====


    // ====
    // Initializes map and display routes
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    function initMap(position) {
      var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: userPosition
      });

      var marker = new google.maps.Marker({
        map: map,
        position: userPosition
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

    $scope.showRoute = function(rt) {
      console.log(rt);
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    // ====


    // ====
    // Adds more fields (pairs) of origin and destination
    $scope.rows = [];

    $scope.addRow = function() {
      $scope.rows.push({
        origin: '',
        destination: ''
      });
    };
    // ====


    // ====
    $scope.autoComplete = function(address) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          sensor: false,
          language: 'pt-BR'
        }
      }).then(function(response){
        console.log(response);

        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };
    // ====

  });
