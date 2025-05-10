const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'staging', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  jwt: {
    jwtSecret: {
      doc: 'The secret key for JWT',
      format: String,
      env: 'JWT_SECRET',
      sensitive: true,
      default: 'your-jwt-secret-here',
    },
    jwtUserID: {
      doc: 'The user ID for JWT',
      format: String,
      env: 'JWT_USER_ID',
      sensitive: true,
      default: 'your-jwt-user-id-here',
    },
  },
  redis: {
    host: {
      doc: 'The host for Redis',
      default: 'localhost',
      env: 'REDIS_HOST',
    },
    port: {
      doc: 'The port for Redis',
      default: 6379,
      env: 'REDIS_PORT',
    },
  },
  mongo: {
    mongodbUri: {
      doc: 'The URI for MongoDB',
      env: 'MONGODB_URI',
      default: 'mongodb://localhost:27017/your-database',
    },
  },
  pusher: {
    appId: {
      doc: 'Pusher App ID',
      env: 'PUSHER_APP_ID',
      default: 'your-pusher-app-id',
    },
    key: {
      doc: 'Pusher Key',
      env: 'PUSHER_KEY',
      default: 'your-pusher-key',
    },
    secret: {
      doc: 'Pusher Secret',
      env: 'PUSHER_SECRET',
      default: 'your-pusher-secret',
    },
    cluster: {
      doc: 'Pusher Cluster',
      env: 'PUSHER_CLUSTER',
      default: 'your-pusher-cluster',
    },
    useTLS: {
      doc: 'Use TLS for Pusher',
      default: true,
      env: 'PUSHER_USE_TLS',
    },
  },
});

config.validate({ allowed: 'strict' });

module.exports = {
  config,
  isDevelopment: config.get('env') === 'development',
  isProduction: config.get('env') === 'production',
};
