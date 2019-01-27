const path = require('path')
module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        
      ]
    },
    plugins: [
    ]
  }