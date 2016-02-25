"use strict";angular.module("distanceDirectionApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/mapa.html",controller:"MapaCtrl",controllerAs:"mapa"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/mapa",{templateUrl:"views/mapa.html",controller:"MapaCtrl",controllerAs:"mapa"}).otherwise({redirectTo:"/"})}]),angular.module("distanceDirectionApp").config(["$httpProvider",function(a){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"]}]).constant("AppConfig",{URL:"https://maps.googleapis.com/maps/api/",DISTANCE_KEY:"AIzaSyDhYgr3oSOFPtTNynI7fOxMxJkU2LPQnQk",LANGUAGE:"pt-BR",DIRECTIONS_KEY:"AIzaSyCWmTGDejJLsv4LLNv2T8qkiazU5Y5l4X4"}),angular.module("distanceDirectionApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("distanceDirectionApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("distanceDirectionApp").controller("MapaCtrl",["$scope","Distance","Directions","$http",function(a,b,c,d){function e(){navigator.geolocation?(console.log("Get userlocation..."),navigator.geolocation.getCurrentPosition(g,f)):window.alert("Geolocation is not supported.")}function f(a){window.alert("Error: ",a)}function g(a){var b=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),c=new google.maps.Map(document.getElementById("map"),{zoom:7,center:b,scrollwheel:!1});new google.maps.Marker({map:c,position:b});j.setMap(c)}function h(b,c){b.route({origin:a.place.origin,destination:a.place.destination,travelMode:a.place.mode.toUpperCase()},function(a,b){b===google.maps.DirectionsStatus.OK?c.setDirections(a):window.alert("Directions request failed due to "+b)})}e(),a.place={},a.error_message=null,a.search=function(){var d={origin:a.place.origin,destination:a.place.destination,mode:a.place.mode},e={origin:a.place.origin,destination:a.place.destination,mode:a.place.mode,alternatives:a.place.alternatives};b.getDistance(d,function(b){if("OK"===b.status)for(var c=0;c<b.rows.length;c++)angular.forEach(b.rows[c].elements,function(b){a.data=b});else a.error_message=b.error_message,a.status=b.status}),c.getDirections(e,function(b){if(console.warn(b),"OK"===b.status){var c=[];angular.forEach(b.routes,function(a){return c.push({summary:a.summary,distance:a.legs[0].distance.text,duration:a.legs[0].duration.text,steps:a.legs[0].steps}),c}),a.routes=c}else a.error_message=b.error_message,a.status=b.status})};var i=new google.maps.DirectionsService,j=new google.maps.DirectionsRenderer;a.showRoute=function(a){console.log(a),h(i,j)},a.rows=[],a.addRow=function(){a.rows.push({origin:"",destination:""})},a.autoComplete=function(a){return d.get("//maps.googleapis.com/maps/api/geocode/json",{params:{address:a,sensor:!1,language:"pt-BR"}}).then(function(a){return console.log(a),a.data.results.map(function(a){return a.formatted_address})})}}]),angular.module("distanceDirectionApp").service("Distance",["$http","AppConfig",function(a,b){var c=b.URL,d=b.LANGUAGE,e=(b.DISTANCE_KEY,{});return e.getDistance=function(b,e){a.get(c+"distancematrix/json?origins="+b.origin+"&destinations="+b.destination+"&mode="+b.mode+"&language="+d).success(function(a){console.log("Success getDistance: ",a),e(a)}).error(function(a){console.log("Error getDistance: ",a)})},e}]),angular.module("distanceDirectionApp").service("Directions",["$http","AppConfig",function(a,b){var c=b.URL,d=b.LANGUAGE,e=(b.DIRECTIONS_KEY,{});return e.getDirections=function(b,e){a.get(c+"directions/json?origin="+b.origin+"&destination="+b.destination+"&alternatives="+b.alternatives+"&language="+d).success(function(a){console.log("Success getDirections: ",a),e(a)}).error(function(a){console.log("Error getDirections: ",a)})},e}]),angular.module("distanceDirectionApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/mapa.html",'<div class="col-xs-12 col-sm-6 col-sm-offset-3 ng-scope"> <aside class="box"> <h3><b>Usage</b></h3> <p> Fill <b>origin</b> and <b>destination</b> fields, choose <b>how you goes</b> and submit, below you see the routes with <b>travel time</b> and <b>distance</b>. Can you click in <b>show route</b> button for see into map. </p> </aside> <form ng-submit="search()" name="searchForm"> <fieldset class="form-group"> <label for="input-origin">Origin</label> <input id="input-origin" type="text" name="origin" ng-model="place.origin" class="form-control" autocomplete="off" uib-typeahead="address for address in autoComplete($viewValue)"> </fieldset> <fieldset class="form-group"> <label for="input-destination">Destination</label> <input id="input-destination" type="text" name="destination" ng-model="place.destination" class="form-control" autocomplete="off" uib-typeahead="address for address in autoComplete($viewValue)"> </fieldset> <fieldset class="radio"> <label> <input type="radio" name="mode" ng-model="place.mode" value="driving"> Driving </label> <label> <input type="radio" name="mode" ng-model="place.mode" value="bicycling"> Bicycling </label> <label> <input type="radio" name="mode" ng-model="place.mode" value="walking"> Walking </label> </fieldset> <fieldset class="checkbox"> <label> <input type="checkbox" name="alternatives" ng-model="place.alternatives" value="false"> Alternative routes </label> </fieldset> <button type="submit" class="btn btn-primary">Submit</button> <br><br> </form> <br> <hr style="margin-top: 0"> <!-- distance --> <div ng-include src="\'views/partials/distance.html\'"></div> <!-- directions --> <div ng-include src="\'views/partials/directions.html\'"></div> <!-- map --> <div id="map" class="map"></div> </div>'),a.put("views/partials/directions.html",'<aside class="panel panel-default"> <header class="panel-heading">Directions API</header> <table class="table"> <thead> <tr> <th>Routes</th> <th>Distance</th> <th>Travel time</th> </tr> </thead> <tbody> <tr ng-repeat="rt in routes"> <td>{{rt.summary}}</td> <td>{{rt.distance}}</td> <td>{{rt.duration}}</td> <td> <button class="btn btn-primary btn-sm" ng-click="showRoute(rt)">show route</button> </td> </tr> </tbody> </table> </aside> <div ng-show="error_message || status" class="alert alert-danger" role="alert"> {{error_message}} / {{status}} </div>'),a.put("views/partials/distance.html",'<aside class="panel panel-default"> <header class="panel-heading">Distance Matrix API</header> <table class="table"> <thead> <tr> <th>Distance</th> <th>Travel time</th> </tr> </thead> <tbody> <tr> <td>{{data.distance.text}}</td> <td>{{data.duration.text}}</td> </tr> </tbody> </table> </aside> <div ng-show="error_message || status" class="alert alert-danger" role="alert"> {{error_message}} / {{status}} </div>')}]);