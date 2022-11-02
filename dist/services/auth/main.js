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

/***/ "./libs/middleware-auth/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/index.ts"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/authenticate/authenticate.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authenticate = void 0;
const authenticate = (options) => {
    // const { audience, jwks, ... } = options
    return (req, res, next) => {
        // TODO: extract jwt and validate
        next();
    };
};
exports.authenticate = authenticate;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/authenticate/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/authenticate/authenticate.ts"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/discord/discordResponse.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.discordResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const simple_oauth2_1 = __webpack_require__("simple-oauth2");
const axios_1 = __webpack_require__("axios");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const discordResponse = (options) => {
    const { clientId, clientSecret, redirectUrl, scope, authorizeUrl, tokenUrl, userinfoUrl, guildsUrl } = options;
    const authorize_url = new URL(authorizeUrl);
    const authorizeHost = authorize_url.origin;
    const authorizePath = authorize_url.pathname;
    const token_url = new URL(tokenUrl);
    const tokenHost = token_url.origin;
    const tokenPath = token_url.pathname;
    return (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { state, code } = req.query;
        const { state: sessionState, returnTo } = req.session;
        const tokenParams = {
            code,
            redirect_uri: redirectUrl,
            scope
        };
        const client = new simple_oauth2_1.AuthorizationCode({
            client: {
                id: clientId,
                secret: clientSecret
            },
            auth: {
                authorizeHost,
                authorizePath,
                tokenHost,
                tokenPath
            }
        });
        let tokenResponse;
        try {
            tokenResponse = yield client.getToken(tokenParams);
        }
        catch (error) {
            console.error('middleware.discordResponse: error: ', error.message);
        }
        const accessToken = tokenResponse.token.access_token;
        let userinfo;
        try {
            userinfo = yield axios_1.default.get(userinfoUrl, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
        catch (error) {
            console.error('middleware.discordResponse: error: ', error.message);
        }
        const { playerName, playerId, discordId, discordPfp } = yield models_1.Player.discordLogin(userinfo.data);
        res.cookie('playerId', playerId, {
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('discordId', discordId, {
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('discordPfp', discordPfp, {
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('playerName', playerName, {
            maxAge: 24 * 60 * 60 * 1000
        }).clearCookie('googlePfp')
            .redirect(returnTo);
        next();
    });
};
exports.discordResponse = discordResponse;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/discord/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/discord/discordResponse.ts"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/authenticate/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/login/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/logout/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/discord/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/oauth2/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/oidc/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/signup/index.js"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/login/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/login/login.ts"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/login/login.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.login = void 0;
const login = (options) => {
    const { app, providers } = options;
    const title = 'Login';
    return (req, res, next) => {
        const method = req.method;
        if (method === 'GET') {
            res.render('auth/login', {
                app,
                title,
                providers,
                signup: false
            });
        }
        else if (method === 'POST') {
            // TODO: handle signup form post (local user/password)
            res.status(404).send('Sorry, we cannot find that!');
        }
        next();
    };
};
exports.login = login;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/logout/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/logout/logout.ts"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/logout/logout.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logout = void 0;
const logout = (options) => {
    const { returnTo } = options;
    return (req, res, next) => {
        // TODO: delete token cookies here
        res.redirect(returnTo);
        next();
    };
};
exports.logout = logout;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/oauth2/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/oauth2/oauth2Authorize.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/oauth2/oauth2Response.ts"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/oauth2/oauth2Authorize.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.oauth2Authorize = void 0;
const tslib_1 = __webpack_require__("tslib");
const simple_oauth2_1 = __webpack_require__("simple-oauth2");
const openid_client_1 = __webpack_require__("openid-client");
const oauth2Authorize = (options) => {
    const { clientId, clientSecret, redirectUrl, scope, authorizeUrl, tokenUrl, returnTo } = options;
    const authorize_url = new URL(authorizeUrl);
    const authorizeHost = authorize_url.origin;
    const authorizePath = authorize_url.pathname;
    const token_url = new URL(tokenUrl);
    const tokenHost = token_url.origin;
    const tokenPath = token_url.pathname;
    return (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const client = new simple_oauth2_1.AuthorizationCode({
            client: {
                id: clientId,
                secret: clientSecret
            },
            auth: {
                authorizeHost,
                authorizePath,
                tokenHost,
                tokenPath
            }
        });
        const state = openid_client_1.generators.state();
        const authorizationUrl = client.authorizeURL({
            redirect_uri: redirectUrl,
            scope,
            state
        });
        req.session = {
            state,
            returnTo
        };
        res.redirect(authorizationUrl);
        // next()
    });
};
exports.oauth2Authorize = oauth2Authorize;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/oauth2/oauth2Response.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.oauth2Response = void 0;
const tslib_1 = __webpack_require__("tslib");
const simple_oauth2_1 = __webpack_require__("simple-oauth2");
const axios_1 = __webpack_require__("axios");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const oauth2Response = (options) => {
    const { clientId, clientSecret, redirectUrl, scope, authorizeUrl, tokenUrl, userinfoUrl } = options;
    const authorize_url = new URL(authorizeUrl);
    const authorizeHost = authorize_url.origin;
    const authorizePath = authorize_url.pathname;
    const token_url = new URL(tokenUrl);
    const tokenHost = token_url.origin;
    const tokenPath = token_url.pathname;
    return (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { state, code } = req.query;
        const { state: sessionState, returnTo } = req.session;
        req.session = null;
        const tokenParams = {
            code,
            redirect_uri: redirectUrl,
            scope
        };
        const client = new simple_oauth2_1.AuthorizationCode({
            client: {
                id: clientId,
                secret: clientSecret
            },
            auth: {
                authorizeHost,
                authorizePath,
                tokenHost,
                tokenPath
            }
        });
        let tokenResponse;
        try {
            tokenResponse = yield client.getToken(tokenParams);
        }
        catch (error) {
            console.error('middleware.oauth2Response: error: ', error.message);
        }
        const accessToken = tokenResponse.token.access_token;
        let userinfo;
        try {
            userinfo = yield axios_1.default.get(userinfoUrl, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
        catch (error) {
            console.error('middleware.oauth2Response: error: ', error.message);
        }
        console.log('middleware.oauth2Response: userinfo: ', userinfo.data);
        console.log('middleware.discordResponse: userinfo: ', userinfo.data);
        const { name, id, discordId, discordPfp } = yield models_1.Player.discordLogin(userinfo.data);
        res.cookie('playerId', id, {
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('discordId', discordId, {
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('discordPfp', discordPfp, {
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('playerName', name, {
            maxAge: 24 * 60 * 60 * 1000
        }).clearCookie('googlePfp')
            .redirect(returnTo);
    });
};
exports.oauth2Response = oauth2Response;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/oidc/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/oidc/oidcAuthorize.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/oidc/oidcResponse.ts"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/oidc/oidcAuthorize.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.oidcAuthorize = void 0;
const tslib_1 = __webpack_require__("tslib");
const openid_client_1 = __webpack_require__("openid-client");
const oidcAuthorize = (options) => {
    const { clientId, clientSecret, redirectUrl, discoveryUrl, returnTo } = options;
    // console.log('middleware.oidcAuthorize: clientId: ', clientId)
    // console.log('middleware.oidcAuthorize: clientSecret: ', clientSecret)
    // console.log('middleware.oidcAuthorize: redirectUrl: ', redirectUrl)
    // console.log('middleware.oidcAuthorize: discoveryUrl: ', discoveryUrl)
    // console.log('middleware.oidcAuthorize: returnTo: ', returnTo)
    return (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // console.log('middleware.oidcAuthorize:')
        const issuer = yield openid_client_1.Issuer.discover(discoveryUrl);
        const client = new issuer.Client({
            client_id: clientId,
            client_secret: clientSecret,
            token_endpoint_auth_method: 'client_secret_post',
            redirect_uris: [redirectUrl],
            response_types: ['code']
        });
        const state = openid_client_1.generators.state();
        const nonce = openid_client_1.generators.nonce();
        const codeVerifier = openid_client_1.generators.codeVerifier();
        const codeChallenge = openid_client_1.generators.codeChallenge(codeVerifier);
        // console.log('middleware.oidcAuthorize: state: ', state)
        // console.log('middleware.oidcAuthorize: nonce: ', nonce)
        // console.log('middleware.oidcAuthorize: codeVerifier: ', codeVerifier)
        // console.log('middleware.oidcAuthorize: codeChallenge: ', codeChallenge)
        const authorizationUrl = client.authorizationUrl({
            scope: 'openid profile email address',
            response_mode: 'query',
            nonce,
            state,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            prompt: 'login'
        });
        // console.log('middleware.oidcAuthorize: authorizationUrl: ', authorizationUrl)
        req.session = {
            state,
            nonce,
            codeVerifier,
            codeChallenge,
            returnTo
        };
        res.redirect(authorizationUrl);
        // next()
    });
};
exports.oidcAuthorize = oidcAuthorize;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/oidc/oidcResponse.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.oidcResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const openid_client_1 = __webpack_require__("openid-client");
const jose_1 = __webpack_require__("jose");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const oidcResponse = (options) => {
    const { clientId, clientSecret, redirectUrl, discoveryUrl } = options;
    return (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { state, code } = req.query;
        const { state: sessionState, nonce: sessionNonce, codeVerifier: sessionCodeVerifier, codeChallenge: sessionCodeChallenge, returnTo } = req.session;
        req.session = null;
        const issuer = yield openid_client_1.Issuer.discover(discoveryUrl);
        const client = new issuer.Client({
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uris: [redirectUrl],
            response_types: ['id_token']
        });
        const params = client && client.callbackParams(req);
        const tokenSet = client &&
            (yield client.callback(redirectUrl, params, {
                nonce: sessionNonce,
                state: sessionState,
                code_verifier: sessionCodeVerifier
            }));
        const { id_token: idToken } = tokenSet;
        const payload = (0, jose_1.decodeJwt)(idToken);
        const { name, id, googlePfp } = yield models_1.Player.googleLogin(payload);
        res.cookie('playerId', id, {
            maxAge: 24 * 60 * 60 * 1000
        }).clearCookie('discordId')
            .clearCookie('discordPfp')
            .cookie('playerName', name, {
            maxAge: 24 * 60 * 60 * 1000
        }).cookie('googlePfp', googlePfp, {
            maxAge: 24 * 60 * 60 * 1000
        }).redirect(returnTo);
    });
};
exports.oidcResponse = oidcResponse;


/***/ }),

/***/ "./libs/middleware-auth/src/lib/signup/index.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware-auth/src/lib/signup/signup.js"), exports);


/***/ }),

/***/ "./libs/middleware-auth/src/lib/signup/signup.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signup = void 0;
const signup = (options) => {
    const { app, providers } = options;
    const title = 'Signup';
    return (req, res, next) => {
        const method = req.method;
        if (method === 'GET') {
            res.render('auth/signup', {
                app,
                title,
                providers,
                firstName: '',
                lastName: '',
                email: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
        else if (method === 'POST') {
            // TODO: handle signup form post (local user/password)
            res.status(404).send('Sorry, we cannot find that!');
        }
        next();
    };
};
exports.signup = signup;


/***/ }),

/***/ "./libs/middleware/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware/src/lib/index.ts"), exports);


/***/ }),

/***/ "./libs/middleware/src/lib/error.ts":
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

/***/ "./libs/middleware/src/lib/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/middleware/src/lib/error.ts"), exports);


/***/ }),

/***/ "./libs/models/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/models/src/lib/index.ts"), exports);


/***/ }),

/***/ "./libs/models/src/lib/Article.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Article = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Article = db_1.db.define('articles', {
    title: {
        type: sequelize_1.Sequelize.STRING
    },
    author: {
        type: sequelize_1.Sequelize.STRING
    },
    content: {
        type: sequelize_1.Sequelize.TEXT
    },
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    publishDate: {
        type: sequelize_1.Sequelize.STRING
    },
    rating: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    views: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    }
});


/***/ }),

/***/ "./libs/models/src/lib/BlogPost.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogPost = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.BlogPost = db_1.db.define('blogposts', {
    title: {
        type: sequelize_1.Sequelize.STRING
    },
    content: {
        type: sequelize_1.Sequelize.TEXT
    },
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    publishDate: {
        type: sequelize_1.Sequelize.STRING
    },
    eventDate: {
        type: sequelize_1.Sequelize.DATE
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Card.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Card = void 0;
const tslib_1 = __webpack_require__("tslib");
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
const Print_1 = __webpack_require__("./libs/models/src/lib/Print.js");
exports.Card = db_1.db.define('cards', {
    name: {
        type: sequelize_1.Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    konamiCode: {
        type: sequelize_1.Sequelize.STRING
    },
    ypdId: {
        type: sequelize_1.Sequelize.STRING
    },
    tcgLegal: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    ocgLegal: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    category: {
        type: sequelize_1.Sequelize.STRING
    },
    icon: {
        type: sequelize_1.Sequelize.STRING
    },
    normal: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    effect: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    fusion: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    ritual: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    synchro: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    xyz: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    pendulum: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    link: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    flip: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    gemini: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    spirit: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    toon: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    tuner: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    union: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    attribute: {
        type: sequelize_1.Sequelize.STRING
    },
    type: {
        type: sequelize_1.Sequelize.STRING
    },
    level: {
        type: sequelize_1.Sequelize.INTEGER
    },
    rating: {
        type: sequelize_1.Sequelize.INTEGER
    },
    arrows: {
        type: sequelize_1.Sequelize.STRING
    },
    scale: {
        type: sequelize_1.Sequelize.INTEGER
    },
    atk: {
        type: sequelize_1.Sequelize.STRING
    },
    def: {
        type: sequelize_1.Sequelize.STRING
    },
    description: {
        type: sequelize_1.Sequelize.TEXT
    },
    tcgDate: {
        type: sequelize_1.Sequelize.STRING
    },
    ocgDate: {
        type: sequelize_1.Sequelize.STRING
    },
    color: {
        type: sequelize_1.Sequelize.STRING
    },
    extraDeck: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    sortPriority: {
        type: sequelize_1.Sequelize.INTEGER
    }
});
exports.Card.countResults = (filter = {}, booster) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    filter = Object.entries(filter).reduce((reduced, [key, by]) => {
        let value = by.value;
        if (typeof value === 'string')
            value.replaceAll('%20', ' ');
        let operator = by.operator;
        if (['tcgLegal', 'ocgLegal', 'normal', 'effect', 'fusion', 'ritual', 'synchro', 'xyz', 'pendulum', 'link', 'flip', 'gemini', 'spirit', 'toon', 'tuner', 'union', 'extraDeck'].includes(key)) {
            value = value.toLowerCase() === 'true';
        }
        if (['level', 'rating', 'scale', 'sortPriority'].includes(key) && operator !== 'btw') {
            value = parseInt(value);
        }
        if (operator === 'eq') {
            operator = sequelize_1.Op.eq;
        }
        else if (operator === 'not') {
            operator = sequelize_1.Op.not;
        }
        else if (operator === 'like') {
            operator = sequelize_1.Op.iLike;
        }
        else if (operator === 'gt') {
            operator = sequelize_1.Op.gt;
        }
        else if (operator === 'gte') {
            operator = sequelize_1.Op.gte;
        }
        else if (operator === 'lt') {
            operator = sequelize_1.Op.lt;
        }
        else if (operator === 'lte') {
            operator = sequelize_1.Op.lte;
        }
        else if (operator === 'or') {
            operator = sequelize_1.Op.or;
        }
        else if (operator === 'and') {
            operator = sequelize_1.Op.and;
        }
        else if (operator === 'inc') {
            operator = sequelize_1.Op.iLike;
            value = '%' + value + '%';
        }
        else if (operator === 'btw') {
            operator = sequelize_1.Op.and;
            value = { [sequelize_1.Op.gte]: parseInt(value[0]), [sequelize_1.Op.lte]: parseInt(value[1]) };
        }
        reduced[key] = { [operator]: value };
        return reduced;
    }, {});
    let include = [];
    if (booster) {
        filter['$prints.cardCode$'] = { [sequelize_1.Op.iLike]: booster + '%' };
        include = [{ model: Print_1.Print }];
    }
    const count = yield exports.Card.count({
        where: filter,
        include: include
    });
    return count;
});
exports.Card.find = (filter = {}, booster, limit = 10, page = 1, sort = []) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    filter = Object.entries(filter).reduce((reduced, [key, by]) => {
        let value = by.value;
        if (typeof value === 'string')
            value.replaceAll('%20', ' ');
        let operator = by.operator;
        if (['tcgLegal', 'ocgLegal', 'normal', 'effect', 'fusion', 'ritual', 'synchro', 'xyz', 'pendulum', 'link', 'flip', 'gemini', 'spirit', 'toon', 'tuner', 'union', 'extraDeck'].includes(key)) {
            value = value.toLowerCase() === 'true';
        }
        if (['level', 'rating', 'scale', 'sortPriority'].includes(key) && operator !== 'btw') {
            value = parseInt(value);
        }
        if (operator === 'eq') {
            operator = sequelize_1.Op.eq;
        }
        else if (operator === 'not') {
            operator = sequelize_1.Op.not;
        }
        else if (operator === 'like') {
            operator = sequelize_1.Op.iLike;
        }
        else if (operator === 'gt') {
            operator = sequelize_1.Op.gt;
        }
        else if (operator === 'gte') {
            operator = sequelize_1.Op.gte;
        }
        else if (operator === 'lt') {
            operator = sequelize_1.Op.lt;
        }
        else if (operator === 'lte') {
            operator = sequelize_1.Op.lte;
        }
        else if (operator === 'or') {
            operator = sequelize_1.Op.or;
        }
        else if (operator === 'and') {
            operator = sequelize_1.Op.and;
        }
        else if (operator === 'inc') {
            operator = sequelize_1.Op.iLike;
            value = '%' + value + '%';
        }
        else if (operator === 'btw') {
            operator = sequelize_1.Op.and;
            value = { [sequelize_1.Op.gte]: parseInt(value[0]), [sequelize_1.Op.lte]: parseInt(value[1]) };
        }
        reduced[key] = { [operator]: value };
        return reduced;
    }, {});
    if (booster)
        filter['$prints.cardCode$'] = { [sequelize_1.Op.iLike]: booster + '%' };
    const cards = yield exports.Card.findAll({
        where: filter,
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
        attributes: { exclude: ['tcgLegal', 'ocgLegal', 'ocgDate', 'createdAt', 'updatedAt'] },
        include: [{ model: Print_1.Print, separate: !booster, attributes: ['id'] }],
        order: sort
    });
    return cards;
});


/***/ }),

/***/ "./libs/models/src/lib/Cube.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cube = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Cube = db_1.db.define('cubes', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    builder: {
        type: sequelize_1.Sequelize.STRING
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    },
    ydk: {
        type: sequelize_1.Sequelize.TEXT
    },
    publishDate: {
        type: sequelize_1.Sequelize.DATE
    },
    display: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    rating: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    downloads: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    views: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    shareLink: {
        type: sequelize_1.Sequelize.STRING
    },
    linkExpiration: {
        type: sequelize_1.Sequelize.DATE
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Deck.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Deck = void 0;
const tslib_1 = __webpack_require__("tslib");
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
const Card_1 = __webpack_require__("./libs/models/src/lib/Card.js");
const Format_1 = __webpack_require__("./libs/models/src/lib/Format.js");
const Player_1 = __webpack_require__("./libs/models/src/lib/Player.js");
const Status_1 = __webpack_require__("./libs/models/src/lib/Status.js");
const utils_1 = __webpack_require__("./libs/utils/src/index.ts");
exports.Deck = db_1.db.define('decks', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    type: {
        type: sequelize_1.Sequelize.STRING
    },
    category: {
        type: sequelize_1.Sequelize.STRING
    },
    builder: {
        type: sequelize_1.Sequelize.STRING
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    },
    formatName: {
        type: sequelize_1.Sequelize.STRING
    },
    formatId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    ydk: {
        type: sequelize_1.Sequelize.TEXT
    },
    eventName: {
        type: sequelize_1.Sequelize.STRING
    },
    publishDate: {
        type: sequelize_1.Sequelize.DATE
    },
    eventId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    community: {
        type: sequelize_1.Sequelize.STRING
    },
    placement: {
        type: sequelize_1.Sequelize.INTEGER
    },
    display: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    rating: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    downloads: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    views: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    suggestedType: {
        type: sequelize_1.Sequelize.STRING
    },
    shareLink: {
        type: sequelize_1.Sequelize.STRING
    },
    linkExpiration: {
        type: sequelize_1.Sequelize.DATE
    }
});
exports.Deck.countResults = (filter = {}) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    filter = Object.entries(filter).reduce((reduced, [key, by]) => {
        let value = by.value;
        if (typeof value === 'string')
            value.replaceAll('%20', ' ');
        let operator = by.operator;
        if (['display'].includes(key)) {
            value = value.toLowerCase() === 'true';
        }
        if (['deckTypeId', 'downloads', 'views', 'rating'].includes(key)) {
            value = parseInt(value);
        }
        if (operator === 'eq') {
            operator = sequelize_1.Op.eq;
        }
        else if (operator === 'not') {
            operator = sequelize_1.Op.not;
        }
        else if (operator === 'like') {
            operator = sequelize_1.Op.iLike;
        }
        else if (operator === 'gt') {
            operator = sequelize_1.Op.gt;
        }
        else if (operator === 'gte') {
            operator = sequelize_1.Op.gte;
        }
        else if (operator === 'lt') {
            operator = sequelize_1.Op.lt;
        }
        else if (operator === 'lte') {
            operator = sequelize_1.Op.lte;
        }
        else if (operator === 'or') {
            operator = sequelize_1.Op.or;
        }
        else if (operator === 'and') {
            operator = sequelize_1.Op.and;
        }
        else if (operator === 'inc') {
            operator = sequelize_1.Op.iLike;
            value = '%' + value + '%';
        }
        else if (operator === 'btw') {
            operator = sequelize_1.Op.and;
            value = { [sequelize_1.Op.gte]: parseInt(value[0]), [sequelize_1.Op.lte]: parseInt(value[1]) };
        }
        reduced[key] = { [operator]: value };
        return reduced;
    }, {});
    const count = yield exports.Deck.count({
        where: filter
    });
    return count;
});
exports.Deck.find = (filter = {}, limit = 12, page = 1, sort = []) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    filter = Object.entries(filter).reduce((reduced, [key, by]) => {
        let value = by.value;
        if (typeof value === 'string')
            value.replaceAll('%20', ' ');
        let operator = by.operator;
        if (['display'].includes(key)) {
            value = value.toLowerCase() === 'true';
        }
        if (['deckTypeId', 'downloads', 'views', 'rating'].includes(key)) {
            value = parseInt(value);
        }
        if (operator === 'eq') {
            operator = sequelize_1.Op.eq;
        }
        else if (operator === 'not') {
            operator = sequelize_1.Op.not;
        }
        else if (operator === 'like') {
            operator = sequelize_1.Op.iLike;
        }
        else if (operator === 'gt') {
            operator = sequelize_1.Op.gt;
        }
        else if (operator === 'gte') {
            operator = sequelize_1.Op.gte;
        }
        else if (operator === 'lt') {
            operator = sequelize_1.Op.lt;
        }
        else if (operator === 'lte') {
            operator = sequelize_1.Op.lte;
        }
        else if (operator === 'or') {
            operator = sequelize_1.Op.or;
        }
        else if (operator === 'and') {
            operator = sequelize_1.Op.and;
        }
        else if (operator === 'inc') {
            operator = sequelize_1.Op.iLike;
            value = '%' + value + '%';
        }
        else if (operator === 'btw') {
            operator = sequelize_1.Op.and;
            value = { [sequelize_1.Op.gte]: parseInt(value[0]), [sequelize_1.Op.lte]: parseInt(value[1]) };
        }
        reduced[key] = { [operator]: value };
        return reduced;
    }, {});
    const decks = yield exports.Deck.findAll({
        where: filter,
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
        attributes: { exclude: ['url', 'shareLink', 'linkExpiration', 'createdAt', 'updatedAt'] },
        include: [{ model: Player_1.Player, attributes: ['name', 'discordId'] }, { model: Format_1.Format, attributes: ['name', 'icon'] }],
        order: sort
    });
    return decks;
});
exports.Deck.verifyLegality = (ydk, formatName, formatDate, formatBanlist) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const cardIds = formatName === 'Current' ? [...yield Card_1.Card.findAll({ where: { tcgLegal: true } })].map(c => c.konamiCode) : [...yield Card_1.Card.findAll({ where: { tcgDate: { [sequelize_1.Op.lte]: formatDate } } })].map(c => c.konamiCode);
    const forbiddenIds = [...yield Status_1.Status.findAll({ where: { banlist: formatBanlist, restriction: 'forbidden' }, include: Card_1.Card })].map(s => s.card.konamiCode);
    const limitedIds = [...yield Status_1.Status.findAll({ where: { banlist: formatBanlist, restriction: 'limited' }, include: Card_1.Card })].map(s => s.card.konamiCode);
    const semiIds = [...yield Status_1.Status.findAll({ where: { banlist: formatBanlist, restriction: 'semi-limited' }, include: Card_1.Card })].map(s => s.card.konamiCode);
    const main = ydk.split('#main')[1].split('#extra')[0].split('\n').filter((e) => e.length);
    const extra = ydk.split('#extra')[1].split('!side')[0].split('\n').filter((e) => e.length);
    const side = ydk.split('!side')[1].split('\n').filter((e) => e.length);
    const deckArr = [...main, ...side, ...extra];
    const deck = (0, utils_1.arrayToObject)(deckArr);
    const keys = Object.keys(deck);
    for (let i = 0; i < keys.length; i++) {
        let konamiCode = keys[i];
        while (konamiCode.length < 8)
            konamiCode = '0' + konamiCode;
        if (!cardIds.includes(konamiCode)) {
            return false;
        }
        else if (forbiddenIds.includes(konamiCode)) {
            return false;
        }
        else if (limitedIds.includes(konamiCode) && deck[konamiCode] > 1) {
            return false;
        }
        else if (semiIds.includes(konamiCode) && deck[konamiCode] > 2) {
            return false;
        }
    }
    return true;
});
exports.Deck.generateShareLink = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const base52 = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    return Promise.resolve().then(() => __webpack_require__("nanoid")).then(({ customAlphabet }) => customAlphabet(base52, 8)());
});


/***/ }),

/***/ "./libs/models/src/lib/DeckThumb.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeckThumb = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.DeckThumb = db_1.db.define('deckThumbs', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    formatId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    primary: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    leftCard: {
        type: sequelize_1.Sequelize.STRING
    },
    leftCardYpdId: {
        type: sequelize_1.Sequelize.STRING
    },
    centerCard: {
        type: sequelize_1.Sequelize.STRING
    },
    centerCardYpdId: {
        type: sequelize_1.Sequelize.STRING
    },
    rightCard: {
        type: sequelize_1.Sequelize.STRING
    },
    rightCardYpdId: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/DeckType.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeckType = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.DeckType = db_1.db.define('deckTypes', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    category: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Entry.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entry = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Entry = db_1.db.define('entries', {
    playerName: {
        type: sequelize_1.Sequelize.STRING
    },
    url: {
        type: sequelize_1.Sequelize.STRING
    },
    ydk: {
        type: sequelize_1.Sequelize.TEXT
    },
    active: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: true
    },
    wins: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    losses: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    participantId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    },
    tournamentId: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Event.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Event = void 0;
const tslib_1 = __webpack_require__("tslib");
const sequelize_1 = __webpack_require__("sequelize");
const Format_1 = __webpack_require__("./libs/models/src/lib/Format.js");
const Player_1 = __webpack_require__("./libs/models/src/lib/Player.js");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Event = db_1.db.define('events', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    abbreviation: {
        type: sequelize_1.Sequelize.STRING
    },
    formatName: {
        type: sequelize_1.Sequelize.STRING
    },
    formatId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    referenceUrl: {
        type: sequelize_1.Sequelize.STRING
    },
    display: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    tournamentId: {
        type: sequelize_1.Sequelize.STRING
    },
    winner: {
        type: sequelize_1.Sequelize.STRING
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    },
    size: {
        type: sequelize_1.Sequelize.INTEGER
    },
    type: {
        type: sequelize_1.Sequelize.STRING
    },
    series: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    community: {
        type: sequelize_1.Sequelize.STRING
    },
    startDate: {
        type: sequelize_1.Sequelize.DATE
    },
    endDate: {
        type: sequelize_1.Sequelize.DATE
    }
});
exports.Event.countResults = (filter = {}) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    filter = Object.entries(filter).reduce((reduced, [key, by]) => {
        let value = by.value;
        if (typeof value === 'string')
            value.replaceAll('%20', ' ');
        let operator = by.operator;
        if (['display', 'series'].includes(key)) {
            value = value.toLowerCase() === 'true';
        }
        if (['size', 'tournamentId', 'formatId'].includes(key)) {
            value = parseInt(value);
        }
        if (operator === 'eq') {
            operator = sequelize_1.Op.eq;
        }
        else if (operator === 'not') {
            operator = sequelize_1.Op.not;
        }
        else if (operator === 'like') {
            operator = sequelize_1.Op.iLike;
        }
        else if (operator === 'gt') {
            operator = sequelize_1.Op.gt;
        }
        else if (operator === 'gte') {
            operator = sequelize_1.Op.gte;
        }
        else if (operator === 'lt') {
            operator = sequelize_1.Op.lt;
        }
        else if (operator === 'lte') {
            operator = sequelize_1.Op.lte;
        }
        else if (operator === 'or') {
            operator = sequelize_1.Op.or;
        }
        else if (operator === 'and') {
            operator = sequelize_1.Op.and;
        }
        else if (operator === 'inc') {
            operator = sequelize_1.Op.iLike;
            value = '%' + value + '%';
        }
        else if (operator === 'btw') {
            operator = sequelize_1.Op.and;
            value = { [sequelize_1.Op.gte]: parseInt(value[0]), [sequelize_1.Op.lte]: parseInt(value[1]) };
        }
        reduced[key] = { [operator]: value };
        return reduced;
    }, {});
    const query = filter.name;
    delete filter.name;
    if (query)
        filter = Object.assign({ [sequelize_1.Op.or]: [{ name: query }, { abbreviation: query }] }, filter);
    const count = yield exports.Event.count({
        where: filter
    });
    return count;
});
exports.Event.find = (filter = {}, limit = 12, page = 1, sort = []) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    filter = Object.entries(filter).reduce((reduced, [key, by]) => {
        let value = by.value;
        if (typeof value === 'string')
            value.replaceAll('%20', ' ');
        let operator = by.operator;
        if (['display'].includes(key)) {
            value = value.toLowerCase() === 'true';
        }
        if (['deckTypeId', 'downloads', 'views', 'rating'].includes(key)) {
            value = parseInt(value);
        }
        if (operator === 'eq') {
            operator = sequelize_1.Op.eq;
        }
        else if (operator === 'not') {
            operator = sequelize_1.Op.not;
        }
        else if (operator === 'like') {
            operator = sequelize_1.Op.iLike;
        }
        else if (operator === 'gt') {
            operator = sequelize_1.Op.gt;
        }
        else if (operator === 'gte') {
            operator = sequelize_1.Op.gte;
        }
        else if (operator === 'lt') {
            operator = sequelize_1.Op.lt;
        }
        else if (operator === 'lte') {
            operator = sequelize_1.Op.lte;
        }
        else if (operator === 'or') {
            operator = sequelize_1.Op.or;
        }
        else if (operator === 'and') {
            operator = sequelize_1.Op.and;
        }
        else if (operator === 'inc') {
            operator = sequelize_1.Op.iLike;
            value = '%' + value + '%';
        }
        else if (operator === 'btw') {
            operator = sequelize_1.Op.and;
            value = { [sequelize_1.Op.gte]: parseInt(value[0]), [sequelize_1.Op.lte]: parseInt(value[1]) };
        }
        reduced[key] = { [operator]: value };
        return reduced;
    }, {});
    const query = filter.name;
    delete filter.name;
    if (query)
        filter = Object.assign({ [sequelize_1.Op.or]: [{ name: query }, { abbreviation: query }] }, filter);
    const events = yield exports.Event.findAll({
        where: filter,
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
        attributes: { exclude: ['tournamentId', 'type', 'series', 'createdAt', 'updatedAt'] },
        include: [{ model: Player_1.Player, attributes: ['name', 'discordId'] }, { model: Format_1.Format, attributes: ['name', 'icon'] }],
        order: sort
    });
    return events;
});


/***/ }),

/***/ "./libs/models/src/lib/Format.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Format = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Format = db_1.db.define('formats', {
    name: {
        type: sequelize_1.Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    date: {
        type: sequelize_1.Sequelize.STRING
    },
    banlist: {
        type: sequelize_1.Sequelize.STRING
    },
    event: {
        type: sequelize_1.Sequelize.STRING
    },
    icon: {
        type: sequelize_1.Sequelize.STRING
    },
    description: {
        type: sequelize_1.Sequelize.TEXT
    },
    channel: {
        type: sequelize_1.Sequelize.STRING
    },
    emoji: {
        type: sequelize_1.Sequelize.STRING
    },
    role: {
        type: sequelize_1.Sequelize.STRING
    },
    popular: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Iron.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Iron = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Iron = db_1.db.define('irons', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    team: {
        type: sequelize_1.Sequelize.STRING
    },
    eliminated: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    position: {
        type: sequelize_1.Sequelize.INTEGER
    },
    captain: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    confirmed: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: sequelize_1.Sequelize.STRING,
        defaultValue: 'pending'
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Match.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Match = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Match = db_1.db.define('matches', {
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    winner: {
        type: sequelize_1.Sequelize.STRING
    },
    winnerId: {
        type: sequelize_1.Sequelize.STRING
    },
    loser: {
        type: sequelize_1.Sequelize.STRING
    },
    loserId: {
        type: sequelize_1.Sequelize.STRING
    },
    delta: {
        type: sequelize_1.Sequelize.FLOAT,
        defaultValue: 10.00
    },
    tournament: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    internal: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Matchup.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Matchup = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Matchup = db_1.db.define('matchups', {
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    winningDeck: {
        type: sequelize_1.Sequelize.STRING
    },
    winningDeckId: {
        type: sequelize_1.Sequelize.STRING
    },
    losingDeck: {
        type: sequelize_1.Sequelize.STRING
    },
    losingDeckId: {
        type: sequelize_1.Sequelize.INTEGER
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Membership.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Membership = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Membership = db_1.db.define('memberships', {
    guildName: {
        type: sequelize_1.Sequelize.STRING
    },
    active: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: true
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Player.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const tslib_1 = __webpack_require__("tslib");
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
const bcrypt = __webpack_require__("bcrypt");
const nanoid_1 = __webpack_require__("nanoid");
exports.Player = db_1.db.define('players', {
    id: {
        type: sequelize_1.Sequelize.STRING,
        primaryKey: true,
        unique: true
    },
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    email: {
        type: sequelize_1.Sequelize.STRING
    },
    discordName: {
        type: sequelize_1.Sequelize.STRING
    },
    discriminator: {
        type: sequelize_1.Sequelize.STRING
    },
    discordId: {
        type: sequelize_1.Sequelize.STRING
    },
    discordPfp: {
        type: sequelize_1.Sequelize.STRING
    },
    googleId: {
        type: sequelize_1.Sequelize.STRING
    },
    googlePfp: {
        type: sequelize_1.Sequelize.TEXT
    },
    duelingBook: {
        type: sequelize_1.Sequelize.STRING
    },
    duelingBookPfp: {
        type: sequelize_1.Sequelize.STRING
    },
    firstName: {
        type: sequelize_1.Sequelize.STRING
    },
    lastName: {
        type: sequelize_1.Sequelize.STRING
    },
    country: {
        type: sequelize_1.Sequelize.STRING
    },
    timeZone: {
        type: sequelize_1.Sequelize.STRING
    },
    hash: {
        type: sequelize_1.Sequelize.STRING
    },
    admin: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    creator: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    hidden: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    oldId: {
        type: sequelize_1.Sequelize.STRING
    },
    youtube: {
        type: sequelize_1.Sequelize.STRING
    },
    twitch: {
        type: sequelize_1.Sequelize.STRING
    },
    twitter: {
        type: sequelize_1.Sequelize.STRING
    }
});
exports.Player.generateId = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const id = (0, nanoid_1.customAlphabet)(base58, 22)();
    return id;
});
exports.Player.findByDiscordId = (id) => exports.Player.findOne({ where: { discordId: id } });
exports.Player.findByEmail = (email) => {
    if (email.includes('@gmail.com')) {
        const googleId = email.replace('@gmail.com', '');
        return exports.Player.findOne({ where: { [sequelize_1.Op.or]: [{ email: email }, { googleId: googleId }] } });
    }
    else {
        return exports.Player.findOne({ where: { email: email } });
    }
};
exports.Player.discordLogin = (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const existingPlayer = (yield exports.Player.findOne({
        where: {
            discordId: user.id
        }
    })) || (yield exports.Player.findOne({
        where: {
            email: user.email
        }
    }));
    if (existingPlayer) {
        const googleId = user.email.includes('@gmail.com') ? user.email.slice(0, -10) : null;
        yield existingPlayer.update({
            name: existingPlayer.name || user.username,
            discordName: user.username,
            discriminator: user.discriminator,
            discordPfp: user.avatar,
            email: existingPlayer.email || user.email,
            googleId: existingPlayer.googleId || googleId
        });
        return existingPlayer;
    }
    else {
        const newPlayer = yield exports.Player.create({
            id: yield exports.Player.generateId(),
            discordId: user.id,
            name: user.username,
            discordName: user.username,
            discriminator: user.discriminator,
            discordPfp: user.avatar,
            email: user.email
        });
        return newPlayer;
    }
});
exports.Player.googleLogin = (payload) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const existingPlayer = (yield exports.Player.findOne({
        where: {
            googleId: payload.email.slice(0, -10)
        }
    })) || (yield exports.Player.findOne({
        where: {
            email: payload.email
        }
    }));
    if (existingPlayer) {
        yield existingPlayer.update({
            name: existingPlayer.name || payload.name,
            googleId: payload.email.slice(0, -10),
            googlePfp: payload.picture.slice(36),
            firstName: existingPlayer.firstName || payload.given_name,
            lastName: existingPlayer.lastName || payload.family_name,
            email: existingPlayer.email || payload.email
        });
        return existingPlayer;
    }
    else {
        const newPlayer = yield exports.Player.create({
            id: yield exports.Player.generateId(),
            name: payload.name,
            googleId: payload.email.slice(0, -10),
            googlePfp: payload.picture.slice(36),
            firstName: payload.given_name,
            lastName: payload.family_name,
            email: payload.email
        });
        return newPlayer;
    }
});
exports.Player.verifyLogin = (payload) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const player = yield exports.Player.findOne({
        where: {
            email: payload.email
        }
    });
    if (player && (yield bcrypt.compare(payload.password, player.hash))) {
        return player;
    }
    else {
        return false;
    }
});
exports.Player.prototype.hide = () => this.update({ hidden: true });


/***/ }),

/***/ "./libs/models/src/lib/Print.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Print = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Print = db_1.db.define('prints', {
    cardName: {
        type: sequelize_1.Sequelize.STRING
    },
    cardCode: {
        type: sequelize_1.Sequelize.STRING
    },
    setName: {
        type: sequelize_1.Sequelize.STRING
    },
    rarity: {
        type: sequelize_1.Sequelize.STRING
    },
    original: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    marketPrice: {
        type: sequelize_1.Sequelize.FLOAT,
        defaultValue: 0.0
    },
    tcgPlayerProductId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    tcgPlayerUrl: {
        type: sequelize_1.Sequelize.TEXT
    },
    cardId: {
        type: sequelize_1.Sequelize.INTEGER
    }
});


/***/ }),

/***/ "./libs/models/src/lib/RatedPool.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatedPool = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.RatedPool = db_1.db.define('ratedPools', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    status: {
        type: sequelize_1.Sequelize.STRING,
        defaultValue: 'pending'
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Role.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Role = db_1.db.define('roles', {
    roleId: {
        type: sequelize_1.Sequelize.STRING
    },
    roleName: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Server.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Server = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Server = db_1.db.define('servers', {
    id: {
        primaryKey: true,
        type: sequelize_1.Sequelize.STRING
    },
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    size: {
        type: sequelize_1.Sequelize.INTEGER
    },
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    ownerId: {
        type: sequelize_1.Sequelize.STRING
    },
    internalLadder: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    access: {
        type: sequelize_1.Sequelize.STRING,
        defaultValue: 'free'
    },
    logo: {
        type: sequelize_1.Sequelize.STRING
    },
    emoji: {
        type: sequelize_1.Sequelize.STRING
    },
    challongeAPIKey: {
        type: sequelize_1.Sequelize.STRING
    },
    googleToken: {
        type: sequelize_1.Sequelize.TEXT
    },
    botSpamChannel: {
        type: sequelize_1.Sequelize.STRING
    },
    ratedChannel: {
        type: sequelize_1.Sequelize.STRING
    },
    welcomeChannel: {
        type: sequelize_1.Sequelize.STRING
    },
    adminRole: {
        type: sequelize_1.Sequelize.STRING
    },
    modRole: {
        type: sequelize_1.Sequelize.STRING
    },
    rankedRole: {
        type: sequelize_1.Sequelize.STRING
    },
    tourRole: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Set.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Set = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Set = db_1.db.define('sets', {
    setName: {
        type: sequelize_1.Sequelize.STRING
    },
    setCode: {
        type: sequelize_1.Sequelize.STRING
    },
    tcgDate: {
        type: sequelize_1.Sequelize.STRING
    },
    booster: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    size: {
        type: sequelize_1.Sequelize.INTEGER
    },
    originals: {
        type: sequelize_1.Sequelize.INTEGER
    },
    tcgPlayerGroupId: {
        type: sequelize_1.Sequelize.INTEGER
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Stats.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Stats = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Stats = db_1.db.define('stats', {
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    elo: {
        type: sequelize_1.Sequelize.FLOAT,
        defaultValue: 500.0
    },
    backupElo: {
        type: sequelize_1.Sequelize.FLOAT
    },
    wins: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    losses: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    games: {
        type: sequelize_1.Sequelize.INTEGER,
        defaultValue: 0
    },
    internal: {
        type: sequelize_1.Sequelize.BOOLEAN
    },
    inactive: {
        type: sequelize_1.Sequelize.BOOLEAN,
        defaultValue: false
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Status.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Status = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Status = db_1.db.define('statuses', {
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    banlist: {
        type: sequelize_1.Sequelize.STRING
    },
    restriction: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Tournament.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tournament = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Tournament = db_1.db.define('tournaments', {
    id: {
        primaryKey: true,
        type: sequelize_1.Sequelize.STRING
    },
    name: {
        type: sequelize_1.Sequelize.STRING
    },
    url: {
        type: sequelize_1.Sequelize.STRING
    },
    formatName: {
        type: sequelize_1.Sequelize.STRING
    },
    type: {
        type: sequelize_1.Sequelize.STRING
    },
    state: {
        type: sequelize_1.Sequelize.STRING
    },
    deadline: {
        type: sequelize_1.Sequelize.DATE
    },
    community: {
        type: sequelize_1.Sequelize.STRING
    },
    logo: {
        type: sequelize_1.Sequelize.STRING
    },
    emoji: {
        type: sequelize_1.Sequelize.STRING
    },
    channelId: {
        type: sequelize_1.Sequelize.STRING
    },
    serverId: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Upvote.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Upvote = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Upvote = db_1.db.define('upvotes', {
    contentType: {
        type: sequelize_1.Sequelize.STRING
    },
    articleId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    cubeId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    deckId: {
        type: sequelize_1.Sequelize.INTEGER
    },
    videoId: {
        type: sequelize_1.Sequelize.INTEGER
    }
});


/***/ }),

/***/ "./libs/models/src/lib/Video.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Video = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const db_1 = __webpack_require__("./libs/models/src/lib/db.js");
exports.Video = db_1.db.define('videos', {
    title: {
        type: sequelize_1.Sequelize.STRING
    },
    author: {
        type: sequelize_1.Sequelize.STRING
    },
    playerId: {
        type: sequelize_1.Sequelize.STRING
    },
    url: {
        type: sequelize_1.Sequelize.STRING
    },
    format: {
        type: sequelize_1.Sequelize.STRING
    },
    publishDate: {
        type: sequelize_1.Sequelize.STRING
    }
});


/***/ }),

/***/ "./libs/models/src/lib/config.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = void 0;
if (true) {
    (__webpack_require__("dotenv").config)();
}
exports.config = {
    database: {
        url: process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'formatlibrary'
    }
};


/***/ }),

/***/ "./libs/models/src/lib/db.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.db = void 0;
const sequelize_1 = __webpack_require__("sequelize");
const config_1 = __webpack_require__("./libs/models/src/lib/config.js");
exports.db = config_1.config.database.url
    ? new sequelize_1.Sequelize(config_1.config.database.url, {
        logging: false,
        ssl: true
    })
    : new sequelize_1.Sequelize(config_1.config.database.database, config_1.config.database.user, config_1.config.database.password, {
        host: config_1.config.database.host,
        port: config_1.config.database.port,
        dialect: 'postgres',
        logging: false
    });


/***/ }),

/***/ "./libs/models/src/lib/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Video = exports.Upvote = exports.Tournament = exports.Status = exports.Stats = exports.Set = exports.Server = exports.Role = exports.Print = exports.Player = exports.Membership = exports.Matchup = exports.Match = exports.Iron = exports.Format = exports.Event = exports.Entry = exports.DeckType = exports.DeckThumb = exports.Deck = exports.Cube = exports.Card = exports.BlogPost = exports.Article = void 0;
const Article_1 = __webpack_require__("./libs/models/src/lib/Article.js");
Object.defineProperty(exports, "Article", ({ enumerable: true, get: function () { return Article_1.Article; } }));
const BlogPost_1 = __webpack_require__("./libs/models/src/lib/BlogPost.js");
Object.defineProperty(exports, "BlogPost", ({ enumerable: true, get: function () { return BlogPost_1.BlogPost; } }));
const Card_1 = __webpack_require__("./libs/models/src/lib/Card.js");
Object.defineProperty(exports, "Card", ({ enumerable: true, get: function () { return Card_1.Card; } }));
const Cube_1 = __webpack_require__("./libs/models/src/lib/Cube.js");
Object.defineProperty(exports, "Cube", ({ enumerable: true, get: function () { return Cube_1.Cube; } }));
const Deck_1 = __webpack_require__("./libs/models/src/lib/Deck.js");
Object.defineProperty(exports, "Deck", ({ enumerable: true, get: function () { return Deck_1.Deck; } }));
const DeckThumb_1 = __webpack_require__("./libs/models/src/lib/DeckThumb.js");
Object.defineProperty(exports, "DeckThumb", ({ enumerable: true, get: function () { return DeckThumb_1.DeckThumb; } }));
const DeckType_1 = __webpack_require__("./libs/models/src/lib/DeckType.js");
Object.defineProperty(exports, "DeckType", ({ enumerable: true, get: function () { return DeckType_1.DeckType; } }));
const Entry_1 = __webpack_require__("./libs/models/src/lib/Entry.js");
Object.defineProperty(exports, "Entry", ({ enumerable: true, get: function () { return Entry_1.Entry; } }));
const Event_1 = __webpack_require__("./libs/models/src/lib/Event.js");
Object.defineProperty(exports, "Event", ({ enumerable: true, get: function () { return Event_1.Event; } }));
const Format_1 = __webpack_require__("./libs/models/src/lib/Format.js");
Object.defineProperty(exports, "Format", ({ enumerable: true, get: function () { return Format_1.Format; } }));
const Iron_1 = __webpack_require__("./libs/models/src/lib/Iron.js");
Object.defineProperty(exports, "Iron", ({ enumerable: true, get: function () { return Iron_1.Iron; } }));
const Match_1 = __webpack_require__("./libs/models/src/lib/Match.js");
Object.defineProperty(exports, "Match", ({ enumerable: true, get: function () { return Match_1.Match; } }));
const Matchup_1 = __webpack_require__("./libs/models/src/lib/Matchup.js");
Object.defineProperty(exports, "Matchup", ({ enumerable: true, get: function () { return Matchup_1.Matchup; } }));
const Membership_1 = __webpack_require__("./libs/models/src/lib/Membership.js");
Object.defineProperty(exports, "Membership", ({ enumerable: true, get: function () { return Membership_1.Membership; } }));
const Player_1 = __webpack_require__("./libs/models/src/lib/Player.js");
Object.defineProperty(exports, "Player", ({ enumerable: true, get: function () { return Player_1.Player; } }));
const Print_1 = __webpack_require__("./libs/models/src/lib/Print.js");
Object.defineProperty(exports, "Print", ({ enumerable: true, get: function () { return Print_1.Print; } }));
const RatedPool_1 = __webpack_require__("./libs/models/src/lib/RatedPool.js");
const Role_1 = __webpack_require__("./libs/models/src/lib/Role.js");
Object.defineProperty(exports, "Role", ({ enumerable: true, get: function () { return Role_1.Role; } }));
const Server_1 = __webpack_require__("./libs/models/src/lib/Server.js");
Object.defineProperty(exports, "Server", ({ enumerable: true, get: function () { return Server_1.Server; } }));
const Set_1 = __webpack_require__("./libs/models/src/lib/Set.js");
Object.defineProperty(exports, "Set", ({ enumerable: true, get: function () { return Set_1.Set; } }));
const Stats_1 = __webpack_require__("./libs/models/src/lib/Stats.js");
Object.defineProperty(exports, "Stats", ({ enumerable: true, get: function () { return Stats_1.Stats; } }));
const Status_1 = __webpack_require__("./libs/models/src/lib/Status.js");
Object.defineProperty(exports, "Status", ({ enumerable: true, get: function () { return Status_1.Status; } }));
const Tournament_1 = __webpack_require__("./libs/models/src/lib/Tournament.js");
Object.defineProperty(exports, "Tournament", ({ enumerable: true, get: function () { return Tournament_1.Tournament; } }));
const Upvote_1 = __webpack_require__("./libs/models/src/lib/Upvote.js");
Object.defineProperty(exports, "Upvote", ({ enumerable: true, get: function () { return Upvote_1.Upvote; } }));
const Video_1 = __webpack_require__("./libs/models/src/lib/Video.js");
Object.defineProperty(exports, "Video", ({ enumerable: true, get: function () { return Video_1.Video; } }));
//ARTICLE
Article_1.Article.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Article_1.Article);
//DECKTYPE
DeckType_1.DeckType.hasMany(Deck_1.Deck);
Deck_1.Deck.belongsTo(DeckType_1.DeckType);
DeckType_1.DeckType.hasMany(DeckThumb_1.DeckThumb);
DeckThumb_1.DeckThumb.belongsTo(DeckType_1.DeckType);
//ENTRY
Entry_1.Entry.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Entry_1.Entry);
Entry_1.Entry.belongsTo(Tournament_1.Tournament);
Tournament_1.Tournament.hasMany(Entry_1.Entry);
//EVENT
Event_1.Event.hasMany(Deck_1.Deck);
Deck_1.Deck.belongsTo(Event_1.Event);
Event_1.Event.belongsTo(Tournament_1.Tournament);
Tournament_1.Tournament.hasOne(Event_1.Event);
//FORMAT
Format_1.Format.hasMany(Deck_1.Deck);
Deck_1.Deck.belongsTo(Format_1.Format);
Format_1.Format.hasMany(Event_1.Event);
Event_1.Event.belongsTo(Format_1.Format);
//IRON
Iron_1.Iron.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Iron_1.Iron);
//MATCH
Match_1.Match.belongsTo(Server_1.Server);
Server_1.Server.hasMany(Match_1.Match);
//MATCHUP
Matchup_1.Matchup.belongsTo(Match_1.Match);
Match_1.Match.hasOne(Matchup_1.Matchup);
Matchup_1.Matchup.belongsTo(Tournament_1.Tournament);
Tournament_1.Tournament.hasMany(Matchup_1.Matchup);
//MEMBERSHIP
Membership_1.Membership.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Membership_1.Membership);
Membership_1.Membership.belongsTo(Server_1.Server);
Server_1.Server.hasMany(Membership_1.Membership);
//PLAYER
Player_1.Player.hasMany(Cube_1.Cube);
Cube_1.Cube.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Deck_1.Deck);
Deck_1.Deck.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Event_1.Event);
Event_1.Event.belongsTo(Player_1.Player);
//PRINT
Print_1.Print.belongsTo(Card_1.Card);
Card_1.Card.hasMany(Print_1.Print);
Print_1.Print.belongsTo(Set_1.Set);
Set_1.Set.hasMany(Print_1.Print);
//RATED POOL
RatedPool_1.RatedPool.belongsTo(Player_1.Player);
Player_1.Player.hasMany(RatedPool_1.RatedPool);
//ROLE
Role_1.Role.belongsTo(Membership_1.Membership);
Membership_1.Membership.hasMany(Role_1.Role);
//STATS
Stats_1.Stats.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Stats_1.Stats);
Stats_1.Stats.belongsTo(Server_1.Server);
Server_1.Server.hasMany(Stats_1.Stats);
//STATUS
Status_1.Status.belongsTo(Card_1.Card);
Card_1.Card.hasMany(Status_1.Status);
//TOURNAMENT
Tournament_1.Tournament.belongsTo(Server_1.Server);
Server_1.Server.hasMany(Tournament_1.Tournament);
//UPVOTE
Upvote_1.Upvote.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Upvote_1.Upvote);
//VIDEO
Video_1.Video.belongsTo(Player_1.Player);
Player_1.Player.hasMany(Video_1.Video);


/***/ }),

/***/ "./libs/utils/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/utils/src/lib/index.ts"), exports);


/***/ }),

/***/ "./libs/utils/src/lib/country.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCountry = exports.timezones = exports.countries = void 0;
exports.countries = {
    AD: "Andorra",
    AE: "United Arab Emirates",
    AF: "Afghanistan",
    AG: "Antigua and Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AO: "Angola",
    AQ: "Antarctica",
    AR: "Argentina",
    AS: "American Samoa",
    AT: "Austria",
    AU: "Australia",
    AW: "Aruba",
    AX: "Åland Islands",
    AZ: "Azerbaijan",
    BA: "Bosnia and Herzegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgium",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint Barthélemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "Caribbean Netherlands",
    BR: "Brazil",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Bouvet Island",
    BW: "Botswana",
    BY: "Belarus",
    BZ: "Belize",
    CA: "Canada",
    CC: "Cocos Islands",
    CD: "Democratic Republic of the Congo",
    CF: "Central African Republic",
    CG: "Republic of the Congo",
    CH: "Switzerland",
    CI: "Ivory Coast",
    CK: "Cook Islands",
    CL: "Chile",
    CM: "Cameroon",
    CN: "China",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Cuba",
    CV: "Cabo Verde",
    CW: "Curaçao",
    CX: "Christmas Island",
    CY: "Cyprus",
    CZ: "Czechia",
    DE: "Germany",
    DJ: "Djibouti",
    DK: "Denmark",
    DM: "Dominica",
    DO: "Dominican Republic",
    DZ: "Algeria",
    EC: "Ecuador",
    EE: "Estonia",
    EG: "Egypt",
    EH: "Western Sahara",
    ER: "Eritrea",
    ES: "Spain",
    ET: "Ethiopia",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falkland Islands",
    FM: "Micronesia",
    FO: "Faroe Islands",
    FR: "France",
    GA: "Gabon",
    GB: "United Kingdom",
    GD: "Grenada",
    GE: "Georgia",
    GF: "French Guiana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Greenland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Equatorial Guinea",
    GR: "Greece",
    GS: "South Georgia and the South Sandwich Islands",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hong Kong",
    HM: "Heard Island and McDonald Islands",
    HN: "Honduras",
    HR: "Croatia",
    HT: "Haiti",
    HU: "Hungary",
    ID: "Indonesia",
    IE: "Ireland",
    IL: "Israel",
    IM: "Isle of Man",
    IN: "India",
    IO: "British Indian Ocean Territory",
    IQ: "Iraq",
    IR: "Iran",
    IS: "Iceland",
    IT: "Italy",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordan",
    JP: "Japan",
    KE: "Kenya",
    KG: "Kyrgyzstan",
    KH: "Cambodia",
    KI: "Kiribati",
    KM: "Comoros",
    KN: "Saint Kitts and Nevis",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KY: "Cayman Islands",
    KZ: "Kazakhstan",
    LA: "Laos",
    LB: "Lebanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Lithuania",
    LU: "Luxembourg",
    LV: "Latvia",
    LY: "Libya",
    MA: "Morocco",
    MC: "Monaco",
    MD: "Moldova",
    ME: "Montenegro",
    MF: "Saint Martin",
    MG: "Madagascar",
    MH: "Marshall Islands",
    MK: "North Macedonia",
    ML: "Mali",
    MM: "Myanmar",
    MN: "Mongolia",
    MO: "Macao",
    MP: "Northern Mariana Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldives",
    MW: "Malawi",
    MX: "Mexico",
    MY: "Malaysia",
    MZ: "Mozambique",
    NA: "Namibia",
    NC: "New Caledonia",
    NE: "Niger",
    NF: "Norfolk Island",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Netherlands",
    NO: "Norway",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "New Zealand",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "French Polynesia",
    PG: "Papua New Guinea",
    PH: "Philippines",
    PK: "Pakistan",
    PL: "Poland",
    PM: "Saint Pierre and Miquelon",
    PN: "Pitcairn",
    PR: "Puerto Rico",
    PS: "Palestine",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russia",
    RW: "Rwanda",
    SA: "Saudi Arabia",
    SB: "Solomon Islands",
    SC: "Seychelles",
    SD: "Sudan",
    SE: "Sweden",
    SG: "Singapore",
    SH: "Saint Helena, Ascension and Tristan da Cunha",
    SI: "Slovenia",
    SJ: "Svalbard and Jan Mayen",
    SK: "Slovakia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Suriname",
    SS: "South Sudan",
    ST: "Sao Tome and Principe",
    SV: "El Salvador",
    SX: "Sint Maarten",
    SY: "Syria",
    SZ: "Eswatini",
    TC: "Turks and Caicos Islands",
    TD: "Chad",
    TF: "French Southern Territories",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tajikistan",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Turkey",
    TT: "Trinidad and Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ukraine",
    UG: "Uganda",
    UM: "United States Minor Outlying Islands",
    US: "United States of America",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Holy See",
    VC: "Saint Vincent and the Grenadines",
    VE: "Venezuela",
    VG: "Virgin Islands (UK)",
    VI: "Virgin Islands (US)",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis and Futuna",
    WS: "Samoa",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "South Africa",
    ZM: "Zambia",
    ZW: "Zimbabwe"
};
exports.timezones = {
    "Africa/Abidjan": {
        u: 0,
        c: ["CI", "BF", "GH", "GM", "GN", "ML", "MR", "SH", "SL", "SN", "TG"]
    },
    "Africa/Accra": {
        a: "Africa/Abidjan",
        c: ["GH"],
        r: 1
    },
    "Africa/Addis_Ababa": {
        a: "Africa/Nairobi",
        c: ["ET"],
        r: 1
    },
    "Africa/Algiers": {
        u: 60,
        c: ["DZ"]
    },
    "Africa/Asmara": {
        a: "Africa/Nairobi",
        c: ["ER"],
        r: 1
    },
    "Africa/Asmera": {
        a: "Africa/Nairobi",
        c: ["ER"],
        r: 1
    },
    "Africa/Bamako": {
        a: "Africa/Abidjan",
        c: ["ML"],
        r: 1
    },
    "Africa/Bangui": {
        a: "Africa/Lagos",
        c: ["CF"],
        r: 1
    },
    "Africa/Banjul": {
        a: "Africa/Abidjan",
        c: ["GM"],
        r: 1
    },
    "Africa/Bissau": {
        u: 0,
        c: ["GW"]
    },
    "Africa/Blantyre": {
        a: "Africa/Maputo",
        c: ["MW"],
        r: 1
    },
    "Africa/Brazzaville": {
        a: "Africa/Lagos",
        c: ["CG"],
        r: 1
    },
    "Africa/Bujumbura": {
        a: "Africa/Maputo",
        c: ["BI"],
        r: 1
    },
    "Africa/Cairo": {
        u: 120,
        c: ["EG"]
    },
    "Africa/Casablanca": {
        u: 60,
        d: 0,
        c: ["MA"]
    },
    "Africa/Ceuta": {
        u: 60,
        d: 120,
        c: ["ES"]
    },
    "Africa/Conakry": {
        a: "Africa/Abidjan",
        c: ["GN"],
        r: 1
    },
    "Africa/Dakar": {
        a: "Africa/Abidjan",
        c: ["SN"],
        r: 1
    },
    "Africa/Dar_es_Salaam": {
        a: "Africa/Nairobi",
        c: ["TZ"],
        r: 1
    },
    "Africa/Djibouti": {
        a: "Africa/Nairobi",
        c: ["DJ"],
        r: 1
    },
    "Africa/Douala": {
        a: "Africa/Lagos",
        c: ["CM"],
        r: 1
    },
    "Africa/El_Aaiun": {
        u: 60,
        d: 0,
        c: ["EH"]
    },
    "Africa/Freetown": {
        a: "Africa/Abidjan",
        c: ["SL"],
        r: 1
    },
    "Africa/Gaborone": {
        a: "Africa/Maputo",
        c: ["BW"],
        r: 1
    },
    "Africa/Harare": {
        a: "Africa/Maputo",
        c: ["ZW"],
        r: 1
    },
    "Africa/Johannesburg": {
        u: 120,
        c: ["ZA", "LS", "SZ"]
    },
    "Africa/Juba": {
        u: 120,
        c: ["SS"]
    },
    "Africa/Kampala": {
        a: "Africa/Nairobi",
        c: ["UG"],
        r: 1
    },
    "Africa/Khartoum": {
        u: 120,
        c: ["SD"]
    },
    "Africa/Kigali": {
        a: "Africa/Maputo",
        c: ["RW"],
        r: 1
    },
    "Africa/Kinshasa": {
        a: "Africa/Lagos",
        c: ["CD"],
        r: 1
    },
    "Africa/Lagos": {
        u: 60,
        c: ["NG", "AO", "BJ", "CD", "CF", "CG", "CM", "GA", "GQ", "NE"]
    },
    "Africa/Libreville": {
        a: "Africa/Lagos",
        c: ["GA"],
        r: 1
    },
    "Africa/Lome": {
        a: "Africa/Abidjan",
        c: ["TG"],
        r: 1
    },
    "Africa/Luanda": {
        a: "Africa/Lagos",
        c: ["AO"],
        r: 1
    },
    "Africa/Lubumbashi": {
        a: "Africa/Maputo",
        c: ["CD"],
        r: 1
    },
    "Africa/Lusaka": {
        a: "Africa/Maputo",
        c: ["ZM"],
        r: 1
    },
    "Africa/Malabo": {
        a: "Africa/Lagos",
        c: ["GQ"],
        r: 1
    },
    "Africa/Maputo": {
        u: 120,
        c: ["MZ", "BI", "BW", "CD", "MW", "RW", "ZM", "ZW"]
    },
    "Africa/Maseru": {
        a: "Africa/Johannesburg",
        c: ["LS"],
        r: 1
    },
    "Africa/Mbabane": {
        a: "Africa/Johannesburg",
        c: ["SZ"],
        r: 1
    },
    "Africa/Mogadishu": {
        a: "Africa/Nairobi",
        c: ["SO"],
        r: 1
    },
    "Africa/Monrovia": {
        u: 0,
        c: ["LR"]
    },
    "Africa/Nairobi": {
        u: 180,
        c: ["KE", "DJ", "ER", "ET", "KM", "MG", "SO", "TZ", "UG", "YT"]
    },
    "Africa/Ndjamena": {
        u: 60,
        c: ["TD"]
    },
    "Africa/Niamey": {
        a: "Africa/Lagos",
        c: ["NE"],
        r: 1
    },
    "Africa/Nouakchott": {
        a: "Africa/Abidjan",
        c: ["MR"],
        r: 1
    },
    "Africa/Ouagadougou": {
        a: "Africa/Abidjan",
        c: ["BF"],
        r: 1
    },
    "Africa/Porto-Novo": {
        a: "Africa/Lagos",
        c: ["BJ"],
        r: 1
    },
    "Africa/Sao_Tome": {
        u: 0,
        c: ["ST"]
    },
    "Africa/Timbuktu": {
        a: "Africa/Abidjan",
        c: ["ML"],
        r: 1
    },
    "Africa/Tripoli": {
        u: 120,
        c: ["LY"]
    },
    "Africa/Tunis": {
        u: 60,
        c: ["TN"]
    },
    "Africa/Windhoek": {
        u: 120,
        c: ["NA"]
    },
    "America/Adak": {
        u: -600,
        d: -540,
        c: ["US"]
    },
    "America/Anchorage": {
        u: -540,
        d: -480,
        c: ["US"]
    },
    "America/Anguilla": {
        a: "America/Puerto_Rico",
        c: ["AI"],
        r: 1
    },
    "America/Antigua": {
        a: "America/Puerto_Rico",
        c: ["AG"],
        r: 1
    },
    "America/Araguaina": {
        u: -180,
        c: ["BR"]
    },
    "America/Argentina/Buenos_Aires": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/Catamarca": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/ComodRivadavia": {
        a: "America/Argentina/Catamarca",
        r: 1
    },
    "America/Argentina/Cordoba": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/Jujuy": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/La_Rioja": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/Mendoza": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/Rio_Gallegos": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/Salta": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/San_Juan": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/San_Luis": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/Tucuman": {
        u: -180,
        c: ["AR"]
    },
    "America/Argentina/Ushuaia": {
        u: -180,
        c: ["AR"]
    },
    "America/Aruba": {
        a: "America/Puerto_Rico",
        c: ["AW"],
        r: 1
    },
    "America/Asuncion": {
        u: -240,
        d: -180,
        c: ["PY"]
    },
    "America/Atikokan": {
        a: "America/Panama",
        c: ["CA"],
        r: 1
    },
    "America/Atka": {
        a: "America/Adak",
        r: 1
    },
    "America/Bahia": {
        u: -180,
        c: ["BR"]
    },
    "America/Bahia_Banderas": {
        u: -360,
        d: -300,
        c: ["MX"]
    },
    "America/Barbados": {
        u: -240,
        c: ["BB"]
    },
    "America/Belem": {
        u: -180,
        c: ["BR"]
    },
    "America/Belize": {
        u: -360,
        c: ["BZ"]
    },
    "America/Blanc-Sablon": {
        a: "America/Puerto_Rico",
        c: ["CA"],
        r: 1
    },
    "America/Boa_Vista": {
        u: -240,
        c: ["BR"]
    },
    "America/Bogota": {
        u: -300,
        c: ["CO"]
    },
    "America/Boise": {
        u: -420,
        d: -360,
        c: ["US"]
    },
    "America/Buenos_Aires": {
        a: "America/Argentina/Buenos_Aires",
        r: 1
    },
    "America/Cambridge_Bay": {
        u: -420,
        d: -360,
        c: ["CA"]
    },
    "America/Campo_Grande": {
        u: -240,
        c: ["BR"]
    },
    "America/Cancun": {
        u: -300,
        c: ["MX"]
    },
    "America/Caracas": {
        u: -240,
        c: ["VE"]
    },
    "America/Catamarca": {
        a: "America/Argentina/Catamarca",
        r: 1
    },
    "America/Cayenne": {
        u: -180,
        c: ["GF"]
    },
    "America/Cayman": {
        a: "America/Panama",
        c: ["KY"],
        r: 1
    },
    "America/Chicago": {
        u: -360,
        d: -300,
        c: ["US"]
    },
    "America/Chihuahua": {
        u: -420,
        d: -360,
        c: ["MX"]
    },
    "America/Coral_Harbour": {
        a: "America/Panama",
        c: ["CA"],
        r: 1
    },
    "America/Cordoba": {
        a: "America/Argentina/Cordoba",
        r: 1
    },
    "America/Costa_Rica": {
        u: -360,
        c: ["CR"]
    },
    "America/Creston": {
        a: "America/Phoenix",
        c: ["CA"],
        r: 1
    },
    "America/Cuiaba": {
        u: -240,
        c: ["BR"]
    },
    "America/Curacao": {
        a: "America/Puerto_Rico",
        c: ["CW"],
        r: 1
    },
    "America/Danmarkshavn": {
        u: 0,
        c: ["GL"]
    },
    "America/Dawson": {
        u: -420,
        c: ["CA"]
    },
    "America/Dawson_Creek": {
        u: -420,
        c: ["CA"]
    },
    "America/Denver": {
        u: -420,
        d: -360,
        c: ["US"]
    },
    "America/Detroit": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Dominica": {
        a: "America/Puerto_Rico",
        c: ["DM"],
        r: 1
    },
    "America/Edmonton": {
        u: -420,
        d: -360,
        c: ["CA"]
    },
    "America/Eirunepe": {
        u: -300,
        c: ["BR"]
    },
    "America/El_Salvador": {
        u: -360,
        c: ["SV"]
    },
    "America/Ensenada": {
        a: "America/Tijuana",
        r: 1
    },
    "America/Fort_Nelson": {
        u: -420,
        c: ["CA"]
    },
    "America/Fort_Wayne": {
        a: "America/Indiana/Indianapolis",
        r: 1
    },
    "America/Fortaleza": {
        u: -180,
        c: ["BR"]
    },
    "America/Glace_Bay": {
        u: -240,
        d: -180,
        c: ["CA"]
    },
    "America/Godthab": {
        a: "America/Nuuk",
        r: 1
    },
    "America/Goose_Bay": {
        u: -240,
        d: -180,
        c: ["CA"]
    },
    "America/Grand_Turk": {
        u: -300,
        d: -240,
        c: ["TC"]
    },
    "America/Grenada": {
        a: "America/Puerto_Rico",
        c: ["GD"],
        r: 1
    },
    "America/Guadeloupe": {
        a: "America/Puerto_Rico",
        c: ["GP"],
        r: 1
    },
    "America/Guatemala": {
        u: -360,
        c: ["GT"]
    },
    "America/Guayaquil": {
        u: -300,
        c: ["EC"]
    },
    "America/Guyana": {
        u: -240,
        c: ["GY"]
    },
    "America/Halifax": {
        u: -240,
        d: -180,
        c: ["CA"]
    },
    "America/Havana": {
        u: -300,
        d: -240,
        c: ["CU"]
    },
    "America/Hermosillo": {
        u: -420,
        c: ["MX"]
    },
    "America/Indiana/Indianapolis": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Indiana/Knox": {
        u: -360,
        d: -300,
        c: ["US"]
    },
    "America/Indiana/Marengo": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Indiana/Petersburg": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Indiana/Tell_City": {
        u: -360,
        d: -300,
        c: ["US"]
    },
    "America/Indiana/Vevay": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Indiana/Vincennes": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Indiana/Winamac": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Indianapolis": {
        a: "America/Indiana/Indianapolis",
        r: 1
    },
    "America/Inuvik": {
        u: -420,
        d: -360,
        c: ["CA"]
    },
    "America/Iqaluit": {
        u: -300,
        d: -240,
        c: ["CA"]
    },
    "America/Jamaica": {
        u: -300,
        c: ["JM"]
    },
    "America/Jujuy": {
        a: "America/Argentina/Jujuy",
        r: 1
    },
    "America/Juneau": {
        u: -540,
        d: -480,
        c: ["US"]
    },
    "America/Kentucky/Louisville": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Kentucky/Monticello": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Knox_IN": {
        a: "America/Indiana/Knox",
        r: 1
    },
    "America/Kralendijk": {
        a: "America/Puerto_Rico",
        c: ["BQ"],
        r: 1
    },
    "America/La_Paz": {
        u: -240,
        c: ["BO"]
    },
    "America/Lima": {
        u: -300,
        c: ["PE"]
    },
    "America/Los_Angeles": {
        u: -480,
        d: -420,
        c: ["US"]
    },
    "America/Louisville": {
        a: "America/Kentucky/Louisville",
        r: 1
    },
    "America/Lower_Princes": {
        a: "America/Puerto_Rico",
        c: ["SX"],
        r: 1
    },
    "America/Maceio": {
        u: -180,
        c: ["BR"]
    },
    "America/Managua": {
        u: -360,
        c: ["NI"]
    },
    "America/Manaus": {
        u: -240,
        c: ["BR"]
    },
    "America/Marigot": {
        a: "America/Puerto_Rico",
        c: ["MF"],
        r: 1
    },
    "America/Martinique": {
        u: -240,
        c: ["MQ"]
    },
    "America/Matamoros": {
        u: -360,
        d: -300,
        c: ["MX"]
    },
    "America/Mazatlan": {
        u: -420,
        d: -360,
        c: ["MX"]
    },
    "America/Mendoza": {
        a: "America/Argentina/Mendoza",
        r: 1
    },
    "America/Menominee": {
        u: -360,
        d: -300,
        c: ["US"]
    },
    "America/Merida": {
        u: -360,
        d: -300,
        c: ["MX"]
    },
    "America/Metlakatla": {
        u: -540,
        d: -480,
        c: ["US"]
    },
    "America/Mexico_City": {
        u: -360,
        d: -300,
        c: ["MX"]
    },
    "America/Miquelon": {
        u: -180,
        d: -120,
        c: ["PM"]
    },
    "America/Moncton": {
        u: -240,
        d: -180,
        c: ["CA"]
    },
    "America/Monterrey": {
        u: -360,
        d: -300,
        c: ["MX"]
    },
    "America/Montevideo": {
        u: -180,
        c: ["UY"]
    },
    "America/Montreal": {
        a: "America/Toronto",
        c: ["CA"],
        r: 1
    },
    "America/Montserrat": {
        a: "America/Puerto_Rico",
        c: ["MS"],
        r: 1
    },
    "America/Nassau": {
        a: "America/Toronto",
        c: ["BS"],
        r: 1
    },
    "America/New_York": {
        u: -300,
        d: -240,
        c: ["US"]
    },
    "America/Nipigon": {
        u: -300,
        d: -240,
        c: ["CA"]
    },
    "America/Nome": {
        u: -540,
        d: -480,
        c: ["US"]
    },
    "America/Noronha": {
        u: -120,
        c: ["BR"]
    },
    "America/North_Dakota/Beulah": {
        u: -360,
        d: -300,
        c: ["US"]
    },
    "America/North_Dakota/Center": {
        u: -360,
        d: -300,
        c: ["US"]
    },
    "America/North_Dakota/New_Salem": {
        u: -360,
        d: -300,
        c: ["US"]
    },
    "America/Nuuk": {
        u: -180,
        d: -120,
        c: ["GL"]
    },
    "America/Ojinaga": {
        u: -420,
        d: -360,
        c: ["MX"]
    },
    "America/Panama": {
        u: -300,
        c: ["PA", "CA", "KY"]
    },
    "America/Pangnirtung": {
        u: -300,
        d: -240,
        c: ["CA"]
    },
    "America/Paramaribo": {
        u: -180,
        c: ["SR"]
    },
    "America/Phoenix": {
        u: -420,
        c: ["US", "CA"]
    },
    "America/Port-au-Prince": {
        u: -300,
        d: -240,
        c: ["HT"]
    },
    "America/Port_of_Spain": {
        a: "America/Puerto_Rico",
        c: ["TT"],
        r: 1
    },
    "America/Porto_Acre": {
        a: "America/Rio_Branco",
        r: 1
    },
    "America/Porto_Velho": {
        u: -240,
        c: ["BR"]
    },
    "America/Puerto_Rico": {
        u: -240,
        c: [
            "PR",
            "AG",
            "CA",
            "AI",
            "AW",
            "BL",
            "BQ",
            "CW",
            "DM",
            "GD",
            "GP",
            "KN",
            "LC",
            "MF",
            "MS",
            "SX",
            "TT",
            "VC",
            "VG",
            "VI"
        ]
    },
    "America/Punta_Arenas": {
        u: -180,
        c: ["CL"]
    },
    "America/Rainy_River": {
        u: -360,
        d: -300,
        c: ["CA"]
    },
    "America/Rankin_Inlet": {
        u: -360,
        d: -300,
        c: ["CA"]
    },
    "America/Recife": {
        u: -180,
        c: ["BR"]
    },
    "America/Regina": {
        u: -360,
        c: ["CA"]
    },
    "America/Resolute": {
        u: -360,
        d: -300,
        c: ["CA"]
    },
    "America/Rio_Branco": {
        u: -300,
        c: ["BR"]
    },
    "America/Rosario": {
        a: "America/Argentina/Cordoba",
        r: 1
    },
    "America/Santa_Isabel": {
        a: "America/Tijuana",
        r: 1
    },
    "America/Santarem": {
        u: -180,
        c: ["BR"]
    },
    "America/Santiago": {
        u: -240,
        d: -180,
        c: ["CL"]
    },
    "America/Santo_Domingo": {
        u: -240,
        c: ["DO"]
    },
    "America/Sao_Paulo": {
        u: -180,
        c: ["BR"]
    },
    "America/Scoresbysund": {
        u: -60,
        d: 0,
        c: ["GL"]
    },
    "America/Shiprock": {
        a: "America/Denver",
        r: 1
    },
    "America/Sitka": {
        u: -540,
        d: -480,
        c: ["US"]
    },
    "America/St_Barthelemy": {
        a: "America/Puerto_Rico",
        c: ["BL"],
        r: 1
    },
    "America/St_Johns": {
        u: -150,
        d: -90,
        c: ["CA"]
    },
    "America/St_Kitts": {
        a: "America/Puerto_Rico",
        c: ["KN"],
        r: 1
    },
    "America/St_Lucia": {
        a: "America/Puerto_Rico",
        c: ["LC"],
        r: 1
    },
    "America/St_Thomas": {
        a: "America/Puerto_Rico",
        c: ["VI"],
        r: 1
    },
    "America/St_Vincent": {
        a: "America/Puerto_Rico",
        c: ["VC"],
        r: 1
    },
    "America/Swift_Current": {
        u: -360,
        c: ["CA"]
    },
    "America/Tegucigalpa": {
        u: -360,
        c: ["HN"]
    },
    "America/Thule": {
        u: -240,
        d: -180,
        c: ["GL"]
    },
    "America/Thunder_Bay": {
        u: -300,
        d: -240,
        c: ["CA"]
    },
    "America/Tijuana": {
        u: -480,
        d: -420,
        c: ["MX"]
    },
    "America/Toronto": {
        u: -300,
        d: -240,
        c: ["CA", "BS"]
    },
    "America/Tortola": {
        a: "America/Puerto_Rico",
        c: ["VG"],
        r: 1
    },
    "America/Vancouver": {
        u: -480,
        d: -420,
        c: ["CA"]
    },
    "America/Virgin": {
        a: "America/Puerto_Rico",
        c: ["VI"],
        r: 1
    },
    "America/Whitehorse": {
        u: -420,
        c: ["CA"]
    },
    "America/Winnipeg": {
        u: -360,
        d: -300,
        c: ["CA"]
    },
    "America/Yakutat": {
        u: -540,
        d: -480,
        c: ["US"]
    },
    "America/Yellowknife": {
        u: -420,
        d: -360,
        c: ["CA"]
    },
    "Antarctica/Casey": {
        u: 660,
        c: ["AQ"]
    },
    "Antarctica/Davis": {
        u: 420,
        c: ["AQ"]
    },
    "Antarctica/DumontDUrville": {
        a: "Pacific/Port_Moresby",
        c: ["AQ"],
        r: 1
    },
    "Antarctica/Macquarie": {
        u: 600,
        d: 660,
        c: ["AU"]
    },
    "Antarctica/Mawson": {
        u: 300,
        c: ["AQ"]
    },
    "Antarctica/McMurdo": {
        a: "Pacific/Auckland",
        c: ["AQ"],
        r: 1
    },
    "Antarctica/Palmer": {
        u: -180,
        c: ["AQ"]
    },
    "Antarctica/Rothera": {
        u: -180,
        c: ["AQ"]
    },
    "Antarctica/South_Pole": {
        a: "Pacific/Auckland",
        c: ["AQ"],
        r: 1
    },
    "Antarctica/Syowa": {
        a: "Asia/Riyadh",
        c: ["AQ"],
        r: 1
    },
    "Antarctica/Troll": {
        u: 0,
        d: 120,
        c: ["AQ"]
    },
    "Antarctica/Vostok": {
        u: 360,
        c: ["AQ"]
    },
    "Arctic/Longyearbyen": {
        a: "Europe/Oslo",
        c: ["SJ"],
        r: 1
    },
    "Asia/Aden": {
        a: "Asia/Riyadh",
        c: ["YE"],
        r: 1
    },
    "Asia/Almaty": {
        u: 360,
        c: ["KZ"]
    },
    "Asia/Amman": {
        u: 120,
        d: 180,
        c: ["JO"]
    },
    "Asia/Anadyr": {
        u: 720,
        c: ["RU"]
    },
    "Asia/Aqtau": {
        u: 300,
        c: ["KZ"]
    },
    "Asia/Aqtobe": {
        u: 300,
        c: ["KZ"]
    },
    "Asia/Ashgabat": {
        u: 300,
        c: ["TM"]
    },
    "Asia/Ashkhabad": {
        a: "Asia/Ashgabat",
        r: 1
    },
    "Asia/Atyrau": {
        u: 300,
        c: ["KZ"]
    },
    "Asia/Baghdad": {
        u: 180,
        c: ["IQ"]
    },
    "Asia/Bahrain": {
        a: "Asia/Qatar",
        c: ["BH"],
        r: 1
    },
    "Asia/Baku": {
        u: 240,
        c: ["AZ"]
    },
    "Asia/Bangkok": {
        u: 420,
        c: ["TH", "KH", "LA", "VN"]
    },
    "Asia/Barnaul": {
        u: 420,
        c: ["RU"]
    },
    "Asia/Beirut": {
        u: 120,
        d: 180,
        c: ["LB"]
    },
    "Asia/Bishkek": {
        u: 360,
        c: ["KG"]
    },
    "Asia/Brunei": {
        u: 480,
        c: ["BN"]
    },
    "Asia/Calcutta": {
        a: "Asia/Kolkata",
        r: 1
    },
    "Asia/Chita": {
        u: 540,
        c: ["RU"]
    },
    "Asia/Choibalsan": {
        u: 480,
        c: ["MN"]
    },
    "Asia/Chongqing": {
        a: "Asia/Shanghai",
        r: 1
    },
    "Asia/Chungking": {
        a: "Asia/Shanghai",
        r: 1
    },
    "Asia/Colombo": {
        u: 330,
        c: ["LK"]
    },
    "Asia/Dacca": {
        a: "Asia/Dhaka",
        r: 1
    },
    "Asia/Damascus": {
        u: 120,
        d: 180,
        c: ["SY"]
    },
    "Asia/Dhaka": {
        u: 360,
        c: ["BD"]
    },
    "Asia/Dili": {
        u: 540,
        c: ["TL"]
    },
    "Asia/Dubai": {
        u: 240,
        c: ["AE", "OM"]
    },
    "Asia/Dushanbe": {
        u: 300,
        c: ["TJ"]
    },
    "Asia/Famagusta": {
        u: 120,
        d: 180,
        c: ["CY"]
    },
    "Asia/Gaza": {
        u: 120,
        d: 180,
        c: ["PS"]
    },
    "Asia/Harbin": {
        a: "Asia/Shanghai",
        r: 1
    },
    "Asia/Hebron": {
        u: 120,
        d: 180,
        c: ["PS"]
    },
    "Asia/Ho_Chi_Minh": {
        u: 420,
        c: ["VN"]
    },
    "Asia/Hong_Kong": {
        u: 480,
        c: ["HK"]
    },
    "Asia/Hovd": {
        u: 420,
        c: ["MN"]
    },
    "Asia/Irkutsk": {
        u: 480,
        c: ["RU"]
    },
    "Asia/Istanbul": {
        a: "Europe/Istanbul",
        r: 1
    },
    "Asia/Jakarta": {
        u: 420,
        c: ["ID"]
    },
    "Asia/Jayapura": {
        u: 540,
        c: ["ID"]
    },
    "Asia/Jerusalem": {
        u: 120,
        d: 180,
        c: ["IL"]
    },
    "Asia/Kabul": {
        u: 270,
        c: ["AF"]
    },
    "Asia/Kamchatka": {
        u: 720,
        c: ["RU"]
    },
    "Asia/Karachi": {
        u: 300,
        c: ["PK"]
    },
    "Asia/Kashgar": {
        a: "Asia/Urumqi",
        r: 1
    },
    "Asia/Kathmandu": {
        u: 345,
        c: ["NP"]
    },
    "Asia/Katmandu": {
        a: "Asia/Kathmandu",
        r: 1
    },
    "Asia/Khandyga": {
        u: 540,
        c: ["RU"]
    },
    "Asia/Kolkata": {
        u: 330,
        c: ["IN"]
    },
    "Asia/Krasnoyarsk": {
        u: 420,
        c: ["RU"]
    },
    "Asia/Kuala_Lumpur": {
        u: 480,
        c: ["MY"]
    },
    "Asia/Kuching": {
        u: 480,
        c: ["MY"]
    },
    "Asia/Kuwait": {
        a: "Asia/Riyadh",
        c: ["KW"],
        r: 1
    },
    "Asia/Macao": {
        a: "Asia/Macau",
        r: 1
    },
    "Asia/Macau": {
        u: 480,
        c: ["MO"]
    },
    "Asia/Magadan": {
        u: 660,
        c: ["RU"]
    },
    "Asia/Makassar": {
        u: 480,
        c: ["ID"]
    },
    "Asia/Manila": {
        u: 480,
        c: ["PH"]
    },
    "Asia/Muscat": {
        a: "Asia/Dubai",
        c: ["OM"],
        r: 1
    },
    "Asia/Nicosia": {
        u: 120,
        d: 180,
        c: ["CY"]
    },
    "Asia/Novokuznetsk": {
        u: 420,
        c: ["RU"]
    },
    "Asia/Novosibirsk": {
        u: 420,
        c: ["RU"]
    },
    "Asia/Omsk": {
        u: 360,
        c: ["RU"]
    },
    "Asia/Oral": {
        u: 300,
        c: ["KZ"]
    },
    "Asia/Phnom_Penh": {
        a: "Asia/Bangkok",
        c: ["KH"],
        r: 1
    },
    "Asia/Pontianak": {
        u: 420,
        c: ["ID"]
    },
    "Asia/Pyongyang": {
        u: 540,
        c: ["KP"]
    },
    "Asia/Qatar": {
        u: 180,
        c: ["QA", "BH"]
    },
    "Asia/Qostanay": {
        u: 360,
        c: ["KZ"]
    },
    "Asia/Qyzylorda": {
        u: 300,
        c: ["KZ"]
    },
    "Asia/Rangoon": {
        a: "Asia/Yangon",
        r: 1
    },
    "Asia/Riyadh": {
        u: 180,
        c: ["SA", "AQ", "KW", "YE"]
    },
    "Asia/Saigon": {
        a: "Asia/Ho_Chi_Minh",
        r: 1
    },
    "Asia/Sakhalin": {
        u: 660,
        c: ["RU"]
    },
    "Asia/Samarkand": {
        u: 300,
        c: ["UZ"]
    },
    "Asia/Seoul": {
        u: 540,
        c: ["KR"]
    },
    "Asia/Shanghai": {
        u: 480,
        c: ["CN"]
    },
    "Asia/Singapore": {
        u: 480,
        c: ["SG", "MY"]
    },
    "Asia/Srednekolymsk": {
        u: 660,
        c: ["RU"]
    },
    "Asia/Taipei": {
        u: 480,
        c: ["TW"]
    },
    "Asia/Tashkent": {
        u: 300,
        c: ["UZ"]
    },
    "Asia/Tbilisi": {
        u: 240,
        c: ["GE"]
    },
    "Asia/Tehran": {
        u: 210,
        d: 270,
        c: ["IR"]
    },
    "Asia/Tel_Aviv": {
        a: "Asia/Jerusalem",
        r: 1
    },
    "Asia/Thimbu": {
        a: "Asia/Thimphu",
        r: 1
    },
    "Asia/Thimphu": {
        u: 360,
        c: ["BT"]
    },
    "Asia/Tokyo": {
        u: 540,
        c: ["JP"]
    },
    "Asia/Tomsk": {
        u: 420,
        c: ["RU"]
    },
    "Asia/Ujung_Pandang": {
        a: "Asia/Makassar",
        r: 1
    },
    "Asia/Ulaanbaatar": {
        u: 480,
        c: ["MN"]
    },
    "Asia/Ulan_Bator": {
        a: "Asia/Ulaanbaatar",
        r: 1
    },
    "Asia/Urumqi": {
        u: 360,
        c: ["CN"]
    },
    "Asia/Ust-Nera": {
        u: 600,
        c: ["RU"]
    },
    "Asia/Vientiane": {
        a: "Asia/Bangkok",
        c: ["LA"],
        r: 1
    },
    "Asia/Vladivostok": {
        u: 600,
        c: ["RU"]
    },
    "Asia/Yakutsk": {
        u: 540,
        c: ["RU"]
    },
    "Asia/Yangon": {
        u: 390,
        c: ["MM"]
    },
    "Asia/Yekaterinburg": {
        u: 300,
        c: ["RU"]
    },
    "Asia/Yerevan": {
        u: 240,
        c: ["AM"]
    },
    "Atlantic/Azores": {
        u: -60,
        d: 0,
        c: ["PT"]
    },
    "Atlantic/Bermuda": {
        u: -240,
        d: -180,
        c: ["BM"]
    },
    "Atlantic/Canary": {
        u: 0,
        d: 60,
        c: ["ES"]
    },
    "Atlantic/Cape_Verde": {
        u: -60,
        c: ["CV"]
    },
    "Atlantic/Faeroe": {
        a: "Atlantic/Faroe",
        r: 1
    },
    "Atlantic/Faroe": {
        u: 0,
        d: 60,
        c: ["FO"]
    },
    "Atlantic/Jan_Mayen": {
        a: "Europe/Oslo",
        c: ["SJ"],
        r: 1
    },
    "Atlantic/Madeira": {
        u: 0,
        d: 60,
        c: ["PT"]
    },
    "Atlantic/Reykjavik": {
        u: 0,
        c: ["IS"]
    },
    "Atlantic/South_Georgia": {
        u: -120,
        c: ["GS"]
    },
    "Atlantic/St_Helena": {
        a: "Africa/Abidjan",
        c: ["SH"],
        r: 1
    },
    "Atlantic/Stanley": {
        u: -180,
        c: ["FK"]
    },
    "Australia/ACT": {
        a: "Australia/Sydney",
        r: 1
    },
    "Australia/Adelaide": {
        u: 570,
        d: 630,
        c: ["AU"]
    },
    "Australia/Brisbane": {
        u: 600,
        c: ["AU"]
    },
    "Australia/Broken_Hill": {
        u: 570,
        d: 630,
        c: ["AU"]
    },
    "Australia/Canberra": {
        a: "Australia/Sydney",
        r: 1
    },
    "Australia/Currie": {
        a: "Australia/Hobart",
        r: 1
    },
    "Australia/Darwin": {
        u: 570,
        c: ["AU"]
    },
    "Australia/Eucla": {
        u: 525,
        c: ["AU"]
    },
    "Australia/Hobart": {
        u: 600,
        d: 660,
        c: ["AU"]
    },
    "Australia/LHI": {
        a: "Australia/Lord_Howe",
        r: 1
    },
    "Australia/Lindeman": {
        u: 600,
        c: ["AU"]
    },
    "Australia/Lord_Howe": {
        u: 630,
        d: 660,
        c: ["AU"]
    },
    "Australia/Melbourne": {
        u: 600,
        d: 660,
        c: ["AU"]
    },
    "Australia/NSW": {
        a: "Australia/Sydney",
        r: 1
    },
    "Australia/North": {
        a: "Australia/Darwin",
        r: 1
    },
    "Australia/Perth": {
        u: 480,
        c: ["AU"]
    },
    "Australia/Queensland": {
        a: "Australia/Brisbane",
        r: 1
    },
    "Australia/South": {
        a: "Australia/Adelaide",
        r: 1
    },
    "Australia/Sydney": {
        u: 600,
        d: 660,
        c: ["AU"]
    },
    "Australia/Tasmania": {
        a: "Australia/Hobart",
        r: 1
    },
    "Australia/Victoria": {
        a: "Australia/Melbourne",
        r: 1
    },
    "Australia/West": {
        a: "Australia/Perth",
        r: 1
    },
    "Australia/Yancowinna": {
        a: "Australia/Broken_Hill",
        r: 1
    },
    "Brazil/Acre": {
        a: "America/Rio_Branco",
        r: 1
    },
    "Brazil/DeNoronha": {
        a: "America/Noronha",
        r: 1
    },
    "Brazil/East": {
        a: "America/Sao_Paulo",
        r: 1
    },
    "Brazil/West": {
        a: "America/Manaus",
        r: 1
    },
    CET: {
        u: 60,
        d: 120
    },
    CST6CDT: {
        u: -360,
        d: -300
    },
    "Canada/Atlantic": {
        a: "America/Halifax",
        r: 1
    },
    "Canada/Central": {
        a: "America/Winnipeg",
        r: 1
    },
    "Canada/Eastern": {
        a: "America/Toronto",
        c: ["CA"],
        r: 1
    },
    "Canada/Mountain": {
        a: "America/Edmonton",
        r: 1
    },
    "Canada/Newfoundland": {
        a: "America/St_Johns",
        r: 1
    },
    "Canada/Pacific": {
        a: "America/Vancouver",
        r: 1
    },
    "Canada/Saskatchewan": {
        a: "America/Regina",
        r: 1
    },
    "Canada/Yukon": {
        a: "America/Whitehorse",
        r: 1
    },
    "Chile/Continental": {
        a: "America/Santiago",
        r: 1
    },
    "Chile/EasterIsland": {
        a: "Pacific/Easter",
        r: 1
    },
    Cuba: {
        a: "America/Havana",
        r: 1
    },
    EET: {
        u: 120,
        d: 180
    },
    EST: {
        u: -300
    },
    EST5EDT: {
        u: -300,
        d: -240
    },
    Egypt: {
        a: "Africa/Cairo",
        r: 1
    },
    Eire: {
        a: "Europe/Dublin",
        r: 1
    },
    "Etc/GMT": {
        u: 0
    },
    "Etc/GMT+0": {
        a: "Etc/GMT",
        r: 1
    },
    "Etc/GMT+1": {
        u: -60
    },
    "Etc/GMT+10": {
        u: -600
    },
    "Etc/GMT+11": {
        u: -660
    },
    "Etc/GMT+12": {
        u: -720
    },
    "Etc/GMT+2": {
        u: -120
    },
    "Etc/GMT+3": {
        u: -180
    },
    "Etc/GMT+4": {
        u: -240
    },
    "Etc/GMT+5": {
        u: -300
    },
    "Etc/GMT+6": {
        u: -360
    },
    "Etc/GMT+7": {
        u: -420
    },
    "Etc/GMT+8": {
        u: -480
    },
    "Etc/GMT+9": {
        u: -540
    },
    "Etc/GMT-0": {
        a: "Etc/GMT",
        r: 1
    },
    "Etc/GMT-1": {
        u: 60
    },
    "Etc/GMT-10": {
        u: 600
    },
    "Etc/GMT-11": {
        u: 660
    },
    "Etc/GMT-12": {
        u: 720
    },
    "Etc/GMT-13": {
        u: 780
    },
    "Etc/GMT-14": {
        u: 840
    },
    "Etc/GMT-2": {
        u: 120
    },
    "Etc/GMT-3": {
        u: 180
    },
    "Etc/GMT-4": {
        u: 240
    },
    "Etc/GMT-5": {
        u: 300
    },
    "Etc/GMT-6": {
        u: 360
    },
    "Etc/GMT-7": {
        u: 420
    },
    "Etc/GMT-8": {
        u: 480
    },
    "Etc/GMT-9": {
        u: 540
    },
    "Etc/GMT0": {
        a: "Etc/GMT",
        r: 1
    },
    "Etc/Greenwich": {
        a: "Etc/GMT",
        r: 1
    },
    "Etc/UCT": {
        a: "Etc/UTC",
        r: 1
    },
    "Etc/UTC": {
        u: 0
    },
    "Etc/Universal": {
        a: "Etc/UTC",
        r: 1
    },
    "Etc/Zulu": {
        a: "Etc/UTC",
        r: 1
    },
    "Europe/Amsterdam": {
        u: 60,
        d: 120,
        c: ["NL"]
    },
    "Europe/Andorra": {
        u: 60,
        d: 120,
        c: ["AD"]
    },
    "Europe/Astrakhan": {
        u: 240,
        c: ["RU"]
    },
    "Europe/Athens": {
        u: 120,
        d: 180,
        c: ["GR"]
    },
    "Europe/Belfast": {
        a: "Europe/London",
        c: ["GB"],
        r: 1
    },
    "Europe/Belgrade": {
        u: 60,
        d: 120,
        c: ["RS", "BA", "HR", "ME", "MK", "SI"]
    },
    "Europe/Berlin": {
        u: 60,
        d: 120,
        c: ["DE"]
    },
    "Europe/Bratislava": {
        a: "Europe/Prague",
        c: ["SK"],
        r: 1
    },
    "Europe/Brussels": {
        u: 60,
        d: 120,
        c: ["BE"]
    },
    "Europe/Bucharest": {
        u: 120,
        d: 180,
        c: ["RO"]
    },
    "Europe/Budapest": {
        u: 60,
        d: 120,
        c: ["HU"]
    },
    "Europe/Busingen": {
        a: "Europe/Zurich",
        c: ["DE"],
        r: 1
    },
    "Europe/Chisinau": {
        u: 120,
        d: 180,
        c: ["MD"]
    },
    "Europe/Copenhagen": {
        u: 60,
        d: 120,
        c: ["DK"]
    },
    "Europe/Dublin": {
        u: 60,
        d: 0,
        c: ["IE"]
    },
    "Europe/Gibraltar": {
        u: 60,
        d: 120,
        c: ["GI"]
    },
    "Europe/Guernsey": {
        a: "Europe/London",
        c: ["GG"],
        r: 1
    },
    "Europe/Helsinki": {
        u: 120,
        d: 180,
        c: ["FI", "AX"]
    },
    "Europe/Isle_of_Man": {
        a: "Europe/London",
        c: ["IM"],
        r: 1
    },
    "Europe/Istanbul": {
        u: 180,
        c: ["TR"]
    },
    "Europe/Jersey": {
        a: "Europe/London",
        c: ["JE"],
        r: 1
    },
    "Europe/Kaliningrad": {
        u: 120,
        c: ["RU"]
    },
    "Europe/Kiev": {
        u: 120,
        d: 180,
        c: ["UA"]
    },
    "Europe/Kirov": {
        u: 180,
        c: ["RU"]
    },
    "Europe/Lisbon": {
        u: 0,
        d: 60,
        c: ["PT"]
    },
    "Europe/Ljubljana": {
        a: "Europe/Belgrade",
        c: ["SI"],
        r: 1
    },
    "Europe/London": {
        u: 0,
        d: 60,
        c: ["GB", "GG", "IM", "JE"]
    },
    "Europe/Luxembourg": {
        u: 60,
        d: 120,
        c: ["LU"]
    },
    "Europe/Madrid": {
        u: 60,
        d: 120,
        c: ["ES"]
    },
    "Europe/Malta": {
        u: 60,
        d: 120,
        c: ["MT"]
    },
    "Europe/Mariehamn": {
        a: "Europe/Helsinki",
        c: ["AX"],
        r: 1
    },
    "Europe/Minsk": {
        u: 180,
        c: ["BY"]
    },
    "Europe/Monaco": {
        u: 60,
        d: 120,
        c: ["MC"]
    },
    "Europe/Moscow": {
        u: 180,
        c: ["RU"]
    },
    "Europe/Nicosia": {
        a: "Asia/Nicosia",
        r: 1
    },
    "Europe/Oslo": {
        u: 60,
        d: 120,
        c: ["NO", "SJ", "BV"]
    },
    "Europe/Paris": {
        u: 60,
        d: 120,
        c: ["FR"]
    },
    "Europe/Podgorica": {
        a: "Europe/Belgrade",
        c: ["ME"],
        r: 1
    },
    "Europe/Prague": {
        u: 60,
        d: 120,
        c: ["CZ", "SK"]
    },
    "Europe/Riga": {
        u: 120,
        d: 180,
        c: ["LV"]
    },
    "Europe/Rome": {
        u: 60,
        d: 120,
        c: ["IT", "SM", "VA"]
    },
    "Europe/Samara": {
        u: 240,
        c: ["RU"]
    },
    "Europe/San_Marino": {
        a: "Europe/Rome",
        c: ["SM"],
        r: 1
    },
    "Europe/Sarajevo": {
        a: "Europe/Belgrade",
        c: ["BA"],
        r: 1
    },
    "Europe/Saratov": {
        u: 240,
        c: ["RU"]
    },
    "Europe/Simferopol": {
        u: 180,
        c: ["RU", "UA"]
    },
    "Europe/Skopje": {
        a: "Europe/Belgrade",
        c: ["MK"],
        r: 1
    },
    "Europe/Sofia": {
        u: 120,
        d: 180,
        c: ["BG"]
    },
    "Europe/Stockholm": {
        u: 60,
        d: 120,
        c: ["SE"]
    },
    "Europe/Tallinn": {
        u: 120,
        d: 180,
        c: ["EE"]
    },
    "Europe/Tirane": {
        u: 60,
        d: 120,
        c: ["AL"]
    },
    "Europe/Tiraspol": {
        a: "Europe/Chisinau",
        r: 1
    },
    "Europe/Ulyanovsk": {
        u: 240,
        c: ["RU"]
    },
    "Europe/Uzhgorod": {
        u: 120,
        d: 180,
        c: ["UA"]
    },
    "Europe/Vaduz": {
        a: "Europe/Zurich",
        c: ["LI"],
        r: 1
    },
    "Europe/Vatican": {
        a: "Europe/Rome",
        c: ["VA"],
        r: 1
    },
    "Europe/Vienna": {
        u: 60,
        d: 120,
        c: ["AT"]
    },
    "Europe/Vilnius": {
        u: 120,
        d: 180,
        c: ["LT"]
    },
    "Europe/Volgograd": {
        u: 180,
        c: ["RU"]
    },
    "Europe/Warsaw": {
        u: 60,
        d: 120,
        c: ["PL"]
    },
    "Europe/Zagreb": {
        a: "Europe/Belgrade",
        c: ["HR"],
        r: 1
    },
    "Europe/Zaporozhye": {
        u: 120,
        d: 180,
        c: ["UA"]
    },
    "Europe/Zurich": {
        u: 60,
        d: 120,
        c: ["CH", "DE", "LI"]
    },
    Factory: {
        u: 0
    },
    GB: {
        a: "Europe/London",
        c: ["GB"],
        r: 1
    },
    "GB-Eire": {
        a: "Europe/London",
        c: ["GB"],
        r: 1
    },
    GMT: {
        a: "Etc/GMT",
        r: 1
    },
    "GMT+0": {
        a: "Etc/GMT",
        r: 1
    },
    "GMT-0": {
        a: "Etc/GMT",
        r: 1
    },
    GMT0: {
        a: "Etc/GMT",
        r: 1
    },
    Greenwich: {
        a: "Etc/GMT",
        r: 1
    },
    HST: {
        u: -600
    },
    Hongkong: {
        a: "Asia/Hong_Kong",
        r: 1
    },
    Iceland: {
        a: "Atlantic/Reykjavik",
        r: 1
    },
    "Indian/Antananarivo": {
        a: "Africa/Nairobi",
        c: ["MG"],
        r: 1
    },
    "Indian/Chagos": {
        u: 360,
        c: ["IO"]
    },
    "Indian/Christmas": {
        u: 420,
        c: ["CX"]
    },
    "Indian/Cocos": {
        u: 390,
        c: ["CC"]
    },
    "Indian/Comoro": {
        a: "Africa/Nairobi",
        c: ["KM"],
        r: 1
    },
    "Indian/Kerguelen": {
        u: 300,
        c: ["TF", "HM"]
    },
    "Indian/Mahe": {
        u: 240,
        c: ["SC"]
    },
    "Indian/Maldives": {
        u: 300,
        c: ["MV"]
    },
    "Indian/Mauritius": {
        u: 240,
        c: ["MU"]
    },
    "Indian/Mayotte": {
        a: "Africa/Nairobi",
        c: ["YT"],
        r: 1
    },
    "Indian/Reunion": {
        u: 240,
        c: ["RE", "TF"]
    },
    Iran: {
        a: "Asia/Tehran",
        r: 1
    },
    Israel: {
        a: "Asia/Jerusalem",
        r: 1
    },
    Jamaica: {
        a: "America/Jamaica",
        r: 1
    },
    Japan: {
        a: "Asia/Tokyo",
        r: 1
    },
    Kwajalein: {
        a: "Pacific/Kwajalein",
        r: 1
    },
    Libya: {
        a: "Africa/Tripoli",
        r: 1
    },
    MET: {
        u: 60,
        d: 120
    },
    MST: {
        u: -420
    },
    MST7MDT: {
        u: -420,
        d: -360
    },
    "Mexico/BajaNorte": {
        a: "America/Tijuana",
        r: 1
    },
    "Mexico/BajaSur": {
        a: "America/Mazatlan",
        r: 1
    },
    "Mexico/General": {
        a: "America/Mexico_City",
        r: 1
    },
    NZ: {
        a: "Pacific/Auckland",
        c: ["NZ"],
        r: 1
    },
    "NZ-CHAT": {
        a: "Pacific/Chatham",
        r: 1
    },
    Navajo: {
        a: "America/Denver",
        r: 1
    },
    PRC: {
        a: "Asia/Shanghai",
        r: 1
    },
    PST8PDT: {
        u: -480,
        d: -420
    },
    "Pacific/Apia": {
        u: 780,
        c: ["WS"]
    },
    "Pacific/Auckland": {
        u: 720,
        d: 780,
        c: ["NZ", "AQ"]
    },
    "Pacific/Bougainville": {
        u: 660,
        c: ["PG"]
    },
    "Pacific/Chatham": {
        u: 765,
        d: 825,
        c: ["NZ"]
    },
    "Pacific/Chuuk": {
        u: 600,
        c: ["FM"]
    },
    "Pacific/Easter": {
        u: -360,
        d: -300,
        c: ["CL"]
    },
    "Pacific/Efate": {
        u: 660,
        c: ["VU"]
    },
    "Pacific/Enderbury": {
        a: "Pacific/Kanton",
        r: 1
    },
    "Pacific/Fakaofo": {
        u: 780,
        c: ["TK"]
    },
    "Pacific/Fiji": {
        u: 720,
        d: 780,
        c: ["FJ"]
    },
    "Pacific/Funafuti": {
        u: 720,
        c: ["TV"]
    },
    "Pacific/Galapagos": {
        u: -360,
        c: ["EC"]
    },
    "Pacific/Gambier": {
        u: -540,
        c: ["PF"]
    },
    "Pacific/Guadalcanal": {
        u: 660,
        c: ["SB"]
    },
    "Pacific/Guam": {
        u: 600,
        c: ["GU", "MP"]
    },
    "Pacific/Honolulu": {
        u: -600,
        c: ["US", "UM"]
    },
    "Pacific/Johnston": {
        a: "Pacific/Honolulu",
        c: ["UM"],
        r: 1
    },
    "Pacific/Kanton": {
        u: 780,
        c: ["KI"]
    },
    "Pacific/Kiritimati": {
        u: 840,
        c: ["KI"]
    },
    "Pacific/Kosrae": {
        u: 660,
        c: ["FM"]
    },
    "Pacific/Kwajalein": {
        u: 720,
        c: ["MH"]
    },
    "Pacific/Majuro": {
        u: 720,
        c: ["MH"]
    },
    "Pacific/Marquesas": {
        u: -510,
        c: ["PF"]
    },
    "Pacific/Midway": {
        a: "Pacific/Pago_Pago",
        c: ["UM"],
        r: 1
    },
    "Pacific/Nauru": {
        u: 720,
        c: ["NR"]
    },
    "Pacific/Niue": {
        u: -660,
        c: ["NU"]
    },
    "Pacific/Norfolk": {
        u: 660,
        d: 720,
        c: ["NF"]
    },
    "Pacific/Noumea": {
        u: 660,
        c: ["NC"]
    },
    "Pacific/Pago_Pago": {
        u: -660,
        c: ["AS", "UM"]
    },
    "Pacific/Palau": {
        u: 540,
        c: ["PW"]
    },
    "Pacific/Pitcairn": {
        u: -480,
        c: ["PN"]
    },
    "Pacific/Pohnpei": {
        u: 660,
        c: ["FM"]
    },
    "Pacific/Ponape": {
        a: "Pacific/Pohnpei",
        r: 1
    },
    "Pacific/Port_Moresby": {
        u: 600,
        c: ["PG", "AQ"]
    },
    "Pacific/Rarotonga": {
        u: -600,
        c: ["CK"]
    },
    "Pacific/Saipan": {
        a: "Pacific/Guam",
        c: ["MP"],
        r: 1
    },
    "Pacific/Samoa": {
        a: "Pacific/Pago_Pago",
        c: ["WS"],
        r: 1
    },
    "Pacific/Tahiti": {
        u: -600,
        c: ["PF"]
    },
    "Pacific/Tarawa": {
        u: 720,
        c: ["KI"]
    },
    "Pacific/Tongatapu": {
        u: 780,
        c: ["TO"]
    },
    "Pacific/Truk": {
        a: "Pacific/Chuuk",
        r: 1
    },
    "Pacific/Wake": {
        u: 720,
        c: ["UM"]
    },
    "Pacific/Wallis": {
        u: 720,
        c: ["WF"]
    },
    "Pacific/Yap": {
        a: "Pacific/Chuuk",
        r: 1
    },
    "Poland": {
        a: "Europe/Warsaw",
        r: 1
    },
    "Portugal": {
        a: "Europe/Lisbon",
        r: 1
    },
    "ROC": {
        a: "Asia/Taipei",
        r: 1
    },
    'ROK': {
        a: "Asia/Seoul",
        r: 1
    },
    'Singapore': {
        a: "Asia/Singapore",
        c: ["SG"],
        r: 1
    },
    'Turkey': {
        a: "Europe/Istanbul",
        r: 1
    },
    'UCT': {
        a: "Etc/UTC",
        r: 1
    },
    "US/Alaska": {
        a: "America/Anchorage",
        r: 1
    },
    "US/Aleutian": {
        a: "America/Adak",
        r: 1
    },
    "US/Arizona": {
        a: "America/Phoenix",
        c: ["US"],
        r: 1
    },
    "US/Central": {
        a: "America/Chicago",
        r: 1
    },
    "US/East-Indiana": {
        a: "America/Indiana/Indianapolis",
        r: 1
    },
    "US/Eastern": {
        a: "America/New_York",
        r: 1
    },
    "US/Hawaii": {
        a: "Pacific/Honolulu",
        c: ["US"],
        r: 1
    },
    "US/Indiana-Starke": {
        a: "America/Indiana/Knox",
        r: 1
    },
    "US/Michigan": {
        a: "America/Detroit",
        r: 1
    },
    "US/Mountain": {
        a: "America/Denver",
        r: 1
    },
    "US/Pacific": {
        a: "America/Los_Angeles",
        r: 1
    },
    "US/Samoa": {
        a: "Pacific/Pago_Pago",
        c: ["WS"],
        r: 1
    },
    'UTC': {
        a: "Etc/UTC",
        r: 1
    },
    'Universal': {
        a: "Etc/UTC",
        r: 1
    },
    "W-SU": {
        a: "Europe/Moscow",
        r: 1
    },
    'WET': {
        u: 0,
        d: 60
    },
    'Zulu': {
        a: "Etc/UTC",
        r: 1
    }
};
const getCountry = (timezone) => {
    if (timezone === "" || !timezone)
        return null;
    const country = exports.timezones[timezone].c[0];
    return country;
};
exports.getCountry = getCountry;


/***/ }),

/***/ "./libs/utils/src/lib/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.urlize = exports.underscorize = exports.timezones = exports.shouldDisplay = exports.ordinalize = exports.getCountry = exports.getCookie = exports.dateToVerbose = exports.dateToSimple = exports.arrayToObject = exports.countries = exports.capitalize = exports.camelize = void 0;
const utility_1 = __webpack_require__("./libs/utils/src/lib/utility.js");
Object.defineProperty(exports, "camelize", ({ enumerable: true, get: function () { return utility_1.camelize; } }));
Object.defineProperty(exports, "capitalize", ({ enumerable: true, get: function () { return utility_1.capitalize; } }));
Object.defineProperty(exports, "arrayToObject", ({ enumerable: true, get: function () { return utility_1.arrayToObject; } }));
Object.defineProperty(exports, "dateToSimple", ({ enumerable: true, get: function () { return utility_1.dateToSimple; } }));
Object.defineProperty(exports, "dateToVerbose", ({ enumerable: true, get: function () { return utility_1.dateToVerbose; } }));
Object.defineProperty(exports, "getCookie", ({ enumerable: true, get: function () { return utility_1.getCookie; } }));
Object.defineProperty(exports, "ordinalize", ({ enumerable: true, get: function () { return utility_1.ordinalize; } }));
Object.defineProperty(exports, "shouldDisplay", ({ enumerable: true, get: function () { return utility_1.shouldDisplay; } }));
Object.defineProperty(exports, "underscorize", ({ enumerable: true, get: function () { return utility_1.underscorize; } }));
Object.defineProperty(exports, "urlize", ({ enumerable: true, get: function () { return utility_1.urlize; } }));
const country_1 = __webpack_require__("./libs/utils/src/lib/country.js");
Object.defineProperty(exports, "countries", ({ enumerable: true, get: function () { return country_1.countries; } }));
Object.defineProperty(exports, "timezones", ({ enumerable: true, get: function () { return country_1.timezones; } }));
Object.defineProperty(exports, "getCountry", ({ enumerable: true, get: function () { return country_1.getCountry; } }));


/***/ }),

/***/ "./libs/utils/src/lib/utility.js":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.underscorize = exports.urlize = exports.shouldDisplay = exports.ordinalize = exports.dateToVerbose = exports.dateToSimple = exports.arrayToObject = exports.getCookie = exports.capitalize = exports.camelize = void 0;
//CAMELIZE
const camelize = (str) => str.replace(/['"]/g, '').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0)
        return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
});
exports.camelize = camelize;
//CAPITALIZE
const capitalize = (str = '', eachWord = false) => {
    if (!str)
        return;
    if (eachWord) {
        const splt = str.split(' ').map((s) => (0, exports.capitalize)(s));
        return splt.join(' ');
    }
    else {
        const charZero = str.charAt(0) || '';
        return charZero.toUpperCase() + str.slice(1);
    }
};
exports.capitalize = capitalize;
//GET COOKIE
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return parts.pop().split(';').shift();
};
exports.getCookie = getCookie;
//ARRAY TO OBJECT
const arrayToObject = (arr = []) => {
    const obj = {};
    arr.forEach((e) => (obj[e] ? obj[e]++ : (obj[e] = 1)));
    return obj;
};
exports.arrayToObject = arrayToObject;
//DATE TO SIMPLE
const dateToSimple = (date) => {
    if (!date)
        return '';
    const year = typeof date === 'string' ? date.slice(2, 4) : date.getFullYear().slice(2, 4);
    const month = typeof date === 'string' ? parseInt(date.slice(5, 7), 10) : date.getMonth() + 1;
    const day = typeof date === 'string' ? parseInt(date.slice(8, 10), 10) : date.getDate();
    const simple = `${month}/${day}/${year}`;
    return simple;
};
exports.dateToSimple = dateToSimple;
//DATE TO VERBOSE
const dateToVerbose = (date, long = true, ordinal = true, includeYear = true) => {
    if (!date)
        return '';
    const year = typeof date === 'string' ? date.slice(0, 4) : date.getFullYear();
    const longMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const shortMonths = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    const month = typeof date === 'string' ? parseInt(date.slice(5, 7), 10) - 1 : date.getMonth();
    const monthStr = long ? longMonths[month] : shortMonths[month];
    const day = typeof date === 'string' ? parseInt(date.slice(8, 10), 10) : date.getDate();
    const dayStr = ordinal ? (0, exports.ordinalize)(day) : day;
    const verbose = includeYear ? `${monthStr} ${dayStr}, ${year}` : `${monthStr} ${dayStr}`;
    return verbose;
};
exports.dateToVerbose = dateToVerbose;
// ORDINALIZE
const ordinalize = (int) => {
    const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    switch (int % 100) {
        case 11:
        case 12:
        case 13:
            return int + 'th';
        default:
            return int + suffixes[int % 10];
    }
};
exports.ordinalize = ordinalize;
// SHOULD DISPLAY
const shouldDisplay = (placement = 1, size = 0) => {
    const display = (size <= 8 && placement === 1) ||
        (size > 8 && size <= 16 && placement <= 2) ||
        (size > 16 && size <= 24 && placement <= 3) ||
        (size > 24 && size <= 32 && placement <= 4) ||
        (size > 32 && size <= 48 && placement <= 6) ||
        (size > 48 && size <= 64 && placement <= 8) ||
        (size > 64 && size <= 96 && placement <= 12) ||
        (size > 96 && size <= 128 && placement <= 16) ||
        (size > 128 && size <= 224 && placement <= 24) ||
        (size > 224 && placement <= 32) ||
        false;
    return display;
};
exports.shouldDisplay = shouldDisplay;
//URLIZE
const urlize = (str) => str.replace(/[\s]/g, '-').toLowerCase();
exports.urlize = urlize;
//UNDERSCORIZE
const underscorize = (str) => str.replace(/[\s]/g, '_').toLowerCase();
exports.underscorize = underscorize;


/***/ }),

/***/ "./services/auth/src/app/config/index.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config = {
    siteUrl: process.env.SITE_URL,
    siteProxy: process.env.SITE_PROXY,
    siteJWKS: JSON.parse(process.env.SITE_JWKS),
    siteIKS: JSON.parse(process.env.SITE_IKS),
    sessionSecret: process.env.SESSION_SECRET,
    server: {
        https: process.env.SERVER_HTTPS,
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT
    },
    service: {
        port: process.env.AUTH_PORT || 4339
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

/***/ "./services/auth/src/app/main.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express = __webpack_require__("express");
const expressLayouts = __webpack_require__("express-ejs-layouts");
const compression = __webpack_require__("compression");
const session = __webpack_require__("cookie-session");
const morgan = __webpack_require__("morgan");
const chalk = __webpack_require__("chalk");
const path_1 = __webpack_require__("path");
const routes_1 = __webpack_require__("./services/auth/src/app/routes/index.ts");
const middleware_1 = __webpack_require__("./libs/middleware/src/index.ts");
const config_1 = __webpack_require__("./services/auth/src/app/config/index.ts");
const app = express();
// if (config.siteProxy === 'true') {
app.use('/auth', (req, _res, next) => {
    const from = req.url;
    const to = from.replace('/auth/', '/');
    req.url = to;
    next();
});
// console.log(chalk.cyan(`Rewrite /auth/.* to /`))
// }
// body parsing
app.use(express.urlencoded());
// app.use(express.json())
// logging
app.use(morgan('dev'));
// compression
app.use(compression());
// session
const keys = config_1.default.siteIKS.map((key) => key.sig);
app.use(session({
    name: 'session',
    keys,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000
}));
// templates
app.set('view engine', 'ejs');
app.set('views', (0, path_1.resolve)(__dirname, './assets/views'));
app.set('layout', './layout.ejs');
app.use(expressLayouts);
// routes
const routes = { auth: routes_1.auth };
Object.values(routes).forEach((route) => {
    route.stack.forEach((route) => {
        const path = route.route.path;
        const methods = Object.entries(route.route.methods).reduce((reduced, [key, value]) => {
            if (value) {
                reduced.push(key.toUpperCase());
            }
            return reduced;
        }, []);
        methods.forEach((method) => {
            console.log(`Route ${chalk.yellow(method)} ${chalk.green(path)}`);
        });
    });
    app.use(route);
});
// error
app.use(middleware_1.error);
const port = config_1.default.service.port;
const server = app.listen(port, () => {
    console.log(chalk.cyan(`Listening at http://localhost:${port}`));
});
server.on('error', console.error);


/***/ }),

/***/ "./services/auth/src/app/middleware/error.ts":
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

/***/ "./services/auth/src/app/middleware/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./services/auth/src/app/middleware/error.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./services/auth/src/app/middleware/login.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./services/auth/src/app/middleware/signup.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./services/auth/src/app/middleware/stub.ts"), exports);


/***/ }),

/***/ "./services/auth/src/app/middleware/login.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.login = void 0;
const tslib_1 = __webpack_require__("tslib");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const login = (options) => {
    const { app, providers } = options;
    const title = 'Login';
    return (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const method = req.method;
        if (method === 'GET') {
            res.render('auth/login', {
                app,
                title,
                providers,
                signup: false
            });
        }
        else if (method === 'POST') {
            const { name, id, discordId, discordPfp, googlePfp } = yield models_1.Player.verifyLogin({
                email: email,
                password: password
            });
            if (id) {
                res.cookie('playerId', id, {
                    maxAge: 24 * 60 * 60 * 1000
                }).cookie('discordId', discordId, {
                    maxAge: 24 * 60 * 60 * 1000
                }).cookie('discordPfp', discordPfp, {
                    maxAge: 24 * 60 * 60 * 1000
                }).cookie('playerName', name, {
                    maxAge: 24 * 60 * 60 * 1000
                }).cookie('googlePfp', googlePfp, {
                    maxAge: 24 * 60 * 60 * 1000
                }).redirect(`https://formatlibrary.com`);
            }
            else {
                res.status(404).send('Invalid username and/or password.');
            }
        }
        next();
    });
};
exports.login = login;


/***/ }),

/***/ "./services/auth/src/app/middleware/signup.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signup = void 0;
const tslib_1 = __webpack_require__("tslib");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const bcrypt = __webpack_require__("bcrypt");
const signup = (options) => {
    const { app, providers } = options;
    const title = 'Signup';
    return (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const method = req.method;
        const { firstName, lastName, email, newPassword, confirmPassword } = req.body;
        if (method === 'GET') {
            res.render('auth/signup', {
                app,
                title,
                providers,
                firstName: '',
                lastName: '',
                email: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
        else if (method === 'POST') {
            if (!firstName || !lastName || !email || !newPassword || !confirmPassword)
                return res.status(400);
            if (newPassword !== confirmPassword)
                return res.status(400).send('Passwords do not match.');
            const googleId = email.slice(-10).includes('@gmail.com') ? email.slice(0, -10) : null;
            const existing = yield models_1.Player.findByEmail(email);
            if (existing)
                return res.status(400).send('Email is already in use. Please log in.');
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(newPassword, salt);
            const id = yield models_1.Player.generateId();
            const player = yield models_1.Player.create({
                id: id,
                firstName: firstName,
                lastName: lastName,
                googleId: googleId,
                hash: hash,
                name: `${firstName} ${lastName}`,
                email: email
            });
            if (player && player.id) {
                res.cookie('playerId', player.id, {
                    maxAge: 24 * 60 * 60 * 1000
                }).clearCookie('discordId')
                    .clearCookie('discordPfp')
                    .cookie('playerName', player.name, {
                    maxAge: 24 * 60 * 60 * 1000
                }).clearCookie('googlePfp')
                    .redirect(`https://formatlibrary.com`);
            }
            else {
                res.status(404).send('Error creating account.');
            }
        }
        next();
    });
};
exports.signup = signup;


/***/ }),

/***/ "./services/auth/src/app/middleware/stub.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stub = void 0;
const tslib_1 = __webpack_require__("tslib");
const models_1 = __webpack_require__("./libs/models/src/index.ts");
const stub = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield models_1.Player.genid();
        res.json({ id });
    }
    catch (err) {
        next(err);
    }
});
exports.stub = stub;


/***/ }),

/***/ "./services/auth/src/app/routes/auth.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const express_1 = __webpack_require__("express");
const middleware_auth_1 = __webpack_require__("./libs/middleware-auth/src/index.ts");
const middleware_1 = __webpack_require__("./services/auth/src/app/middleware/index.ts");
const config_1 = __webpack_require__("./services/auth/src/app/config/index.ts");
const { siteUrl, google, discord } = config_1.default;
const router = (0, express_1.Router)();
const GOOGLE_SVG = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="c-third_party_auth__icon">
		< g >
		<path class="c-third_party_auth__icon__google--red" fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
		<path class="c-third_party_auth__icon__google--blue" fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
		<path class="c-third_party_auth__icon__google--yellow" fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
		<path class="c-third_party_auth__icon__google--green" fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
		<path fill="none" d="M0 0h48v48H0z"></path>
	</g>
</svg >`;
const DISCORD_SVG = `
<svg viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g clip-path="url(#clip0)">
		<path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#5865F2"/>
	</g>
</svg>`;
router.get('/auth/login', (0, middleware_1.login)({
    app: 'Format Library',
    providers: [
        {
            image: DISCORD_SVG,
            loginUrl: '/auth/discord/authorize',
            name: 'Discord'
        },
        {
            image: GOOGLE_SVG,
            loginUrl: '/auth/google/authorize',
            name: 'Google'
        }
    ]
}));
router.post('/auth/login', (0, middleware_1.login)({}));
router.get('/auth/signup', (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.render('auth/signup', {
        app: 'Format Library',
        title: 'Signup',
        providers: [],
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
}));
router.post('/auth/signup', (0, middleware_1.signup)({}));
router.get('/auth/discord/authorize/', (0, middleware_auth_1.oauth2Authorize)({
    clientId: discord.clientId,
    clientSecret: discord.clientSecret,
    redirectUrl: discord.redirectUrl,
    scope: discord.scope,
    authorizeUrl: discord.authorizeUrl,
    tokenUrl: discord.tokenUrl,
    returnTo: siteUrl
}));
router.get('/auth/discord/response', (0, middleware_auth_1.oauth2Response)({
    clientId: discord.clientId,
    clientSecret: discord.clientSecret,
    redirectUrl: discord.redirectUrl,
    scope: discord.scope,
    authorizeUrl: discord.authorizeUrl,
    tokenUrl: discord.tokenUrl,
    userinfoUrl: discord.userInfoUrl
}));
router.get('/auth/google/authorize', (0, middleware_auth_1.oidcAuthorize)({
    clientId: google.clientId,
    clientSecret: google.clientSecret,
    redirectUrl: google.redirectUrl,
    discoveryUrl: google.discoveryUrl,
    returnTo: siteUrl
}));
router.get('/auth/google/response', (0, middleware_auth_1.oidcResponse)({
    clientId: google.clientId,
    clientSecret: google.clientSecret,
    redirectUrl: google.redirectUrl,
    discoveryUrl: google.discoveryUrl
}));
exports["default"] = router;


/***/ }),

/***/ "./services/auth/src/app/routes/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stub = exports.auth = void 0;
const auth_1 = __webpack_require__("./services/auth/src/app/routes/auth.ts");
exports.auth = auth_1.default;
const stub_1 = __webpack_require__("./services/auth/src/app/routes/stub.ts");
exports.stub = stub_1.default;


/***/ }),

/***/ "./services/auth/src/app/routes/stub.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__("express");
const middleware_1 = __webpack_require__("./services/auth/src/app/middleware/index.ts");
const router = (0, express_1.Router)();
router.get('/api/stub/id', middleware_1.stub);
exports["default"] = router;


/***/ }),

/***/ "./services/auth/src/main.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./services/auth/src/app/main.ts"), exports);


/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "chalk":
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ "compression":
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cookie-session":
/***/ ((module) => {

module.exports = require("cookie-session");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-ejs-layouts":
/***/ ((module) => {

module.exports = require("express-ejs-layouts");

/***/ }),

/***/ "jose":
/***/ ((module) => {

module.exports = require("jose");

/***/ }),

/***/ "morgan":
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "nanoid":
/***/ ((module) => {

module.exports = require("nanoid");

/***/ }),

/***/ "openid-client":
/***/ ((module) => {

module.exports = require("openid-client");

/***/ }),

/***/ "sequelize":
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "simple-oauth2":
/***/ ((module) => {

module.exports = require("simple-oauth2");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./services/auth/src/main.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map