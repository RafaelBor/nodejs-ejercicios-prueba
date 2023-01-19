import { Response, Request } from "express";
import { Usuario } from "../models/usuario";
import { generarJWT } from "../helpers/generar-jwt";
import { crearUsuario } from "../helpers/crearUsuario";
import bcriptjs from 'bcryptjs';
import { UsuarioInterface } from "../interfaces/usuario.interface";

export const createUsuario = async(req: Request, res:Response) => {
    try {
        const user:UsuarioInterface = await crearUsuario(req.body);

        return res.status(200).json({
            "usuario":user
        })
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({'message': error.message})
        }
    }
}

export const login = async(req: Request, res:Response) => {
    const {usuario, contraseña} = req.body;

    try {
        //Validar si existe el usuario
        const user:UsuarioInterface | null = await Usuario.findOne({
            where: {usuario},
            select: {usuario:true, contraseña:true, id:true, nombre:true}
            
        })
        if(!user){
            throw new Error('El usuario no existe.')
        }

        if(user.contraseña){
            const validarContraseña:Boolean = bcriptjs.compareSync(contraseña, user.contraseña)

            if(!validarContraseña)
            {
                return res.status(400).json({
                    'msg':'La contraseña es incorrecta'
                }) 
            }
    
            const token = await generarJWT(user.id)

            return res.json({
                "token":token,
                "usuario":user
            })
        }
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({'message': error.message})
        }
    }
}
