'use strict';

dsDrawing.$inject = ['drawingFactory', 'toolsFactory'];

function dsDrawing (drawingFactory, toolsFactory) {
  return {
    restruct: 'A',
    link: function(scope, element, attrs) {
      var ctx = element[0].getContext('2d');

      var drawAllowed = false;
      var lastX, lastY;



      //canvas reset
      function reset() {
        element[0].width = element[0].width;
        //ctx.clearRect ( x , y , w , h );
      }

      function draw(lX, lY, cX, cY) {
        // line from
        ctx.moveTo(lX,lY);
                // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = "#4bf";
        // draw it
        ctx.stroke();
      }

      scope.$watch('draw.tool', function(newTool, oldTool) {
        toolsFactory.setTool(newTool, element);
      });

    }
  };
}
