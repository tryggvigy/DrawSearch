'use strict';

brushFactory.$inject = ['toolUtils'];

function brushFactory() {

  var factory = {
    pencil: pencil,
    pencil2: pencil2
  };

  ////// PRIVATE ///////
  var el = document.getElementById('myCanvas');
  var ctx = el.getContext('2d');
  var isDrawing, points = [ ];

  /////// PUBLIC ////////
  function pencil(element) {

    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'round';

    el.onmousedown = function(e) {
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

  function pencil2(element) {
    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = 'round';

    el.onmousedown = function(e) {
      points = [ ];
      isDrawing = true;
      points.push({ x: e.clientX-el.offsetLeft, y: e.clientY-el.offsetTop });
    };

    el.onmousemove = function(e) {
      if (!isDrawing) return;

      //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
          ctx.strokeStyle = 'rgba(0,0,0,0.3)';
          ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
          ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
          ctx.stroke();
        }
      }
    };

    el.onmouseup = function() {
      isDrawing = false;
      points.length = 0;
    };
  }

  return factory;
}
