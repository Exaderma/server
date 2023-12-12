import express from "express";
import Joi from "joi";
import jwt_decode from "jwt-decode";
import { HTTP_CODES } from "../../utils/HTTP-codes";
import {
    authenticateToken,
    userAuthenticate,
} from "../../utils/security/JWTokens";

let router: express.Router = express.Router();

router.post("/create_channel", authenticateToken, userAuthenticate, async (req: express.Request, res: express.Response) => {
    const schema = Joi.object({
        user1_name: Joi.string().required(),
        user2_name: Joi.string().required(),
        user1_type: Joi.string().required(),
        user2_type: Joi.string().required(),
        user1_id: Joi.string().required(),
        user2_id: Joi.string().required(),
      });
  
      const result = schema.validate(req.body);
  
      if (result.error) {
        res
          .status(HTTP_CODES.BAD_REQUEST)
          .send("incorrect credentials format : " + result.error);
        return;
      }
  
      const authHeader = req.get("Authorization");
      const token = Array.isArray(authHeader)
        ? authHeader[0].split(" ")[1]
        : authHeader && authHeader.split(" ")[1];
      const decodedToken: any = jwt_decode(token!);
});