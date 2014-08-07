'use strict';

/* App Module */

angular
  .module('DrawApp', ['ngRoute'])
  .controller('DrawCtrl', DrawCtrl)
  .directive('dsDrawing', dsDrawing)
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

DrawCtrl.$inject = ['drawingFactory'];
