'use strict';

DrawCtrl.$inject = ['drawingFactory'];

function DrawCtrl(drawingFactory) {
  var vm = this;
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  vm.topBtns = [
    {'icon': 'icon-new',
     'task': 'setTool',
     'tool': 'pencil'}
  ];

  vm.tool = 'pencil';

  vm.clearCanvas = clearCanvas;
  vm.setPencilSize = setPencilSize;
  vm.setTool = setTool;
  vm.setStrokeStyle = setStrokeStyle;
  vm.undoState = undoState;
  vm.redoState = redoState;

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

  function undoState() {
    drawingFactory.undoState(canvas, ctx);
  }

  function redoState() {
    drawingFactory.redoState(canvas, ctx);
  }

}
