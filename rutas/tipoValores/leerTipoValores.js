const TipoValoresModelo = require('./../../modelos/tipoValores');

module.exports = (req, res) => {
    
    TipoValoresModelo.find()
    .then(tipoValores => {
        res.send(tipoValores);
    })
    .catch(error => {
        //Mejorar!!!!!!!!!!!!!
        if (error.status) {
            res.status(error.status);
            res.send(error.message);
            logger(req.timeInicioPeticion, res.status, req.method, req.path, error.message);
            return;
        }
        res.send({});
    });

}