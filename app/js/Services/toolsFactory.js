'use strict';
/*
  angular factory:
  gets tools from other services and calls the functions to set them.
*/

toolsFactory.$inject = ['neighborPointsTool', 'pencilTool', 'squareTool', 'furTool'];

function toolsFactory(neighborPointsTool, pencilTool, squareTool, furTool) {

  ///////// PRIVATE ///////////
  var _tools = {
    pencil: pencilTool.pencilTool,
    neighborPoints: neighborPointsTool.neighborPointsTool,
    square: squareTool.squareTool,
    fur: furTool.furTool
  };

  /////////// PUBLIC //////////////
  function setTool(name) {
    return _tools[name]();
  }

  return {
    setTool: setTool
  };
}
