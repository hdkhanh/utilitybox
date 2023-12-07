/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const DefinePlugin = webpack.DefinePlugin;
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const cssRules = [
    {
        loader: "css-loader",
    },
];

const scssRules = [
    ...cssRules,
    {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [require("postcss-sass-unicode"), require("autoprefixer")()],
            },
            sourceMap: true,
        },
    },
    {
        loader: "sass-loader",
        options: {
            sassOptions: {
                includePaths: [path.resolve(__dirname, "node_modules")],
            },
            sourceMap: true,
        },
    },
];

module.exports = function getWebpackConfig(env) {
    const mode = env.mode ? env.mode : "development";
    const port = env.port ?? "3002";

    return {
        entry: "./src/index.ts",
        output: {
            publicPath: "auto",
        },
        mode,
        devServer: {
            port,
            open: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: ["style-loader", ...scssRules],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", ...cssRules],
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".json"],
            mainFields: ["module", "browser", "main"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
            new DefinePlugin({
                "process.env": JSON.stringify(dotenv.config().parsed),
            }),
            new ModuleFederationPlugin({
                name: "jsonFormatter",
                filename: "remoteEntry.js",
                exposes: {
                    "./App": "./src/App.tsx",
                },
                shared: {
                    react: {
                        singleton: true,
                    },
                    "react-dom": {
                        singleton: true,
                    },
                    bootstrap: {
                        singleton: true,
                    },
                    "react-bootstrap": {
                        singleton: true,
                    },
                },
            }),
        ],
    };
};
