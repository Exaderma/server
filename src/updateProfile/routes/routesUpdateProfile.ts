import express from "express";
import jwt_decode from "jwt-decode";
import {
  resolverAddNotePatient,
  resolverGetNotePatient,
  resolverRemoveNotePatient,
  resolverUpdateNotePatient,
  resolverUpdatePatientEmail,
  resolverUpdatePatientFirstName,
  resolverUpdatePatientLastName,
  resolverUpdatePatientPassword,
  resolverUpdatePatientPhone,
  resolverUpdateProfessionalAddress,
  resolverUpdateProfessionalDepartment,
  resolverUpdateProfessionalEmail,
  resolverUpdateProfessionalFirstName,
  resolverUpdateProfessionalLastName,
  resolverUpdateProfessionalPassword,
  resolverUpdateProfessionalPhone,
} from "../api/resolver";
import { UpdateProfile } from "../repository/profile";

let router = express.Router();
let updateProfile = new UpdateProfile();

// Patient

/**
 * @swagger
 * /updateProfile/patient/firstName:
 *   post:
 *     summary: Met à jour le prénom d'un patient
 *     description: Met à jour le prénom d'un patient en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *         required: true
 *         description: Nouveau prénom du patient
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/patient/firstName", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { firstName } = req.body;
  const patient: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdatePatientFirstName(
          patient.data.email,
          firstName,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/patient/lastName:
 *   post:
 *     summary: Met à jour le nom de famille d'un patient
 *     description: Met à jour le nom de famille d'un patient en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             lastName:
 *               type: string
 *         required: true
 *         description: Nouveau nom de famille du patient
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/patient/lastName", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { lastName } = req.body;
  const patient: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdatePatientLastName(
          patient.data.email,
          lastName,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/patient/email:
 *   post:
 *     summary: Met à jour l'adresse e-mail d'un patient
 *     description: Met à jour l'adresse e-mail d'un patient en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             newEmail:
 *               type: string
 *         required: true
 *         description: Nouvelle adresse e-mail du patient
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/patient/email", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { newEmail } = req.body;
  const patient: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdatePatientEmail(
          patient.data.email,
          newEmail,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/patient/password:
 *   post:
 *     summary: Met à jour le mot de passe d'un patient
 *     description: Met à jour le mot de passe d'un patient en utilisant le token d'authentification
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *         required: true
 *         description: Nouveau mot de passe du patient
 *     responses:
 *       200:
 *         description: Succès - renvoie des détails sur la mise à jour du mot de passe du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/patient/password", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { password } = req.body;
  const patient: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdatePatientPassword(
          patient.data.email,
          password,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/patient/phone:
 *   post:
 *     summary: Met à jour le numéro de téléphone d'un patient
 *     description: Met à jour le numéro de téléphone d'un patient en utilisant le token d'authentification
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *         required: true
 *         description: Nouveau numéro de téléphone du patient
 *     responses:
 *       200:
 *         description: Succès - renvoie des détails sur la mise à jour du numéro de téléphone du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/patient/phone", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { phone } = req.body;
  const patient: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdatePatientPhone(
          patient.data.email,
          phone,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

// Professional

/**
 * @swagger
 * /updateProfile/professional/firstName:
 *   post:
 *     summary: Met à jour le prénom d'un professionnel
 *     description: Met à jour le prénom d'un professionnel en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *         required: true
 *         description: Nouveau prénom du professionnel
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du professionnel
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */

router.post("/updateProfile/professional/firstName", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { firstName } = req.body;
  const professional: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdateProfessionalFirstName(
          professional.data.email,
          firstName,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/professional/lastName:
 *   post:
 *     summary: Met à jour le nom de famille d'un professionnel
 *     description: Met à jour le nom de famille d'un professionnel en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             lastName:
 *               type: string
 *         required: true
 *         description: Nouveau nom de famille du professionnel
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du professionnel
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/professional/lastName", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { lastName } = req.body;
  const professional: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdateProfessionalLastName(
          professional.data.email,
          lastName,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/professional/email:
 *   post:
 *     summary: Met à jour l'adresse e-mail d'un professionnel
 *     description: Met à jour l'adresse e-mail d'un professionnel en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             newEmail:
 *               type: string
 *         required: true
 *         description: Nouvelle adresse e-mail du professionnel
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du professionnel
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/professional/email", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { newEmail } = req.body;
  const professional: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdateProfessionalEmail(
          professional.data.email,
          newEmail,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/professional/password:
 *   post:
 *     summary: Met à jour le mot de passe d'un professionnel
 *     description: Met à jour le mot de passe d'un professionnel en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *         required: true
 *         description: Nouveau mot de passe du professionnel
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du professionnel
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/professional/password", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
    return;
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { password } = req.body;
  const professional: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdateProfessionalPassword(
          professional.data.email,
          password,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/professional/phone:
 *   post:
 *     summary: Met à jour le numéro de téléphone d'un professionnel
 *     description: Met à jour le numéro de téléphone d'un professionnel en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *         required: true
 *         description: Nouveau numéro de téléphone du professionnel
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du professionnel
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/professional/phone", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  const token = auth?.split(" ")[1] ?? "";
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const { phone } = req.body;
  const professional: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdateProfessionalPhone(
          professional.data.email,
          phone,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/professional/department:
 *   post:
 *     summary: Met à jour le département d'un professionnel
 *     description: Met à jour le département d'un professionnel en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             department:
 *               type: string
 *         required: true
 *         description: Nouveau département du professionnel
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du professionnel
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/professional/department", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  const token = auth?.split(" ")[1] ?? "";
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const { department } = req.body;
  const professional: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdateProfessionalDepartment(
          professional.data.email,
          department,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /updateProfile/professional/address:
 *   post:
 *     summary: Met à jour l'adresse d'un professionnel
 *     description: Met à jour l'adresse d'un professionnel en utilisant le token d'authentification
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *         required: true
 *         description: Nouvelle adresse du professionnel
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails mis à jour du professionnel
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/updateProfile/professional/address", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  const token = auth?.split(" ")[1] ?? "";
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const { address } = req.body;
  const professional: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await resolverUpdateProfessionalAddress(
          professional.data.email,
          address,
          updateProfile,
        ),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

router.post("/patient/note/add", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  const token = auth?.split(" ")[1] ?? "";
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const { email, note } = req.body;
  const patient: any = jwt_decode(token);
  try {
    res.status(200).send(await resolverAddNotePatient(email, note, updateProfile));
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

router.post("/patient/note/remove", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  const token = auth?.split(" ")[1] ?? "";
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const patient: any = jwt_decode(token);
  const { email } = req.body;
  try {
    res.status(200).send(await resolverRemoveNotePatient(email, updateProfile));
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

router.post("/patient/note/update", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  const token = auth?.split(" ")[1] ?? "";
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const { email, note } = req.body;
  const patient: any = jwt_decode(token);
  try {
    res.status(200).send(await resolverUpdateNotePatient(email, note, updateProfile));
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

router.post("/patient/note/get", async (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  const token = auth?.split(" ")[1] ?? "";
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  const patient: any = jwt_decode(token);
  const { email } = req.body;
  try {
    res.status(200).send(await resolverGetNotePatient(email, updateProfile));
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
