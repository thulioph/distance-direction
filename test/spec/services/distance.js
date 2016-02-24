'use strict';

describe('Service: Distance', function () {

  // load the service's module
  beforeEach(module('distanceDirectionApp'));

  // instantiate service
  var Distance;
  beforeEach(inject(function (_Distance_) {
    Distance = _Distance_;
  }));

  it('should do something', function () {
    expect(!!Distance).toBe(true);
  });

});
