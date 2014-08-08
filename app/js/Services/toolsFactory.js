'use strict';
/*
  angular factory:
  gets tools from other services and calls the functions to set them.
*/


toolsFactory.$inject = ['neighborPointsTool', 'pencilTool'];

function toolsFactory(neighborPointsTool, pencilTool) {

  ///////// PRIVATE ///////////
  var _tools = {
    pencil: pencilTool.pencilTool,
    neighborPoints: neighborPointsTool.neighborPointsTool
  };

  /////////// PUBLIC //////////////
  function setTool(name) {
    return _tools[name]();
  }

  return {
    setTool: setTool
  };
}
