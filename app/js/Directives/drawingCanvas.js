'use strict';

dsDrawing.$inject = ['drawingFactory', 'toolsFactory'];

function dsDrawing (drawingFactory, toolsFactory) {
  return {
    restruct: 'A',
    link: function(scope, element, attrs) {

      scope.$watch('draw.tool', function(newTool, oldTool) {
        var a = scope.$parent; //TO-DO: ACCESS COLOR;
        toolsFactory.setTool(newTool);
      });

    }
  };
}
