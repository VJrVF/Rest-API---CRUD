

const getUsuario = (req, res) => {
    
    const { nombre = 'No name', apikey } = req.query;
    
    res.json( {
        valor : 'msg GET - controlador',
        nombre,
        apikey
    });
}

const putUsuario = (req, res) => {

    const UsuarioID = req.params.UsuarioID;
    res.json( {
        valor : 'msg PUT - controlador',
        id : UsuarioID
    });
}

const postUsuario = (req, res) => {

    const { nombre, id } = req.body;

    res.json( {
        valor : 'msg POST - controlador',
        nombre,
        id
    });
}

const deleteUsuario = (req, res) => {
    res.json( {
        valor : 'msg DELETE - controlador'
    });
}
module.exports = {
    getUsuario,
    putUsuario,
    postUsuario,
    deleteUsuario
}