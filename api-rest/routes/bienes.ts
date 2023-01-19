import {Router} from 'express';
import { check } from "express-validator";
import { crearBienes, deleteBienById, getAllBienes, getBienById, getBienesByIds, registrarBienesByCsv, updateBien } from '../controllers/bienes';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/',[
    validarJWT,
], getAllBienes)

router.post('/', [
    validarJWT,
    check('articulo', 'el nombre del articulo es obligatorio').notEmpty().isString(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty().isString(),
    validarCampos
], crearBienes)

router.get('/:id',[
    validarJWT,
    check('id', 'el parametro tiene ser ser un UUID').notEmpty().isUUID('4'),
    validarCampos
], getBienById)

router.delete('/:id',[
    validarJWT,
    check('id', 'el parametro tiene ser ser un UUID').notEmpty().isUUID('4'),
    validarCampos
], deleteBienById)

router.patch('/:id',[
    validarJWT,
    check('id', 'el parametro tiene ser ser un UUID').notEmpty().isUUID('4'),
    validarCampos
], updateBien)

router.post('/getBienesByIds',[
    validarJWT,
    check('bienesIds', 'El array tiene que contener ids de los bienes').notEmpty().isArray(),
    validarCampos
], getBienesByIds)

router.post('/registrarBycsv',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').notEmpty().isString(),
    check('usuario', 'el usuario es obligatorio').notEmpty().isString(),
    check('contraseña', 'La contraseña es obligatoria').notEmpty().isString(),
    validarCampos
], registrarBienesByCsv)

export default router;