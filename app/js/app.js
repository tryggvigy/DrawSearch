'use strict';

/* App Module */

var app = angular.module('DrawApp', [
  'ngRoute',
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/draw.html',
        controller: 'DrawCtrl'
      }).
      otherwise({
        templateUrl: 'partials/404.html'
      });
  }]);
