const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const mfConfig = require("./module-federation.config");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: false,
    devServer: {
        port: 3002,
        hot: false,
        liveReload: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        },
    },
    resolve: {
        extensions: [".jsx", ".js"],
    },
    output: {
        publicPath: "http://localhost:3002/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "ecmascript",
                                jsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                        },
                    },
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin(mfConfig),
        new HtmlWebpackPlugin({
            template: "./template.html",
        }),
    ],
};
