module.exports = {
  apps: [
    {
      name: 'chat_app',
      script: 'yarn start_new',
      instances: 1,
      max_restarts: 5,
      restart_delay: 4000,
      autorestart: true,
      max_memory_restart: '300M',
      ignore_watch: ['node_modules', 'assets', 'public'],
      env: {
        PORT: '3002'
      }
    }
  ]
};
