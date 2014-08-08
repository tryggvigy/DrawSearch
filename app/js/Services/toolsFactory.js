'use strict';
/*
  angular factory:
  gets tools from other services and calls the functions to set them.
*/


toolsFactory.$inject = ['brushFactory'];

function toolsFactory(brushFactory) {

  ///////// PRIVATE ///////////
  var _tools = {
    pencil: brushFactory.pencil,
    pencil2: brushFactory.pencil2
  };

  /////////// PUBLIC //////////////
  function setTool(name, element) {
    return _tools[name](element);
  }

  return {
    setTool: setTool
  };
}
