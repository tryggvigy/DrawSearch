'use strict';

DrawCtrl.$inject = ['drawingFactory'];

function DrawCtrl(drawingFactory) {
  var vm = this;
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  vm.tool = 'pencil';

  vm.clearCanvas = clearCanvas;
  vm.setPencilSize = setPencilSize;
  vm.setTool = setTool;
  vm.setStrokeStyle = setStrokeStyle;

  function clearCanvas() {
    drawingFactory.clearCanvas(canvas);
  }

  function setPencilSize() {
    drawingFactory.setPencilSize(ctx);
  }

  function setStrokeStyle(color) {
    ctx.strokeStyle = color;
  }

  function setTool(tool) {
    vm.tool = tool;
  }
}
