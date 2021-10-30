const { Router } = require('express');
const { getUsuario, putUsuario, postUsuario, deleteUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator'); 

/* Middleware creado en el archivo validarError.js de la carpeta middleware-error
   para asi evitar escribir el mismo codigo en cada peticion http (get, put, post, delete)
*/
const validarCampos = require('../middlware-error/validarError');
const { emailExiste, existeUsuarioPorID } = require('../validatorsBD');


const router = new Router()

router.get('/', getUsuario);

router.post('/',
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña debe tener 6 letras como mínimo').isLength( { min: 6 }),
check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('correo', 'El correo no es valido').isEmail(),
check('correo').custom( emailExiste ), // Con Custom creo una validacion personalizada. La funcion "emailExiste", que hace la validacion, se creo en otro documento para ahorrar lineas de codigo, ya que se va a reutilizar en otras peticiones http
validarCampos,
postUsuario);

router.put('/:UsuarioID', 
    check('UsuarioID', 'El Id no es valido').isMongoId(),
    check('UsuarioID').custom( existeUsuarioPorID ),
    validarCampos,
    putUsuario);

router.delete('/:UsuarioID',
    check('UsuarioID', 'El Id no es valido').isMongoId(),
    check('UsuarioID').custom( existeUsuarioPorID ),
    validarCampos,
    deleteUsuario);

module.exports = router;