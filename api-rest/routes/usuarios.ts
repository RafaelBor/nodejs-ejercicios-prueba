import {Router} from 'express'
import { check } from "express-validator";
import { createUsuario, login } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.post('/create',[
    check('nombre', 'el nombre es obligatorio').notEmpty().isString(),
    check('usuario', 'el usuario es obligatorio').notEmpty().isString(),
    check('contraseña', 'La contraseña es obligatoria').notEmpty().isString(),
    validarCampos
],  createUsuario)

router.post('/login', [
    check('usuario', 'el usuario es obligatorio').notEmpty().isString(),
    check('contraseña', 'La contraseña es obligatoria').notEmpty().isString(),
    validarCampos
],  login)


export default router;