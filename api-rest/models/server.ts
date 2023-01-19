import express, {Application} from 'express';

import userRoutes from '../routes/usuarios';
import bienesRoutes from '../routes/bienes';
import cors from "cors";
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        bienes: '/api/bienes'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '80';

        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes()
    }

    async dbConnection(){
        try {
            await db.initialize();
            console.log("database online");
        } catch (err) {
            console.log(err)
            throw new Error()
        }
    }

    middlewares(){
        //Cors
        this.app.use( cors() );

        //Lectura del body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
        this.app.use(this.apiPaths.bienes, bienesRoutes)
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port)
        })
    }
}

export default Server;