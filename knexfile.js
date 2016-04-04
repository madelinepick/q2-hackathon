// Update with your config settings.
require('dotenv').load();

module.exports = {

  development: {
    client: 'postgresql',
    connection:  'postgres://localhost/stack-overflow-db',
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection:  'process.env.DATABASE_URL',
    pool: {
      min: 2,
      max: 10
    }
  }
};
