import express from 'express';
import Joi from 'joi';
import { generateToken } from '../../utils/security/JWTokens';
import { HTTP_CODES } from '../../utils/HTTP-codes';

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

  const token = generateToken(req.body.email);

  res.send(token).status(HTTP_CODES.CREATED);
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

  res.send(token).status(HTTP_CODES.CREATED);
});

module.exports = router;
