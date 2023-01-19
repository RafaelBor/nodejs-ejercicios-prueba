import { Response, Request } from "express";
import { Bienes } from "../models/bienes";

import * as fs from 'fs';
import csv from "csv-parser";
import { crearUsuario } from "../helpers/crearUsuario";
import { BienInterface } from "../interfaces/bien.interface";
import { UsuarioInterface } from "../interfaces/usuario.interface";


export const getAllBienes = async(req: Request, res:Response) => {

    const bienes:Array<BienInterface> = await Bienes.find();

    return res.status(200).json({
        "data":bienes
        
    })

}
export const crearBienes = async(req: Request, res:Response) => {
    
    try {
        const {articulo, descripcion} = req.body;

        const bien: BienInterface      = new Bienes();
        bien.articulo                  = articulo;
        bien.descripcion               = descripcion;
        bien.usuarioId                 = req.usuario.id;

        await bien.save()

        const bienResponse:BienInterface | null = await Bienes.findOneBy({id: bien.id})

        return res.status(200).json({
            "message":"el bien se ha creado con exito.",
            "data":bienResponse
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "message":"Hubo un error: " + error
        })
    }
}

export const getBienById = async(req: Request, res:Response) =>{
    try {
        const {id} = req.params;

        const bien:BienInterface | null = await Bienes.findOne({
            where: {
                id:id
            }
        })

        if(!bien) throw new Error(`El bien con el id: ${id} no existe.`)

        return res.status(200).json({
            "message":"El bien se ha encontrado con exito.",
            "data":bien,
           
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({'message': error.message})
        }
    }
}

export const deleteBienById = async(req: Request, res:Response) =>{
    try {
        const {id}   = req.params;

        const bien = await Bienes.delete({id:id})

        if(bien.affected === 0) throw new Error(`El bien con el id: ${id} no existe o ya fue eliminado.`)

        return res.status(200).json({
            "message":"El bien fue eliminado correctamente"   
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({'message': error.message})
        }
    }
}


export const updateBien = async(req: Request, res:Response) =>{
    try {
        const {id} = req.params;
        const {articulo, descripcion} = req.body;

        const bien:BienInterface | null = await Bienes.findOneBy({id: id});

        if(!bien) throw new Error(`El bien con el id: ${id} no existe.`)

        bien.articulo    = articulo;
        bien.descripcion = descripcion;

        await bien.save()

        return res.status(200).json({
            "message":"El bien fue actualizado correctamente",
            "data":bien   
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({'message': error.message})
        }
    }
}



export const getBienesByIds = async(req: Request, res:Response) =>{
    try {
        const {bienesIds} = req.body;

        const bienesArray:Array<BienInterface> = [];
        for (const bienId of bienesIds) {
            const bien: BienInterface | null = await Bienes.findOneBy({id: bienId})

            if(bien){
                bienesArray.push(bien);
            }
          }

        return res.json({
            "data":bienesArray
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({'message': error.message})
        }
    }
}


export const registrarBienesByCsv = async(req: Request, res:Response) => {
   
   try {

    //Guardar usuario
    const user:UsuarioInterface         = await crearUsuario(req.body);

    //Leer csv y guardar en la base de datos
    const results:Array<BienInterface> = [];

    const data = fs.createReadStream("data/data-bienes.csv")
    .pipe(csv())
    .on("data", data => results.push(data))
    .on("end", () => 
    results.forEach(async(bien:BienInterface) => {
        const guardarBien: BienInterface = new Bienes();

        guardarBien.articulo             = bien.articulo;
        guardarBien.descripcion          = bien.descripcion;
        guardarBien.usuarioId            = user.id

        guardarBien.save();
    }));

    return res.json({
        "message":"los datos se han guardado correctamente"
    });
    
   } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({'message': error.message})
    }
   }
}