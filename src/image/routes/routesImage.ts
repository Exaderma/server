import express from "express";
import jwtDecode from "jwt-decode";
import { resolverSetPatientImageProfile, resolverGetPatientImageProfile, resolverGetProfessionalImageProfile, resolverSetProfessionalImageProfile } from "../api/resolver";
import { Image } from "../repository/image";
import { router } from "../../routes/auth/register/register";

const imageRouter = express.Router();
const image = new Image();

/**
 * @swagger
 * /image/setProfile/patient:
 *   post:
 *     summary: Définit une image de profil pour un patient
 *     description: Définit une image de profil pour un patient en utilisant le token d'authentification
 *     tags:
 *       - Image
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
 *             data:
 *               type: string
 *         required: true
 *         description: Données de l'image au format base64
 *     responses:
 *       201:
 *         description: Créé - renvoie des détails sur l'image mise à jour du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
imageRouter.post("/image/setProfile/patient", async (req, res) => {
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
    const { data } = req.body;
    const patient: any = jwtDecode(token);
    try {
        res.status(201).send(await resolverSetPatientImageProfile(image, data, patient.data.email));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

/**
 * @swagger
 * /image/getProfile/patient:
 *   post:
 *     summary: Obtient l'image de profil d'un patient
 *     description: Obtient l'image de profil d'un patient en utilisant le token d'authentification
 *     tags:
 *       - Image
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token)
 *     responses:
 *       200:
 *         description: Succès - renvoie les données de l'image de profil du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
imageRouter.post("/image/getProfile/patient", async (req, res) => {
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
    const patient: any = jwtDecode(token);
    try {
        res.status(200).send(await resolverGetPatientImageProfile(image, patient.data.email));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

/**
 * @swagger
 * /image/setProfile/professional:
 *   post:
 *     summary: Définit l'image de profil d'un professionnel de santé
 *     description: Définit l'image de profil d'un professionnel de santé en utilisant le token d'authentification du professionnel de santé
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
 *             data:
 *               type: string
 *         required: true
 *         description: Données de l'image de profil du professionnel de santé (par exemple, base64)
 *     responses:
 *       201:
 *         description: Succès - l'image de profil a été définie avec succès
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
imageRouter.post("/image/setProfile/professional", async (req, res) => {
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
    const { data } = req.body;
    const professional: any = jwtDecode(token);
    try {
        res.status(201).send(await resolverSetProfessionalImageProfile(image, data, professional.data.email));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

/**
 * @swagger
 * /image/getProfile/professional:
 *   post:
 *     summary: Obtient l'image de profil d'un professionnel de santé
 *     description: Obtient l'image de profil d'un professionnel de santé en utilisant le token d'authentification du professionnel de santé
 *     tags:
 *       - Professional
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token) du professionnel de santé
 *     responses:
 *       200:
 *         description: Succès - renvoie l'image de profil du professionnel de santé
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
imageRouter.post("/image/getProfile/professional", async (req, res) => {
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
    const professional: any = jwtDecode(token);
    try {
        res.status(200).send(await resolverGetProfessionalImageProfile(image, professional.data.email));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

module.exports = imageRouter;