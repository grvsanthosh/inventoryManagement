import bcrypt from 'bcryptjs';
import 'dotenv/config.js';
import jwt from'jsonwebtoken';

const hashedPassword = async (pwd)=> {
    try {
        
        let salt = await bcrypt.genSalt(Number(process.env.SALT));
        let hashPassword  = await bcrypt.hash(pwd,salt);
        return hashPassword
    }
    catch(error){
        console.log(error);
    }
 
}

const hashcompare = async (pwd,hashedpwd)=>{
    try{
        let compare = await bcrypt.compare(pwd,hashedpwd);
        return compare
    }
    catch(error){
        console.log(error);
    }

}

const createToken = async (payload)=>{
    try{
        let token =  jwt.sign(payload,process.env.SCERET_KEY,{expiresIn:'1h'});
        return token
    }
    catch(error){
        console.log(error);
    }
}

const decodeToken = async(token)=>{
    try{
        return jwt.decode(token)
    }
    catch(error){
        console.log(error);
    }
}

export default {hashedPassword,hashcompare,createToken,decodeToken}