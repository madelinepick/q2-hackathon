// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection:  'postgres://localhost/stack-overflow-db',
    pool: {
      min: 2,
      max: 10
    }
  }
};
