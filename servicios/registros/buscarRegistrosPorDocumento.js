const RegistrosModelo = require('./../../modelos/registros');

module.exports = (documentoId, skip, limit) => {

    return RegistrosModelo.find({ documento: documentoId })
        .sort({ fechaCreacion: -1 })
        .skip(skip)
        .limit(limit);

}