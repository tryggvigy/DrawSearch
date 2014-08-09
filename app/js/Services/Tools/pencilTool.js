'use strict';

pencilTool.$inject = ['drawingFactory'];

function pencilTool(drawingFactory) {

  /////// PRIVATE /////////////
  var el = document.getElementById('myCanvas');
  var ctx = el.getContext('2d');
  var isDrawing, points = [ ];
  var _drawingFactory = drawingFactory;

  //////// PUBLIC /////////
  function getPencilTool() {

    ctx.lineJoin = ctx.lineCap = 'round';

    el.onmousedown = function(e) {
      _drawingFactory.saveState(el);
      isDrawing = true;
      points.push({ x: e.clientX-el.offsetLeft, y: e.clientY-el.offsetTop });
    };

    el.onmousemove = function(e) {
      if (!isDrawing) return;

      points.push({ x: e.clientX-el.offsetLeft, y: e.clientY-el.offsetTop });

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    };

    el.onmouseup = function() {
      isDrawing = false;
      points.length = 0;
    };
  }

  var factory = {
    pencilTool: getPencilTool,
  };
  return factory;
}
