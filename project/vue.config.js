const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('components', path.resolve(__dirname, './src/components'))
      .set('pages', path.resolve(__dirname, './src/pages'))
      .set('assets', path.resolve(__dirname, './src/assets'))
      .set('utils',path.resolve(__dirname,'./src/utils'))
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://www.missevan.com',
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
      '/ajax':{
        target: 'https://fm.missevan.com/api',
        changeOrigin: true,
        pathRewrite:{
          '^/ajax':''
        }
      },
      '/be':{
        target:'http://localhost:3000',
        changeOrigin:true,
        pathRewrite:{
          '^/be':''
        }
      }
    }
  }
}