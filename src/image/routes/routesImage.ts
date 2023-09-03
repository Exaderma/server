import express from "express";
import jwtDecode from "jwt-decode";
import { resolverSetPatientImageProfile, resolverGetPatientImageProfile } from "../api/resolver";
import { Image } from "../repository/image";

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
        res.status(201).send(await resolverSetPatientImageProfile(image, data, patient.email));
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
        res.status(200).send(await resolverGetPatientImageProfile(image, patient.email));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

module.exports = imageRouter;