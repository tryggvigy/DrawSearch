'use strict';

function drawingFactory() {

  /////// PRIVATE ///////////
  var undoHistory = [] , redoHistory = [];
  var currState = -1;
  var _currColor = "rgb(0,0,0)";

  function _resetCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect ( 0 , 0 , canvas.clientWidth , canvas.clientHeight);
  }

  ///////// PUBLIC ///////////
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

  function getColor() {
    return _currColor;
  }

  function setColor(newColor) {
    _currColor = newColor;
  }

  //amount can be from 0 to 1.
  function setRgbOpacity(color, amount) {
    var rgbValues = color.match(/\d+/g); //regex all numbers in string.
    var red = rgbValues[0], green = rgbValues[1], blue = rgbValues[2];

    return 'rgba('+red+','+green+','+blue+','+amount+')';
  }

  var factory = {
    clearCanvas: clearCanvas,
    saveState: saveState,
    undoState: undoState,
    redoState: redoState,
    getColor: getColor,
    setColor: setColor,
    setRgbOpacity: setRgbOpacity
  };
  return factory;
}
