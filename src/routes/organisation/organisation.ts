import express from "express";
import Joi from "joi";
import { HTTP_CODES } from "../../utils/HTTP-codes";
import { authenticateToken, userAuthenticate } from "../../utils/security/JWTokens";
import { OrganisationEntity } from "../../entity/organisation";
import { organisationManager } from "../../index";

let router: express.Router = express.Router();

/**
 * @swagger
 * /organisation/create:
 *   post:
 *     summary: Create a new organization
 *     tags:
 *       - Organisation
 *     requestBody:
 *       description: Organization data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization created
 *       400:
 *         description: Incorrect credentials format
 *       409:
 *         description: Organization already exists
 *       500:
 *         description: Internal server error
 */

router.post('/organisation/create', async (req: express.Request, res: express.Response) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .send("incorrect credentials format : " + result.error);
    return;
  }

  const organisation = new OrganisationEntity();

  organisation.name = req.body.name;
  organisation.email = req.body.email;
  organisation.phone = req.body.phone;

  await organisationManager.createOrganisation(organisation).then(() => {
    res.status(HTTP_CODES.CREATED).send('Organisation created');
  }).catch((err) => {
    if (err.message === 'Organisation already exists')
      res.status(HTTP_CODES.CONFLICT).send("Organisation already exists");
    else 
      res.send(err).status(HTTP_CODES.INTERNAL_SERVER_ERROR);
  });
})

module.exports = router;
