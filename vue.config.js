const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js', // Entrada para la aplicación principal
      template: 'public/index.html',
      filename: 'index.html',
    }
  }
})

