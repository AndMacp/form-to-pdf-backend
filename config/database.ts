export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: env('DATABASE_URL'),
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  },
})
