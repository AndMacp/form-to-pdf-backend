export default ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'mysql'),
    connection: {
      host: env('DATABASE_HOST', 'mysql.railway.internal'), // Use Railway internal host
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'railway'), // Database name you set on Railway
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', 'KfyBxoVptxDpFdlUlgpIMDIUfKsxfxMk'), // Use your Railway MySQL password here
      ssl: env.bool('DATABASE_SSL', false),
    },
    acquireConnectionTimeout: 60000,
  },
})
