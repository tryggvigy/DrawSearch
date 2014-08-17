'use strict';
/*
  angular factory:
  gets tools from other services and calls the functions to set them.
*/


toolsFactory.$inject = ['neighborPointsTool', 'pencilTool', 'squareTool'];

function toolsFactory(neighborPointsTool, pencilTool, squareTool) {

  ///////// PRIVATE ///////////
  var _tools = {
    pencil: pencilTool.pencilTool,
    neighborPoints: neighborPointsTool.neighborPointsTool,
    square: squareTool.squareTool,
  };

  /////////// PUBLIC //////////////
  function setTool(name) {
    return _tools[name]();
  }

  return {
    setTool: setTool
  };
}
