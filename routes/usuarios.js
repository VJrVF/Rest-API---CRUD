const { Router } = require('express');
const { getUsuario, putUsuario, postUsuario, deleteUsuario } = require('../controllers/usuarios');
const router = new Router()

router.get('/', getUsuario);

router.put('/:UsuarioID', putUsuario);

router.post('/', postUsuario);

router.delete('/', deleteUsuario);

module.exports = router;