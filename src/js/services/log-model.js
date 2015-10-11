(function(){
	'use strict';

	angular
		.module('app')
		.service('LogModel', LogModel);

	function LogModel(Database, Security) {
		return function(data) {
			data = data || {};

			this.id = data.id;
			this.kind = data.kind;
			this.description = data.description;
			this.logged_at = data.logged_at || new Date();

			this.$save = function() {
				return Database.insert('logs', {
					kind: this.kind.name,
					logged_at: this.logged_at,
					description: this.description,
					user_id: Security.getUser().id
				});
			}
	    };
	}

})();