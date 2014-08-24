'use strict';

squareTool.$inject = ['drawingFactory'];

function squareTool(drawingFactory) {

  /////// PRIVATE /////////////
  var el = document.getElementById('myCanvas');
  var ctx = el.getContext('2d');
  var isDrawing, startPoint = {}, currPoint = {};
  var _drawingFactory = drawingFactory;

  //////// PUBLIC /////////
  function getSquareTool() {

    el.onmousedown = function(e) {
      _drawingFactory.saveState(el);
      isDrawing = true;

      startPoint.x = drawingFactory.getClickPos(e, el).x;
      startPoint.y = drawingFactory.getClickPos(e, el).y;
    };

    el.onmousemove = function(e) {
      if (!isDrawing) return;

      currPoint.x = drawingFactory.getClickPos(e, el).x;
      currPoint.y = drawingFactory.getClickPos(e, el).y;

      var rectWidth = currPoint.x-startPoint.x;
      var rectHeight = currPoint.y-startPoint.y;

      ctx.fillRect(startPoint.x, startPoint.y, rectWidth, rectHeight );
    };

    el.onmouseup = function() {
      isDrawing = false;
    };
  }

  var factory = {
    squareTool: getSquareTool
  };
  return factory;
}
