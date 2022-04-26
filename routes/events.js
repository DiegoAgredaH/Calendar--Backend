/*
Event routes
/api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')

const router = Router();
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas tienen que pasar por la validacion del JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear nuevos eventos
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

//Crear nuevos eventos
router.put('/:id', actualizarEvento);

//Crear nuevos eventos
router.delete('/:id', eliminarEvento);

module.exports = router;

