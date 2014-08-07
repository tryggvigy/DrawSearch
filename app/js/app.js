'use strict';

/* App Module */

angular
  .module('DrawApp', ['ngRoute'])
  .controller('DrawCtrl', DrawCtrl)
  .directive('drawing', Drawing)
  .factory('drawingFactory', drawingFactory)

  .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/templates/draw.html',
        controller: 'DrawCtrl'
      }).
      otherwise({
        templateUrl: 'partials/templates/404.html'
      });
  }]);
