'use strict';

furTool.$inject = ['drawingFactory'];

function furTool(drawingFactory) {

  ///////// PRIVATE ///////////
  var el = document.getElementById('myCanvas');
  var ctx = el.getContext('2d');
  var isDrawing, points = [ ];
  var _drawingFactory = drawingFactory;

  /////////// PUBLIC ///////////
  function getFurTool() {
    ctx.lineJoin = ctx.lineCap = 'round';

    el.onmousedown = function(e) {
      _drawingFactory.saveState(el);
      points = [ ];
      isDrawing = true;
      points.push({ x: drawingFactory.getClickPos(e, el).x, y: drawingFactory.getClickPos(e, el).y});
    };

    el.onmousemove = function(e) {
      if (!isDrawing) return;

      points.push({ x: drawingFactory.getClickPos(e, el).x, y: drawingFactory.getClickPos(e, el).y});

      ctx.beginPath();
      ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();

      for (var i = 0, len = points.length; i < len; i++) {
        var dx = points[i].x - points[points.length-1].x;
        var dy = points[i].y - points[points.length-1].y;
        var d = dx * dx + dy * dy;

        if (d < 2000 && Math.random() > d / 2000) {
          ctx.beginPath();
          ctx.strokeStyle = drawingFactory.setRgbOpacity(drawingFactory.getColor(), "0.3");
          ctx.moveTo( points[points.length-1].x + (dx * 0.5), points[points.length-1].y + (dy * 0.5));
          ctx.lineTo( points[points.length-1].x - (dx * 0.5), points[points.length-1].y - (dy * 0.5));
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
    furTool: getFurTool
  };
  return factory;
}
