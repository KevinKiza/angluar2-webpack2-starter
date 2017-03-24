var webpackConfig = require('./webpack.test');

module.exports = function(config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine'],

        plugins: [
            require("karma-jasmine"),
            require("karma-webpack"),
            require("karma-chrome-launcher"),
            require("karma-sourcemap-loader"),
            require("karma-mocha-reporter")
        ],

        files: [
            './config/karma-test-shim.js'
        ],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: false
        },

        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: true
    };

    config.set(_config);
};