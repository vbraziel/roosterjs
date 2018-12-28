const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../../../webpack.config.js');

module.exports = async function (puppeteer) {
    const webpackCompiler = webpack(config);
    const devserver = new WebpackDevServer(webpackCompiler, {
        publicPath: config.output.publicPath,
    });
    devserver.listen(9090);

    await new Promise((resolve) => {
        webpackCompiler.hooks.afterEmit.tap('JestSetup', () => {
            resolve();
        })
    });

    global.__WEBPACK_DEVSERVER_GLOBAL__ = devserver;
};