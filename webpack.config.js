const HtmlWebpackPlugin = require('html-webpack-plugin')
const LocalizeAssetsPlugin = require("webpack-localize-assets-plugin");

module.exports = {
  mode: 'development',
  output: {
    filename: "[name].[locale].js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new LocalizeAssetsPlugin({
    locales: {
      en: {
        hello: "Hello!"
      },
      es:{
        hello: "Hola!"
      }
    },
    localizeCompiler: {
      __(localizerArguments) {
          const [key] = localizerArguments;
          console.log(key)
          const keyResolved = this.resolveKey();
          return keyResolved ? JSON.stringify(keyResolved) : key;
      }
  }
  }), new HtmlWebpackPlugin()],
}
