let BaseController = function BaseController() { };

BaseController.prototype.home = function(req, res, next) {
    res.status(200).send({ message: 'respond with a resource' });
}

module.exports = BaseController.prototype;