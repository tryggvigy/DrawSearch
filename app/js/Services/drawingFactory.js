'use strict';

function drawingFactory() {
  var undoHistory = [] , redoHistory = [];
  var currState = -1;

  function _resetCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect ( 0 , 0 , canvas.clientWidth , canvas.clientHeight);
  }

  /////////////////
  function clearCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    currState++;
    undoHistory.push(canvas.toDataURL());
    ctx.clearRect ( 0 , 0 , canvas.clientWidth , canvas.clientHeight);
  }

  function saveState(canvas) {
    currState++;
    if(currState <= 0) return;
    redoHistory = [];
    undoHistory.push(canvas.toDataURL());
  }

  function undoState(canvas, ctx) {
    if(currState <= 0) return;
    redoHistory.push(canvas.toDataURL());
    currState--;
    var pastState = undoHistory.pop();
    
    var canvasPic = new Image();
    canvasPic.src = pastState;
    canvasPic.onload = function () {
      _resetCanvas(canvas);
      ctx.drawImage(canvasPic, 0, 0);
    };
  }

  function redoState(canvas, ctx) {
    if(!redoHistory.length) return;
    undoHistory.push(canvas.toDataURL());
    currState++;
    var futureState = redoHistory.pop();

    var canvasPic = new Image();
    canvasPic.src = futureState;
    canvasPic.onload = function () {
      _resetCanvas(canvas);
      ctx.drawImage(canvasPic, 0, 0);
    };
  }


  var factory = {
    clearCanvas: clearCanvas,
    saveState: saveState,
    undoState: undoState,
    redoState: redoState
  };
  return factory;
}
