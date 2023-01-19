import { BaseEntity } from "typeorm";
import { UsuarioInterface } from "./usuario.interface";

export interface BienInterface extends BaseEntity {
    id:string;
    articulo:string,
    descripcion:string,
    usuarioId?:string,
    usuario?: UsuarioInterface,
    createdAt?:Date,
    updatedAt?:Date

}