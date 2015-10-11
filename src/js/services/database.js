(function(){
	'use strict';

	angular
		.module('app')
		.factory('Database', Database);

	function Database($window) {
		var DB_NAME = "biohacking_db";
		var DB_VERSION = 1;

		var schemaBuilder;

	    return {
	    	connectDb: connectDb,
	    	findAll: findAll,
	    	findBy: findBy,
	    	insert: insert,
	    	initDB: initDB,
	    	destroy: destroy,
	    	update: update
	    };

	    ////////////////////////////////////////////////////////////////////////

	    function initDB() {
	    	schemaBuilder = lf.schema.create(DB_NAME, DB_VERSION);

			schemaBuilder.
				createTable('logs').
				    addColumn('id', lf.Type.INTEGER).
				    addColumn('kind', lf.Type.STRING).
				    addColumn('logged_at', lf.Type.DATE_TIME).
				    addColumn('description', lf.Type.STRING).
				    addColumn('user_id', lf.Type.INTEGER).
				    addPrimaryKey(['id'], true).
				    addNullable(['description']);

			schemaBuilder.
				createTable('users').
				    addColumn('id', lf.Type.INTEGER).
				    addColumn('email', lf.Type.STRING).
				    addColumn('password', lf.Type.STRING).
				    addUnique('email_idx_unique', ['email']).
				    addPrimaryKey(['id'], true);

			return schemaBuilder.connect();
	    }

	    function connectDb(fn) {
	    	return schemaBuilder.connect().then(fn);
	    }

	    function getUser() {
	    	return angular.fromJson($window.localStorage['user']);
	    }

	    function getDb() {
	    	return schemaBuilder.db_;
	    }

	    function insert(tableName, rowData) {
	    	var table = getTable(tableName);
			var row = table.createRow(rowData);
			return getDb().insertOrReplace().into(table).values([row]).exec();
	    }

	    function getTable(tableName) {
	    	return getDb().getSchema().table(tableName);
	    }

	    function findAll(tableName) {
	    	var user = getUser();
	    	var table = getTable(tableName);
	    	return getDb().select().from(table).where(table.user_id.eq(user.id)).exec();
	    }

	    function findBy(tableName, column, value) {
	    	var table = getTable(tableName);
	    	return getDb().select().from(table).where(table[column].eq(value)).exec();
	    }

	    function destroy(tableName, id) {
	    	var table = getTable(tableName);
	    	return getDb().delete().from(table).where(table.id.eq(id)).exec();
	    }

	    function update(tableName, model) {
	    	var table = getTable(tableName);
	    	var updateObj = getDb().update(table);

	    	angular.forEach(model, function(value, index) {
	    		updateObj.set(table[index], value);
	    	});

	    	return updateObj.where(table.id.eq(model.id)).exec();
	    }
	}

})();