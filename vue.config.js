const webpack = require('webpack')

module.exports = {
  configureWebpack: (config, a) => ({
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-svg-inline-loader'
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
      // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb/)
    ]
  })
}
