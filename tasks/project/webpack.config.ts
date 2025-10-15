import { Configuration } from "webpack";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: Configuration = {
  entry: "./src/index.tsx", // path.resolve(import.meta.dirname, "./src/index.tsx"),
  mode:  process.env.NODE_ENV === 'development' ? 'development'  : 'production',
  target: ["web"],
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "swc-loader",
          options: {
            "jsc": {
              "parser": {
                "syntax": "typescript",
                "tsx": true,
              },
              transform: {
                react: {
                  runtime: "automatic", 
                  importSource: "react",
                },
              },
            },
          },
        },
      },
    ],
  },
    devtool: "hidden-source-map",
    resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: "./tsconfig.json" ,
            }),
        ],
  },
  output: {
      path: path.resolve(import.meta.dirname, `./dist/webpack/`),
      publicPath: "/webpack/",
      filename: "[name]_[contenthash:8].js",
      chunkFilename: "[name]_[contenthash:8].js",
      assetModuleFilename: "[name]_[hash:8].[ext]",
      clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        inject: false,
        templateContent: ({htmlWebpackPlugin, }) => {

            const scripts = htmlWebpackPlugin.files.js
                .map((src: string) => `<script src="${src}" nonce="{{NONCE_VALUE}}" defer></script>`)
                .join("\n");
            const styles = htmlWebpackPlugin.files.css
                .map((href: string) =>  `<link rel="stylesheet" href="${href}" nonce="{{NONCE_VALUE}}">`)
                .join("\n");


            return  `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>My App</title>
              ${styles}
            </head>
            <body>
              <div id="root">
              ${scripts}
              </div>
            </body>
          </html>
      `
      },
     })
  ],
};

export default config;
