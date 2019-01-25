module.exports = {
  apps : [{
    name      : 'warehouse-server',
    script    : 'app.js',
    watch     : true,
    env: {
      NODE_ENV: 'development',
      PORT: 4000,
      JWT_SECRET: "warehouse-secret101",
      BCRYPT_SALT_ROUNDS: 10
    },
    env_production : {
      NODE_ENV: 'production',
      PORT: 4000,
      JWT_SECRET: "warehouse-secret101",
      BCRYPT_SALT_ROUNDS: 10
    }
  }]
};
