'use strict';

neighborPointsTool.$inject = ['drawingFactory'];

function neighborPointsTool(drawingFactory) {

  ///////// PRIVATE ///////////
  var el = document.getElementById('myCanvas');
  var ctx = el.getContext('2d');
  var isDrawing, points = [ ];
  var _drawingFactory = drawingFactory;

  /////////// PUBLIC ///////////
  function getNeighborPointsTool() {
    ctx.lineJoin = ctx.lineCap = 'round';

    el.onmousedown = function(e) {
      _drawingFactory.saveState(el);
      points = [ ];
      isDrawing = true;
      points.push({ x: e.clientX-el.offsetLeft, y: e.clientY-el.offsetTop });
    };

    el.onmousemove = function(e) {

      if (!isDrawing) return;

      points.push({ x: e.clientX-el.offsetLeft, y: e.clientY-el.offsetTop });

      ctx.beginPath();
      ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();

      for (var i = 0, len = points.length; i < len; i++) {
        var dx = points[i].x - points[points.length-1].x;
        var dy = points[i].y - points[points.length-1].y;
        var d = dx * dx + dy * dy;

        if (d < 1000) {
          ctx.beginPath();
          ctx.strokeStyle = drawingFactory.setRgbOpacity(drawingFactory.getColor(), "0.3");
          ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
          ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
          ctx.stroke();
          ctx.strokeStyle = drawingFactory.getColor();
        }
      }
    };

    el.onmouseup = function() {
      isDrawing = false;
      points.length = 0;
    };
  }

  var factory = {
    neighborPointsTool: getNeighborPointsTool
  };
  return factory;
}
