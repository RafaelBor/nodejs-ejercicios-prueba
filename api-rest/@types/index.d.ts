import * as express from "express"
import { UsuarioInterface } from "../interfaces/usuario.interface"
declare global {
    namespace Express {
        interface Request {
            usuario : UsuarioInterface
        }
    }
}