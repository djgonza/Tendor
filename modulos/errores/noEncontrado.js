const logger = require('./../logger');

module.exports = (req, res) => {
    console.log(req.path, "err 404");
    logger(req.timeInicioPeticion, 404, req.method, req.path, "Recurso no encontrado");
    res.status(404).send({ msg: "Recurso no encontrado" })
}