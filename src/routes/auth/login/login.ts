import express from 'express';
import Joi from 'joi';
import { HTTP_CODES } from '../../../utils/HTTP-codes';
import { generateToken } from '../../../utils/security/JWTokens';
import { ProfessionalEntity } from '../../../entity/professional';
import { PatientEntity } from '../../../entity/patient';
import { loginManager } from '../../../index';

let router: express.Router = express.Router();

/**
 * @description
 * This route is used to login a patient based on the provided credentials.
 * 
  * @param email the email of the patient stored in the body of the request, must be a valid email
  * @param password the unhashed password of the patient stored in the body of the request, must be a valid string
  * 
  * @returns a JWT token of the user and a 200 code if the login is successful
  * @returns a 400 code if the body of the request is not valid
  * @returns a 404 code if the user is not found
  * @returns a 401 code if the password is incorrect
  * @returns a 500 code if an internal server error occurs
 */
router.post('/patient/login', async (req, res) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
      res.status(HTTP_CODES.BAD_REQUEST).send("incorrect credentials format : " + result.error);
      return;
  }

  const token = generateToken({email: req.body.email, type: 'patient'});

  await loginManager.checkUserCredentials(req.body.email, req.body.password, PatientEntity).then(() => {
    res.send(token).status(HTTP_CODES.OK);
  }).catch((err) => {
    if (err.message === 'User not found')
      res.status(HTTP_CODES.NOT_FOUND).send("User not found");
    if (err.message === 'Wrong password')
      res.status(HTTP_CODES.UNAUTHORIZED).send("Wrong password");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
});

/**
 * @description
 * This route is used to login a professional based on the provided credentials.
 * 
  * @param email the email of the professional stored in the body of the request, must be a valid email
  * @param password the unhashed password of the professional stored in the body of the request, must be a valid string
  * 
  * @returns a JWT token of the user and a 200 code if the login is successful
  * @returns a 400 code if the body of the request is not valid
  * @returns a 404 code if the user is not found
  * @returns a 401 code if the password is incorrect
  * @returns a 500 code if an internal server error occurs
 */
router.post('/professional/login', async (req, res) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
      res.status(HTTP_CODES.BAD_REQUEST).send("incorrect credentials format : " + result.error);
      return;
  }

  const token = generateToken({email: req.body.email, type: 'professional'});

  await loginManager.checkUserCredentials(req.body.email, req.body.password, ProfessionalEntity).then(() => {
    res.send(token).status(HTTP_CODES.OK);
  }).catch((err) => {
    if (err.message === 'User not found')
      res.status(HTTP_CODES.NOT_FOUND).send("User not found");
    if (err.message === 'Wrong password')
      res.status(HTTP_CODES.UNAUTHORIZED).send("Wrong password");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
});

module.exports = router;
