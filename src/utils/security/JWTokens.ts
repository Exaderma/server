require("dotenv").config();
import jwt from "jsonwebtoken";
import express from "express";
import jwt_decode from "jwt-decode";
import { HTTP_CODES } from "../HTTP-codes";
import { dataManager } from "../..";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";

export const tokenKey: string = String(process.env.TOKEN_KEY);
/**
 * @description
 * This function is used to authenticate a user based on the provided token.
 * it checks if the token is present and if the user linked to the token exists in the database.
 * 
 * the token must be provided in the Authorization header of the request following the Bearer schema: "Bearer <token>"
 * 
 * @param req the request of the user
 * @param res the response of the server
 * @param next the next function to call
 */
export async function userAuthenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.get('Authorization');
    const token = Array.isArray(authHeader) ? authHeader[0].split(' ')[1] : authHeader && authHeader.split(' ')[1];
    const decodedToken: any = jwt_decode(token!);
    const userEmail: any =  decodedToken.email;

  if (token === null) {
    return res.sendStatus(HTTP_CODES.FORBIDDEN);
  }

  const table =
    decodedToken.type === "patient" ? PatientEntity : ProfessionalEntity;

  await dataManager
    .doesUserExists(userEmail, table)
    .then((response: any) => {
      next();
    })
    .catch((error: any) => {
      if (error === "user not found")
        return res.status(HTTP_CODES.FORBIDDEN).send("user not found");
      else
        res
          .status(HTTP_CODES.FORBIDDEN)
          .send("internal server error during user authentication");
    });
}

/**
 * @description
 * This function is used to authenticate a user based on the provided token.
 * it checks if the token is valid .
 * 
 * the token must be provided in the Authorization header of the request following the Bearer schema: "Bearer <token>"
 * 
 * @param req the request of the user
 * @param res the response of the server
 * @param next the next function to call
 */
export async function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.sendStatus(HTTP_CODES.FORBIDDEN);
  }

  jwt.verify(String(token), tokenKey, (err: any, user: any) => {
      if (err) {
          if (err.name === 'TokenExpiredError') {
              return res.status(HTTP_CODES.UNAUTHORIZED).send('Token has expired');
          } else {
              return res.status(HTTP_CODES.FORBIDDEN).send(err.message || 'Authentication failed');
          }
      }
      next();
  });
}

/**
 * @description
 * This function is used to generate a JWT token based on the provided data.
 */

//TODO : ADD + 36000 TO THE TOKEN FOR THE EXPIRATION TIME
export function generateToken(data: any): string {
  return jwt.sign(
    { data: data, exp: Math.floor(Date.now() / 1000) },
    tokenKey,
  );
}

export function refreshToken(token: string): string {
  const decodedToken: any = jwt_decode(token);
  const userEmail: string =  decodedToken.data.email;
  const userType: string =  decodedToken.data.type;
  console.log(userEmail);
  console.log(userType);
  const newToken = jwt.sign(
    { data: {email: userEmail, type: userType}, exp: Math.floor(Date.now() / 1000) + 36000 },
    tokenKey,
  );
  return newToken;
}
