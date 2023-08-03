import express from 'express';
import Joi from 'joi';
import { HTTP_CODES } from '../../../utils/HTTP-codes';
import { generateToken } from '../../../utils/security/JWTokens';
import { ProfessionalEntity } from '../../../entity/professional';
import { PatientEntity } from '../../../entity/patient';
import { loginManager } from '../../../index';

let router: express.Router = express.Router();

/** 
 * @swagger
 * tags:
 *  name: Patient
 *  description: Patient related documentation
 *  name: Professional
 *  description: Professional related documentation
 */

/**
 * @swagger
 * /patient/login:
 *   post:
 *     summary: Authenticate a patient and get an access token
 *     description: Login a patient using email and password and receive an access token.
 *     tags:
 *       - Patient
 *     requestBody:
 *       description: Patient's email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the authenticated patient
 *       400:
 *         description: Bad Request - Incorrect credentials format
 *       401:
 *         description: Unauthorized - Wrong password
 *       404:
 *         description: Not Found - User not found
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request
 */

router.post('/patient/login', async (req: express.Request, res: express.Response) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .send("incorrect credentials format : " + result.error);
    return;
  }

  const token = generateToken({ email: req.body.email, type: "patient" });

  await loginManager
    .checkUserCredentials(req.body.email, req.body.password, PatientEntity)
    .then(() => {
      res.send(token).status(HTTP_CODES.OK);
    })
    .catch((err) => {
      if (err.message === "User not found")
        res.status(HTTP_CODES.NOT_FOUND).send("User not found");
      if (err.message === "Wrong password")
        res.status(HTTP_CODES.UNAUTHORIZED).send("Wrong password");
      else res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
    });
});

/**
 * @swagger
 * /professional/login:
 *   post:
 *     summary: Authenticate a professional and get an access token
 *     description: Login a professional using email and password and receive an access token.
 *     tags:
 *       - Professional
 *     requestBody:
 *       description: Professional's email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the authenticated professional
 *       400:
 *         description: Bad Request - Incorrect credentials format
 *       401:
 *         description: Unauthorized - Wrong password
 *       404:
 *         description: Not Found - User not found
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request
 */

router.post('/professional/login', async (req: express.Request, res: express.Response) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .send("incorrect credentials format : " + result.error);
    return;
  }

  const token = generateToken({ email: req.body.email, type: "professional" });

  await loginManager
    .checkUserCredentials(req.body.email, req.body.password, ProfessionalEntity)
    .then(() => {
      res.send(token).status(HTTP_CODES.OK);
    })
    .catch((err) => {
      if (err.message === "User not found")
        res.status(HTTP_CODES.NOT_FOUND).send("User not found");
      if (err.message === "Wrong password")
        res.status(HTTP_CODES.UNAUTHORIZED).send("Wrong password");
      else res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
    });
});

module.exports = router;
