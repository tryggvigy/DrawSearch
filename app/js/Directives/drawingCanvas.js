'use strict';

dsDrawing.$inject = ['drawingFactory', 'toolsFactory'];

function dsDrawing (drawingFactory, toolsFactory) {
  return {
    restruct: 'A',
    link: function(scope, element, attrs) {

      scope.$watch('draw.tool', function(newTool) {
        toolsFactory.setTool(newTool);
      });
    }
  };
}
