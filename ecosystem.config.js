module.exports = {
  apps: [{
      name: 'nodePractice',
      script: 'dist/index.js',
      node_args: [
          // '--expose-gc',
          '--max-old-space-size=2048',
      ],
      error_file: '/dev/null',
      out_file: '/dev/null',
      watch: true,
      instances: 1,
      exec_mode: 'cluster',
      max_memory_restart: '1700M',
      env_local: {
          NODE_ENV: 'local'
      },
      env_development: {
          NODE_ENV: 'development'
      },
      env_production: {
          NODE_ENV: 'production'
      },
  }],
} // module.exports