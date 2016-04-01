
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
  table.increments();
  table.string('username');
  table.string('password');
  table.string('role id');
})
  .createTable('roles', function(table){
  table.increments();
  table.string('name');
  table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
  .dropTable('roles');
};
