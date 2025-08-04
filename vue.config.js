module.exports = {
  // Basic configuration
  publicPath: process.env.NODE_ENV === 'production' ? '/ecommerce-catalog/' : '/',
  
  // Configure Webpack
  configureWebpack: {
    devtool: 'source-map',
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    }
  },
  
  // CSS configuration
  css: {
    loaderOptions: {
      css: {
        sourceMap: true
      }
    }
  },
  
  // Dev server configuration - UPDATED FOR WEBPACK-DEV-SERVER v4+
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    client: {
      overlay: {
        warnings: true,
        errors: true
      }
    },
    // Untuk Vue CLI 4/5 tambahkan ini:
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}