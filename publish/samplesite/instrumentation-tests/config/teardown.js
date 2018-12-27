const os = require('os');
const rimraf = require('rimraf');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
module.exports = async function () {
    // close the browser instance and webpack dev server
    await Promise.all([
        global.__BROWSER_GLOBAL__.close(),
        new Promise((resolve, reject) => {
            global.__WEBPACK_DEVSERVER_GLOBAL__.close((err) => {
                err == null ? resolve() : reject(err);
            });
        }),
    ]);

    // clean-up the wsEndpoint file
    rimraf.sync(DIR);
};
