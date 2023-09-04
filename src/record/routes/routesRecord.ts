import express from "express";
import jwt_decode from "jwt-decode";
import { resolverNewRecord, resolverGetRecord, resolverUpdateRecord } from "../api/resolver";
import { Record } from "../repository/record";

let router = express.Router();
let record = new Record();

/**
 * @swagger
 * /record/new:
 *   post:
 *     summary: Crée un nouveau dossier médical
 *     description: Crée un nouveau dossier médical en utilisant le token d'authentification
 *     tags:
 *       - Record
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
 *             description:
 *               type: string
 *             type:
 *               type: string
 *             patientEmail:
 *               type: string
 *         required: true
 *         description: Détails du nouveau dossier médical
 *     responses:
 *       201:
 *         description: Créé - renvoie des détails sur le nouveau dossier médical
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/record/new", async (req, res) => {
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
    const { description, type, patientEmail } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res
        .status(201)
        .send(
            await resolverNewRecord(
            record,
            description,
            type,
            patientEmail,
            professional.data.email,
            ),
        );
    } catch (err : any) {
        res.status(404).send(err.message);
    }
});

/**
 * @swagger
 * /record/get:
 *   post:
 *     summary: Obtient les dossiers médicaux d'un patient
 *     description: Obtient les dossiers médicaux d'un patient en utilisant le token d'authentification
 *     tags:
 *       - Record
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
 *             patientEmail:
 *               type: string
 *         required: true
 *         description: Adresse e-mail du patient pour obtenir ses dossiers médicaux
 *     responses:
 *       200:
 *         description: Succès - renvoie les détails sur les dossiers médicaux du patient
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/record/get", async (req, res) => {
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
    const professional: any = jwt_decode(token);
    try {
        res
        .status(200)
        .send(
            await resolverGetRecord(
            record,
            patientEmail,
            professional.data.email,
            ),
        );
    } catch (err : any) {
        res.status(404).send(err.message);
    }
});

/**
 * @swagger
 * /record/update:
 *   post:
 *     summary: Met à jour un dossier médical
 *     description: Met à jour un dossier médical en utilisant le token d'authentification
 *     tags:
 *       - Record
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
 *             description:
 *               type: string
 *             type:
 *               type: string
 *             patientEmail:
 *               type: string
 *             id:
 *               type: string
 *         required: true
 *         description: Détails pour mettre à jour le dossier médical
 *     responses:
 *       200:
 *         description: Succès - renvoie des détails sur le dossier médical mis à jour
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 */
router.post("/record/update", async (req, res) => {
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
    const { description, type, patientEmail, id } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res
        .status(200)
        .send(
            await resolverUpdateRecord(
            id,
            record,
            description,
            type,
            patientEmail,
            professional.data.email,
            ),
        );
    } catch (err : any) {
        res.status(404).send(err.message);
    }
});

module.exports = router;