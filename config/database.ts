import path from 'path'

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql')

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: {
        min: 2,
        max: 10,
      },
    },
  }

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: 60000,
    },
  }
}
