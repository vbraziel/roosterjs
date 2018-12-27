// setup.js
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../../../webpack.config.js');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
    const webpackCompiler = webpack(config);
    const devserver = new WebpackDevServer(webpackCompiler, {
        publicPath: config.output.publicPath,
    });
    devserver.listen(9090);

    const [, browser] = await Promise.all([
        new Promise((resolve) => {
            webpackCompiler.hooks.afterEmit.tap('JestSetup', () => {
                resolve();
            })
        }),
        puppeteer.launch({ headless: false }),
    ]);

    // store the browser instance so we can teardown it later
    // this global is only available in the teardown but not in TestEnvironments
    global.__BROWSER_GLOBAL__ = browser;
    global.__WEBPACK_DEVSERVER_GLOBAL__ = devserver;

    // use the file system to expose the wsEndpoint for TestEnvironments
    mkdirp.sync(DIR);
    fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};