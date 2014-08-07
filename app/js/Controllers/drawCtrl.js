'use strict';

function DrawCtrl(drawingFactory) {
  var vm = this;
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  vm.clearCanvas = clearCanvas;
  vm.setPencilSize = setPencilSize;

  function clearCanvas() {
    drawingFactory.clearCanvas(canvas);
  }

  function setPencilSize() {
    drawingFactory.setPencilSize(ctx);
  }
}
