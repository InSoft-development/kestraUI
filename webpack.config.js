const webpack = require('webpack');

module.exports = {
  // ... другие настройки webpack ...
  plugins: [
    // ... другие плагины ...
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('http://localhost:5173/')
    })
  ]
  // ... другие настройки webpack ...
};
