'use strict';
/*
  angular factory:
  holds data about all the button-groups for other
  parts of the app to access.
*/

function buttonsFactory() {

  ///////// PRIVATE ///////////
  var _topBtns = [{
    desc: 'New',
    icon: 'icon-new',
    action: "draw.clearCanvas()"
  }, {
    desc: 'Undo',
    icon: 'icon-undo',
    action: "draw.undoState()"
  }, {
    desc: 'Redo',
    icon: 'icon-redo',
    action: "draw.redoState()"
  }];

  var _gridBtns = [{
    desc: 'Pencil',
    icon: 'icon-pencil',
    action: "draw.setTool('pencil')"
  }, {
    desc: 'Web Brush',
    icon: 'icon-pen',
    action: "draw.setTool('neighborPoints')"
  }, {
    desc: 'Box Drawing',
    icon: 'icon-box',
    action: "draw.setTool('square')"
  }, {
    desc: 'Fur',
    icon: 'icon-pencil',
    action: "draw.setTool('fur')"
  }];

  /////////// PUBLIC //////////////
  function getTopBtns() {
    return _topBtns;
  }

  function getGridBtns() {
    return _gridBtns;
  }


  var factory = {
    getTopBtns: getTopBtns,
    getGridBtns: getGridBtns
  };
  return factory;
}
