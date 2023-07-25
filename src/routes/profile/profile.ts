import express from "express";
import Joi from "joi";
import { HTTP_CODES } from "../../utils/HTTP-codes";
import { dataManager } from "../../index";
import { ProfessionalEntity } from '../../entity/professional';
import { PatientEntity } from '../../entity/patient';

let router: express.Router = express.Router();

router.get("/patient/getUserProfile", async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const result = schema.validate(req.query);

  if (result.error) {
    res.status(HTTP_CODES.BAD_REQUEST).send("incorrect id format : " + result.error);
    return;
  }

  const id: string = req.query.id ? req.query.id.toString() : '';

  console.log(id);

  await dataManager.getUserProfile(id, PatientEntity).then((user) => {
    res.send(user).status(HTTP_CODES.OK);
  }).catch((err) => {
    if ("Invalid id")
      res.status(HTTP_CODES.NOT_FOUND).send("Invalid id");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send("Internal server error: " + err);
  });
});

router.get("/professional/getUserProfile", async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const result = schema.validate(req.query);

  if (result.error) {
    res.status(HTTP_CODES.BAD_REQUEST).send("incorrect id format : " + result.error);
    return;
  }

  const id: string = req.query.id ? req.query.id.toString() : '';

  console.log(id);

  await dataManager.getUserProfile(id, ProfessionalEntity).then((user) => {
    res.send(user).status(HTTP_CODES.OK);
  }).catch((err) => {
    if ("Invalid id")
      res.status(HTTP_CODES.NOT_FOUND).send("Invalid id");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send("Internal server error: " + err);
  });
});

module.exports = router;
