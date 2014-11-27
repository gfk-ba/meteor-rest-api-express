var Super = RestApi;
var express = Npm.require('express');
var bodyParser = Npm.require('body-parser');

RestApi = function (settings, authenticationHandler, logger) {
    var parsers = [bodyParser.json()];
    var expressInstance = express();
    var expressRouter = express.Router();

    Super.call(this, settings, authenticationHandler, logger, expressInstance, expressRouter, parsers);
};

RestApi.prototype = Super.prototype;
