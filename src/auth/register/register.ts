import express from 'express';
import Joi from 'joi';
import { generateToken } from '../../utils/security/JWTokens';
import { HTTP_CODES } from '../../utils/HTTP-codes';
import { ProfessionalEntity } from '../../entity/professional';
import { PatientEntity } from '../../entity/patient';
import { hashPassword } from '../../utils/security/hashing';
import { registerManager } from '../..';
import { authenticateToken, userAuthenticate } from '../../utils/security/JWTokens';

let router: express.Router = express.Router();

router.post('/patient/register', async (req, res) => {

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
      res.status(HTTP_CODES.BAD_REQUEST).send("incorrect credentials format : " + result.error);
      return;
  }

  const token = generateToken({email: req.body.email, type: 'patient'});

  const patient = new PatientEntity();

  patient.firstName = req.body.firstName;
  patient.lastName = req.body.lastName;
  patient.email = req.body.email;
  patient.password = hashPassword(req.body.password);

  await registerManager.insertUser(patient).then(() => {
    res.send(token).status(HTTP_CODES.CREATED);
  }).catch((err) => {
    if (err.message === 'User already exists')
      res.status(HTTP_CODES.CONFLICT).send("User already exists");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
});

router.post('/professional/register', async (req, res) => {

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
      res.status(HTTP_CODES.BAD_REQUEST).send("incorrect credentials format : " + result.error);
      return;
  }
  const token = generateToken({email: req.body.email, type: 'professional'});

  const professional = new ProfessionalEntity();
  
  professional.firstName = req.body.firstName;
  professional.lastName = req.body.lastName;
  professional.email = req.body.email;
  professional.password = hashPassword(req.body.password);

  await registerManager.insertUser(professional).then(() => {
    res.send(token).status(HTTP_CODES.CREATED);
  }).catch((err) => {
    if (err.message === 'User already exists')
      res.status(HTTP_CODES.CONFLICT).send("User already exists");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
});

router.get('/patient/register/middleware', authenticateToken, userAuthenticate, async (req, res) => {
  res.status(HTTP_CODES.OK).send("User authenticated");
});

module.exports = router;
