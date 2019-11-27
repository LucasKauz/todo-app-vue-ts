module.exports = {
  configureWebpack: config => ({
    // here the webpack config
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-svg-inline-loader'
        }
      ]
    }
  })
}
