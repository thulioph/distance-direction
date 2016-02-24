'use strict';

describe('Controller: MapaCtrl', function () {

  // load the controller's module
  beforeEach(module('distanceDirectionApp'));

  var MapaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapaCtrl = $controller('MapaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MapaCtrl.awesomeThings.length).toBe(3);
  });
});
