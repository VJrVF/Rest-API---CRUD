const Usuario = require("./models/usuario")

const emailExiste = async(correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo }); // guarda en la variable "existeEmail" el primer documento que encuentre en la colecion "Usuario" que tenga la propiedad " correo : 'correo' "
    if ( existeEmail ) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioPorID = async( id ) => {

    // Verificar si existe un usuario con ese "id"
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El id ${id} no existe en la base de datos`) ;
    }
} 

module.exports = {
    emailExiste,
    existeUsuarioPorID
}