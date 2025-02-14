import jwt, {JwtPayload} from "jsonwebtoken"
import {Request, Response, NextFunction} from 'express';
import User, { IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

const verifyToken = async (req: Request, res:Response, next:NextFunction) =>{
    const bearer = req.headers.authorization;

    if(!bearer) {

        res.status(403).send({msg: "The header is required"});
        return;
    }
    const [,token] = bearer.split(" ");
    if(!token){
        const error = new Error ('The token is required')
        res.status(401).json({
            error: error.message
        })
    }

    try{
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof result === "object" && result.id){
            const user = await User.findById(result.id).select('-password');
            if(!user) {
                const error = new Error('User not found')
                res.status(401).json({error: error.message});
                return
            }
            req.user = user;
            next();
        }
}   catch(error){
        res.status(500).json({
            msg: 'The token is invalid'
        })
    }

    
}

const createToken = (payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '180d'})
    return token;
}


export {
    createToken,
    verifyToken
}