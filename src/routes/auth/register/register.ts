import express from 'express';
import Joi from 'joi';
import { generateToken } from '../../../utils/security/JWTokens';
import { HTTP_CODES } from '../../../utils/HTTP-codes';
import { ProfessionalEntity } from '../../../entity/professional';
import { PatientEntity } from '../../../entity/patient';
import { hashPassword } from '../../../utils/security/hashing';
import { registerManager } from '../../../index';
import { authenticateToken, userAuthenticate } from '../../../utils/security/JWTokens';

export let router: express.Router = express.Router();

/**
 * @swagger
 * /patient/register:
 *   post:
 *     summary: Register a new patient and get an access token
 *     description: Register a new patient using the provided information and receive an access token.
 *     tags:
 *       - Patient
 *     requestBody:
 *       description: Patient's registration information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Successfully registered and logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the newly registered patient, it contains the email, type and id of the user
 *       400:
 *         description: Bad Request - Incorrect credentials format
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request
 */

router.post('/patient/register', async (req: express.Request, res: express.Response) => {

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
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

  const patient = new PatientEntity();

  patient.firstName = req.body.firstName;
  patient.lastName = req.body.lastName;
  patient.email = req.body.email;
  patient.password = hashPassword(req.body.password);

  await registerManager
    .insertUser(patient)
    .then(async () => {
      const token = generateToken({
        email: req.body.email,
        id: await registerManager.getUserId(patient).then((id) => (id)),
        type: "patient"
      }, 36000);
      res.status(HTTP_CODES.CREATED).send({token: token});
    })
    .catch((err) => {
      if (err.message === "User already exists")
        res.status(HTTP_CODES.CONFLICT).send("User already exists");
      else res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
    });
});

/**
 * @swagger
 * /professional/register:
 *   post:
 *     summary: Register a new professional and get an access token
 *     description: Register a new professional using the provided information and receive an access token.
 *     tags:
 *       - Professional
 *     requestBody:
 *       description: Professional's registration information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Successfully registered and logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the newly registered professional, it contains the email, type and id of the user
 *       400:
 *         description: Bad Request - Incorrect credentials format
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request
 */

router.post('/professional/register', async (req: express.Request, res: express.Response) => {

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
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

  const professional = new ProfessionalEntity();

  professional.firstName = req.body.firstName;
  professional.lastName = req.body.lastName;
  professional.email = req.body.email;
  professional.password = hashPassword(req.body.password);

  await registerManager.insertUser(professional).then(async () => {
    const token = generateToken({
      email: req.body.email,
      id: await registerManager.getUserId(professional).then((id) => (id)),
      type: "professional"
    }, 36000);
    res.send({token: token}).status(HTTP_CODES.CREATED);
  }).catch((err) => {
    if (err.message === 'User already exists')
      res.status(HTTP_CODES.CONFLICT).send("User already exists");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
});

/**
 * @swagger
 * /patient/register/middleware:
 *   get:
 *     summary: Test middleware authentication for patient registration
 *     description: This route is used to test the middleware authentication.
 *     tags:
 *       - Patient
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User authenticated
 *       401:
 *         description: Unauthorized - Invalid token or token not provided
 */

router.get('/patient/register/middleware', authenticateToken, async (req: express.Request, res: express.Response) => {
  res.status(HTTP_CODES.OK).send("User authenticated");
});

router.post('/refreshTokenTest', async (req: express.Request, res: express.Response) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .send("incorrect credentials format : " + result.error);
    return;
  }

  const token = generateToken({ email: req.body.email, type: "patient" }, 0);

  res.send(token).status(HTTP_CODES.OK);
});


module.exports = router;
