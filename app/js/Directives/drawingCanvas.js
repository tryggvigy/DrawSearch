'use strict';

function Drawing () {
  return {
    restruct: 'A',
    link: function(scope, element, attrs){
      var ctx = element[0].getContext('2d');

      var drawAllowed = false;
      var lastX, lastY;

      element.bind('mousedown', function(evt) {
        if(evt.offsetX !== undefined) {
          lastX = evt.offsetX;
          lastY = evt.offsetY;
        }
        else { // Firefox compatibility
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }

        ctx.beginPath();

        drawAllowed = true;
      });

      element.bind('mousemove', function(evt) {
        if(drawAllowed) {
          var currentX, currentY;
          // get current mouse position
          if(event.offsetX!==undefined){
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }

          draw(lastX, lastY, currentX, currentY);

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
      });
      element.bind('mouseup', function(event){
        // stop drawing
        drawAllowed = false;
      });

      //canvas reset
      function reset() {
        element[0].width = element[0].width;
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
    }
  };
}
