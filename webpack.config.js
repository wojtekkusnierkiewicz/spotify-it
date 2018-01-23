module.exports = {
  entry: ["whatwg-fetch", "./js/app.jsx"],
  output: {
    filename: "./js/out.js"
  },
  devtool: "#eval-source-map",
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015','stage-2','react'] }
      },
      {
        test:	/\.css$/,
  			loader:	['style-loader',	'css-loader']
			},
      {
        test:	/\.scss$/,
  			loader:	['style-loader',	'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: './',
    port: 3002,
    inline: true
  }
}
