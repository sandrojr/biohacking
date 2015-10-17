function(){
	'use strict';

	angular
		.module('app')
		.controller('ListController', ListController);
    .filter('firstType',function(){
  return function(input, type){
    var results = [];
    for(var i in input){
      var description = input[i];
        if(description[0]==type)
            results.push(description);
    }
    return results;
  };
});




  })();
