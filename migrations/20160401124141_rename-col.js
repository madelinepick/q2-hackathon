
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.renameColumn('role id', 'role_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.renameColumn('role_id', 'role id')
  })
};
