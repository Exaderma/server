import express from 'express';
import Joi from 'joi';
import { generateToken } from '../../utils/security/JWTokens';
import { HTTP_CODES } from '../../utils/HTTP-codes';
import { ProfessionalEntity } from '../../entity/professional';
import { PatientEntity } from '../../entity/patient';
import { hashPassword } from '../../utils/security/hashing';
import { Register } from '../repository/register'

let router: express.Router = express.Router();

const manager = new Register();

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

  const token = generateToken(req.body.email);

  const patient = new PatientEntity();

  patient.firstName = req.body.firstName;
  patient.lastName = req.body.lastName;
  patient.email = req.body.email;
  patient.password = hashPassword(req.body.password);

  await manager.insertUser(patient).then(() => {
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
  const token = generateToken(req.body.email);

  const professional = new ProfessionalEntity();
  
  professional.firstName = req.body.firstName;
  professional.lastName = req.body.lastName;
  professional.email = req.body.email;
  professional.password = hashPassword(req.body.password);

  await manager.insertUser(professional).then(() => {
    res.send(token).status(HTTP_CODES.CREATED);
  }).catch((err) => {
    if (err.message === 'User already exists')
      res.status(HTTP_CODES.CONFLICT).send("User already exists");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });

});

module.exports = router;
