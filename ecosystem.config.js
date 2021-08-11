module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    watch: ['../'],
    watch_delay: 1000,
    ignore_watch: ['node_modules', 'mongo-volume'],
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
