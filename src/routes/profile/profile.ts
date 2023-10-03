import express from "express";
import Joi from "joi";
import { HTTP_CODES } from "../../utils/HTTP-codes";
import { dataManager } from "../../index";
import { ProfessionalEntity } from '../../entity/professional';
import { PatientEntity } from '../../entity/patient';
import { authenticateToken, userAuthenticate } from "../../utils/security/JWTokens";

let router: express.Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: Fetching user profile information
 */

/**
 * @swagger
 * /patient/getUserProfile:
 *   get:
 *     summary: Get patient user profile
 *     description: Fetch and return the profile of a patient user.
 *     tags:
 *       - User Profile
 *     parameters:
 *       - in: header
 *         name: Bearer token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the patient user
 *         schema:
 *           type: string
 *         example: http://localhost:8080/patient/getUserProfile?id=1
 *     responses:
 *       200:
 *         description: Successfully fetched patient user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName: 
 *                   type: string
 *                   description: First name of the patient
 *                 lastName:
 *                   type: string
 *                   description: Last name of the patient
 *                 email:
 *                   type: string
 *                   description: Email of the patient
 *                 admin:
 *                   type: boolean
 *                   description: Admin status of the patient
 *                 roles:
 *                   type: array
 *                   description: Roles of the patient
 *                   items:
 *                     type: string      
 *       400:
 *         description: Bad Request - Incorrect ID format
 *       404:
 *         description: Not Found - User not found or invalid ID
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request
 */

router.get("/patient/getUserProfile", authenticateToken, userAuthenticate, async (req: express.Request, res: express.Response) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const result = schema.validate(req.query);

  if (result.error) {
    res.status(HTTP_CODES.BAD_REQUEST).send("incorrect id format : " + result.error);
    return;
  }

  const id: string = req.query.id ? req.query.id.toString() : '';

  await dataManager.getUserProfile(id, PatientEntity).then((user) => {
    res.send(user).status(HTTP_CODES.OK);
  }).catch((err) => {
    if ("Invalid id")
      res.status(HTTP_CODES.NOT_FOUND).send("Invalid id");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send("Internal server error: " + err);
  });
});

/**
 * @swagger
 * /professional/getUserProfile:
 *   get:
 *     summary: Get professional user profile
 *     description: Fetch and return the profile of a professional user.
 *     tags:
 *       - User Profile
 *     parameters:
 *       - in: header
 *         name: Bearer token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the professional user
 *         schema:
 *           type: string
 *         example: http://localhost:8080/professional/getUserProfile?id=1
 *         
 *     responses:
 *       200:
 *         description: Successfully fetched professional user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName: 
 *                   type: string
 *                   description: First name of the patient
 *                 lastName:
 *                   type: string
 *                   description: Last name of the patient
 *                 email:
 *                   type: string
 *                   description: Email of the patient
 *                 admin:
 *                   type: boolean
 *                   description: Admin status of the patient
 *                 roles:
 *                   type: array
 *                   description: Roles of the professional
 *                   items:
 *                     type: string   
 *       400:
 *         description: Bad Request - Incorrect ID format
 *       404:
 *         description: Not Found - User not found or invalid ID
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request
 */

router.get("/professional/getUserProfile", authenticateToken, userAuthenticate, async (req: express.Request, res: express.Response) => {
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
