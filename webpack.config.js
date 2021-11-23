const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/main.tsx"]
  },
  output: {
    filename: "main.js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3001,
    host: `localhost`,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [],
};