const path = require("path");
const nodeExternals = require("webpack-node-externals");
const frontend = {
  mode: "development",
  entry: {
    bundle: "./www/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};

const backend = {
  mode: "development",
  target: "node",
  node: {
    __dirname: true,
  },
  externals: [nodeExternals()],
  entry: {
    backend: "./index.js",
  },
  output: {
    path: __dirname + "/bin",
    filename: "[name].js",
    libraryTarget: 'commonjs'
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:  /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = [frontend, backend];
