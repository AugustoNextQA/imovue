const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
  assetsDir: 'assets',
  devServer: {
    port: 8080
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    entry: path.resolve(__dirname, 'src/main.js')
  }
};
