import express from "express";
import { HTTP_CODES } from "../../utils/HTTP-codes";
import { refreshToken } from "../../utils/security/JWTokens";

let router: express.Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Refresh Token
 *   description: Refreshing JWT token
 */

/**
 * @swagger
 * /refreshToken:
 *   get:
 *     summary: Refresh JWT Token
 *     description: Refresh an expired JWT token. 
 *       This route it to be called when the user's JWT token has expired.
 *       this can be checked whenever another route returns a 401 'Token has expired'
 *     tags:
 *       - Refresh Token
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token with the format "Bearer {token}"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK, returns a new valid JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               properties:
 *                 token: the token of the user
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 *     security:
 *       - BearerAuth: []
 */

router.get("/refreshToken", async (req: express.Request, res: express.Response) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) { return res.sendStatus(HTTP_CODES.BAD_REQUEST) }

  const newToken = await refreshToken(token!);

  if (newToken === null) { return res.sendStatus(HTTP_CODES.INTERNAL_SERVER_ERROR) }
  res.send(newToken).status(HTTP_CODES.OK);
})

module.exports = router;
