'use strict';

function drawingFactory() {

  var factory = {
    clearCanvas: clearCanvas,
    setPencilSize: setPencilSize,
    setStrokeStyle: setStrokeStyle
  };
  return factory;

  /////////////////
  function clearCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect ( 0 , 0 , canvas.clientWidth , canvas.clientHeight);
  }

  function setPencilSize(ctx) {
    ctx.lineWidth = 15;
  }

  function setStrokeStyle(ctx, color) {
    ctx.strokeStyle = color;
  }
}
