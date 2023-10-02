import express from "express";
import Joi from "joi";
import jwt_decode from "jwt-decode";
import { HTTP_CODES } from "../../utils/HTTP-codes";
import { authenticateToken, userAuthenticate } from "../../utils/security/JWTokens";
import { OrganisationEntity } from "../../entity/organisation";
import { organisationManager, dataManager } from "../../index";

let router: express.Router = express.Router();

/**
 * @swagger
 * /organisation/create:
 *   post:
 *     summary: Create a new organization with the provided data
 *     tags:
 *       - Organisation
 *     security:
 *       - BearerAuth: []  # Requires a valid JWT token in the Authorization header
 *     requestBody:
 *       description: JSON object containing organization information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the organization (required)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the organization (required)
 *               phone:
 *                 type: string
 *                 description: The phone number of the organization (required)
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Bad request - Incorrect credentials format or missing data
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token in the Authorization header
 *       409:
 *         description: Conflict - Organization with the same name already exists
 *       500:
 *         description: Internal server error
 */

router.post('/organisation/create', authenticateToken, userAuthenticate, async (req: express.Request, res: express.Response) => {

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

  const authHeader = req.get('Authorization');
  const token = Array.isArray(authHeader) ? authHeader[0].split(' ')[1] : authHeader && authHeader.split(' ')[1];
  const decodedToken: any = jwt_decode(token!);

  const organisation = new OrganisationEntity();

  organisation.name = req.body.name;
  organisation.email = req.body.email;
  organisation.phone = req.body.phone;

  await organisationManager.createOrganisation(organisation, {id: decodedToken.data.id, type: decodedToken.data.type}).then(async () => {
    res.status(HTTP_CODES.CREATED).send('Organisation created');
  }).catch((err) => {
    if (err.message === 'Organisation already exists')
      res.status(HTTP_CODES.CONFLICT).send("Organisation already exists");
    else 
      res.send(err).status(HTTP_CODES.INTERNAL_SERVER_ERROR);
  });
})

/**
 * @swagger
 * /organisation/delete/{id}:
 *   delete:
 *     summary: Delete an organization by ID
 *     tags:
 *       - Organisation
 *     security:
 *       - BearerAuth: []  # Requires a valid JWT token in the Authorization header
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the organization to delete
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token in the Authorization header
 *       404:
 *         description: Not Found - Organization with the specified ID does not exist
 *       500:
 *         description: Internal server error
 */

router.delete('/organisation/delete/:id', authenticateToken, userAuthenticate, async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);

  await organisationManager.deleteOrganisation(id).then(() => {
    res.status(HTTP_CODES.OK).send('Organisation deleted');
  }).catch((err) => {
    if (err.message === 'Organisation does not exist')
      res.status(HTTP_CODES.NOT_FOUND).send("Organisation does not exist");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  });
})

router.post('/organisation/addMember', authenticateToken, userAuthenticate, async (req: express.Request, res: express.Response) => {
  const schema = Joi.object({
    organisationName: Joi.string().required(),
    userEmail: Joi.string().email().required(),
    userType: Joi.string().required(),
  });

  const result = schema.validate(req.body);
  
  if (result.error) {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .send("incorrect json data format : " + result.error);
    return;
  }

  const authHeader = req.get('Authorization');
  const token = Array.isArray(authHeader) ? authHeader[0].split(' ')[1] : authHeader && authHeader.split(' ')[1];
  const decodedToken: any = jwt_decode(token!); 

  const organisationId = await organisationManager.getOrganisationId(req.body.organisationName)
  console.log('orga id', organisationId);
  if (organisationId === -1) {
    res.status(HTTP_CODES.NOT_FOUND).send("Organisation not found");
    return
  }

  const canAddMember: boolean = await organisationManager.canAddMember(decodedToken.data.id, organisationId)
  console.log('can add memeber', canAddMember);
  if (!canAddMember) {
    res.status(HTTP_CODES.FORBIDDEN).send("You do not have the permission to add a member to this organisation OR you are not a member of this organisation");
    return
  }
  
  const memberId = await dataManager.getUserId(req.body.userEmail, req.body.userType)
  console.log('member id', memberId);
  if (memberId === -1) {
    res.status(HTTP_CODES.NOT_FOUND).send("User not found");
    return;
  }

  organisationManager.addMember(organisationId, {id: memberId, type: req.body.userType})
  .then(() => {
    res.status(HTTP_CODES.OK).send('Member added');
  }).catch((err) => {
    if (err.message === 'User already in organisation')
      res.status(HTTP_CODES.CONFLICT).send("User already in organisation");
    else
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send('error when adding user');
  });
})

module.exports = router;
