import { BaseEntity } from "typeorm";

export interface UsuarioInterface extends BaseEntity{
    id:string;
    nombre:string,
    usuario:string,
    contraseña?:string,
    createdAt?:Date,
    updatedAt?:Date
}