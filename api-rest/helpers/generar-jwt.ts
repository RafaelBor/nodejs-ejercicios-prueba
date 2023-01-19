import jwt from 'jsonwebtoken'

export const generarJWT = ( id:string) =>{
    return new Promise((resolve, reject) =>{
        const uid = id;
        const payload = {uid};
        
        const secretKey: string = process.env.SECRETORPRIVATEKEY || '';
        jwt.sign(payload, secretKey, {
            expiresIn: '1d'
        }, (err, token)=>{
            if(err)
            {
                console.log(err)
                reject("No se pudo generar el token")
            }else{
                resolve(token)
            }
        })
    })
}