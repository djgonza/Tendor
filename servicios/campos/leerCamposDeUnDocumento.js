const CamposModelo = require('./../../modelos/campos');

module.exports = (idDocumento) => {

    return CamposModelo.find({
            documento: idDocumento
        })
        .populate({
            path: 'tipoValor',
            select: 'nombre tipo',
            model: 'TipoValores'
        })

}