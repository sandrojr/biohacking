(function(){
	'use strict';

	angular
		.module('app')
		.controller('FilterController', FilterController);

	function FilterController() {
		var vm = this;

		vm.kinds = [
	        {id: 11, name:  "BATH"}, 
	        {id: 9, name:  "DEFECATE"},
	        {id: 3, name:  "DRINK"},
	        {id: 2, name:  "EAT"},
	        {id: 5, name:  "HUNGRY"},
	        {id: 10, name:  "SEX"},
	        {id: 6, name:  "SLEEP"},
	        {id: 8, name:  "URINATE"},
	        {id: 7, name:  "WAKEUP"},
	        {id: 1, name:  "DWEIGHT"},
	        {id: 4, name:  "WORKOUT"}
	    ];
	}

})();