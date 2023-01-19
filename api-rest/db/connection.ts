
import {DataSource} from 'typeorm';
import { Bienes } from '../models/bienes';
import { Usuario } from '../models/usuario';
import dotenv from 'dotenv';

dotenv.config()

console.log(process.env.HOST)
export const db = new DataSource({
    type: "postgres",
    host:  process.env.HOST,
    port: 5432,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: [Usuario, Bienes],

})

export default db;