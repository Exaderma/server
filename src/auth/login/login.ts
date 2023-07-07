import express from 'express';
import Joi from 'joi';
import { HTTP_CODES } from '../../utils/HTTP-codes';
import { generateToken } from '../../utils/security/JWTokens';

let router: express.Router = express.Router();

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

  res.send(token).status(HTTP_CODES.OK);
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

  res.send(token).status(HTTP_CODES.OK);
});

module.exports = router;
