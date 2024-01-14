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

/**
 * @swagger
 * /patient/note/add:
 *   post:
 *     summary: Ajouter une note au dossier d'un patient
 *     description: Ajoute une note au dossier d'un patient pour un professionnel authentifié.
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Jeton d'authentification JWT (Bearer Token)
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: requestBody
 *         description: Informations nécessaires pour ajouter une note au dossier du patient
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Adresse e-mail du patient
 *                 note:
 *                   type: string
 *                   description: Contenu de la note à ajouter
 *     responses:
 *       200:
 *         description: Note ajoutée avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: Note ajoutée avec succès
 *       401:
 *         description: Non autorisé
 *         content:
 *           text/plain:
 *             example: Unauthorized
 *       404:
 *         description: Patient non trouvé ou erreur lors de l'ajout de la note
 *         content:
 *           text/plain:
 *             example: Erreur lors de l'ajout de la note au dossier du patient
 */
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

/**
 * @swagger
 * /patient/note/remove:
 *   post:
 *     summary: Supprimer une note du dossier d'un patient
 *     description: Supprime une note du dossier d'un patient pour un professionnel authentifié.
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Jeton d'authentification JWT (Bearer Token)
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: requestBody
 *         description: Informations nécessaires pour supprimer une note du dossier du patient
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Adresse e-mail du patient
 *     responses:
 *       200:
 *         description: Note supprimée avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: Note supprimée avec succès
 *       401:
 *         description: Non autorisé
 *         content:
 *           text/plain:
 *             example: Unauthorized
 *       404:
 *         description: Patient non trouvé ou erreur lors de la suppression de la note
 *         content:
 *           text/plain:
 *             example: Erreur lors de la suppression de la note du dossier du patient
 */
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

/**
 * @swagger
 * /patient/note/update:
 *   post:
 *     summary: Mettre à jour une note dans le dossier d'un patient
 *     description: Met à jour une note spécifiée dans le dossier d'un patient pour un professionnel authentifié.
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Jeton d'authentification JWT (Bearer Token)
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: requestBody
 *         description: Informations nécessaires pour mettre à jour une note dans le dossier du patient
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Adresse e-mail du patient
 *                 note:
 *                   type: string
 *                   description: Nouveau contenu de la note
 *     responses:
 *       200:
 *         description: Note mise à jour avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: Note mise à jour avec succès
 *       401:
 *         description: Non autorisé
 *         content:
 *           text/plain:
 *             example: Unauthorized
 *       404:
 *         description: Patient non trouvé ou erreur lors de la mise à jour de la note
 *         content:
 *           text/plain:
 *             example: Erreur lors de la mise à jour de la note dans le dossier du patient
 */
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

/**
 * @swagger
 * /patient/note/get:
 *   post:
 *     summary: Récupérer les notes d'un patient
 *     description: Récupère les notes du dossier d'un patient pour un professionnel authentifié.
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Jeton d'authentification JWT (Bearer Token)
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: requestBody
 *         description: Informations nécessaires pour récupérer les notes du dossier du patient
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Adresse e-mail du patient
 *     responses:
 *       200:
 *         description: Notes récupérées avec succès
 *         content:
 *           application/json:
 *             example:
 *               notes:
 *                 - note
 *       401:
 *         description: Non autorisé
 *         content:
 *           text/plain:
 *             example: Unauthorized
 *       404:
 *         description: Patient non trouvé ou erreur lors de la récupération des notes
 *         content:
 *           text/plain:
 *             example: Erreur lors de la récupération des notes du dossier du patient
 */
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
