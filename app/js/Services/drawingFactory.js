'use strict';

function drawingFactory() {

  var factory = {
    clearCanvas: clearCanvas,
    setPencilSize: setPencilSize
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
}
