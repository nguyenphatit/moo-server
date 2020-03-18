const authService = require('../services/auth.service');

exports.login = (req, res, next) => {
    return authService.login(req, res, next);
}

exports.register = (req, res, next) => {
    return authService.register(req, res, next);
}

exports.authenticate = (req, res, next) => {
    return authService.authenticate(req, res, next);
}