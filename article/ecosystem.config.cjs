module.exports = {
  apps: [{
    name: 'tiffanylamps-art',
    port: '3000',
    exec_mode: 'cluster',
    instances: 'max', // 或者指定具体数量，如 2
    script: './.output/server/index.mjs',
    cwd: '/var/www/tiffanylamps.art', // 生产环境的项目路径
    env: {
      NODE_ENV: 'production',
      NUXT_HOST: '0.0.0.0',
      NUXT_PORT: 3000
    },
    env_development: {
      NODE_ENV: 'development',
      NUXT_HOST: 'localhost',
      NUXT_PORT: 3000
    },
    // 日志配置
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // 自动重启配置
    max_restarts: 10,
    min_uptime: '10s',
    // 监控配置
    watch: false, // 生产环境建议关闭
    ignore_watch: ['node_modules', 'logs']
  }]
}