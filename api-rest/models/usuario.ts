import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./base";
import { Bienes } from "./bienes";

@Entity('usuarios')
export class Usuario extends Base {
    @Column('varchar')
    nombre:string;

    @Column('varchar', {
        unique:true
    })
    usuario:string;

    @Column('varchar',{
        select: false
    })
    contraseña:string;
 
    @OneToMany(
        () => Bienes,
        (bienes) => bienes.usuario
    )
    bienes:Bienes;


}