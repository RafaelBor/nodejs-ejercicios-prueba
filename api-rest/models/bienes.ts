import { Entity, Column, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Usuario } from "./usuario";

@Entity('bienes')
export class Bienes extends Base {
    @Column('varchar',{
        length: 255
    })
    articulo:string;

    @Column('varchar',{
        length: 255
    })
    descripcion:string;

    @Column()
    usuarioId:string


    @ManyToOne(
        () => Usuario,
        (usuario) => usuario.bienes,
        {eager: true},
        
    )
    usuario: Usuario


}