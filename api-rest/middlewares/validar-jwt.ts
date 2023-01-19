import {Request,  Response } from "express";
import jwt from 'jsonwebtoken'
import { Usuario } from "../models/usuario";


export const validarJWT = async(req: Request, res: Response, next:any) =>{
    const token = req.header('Authorization');

    if(!token)
    {
        return res.status(400).json({
            'msg':'No se envio el token'
        })
    }

    try {
        const claveJWT:any = process.env.SECRETORPRIVATEKEY;
        const {uid}:any = jwt.verify(token, claveJWT);
         const idUsuario = uid;

        const usuario = await Usuario.findOne({
            where: {
                id:idUsuario
            }
        })

        if(!usuario){
            return res.status(400).json({
                'msg':'El usuario no existe'
            })
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            'msg': "Token no valido"
        })
    }
}