'use strict';

/* App Module */

angular
  .module('DrawApp', ['ngRoute'])
  .controller('DrawCtrl', DrawCtrl)
  .directive('dsDrawing', dsDrawing)
  .factory('drawingFactory', drawingFactory)
  .factory('toolsFactory', toolsFactory)
  .factory('toolUtils', toolUtils)

  // TOOLS
  .factory('pencilTool', pencilTool)
  .factory('neighborPointsTool', neighborPointsTool)

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
