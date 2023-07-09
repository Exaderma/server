import express from 'express';
import Joi from 'joi';
import { HTTP_CODES } from '../../utils/HTTP-codes';
import { generateToken } from '../../utils/security/JWTokens';
import { ProfessionalEntity } from '../../entity/professional';
import { PatientEntity } from '../../entity/patient';
import { Login } from '../repository/login'

let router: express.Router = express.Router();

const manager = new Login();

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

  const token = generateToken(req.body.email);

  await manager.checkUserCredentials(req.body.email, req.body.password, PatientEntity).then(() => {
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

  const token = generateToken(req.body.email);

  await manager.checkUserCredentials(req.body.email, req.body.password, ProfessionalEntity).then(() => {
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
