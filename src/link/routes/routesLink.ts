import express from "express";
import {
  resolverGetLinkprofessionnal,
  resolverGetLinkPatient,
  resolverLinkprofessionnalToPatient,
  resolverLinkPatientToprofessionnal,
} from "../api/resolver";
import { Link } from "../repository/link";
import jwt_decode from "jwt-decode";

let router = express.Router();
let link = new Link();

/**
 * @swagger
 * /patient/link:
 *   post:
 *     summary: Lie un patient à un médecin
 *     description: Lie un patient à un médecin en utilisant le token d'authentification
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
 *             code:
 *               type: string
 *         required: true
 *         description: Code pour lier le patient au médecin
 *     responses:
 *       201:
 *         description: Créé - renvoie des détails sur la liaison patient-médecin
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/patient/link", async (req, res) => {
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
  const { code } = req.body;
  const patientId: any = jwt_decode(token);
  try {
    res
      .status(201)
      .send(
        await resolverLinkPatientToprofessionnal(link, code, patientId.data.email)
      );
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /patient/getLink:
 *   get:
 *     summary: Obtient les liens du patient avec les médecins
 *     description: Obtient les liens du patient avec les médecins en utilisant le token d'authentification
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails sur les liens du patient avec les médecins
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.get("/patient/getLink", async (req, res) => {
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
  const patientId: any = jwt_decode(token);;
  try {
    res
      .status(200)
      .send(await resolverGetLinkPatient(link, patientId.data.email));
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /professional/link:
 *   post:
 *     summary: Lie un médecin à un patient
 *     description: Lie un médecin à un patient en utilisant le token d'authentification
 *     tags:
 *       - Professional
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
 *             email:
 *               type: string
 *         required: true
 *         description: Adresse e-mail du patient à lier au médecin
 *     responses:
 *       200:
 *         description: Succès - renvoie des détails sur la liaison médecin-patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/professional/link", async (req, res) => {
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
  const { email } = req.body;
  if (!email) {
    res.status(404).send("Email not found");
    return;
  }
  const professionnalId: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(await resolverLinkprofessionnalToPatient(link, professionnalId.data.email, email));
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /professional/getLink:
 *   get:
 *     summary: Obtient les liens du médecin avec les patients
 *     description: Obtient les liens du médecin avec les patients en utilisant le token d'authentification
 *     tags:
 *       - Professional
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails sur les liens du médecin avec les patients
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.get("/professional/getLink", async (req, res) => {
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
  const professionnalId: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(await resolverGetLinkprofessionnal(link, professionnalId.data.email));
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /patient/removeLink:
 *   post:
 *     summary: Supprime le lien entre un patient et un professionnel de santé
 *     description: Supprime le lien entre un patient et un professionnel de santé en utilisant le token d'authentification du patient
 *     tags:
 *       - Patient
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token) du patient
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             professionalEmail:
 *               type: string
 *         required: true
 *         description: Adresse e-mail du professionnel de santé à délier du patient
 *     responses:
 *       200:
 *         description: Succès - le lien a été supprimé avec succès
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/patient/removeLink", async (req, res) => {
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
  const { professionalEmail } = req.body;
  const patientId: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await link.removeLinkPatient(patientId.data.email, professionalEmail)
      );
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /professional/removeLink:
 *   post:
 *     summary: Supprime le lien entre un professionnel de santé et un patient
 *     description: Supprime le lien entre un professionnel de santé et un patient en utilisant le token d'authentification du professionnel de santé
 *     tags:
 *       - Professional
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token) du professionnel de santé
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             patientEmail:
 *               type: string
 *         required: true
 *         description: Adresse e-mail du patient à délier du professionnel de santé
 *     responses:
 *       200:
 *         description: Succès - le lien a été supprimé avec succès
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/professional/removeLink", async (req, res) => {
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
  const { patientEmail } = req.body;
  const professionnalId: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(
        await link.removeLinkprofessionnal(professionnalId.data.email, patientEmail)
      );
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
