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
      startPoint.x = e.clientX-el.offsetLeft;
      startPoint.y = e.clientY-el.offsetTop;
    };

    el.onmousemove = function(e) {
      if (!isDrawing) return;
      currPoint.x = e.clientX-el.offsetLeft;
      currPoint.y = e.clientY-el.offsetTop;
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
