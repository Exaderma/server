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
export async function userAuthenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.get("Authorization");
  const token = Array.isArray(authHeader)
    ? authHeader[0].split(" ")[1]
    : authHeader && authHeader.split(" ")[1];
  const decodedToken: any = jwt_decode(token!);
  const userEmail: any = decodedToken.data.email;

  if (token === null) {
    return res.sendStatus(HTTP_CODES.FORBIDDEN);
  }

  const table =
    decodedToken.data.type === "patient" ? PatientEntity : ProfessionalEntity;

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
export async function authenticateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(HTTP_CODES.FORBIDDEN);
  }

  jwt.verify(String(token), tokenKey, (err: any, user: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(HTTP_CODES.UNAUTHORIZED).send("Token has expired");
      } else {
        return res
          .status(HTTP_CODES.FORBIDDEN)
          .send(err.message || "Authentication failed");
      }
    }
    next();
  });
}

/**
 * @description
 * This function is used to generate a JWT token based on the provided data.
 */

export function generateToken(data: any, time: number): string {
  return jwt.sign(
    { data: data, exp: Math.floor(Date.now() / 1000) + time },
    tokenKey,
  );
}

export function refreshToken(token: string): string {
  const decodedToken: any = jwt_decode(token);
  const newToken = generateToken(decodedToken.data, 36000);
  return newToken;
}
