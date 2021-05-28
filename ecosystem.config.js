module.exports = {
  apps: [{
    script: './server/index.js',
    watch: true,
    wait_ready: true,
    no_daemon: true,
    ignore_watch: ['node_modules', 'client/img'],
    watch_options: {
      followSymlinks: false
    }
  }],
  deploy: {
    production: {}
  }
};
