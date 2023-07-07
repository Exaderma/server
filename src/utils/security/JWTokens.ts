require('dotenv').config();
import jwt from 'jsonwebtoken';
import express from "express";
import jwt_decode from 'jwt-decode';
import { HTTP_CODES } from '../HTTP-codes';

export const tokenKey: string = String(process.env.TOKEN_KEY);

export async function userAuthenticate(req: express.Request, res: express.Response, next: express.NextFunction) {

    const authHeader = req.get('Authorization');
    const token = Array.isArray(authHeader) ? authHeader[0].split(' ')[1] : authHeader && authHeader.split(' ')[1];
    const decodedToken: any = jwt_decode(token!);
    const userEmail: any =  decodedToken.email;

    if (token === null) { return res.sendStatus(HTTP_CODES.FORBIDDEN) }

    // getUserIdByEmail(userEmail).then((response: any) => {
    //     next();
    // }).catch((error: any) => {
    //     if (error === "user not found")
    //         return res.status(403).send("user not found");
    //     else
    //         res.status(403).send("internal server error when getting the user id");
    // });
    // return res.sendStatus(403);
}


export async function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) { return res.sendStatus(HTTP_CODES.FORBIDDEN) }

    jwt.verify(String(token), tokenKey, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(HTTP_CODES.FORBIDDEN)
        }
        return next();
    })
    return next();
}

export function generateToken(data: any): string {
    return jwt.sign({date: data, exp: Math.floor(Date.now() / 1000) + 36000}, tokenKey);
}