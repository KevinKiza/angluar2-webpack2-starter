var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'app': './src/main.ts',
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts'
    },

    resolve: {
        extensions: ['.js', '.ts', '.json']
    },

    module: {
        rules: [{
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: /(node_modules)/,
                options: {
                    configuration: {
                        rules: {
                            "class-name": true,
                            "quotemark": [true, 'double'],
                            "comment-format": [true, "check-space"],
                            "indent": [true, "spaces"],
                            "no-duplicate-variable": true,
                            "no-eval": true,
                            "no-internal-module": true,
                            "no-trailing-whitespace": false,
                            "no-var-keyword": true,
                            "one-line": [
                                true,
                                "check-open-brace",
                                "check-whitespace"
                            ],
                            "semicolon": [true, "always"],
                            "triple-equals": [true, "allow-null-check"],
                            "typedef-whitespace": [
                                true,
                                {
                                    "call-signature": "nospace",
                                    "index-signature": "nospace",
                                    "parameter": "nospace",
                                    "property-declaration": "nospace",
                                    "variable-declaration": "nospace"
                                }
                            ],
                            "variable-name": [true, "ban-keywords"]
                        }
                    }
                }
            },
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills'],
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'public/images/favicon.ico'
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('src'), {}
        ),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};