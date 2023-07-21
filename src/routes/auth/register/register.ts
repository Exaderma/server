import express from 'express';
import Joi from 'joi';
import { generateToken } from '../../../utils/security/JWTokens';
import { HTTP_CODES } from '../../../utils/HTTP-codes';
import { ProfessionalEntity } from '../../../entity/professional';
import { PatientEntity } from '../../../entity/patient';
import { hashPassword } from '../../../utils/security/hashing';
import { registerManager } from '../../../index';
import { authenticateToken, userAuthenticate } from '../../../utils/security/JWTokens';

let router: express.Router = express.Router();

/** 
 * @description
 * This route is used to register a patient depending on the given credentials.
 * 
 * @param firstName the first name of the patient stored in the body of the request, must be a valid string
 * @param lastName the last name of the patient stored in the body of the request, must be a valid string
 * @param email the email of the patient stored in the body of the request, must be a valid email
 * @param password the unhashed password of the patient stored in the body of the request, must be a valid string
 * 
 * @returns a JWT token of the user and a 201 code if the registration is successful
 * @returns a 400 code if the body of the request is not valid
 * @returns a 409 code if the user already exists
 * @returns a 500 code if an internal server error occurs
 */
router.post('/patient/register', async (req, res) => {

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

  const token = generateToken({ email: req.body.email, type: "patient" });

  const patient = new PatientEntity();

  patient.firstName = req.body.firstName;
  patient.lastName = req.body.lastName;
  patient.email = req.body.email;
  patient.password = hashPassword(req.body.password);

  await registerManager
    .insertUser(patient)
    .then(() => {
      res.send(token).status(HTTP_CODES.CREATED);
    })
    .catch((err) => {
      if (err.message === "User already exists")
        res.status(HTTP_CODES.CONFLICT).send("User already exists");
      else res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
    });
});

/** 
 * @description
 * This route is used to register a professional depending on the given credentials.
 * 
 * @param firstName the first name of the professional stored in the body of the request, must be a valid string
 * @param lastName the last name of the professional stored in the body of the request, must be a valid string
 * @param email the email of the professional stored in the body of the request, must be a valid email
 * @param password the unhashed password of the professional stored in the body of the request, must be a valid string
 * 
 * @returns a JWT token of the user and a 201 code if the registration is successful
 * @returns a 400 code if the body of the request is not valid
 * @returns a 409 code if the user already exists
 * @returns a 500 code if an internal server error occurs
 */
router.post('/professional/register', async (req, res) => {

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
  const token = generateToken({ email: req.body.email, type: "professional" });

  const professional = new ProfessionalEntity();

  professional.firstName = req.body.firstName;
  professional.lastName = req.body.lastName;
  professional.email = req.body.email;
  professional.password = hashPassword(req.body.password);

  await registerManager.printProfessionals();
  await registerManager.insertUser(professional).then(() => {
    res.send(token).status(HTTP_CODES.CREATED);
  }).catch((err) => {
    if (err.message === 'User already exists')
      res.status(HTTP_CODES.CONFLICT).send("User already exists");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
});

/**
 * description
 * This route is used to test the middleware authentication
 * 
 * @headers Authorization the JWT token of the user in the following format: Bearer <token>
 */
router.get('/patient/register/middleware', authenticateToken, userAuthenticate, async (req, res) => {
  res.status(HTTP_CODES.OK).send("User authenticated");
});

module.exports = router;
