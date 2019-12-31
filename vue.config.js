module.exports = {
  publicPath: '/mcs',
  devServer: {
    proxy: {
      '/mcs': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/mcs': '/mcs'
        }
      }
    }
  }
}
