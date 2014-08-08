'use strict';

/* App Module */

angular
  .module('DrawApp', ['ngRoute'])
  .controller('DrawCtrl', DrawCtrl)
  .directive('dsDrawing', dsDrawing)
  .factory('drawingFactory', drawingFactory)
  .factory('toolsFactory', toolsFactory)
  .factory('brushFactory', brushFactory)
  .factory('toolUtils', toolUtils)

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
