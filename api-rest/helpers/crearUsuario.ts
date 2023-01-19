import { Usuario } from "../models/usuario";
import bcriptjs from 'bcryptjs'
import { UsuarioInterface } from "../interfaces/usuario.interface";

export const crearUsuario = async(data:any):Promise<UsuarioInterface> => {
        const {nombre, usuario, contraseña } = data;

        //Validar si ya existe el usuario
        const existeUsuario:UsuarioInterface | null = await Usuario.findOne({
            where: {
                usuario: usuario
            }
        });
        if(existeUsuario){
            throw new Error('El usuario ya existe.')
        };

        //Encryptar contraseña
        const salt = bcriptjs.genSaltSync();
        const encryptContraseña = bcriptjs.hashSync(contraseña, salt);

        //Guardar usuario
        const user = new Usuario();
        user.nombre = nombre;
        user.usuario = usuario;
        user.contraseña = encryptContraseña

        await user.save();

        const responseUser: UsuarioInterface = user;
        delete responseUser.contraseña;
        
        return responseUser;
}