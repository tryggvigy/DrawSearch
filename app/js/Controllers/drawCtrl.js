'use strict';

DrawCtrl.$inject = ['drawingFactory', 'buttonsFactory'];

function DrawCtrl(drawingFactory, buttonsFactory) {
  var vm = this;
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var colorpicker = document.getElementById('selectColor');
  var lineWithSlider = document.getElementById('selectLineWith');

  vm.topBtns = buttonsFactory.getTopBtns();

  vm.tool = 'neighborPoints';
  vm.color = '';
  vm.lineWith = '';

  //functions
  vm.clearCanvas = clearCanvas;
  vm.setPencilSize = setPencilSize;
  vm.setTool = setTool;
  vm.undoState = undoState;
  vm.redoState = redoState;

  function clearCanvas() {
    drawingFactory.clearCanvas(canvas);
  }

  function setPencilSize() {
    drawingFactory.setPencilSize(ctx);
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

  colorpicker.onblur = function(e) {
    ctx.strokeStyle = vm.color;
    ctx.fillStyle = vm.color;
  };

  lineWithSlider.onmouseup = function(e) {
    ctx.lineWidth = vm.lineWith;
  };
}
