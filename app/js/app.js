'use strict';

/* App Module */

angular
  .module('DrawApp', ['ngRoute', 'ngTouch', 'ui.bootstrap', 'vr.directives.slider', 'colorpicker.module'])
  .controller('DrawCtrl', DrawCtrl)
  .directive('dsDrawing', dsDrawing)
  .factory('drawingFactory', drawingFactory)
  .factory('toolsFactory', toolsFactory)
  .factory('buttonsFactory', buttonsFactory)

  // TOOLS
  .factory('pencilTool', pencilTool)
  .factory('neighborPointsTool', neighborPointsTool)
  .factory('squareTool', squareTool)

  //3rd-party

  .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/templates/draw.html',
        controller: 'DrawCtrl'
      }).
      when('/testPage', {
        templateUrl: 'partials/templates/testPage.html',
      }).
      otherwise({
        templateUrl: 'partials/templates/404.html'
      });
  }]);
