(function(){
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);
		.filter('firstType', firstType);

	function MainController($route, $scope, Database, LogModel) {
		var vm = this;
		var tableName = 'logs';

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

		Database.findAll(tableName).then(function(results) {
			$scope.$apply(function() {
				vm.logs = results;
			});
		});

		vm.showHashtag = showHashtag;
		vm.destroy = destroy;
		vm.done = done;
		vm.firstType = firstType;

		////////////////////////////////////////////////

		function destroy() {
			Database.destroy(tableName, vm.model.id).then(function() {
				$route.reload();
			});
		};

		function done() {
			Database.update(tableName, vm.model).then(function() {
				$route.reload();
			});
		}

		function showHashtag(string) {
			if (string) {
				return string.replace(/(#[a-z0-9][a-z0-9\-_]*)/ig, "<a>$1</a>");
			}
		}


		var List = function($scope){

			Database.findAll(tableName).then(function(results) {
				$scope.$apply(function() {
					vm.logs = results;
				});
			});

var descriptions[];

 for (var vm.log in vm.logs) {
	 descriptions.add( vm.log.description);

 }
$scope.descriptions= descriptions;


  function escRegExp(string){
   return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g);
    }

  $scope.filterSearch = function(description) {
 if (!$scope.search){
   return true;
 }else
    var regex = new RegExp('\\b' + escRegExp($scope.search), 'i');
    return regex.test(description.split(' ')[0]);
};
}

		function firstType(input, type){
	    var results = [];
	    for(var i in input){
	      var description = input[i];
	        if(description[0]==type)
	            results.push(description);
	    }
	    return results;
	  };

	}

})();
