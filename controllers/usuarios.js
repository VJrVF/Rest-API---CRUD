
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuario = async(req, res) => {

    const { limite=2, desde=4 } = req.query;
    const usuarios = await Usuario.find()  // Almacena en la variable "usuario" los documentos de la coleccion "Usuario"
         .skip(Number(desde)) // Selecciona desde que numero de usuario empieza a mostrar (el conteo empieza desde 0)
         .limit(Number(limite)); // Selecciona hasta que numero de usuario mostrar
    
    res.json( {
        usuarios
    });
}

const putUsuario = async(req, res) => {

    const { UsuarioID } = req.params;
    const { password, google, correo, ...resto} = req.body;

    // Validar en base de datos
    if ( password ) {
        // Encriptando la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findOneAndUpdate( UsuarioID, resto );

    res.json( {
        valor : 'msg PUT - controlador',
        usuario
    });
}

const postUsuario = async(req, res) => {
    
    /*const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors)
    }*/

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptando la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    await usuario.save();

    res.json( {
        usuario
    });
}

const deleteUsuario = async(req, res) => {

    const { UsuarioID } = req.params;
    const usuario  = await Usuario.findByIdAndDelete( UsuarioID )
    res.json( usuario );
}
module.exports = {
    getUsuario,
    putUsuario,
    postUsuario,
    deleteUsuario
}