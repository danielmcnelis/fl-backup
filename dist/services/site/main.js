/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/errors/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/errors/src/lib/errors.ts"), exports);


/***/ }),

/***/ "./libs/errors/src/lib/errors.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomError = void 0;
class CustomError {
    constructor(message, statusCode = 500, options = {}) {
        const { errorDescription, errorCauses } = options;
        this.message = message;
        this.statusCode = statusCode;
        this.errorDescription = errorDescription;
        this.errorCauses = errorCauses;
    }
}
exports.CustomError = CustomError;


/***/ }),

/***/ "./services/site/src/config/index.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config = {
    siteUrl: process.env.SITE_URL,
    siteJWKS: JSON.parse(process.env.SITE_JWKS),
    siteIKS: JSON.parse(process.env.SITE_IKS),
    sessionSecret: process.env.SESSION_SECRET,
    server: {
        https: process.env.SERVER_HTTPS,
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT
    },
    service: {
        https: process.env.SITE_HTTPS,
        host: process.env.SITE_HOST,
        port: process.env.SITE_PORT || 4330,
        proxy: process.env.SITE_PROXY
    },
    services: {
        api: {
            https: process.env.API_HTTPS,
            host: process.env.API_HOST,
            port: process.env.API_PORT
        },
        auth: {
            https: process.env.AUTH_HTTPS,
            host: process.env.AUTH_HOST,
            port: process.env.AUTH_PORT
        }
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl: process.env.GOOGLE_REDIRECT_URL,
        discoveryUrl: 'https://accounts.google.com/'
    },
    discord: {
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        redirectUrl: process.env.DISCORD_REDIRECT_URL,
        scope: 'identify email',
        authorizeUrl: 'https://discord.com/api/oauth2/authorize',
        tokenUrl: 'https://discord.com/api/oauth2/token',
        userInfoUrl: 'https://discord.com/api/users/@me'
    },
    challonge: {
        'Format Library': process.env.CHALLONGE_FORMAT_LIBRARY_API_KEY,
        'GoatFormat.com': process.env.CHALLONGE_GOAT_FORMAT_API_KEY,
        'EdisonFormat.com': process.env.CHALLONGE_EDISON_FORMAT_API_KEY,
        'Crows Nest': process.env.CHALLONGE_CROWS_NEST_API_KEY // challongeAPIKeys.'Crows Nest'
    }
};
exports["default"] = config;


/***/ }),

/***/ "./services/site/src/middleware/error.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.error = void 0;
const errors_1 = __webpack_require__("./libs/errors/src/index.ts");
/**
 * Custom error middleware to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
const error = (err, req, res, next) => {
    let customError = err;
    if (!(err instanceof errors_1.CustomError)) {
        customError = new errors_1.CustomError(err.message);
    }
    console.error(customError);
    res.status(customError.statusCode).send(customError);
};
exports.error = error;


/***/ }),

/***/ "./services/site/src/middleware/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./services/site/src/middleware/error.ts"), exports);


/***/ }),

/***/ "./services/site/src/proxies/api.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.api = void 0;
const config_1 = __webpack_require__("./services/site/src/config/index.ts");
const secure = config_1.default.services.api.https === '1' || config_1.default.services.api.https === 'true';
exports.api = {
    path: '/api',
    target: `${secure ? 'https' : 'http'}://${config_1.default.services.api.host}:${config_1.default.services.api.port}/api`,
    secure
};


/***/ }),

/***/ "./services/site/src/proxies/auth.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.auth = void 0;
const config_1 = __webpack_require__("./services/site/src/config/index.ts");
const secure = config_1.default.services.api.https === '1' || config_1.default.services.api.https === 'true';
exports.auth = {
    path: '/auth',
    target: `${secure ? 'https' : 'http'}://${config_1.default.services.auth.host}:${config_1.default.services.auth.port}/auth`,
    secure
};


/***/ }),

/***/ "./services/site/src/proxies/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./services/site/src/proxies/api.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./services/site/src/proxies/auth.ts"), exports);


/***/ }),

/***/ "chalk":
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ "compression":
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "http-proxy-middleware":
/***/ ((module) => {

module.exports = require("http-proxy-middleware");

/***/ }),

/***/ "morgan":
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const express = __webpack_require__("express");
const compression = __webpack_require__("compression");
const http_proxy_middleware_1 = __webpack_require__("http-proxy-middleware");
const http = __webpack_require__("http");
const https = __webpack_require__("https");
const path = __webpack_require__("path");
const fs_1 = __webpack_require__("fs");
const morgan = __webpack_require__("morgan");
const chalk = __webpack_require__("chalk");
const proxies_1 = __webpack_require__("./services/site/src/proxies/index.ts");
const middleware_1 = __webpack_require__("./services/site/src/middleware/index.ts");
const config_1 = __webpack_require__("./services/site/src/config/index.ts");
let httpServer;
let httpsServer;
const app = express();
// logging
app.use(morgan('dev'));
// compression
app.use(compression());
// proxies
if (config_1.default.service.proxy) {
    const proxies = { api: proxies_1.api, auth: proxies_1.auth };
    Object.entries(proxies).forEach(([, prxy]) => {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)(prxy.path, { target: prxy.target, secure: prxy.secure }));
        console.log(chalk.cyan(`Proxy ${prxy.path} to ${prxy.target}`));
    });
}
// assets
app.use(express.static(path.join(__dirname, '/assets')));
// index.html
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/assets/index.html'));
});
// error
app.use(middleware_1.error);
const port = config_1.default.service.port;
if (config_1.default.service.https === '1' || config_1.default.service.https === 'true') {
    // load key/cert
    const privateKey = (0, fs_1.existsSync)('certs/privkey.pem') ? (0, fs_1.readFileSync)('certs/privkey.pem', 'utf8') : '';
    const certificate = (0, fs_1.existsSync)('certs/fullchain.pem') ? (0, fs_1.readFileSync)('certs/fullchain.pem', 'utf8') : '';
    const credentials = { key: privateKey, cert: certificate };
    // Wrap(proxy) http server with https server
    httpsServer = https.createServer(credentials, app);
    const server = httpsServer.listen(port, () => console.log(chalk.cyan(`Listening on https://${config_1.default.service.host ? config_1.default.service.host : '0.0.0.0'}:${port}`)));
    server.on('error', console.error);
}
else {
    // Wrap(proxy) express with http server
    httpServer = http.createServer(app);
    const server = httpServer.listen(port, () => console.log(chalk.cyan(`Listening on http://${config_1.default.service.host ? config_1.default.service.host : '0.0.0.0'}:${port}`)));
    server.on('error', console.error);
}

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map