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

  await organisationManager.createOrganisation(organisation).then(async () => {
    await organisationManager.getOrganisationId(organisation.name).then((id) => {
      console.log('id', id);
    })
    res.status(HTTP_CODES.CREATED).send('Organisation created');
  }).catch((err) => {
    if (err.message === 'Organisation already exists')
      res.status(HTTP_CODES.CONFLICT).send("Organisation already exists");
    else 
      res.send(err).status(HTTP_CODES.INTERNAL_SERVER_ERROR);
  });
})

router.delete('/organisation/delete/:id', async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);

  console.log('delete', id);
  await organisationManager.deleteOrganisation(id).then(() => {
    res.status(HTTP_CODES.OK).send('Organisation deleted');
  }).catch((err) => {
    if (err.message === 'Organisation does not exist')
      res.status(HTTP_CODES.NOT_FOUND).send("Organisation does not exist");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
})

module.exports = router;
