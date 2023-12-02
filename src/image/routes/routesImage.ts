import express from "express";
import jwtDecode from "jwt-decode";
import {
  resolverSetPatientImageProfile,
  resolverGetPatientImageProfile,
  resolverGetProfessionalImageProfile,
  resolverSetProfessionalImageProfile,
  resolverGetAllFolder,
  resolverSetImageGallery,
  resolverGetImageGallery
} from "../api/resolver";
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
    res
      .status(201)
      .send(
        await resolverSetPatientImageProfile(image, data, patient.data.email),
      );
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
 *       - in: path
 *         name: id_patient
 *         schema:
 *           type: integer
 *         required: false
 *         description: Identifiant du patient
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
  const { id_patient } = req.body;
  const patient: any = jwtDecode(token);
  try {
    if (id_patient) {
      res
        .status(200)
        .send(
          await resolverGetPatientImageProfile(
            image,
            patient.data.email,
            id_patient,
          ),
        );
    } else {
      res
        .status(200)
        .send(await resolverGetPatientImageProfile(image, patient.data.email));
    }
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
    res
      .status(201)
      .send(
        await resolverSetProfessionalImageProfile(
          image,
          data,
          professional.data.email,
        ),
      );
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
 *       - in: path
 *         name: id_professional
 *         schema:
 *           type: integer
 *         required: false
 *         description: Identifiant du professionnel de santé
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
  const { id_professional } = req.body;
  const professional: any = jwtDecode(token);
  try {
    if (id_professional) {
      res
        .status(200)
        .send(
          await resolverGetProfessionalImageProfile(
            image,
            professional.data.email,
            id_professional,
          ),
        );
    } else {
      res
        .status(200)
        .send(
          await resolverGetProfessionalImageProfile(
            image,
            professional.data.email,
          ),
        );
    }
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /image/gallery/add:
 *   post:
 *     summary: Ajoute une image à la galerie d'un patient
 *     description: Ajoute une image à la galerie d'un patient en utilisant un token d'authentification.
 *     tags:
 *       - Image
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token) du patient
 *       - in: body
 *         name: body
 *         description: Données de l'image à ajouter à la galerie
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Données de l'image encodées
 *     responses:
 *       201:
 *         description: Image ajoutée avec succès à la galerie
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message de succès
 *               example: "Success"
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message d'erreur
 *               example: "Unauthorized"
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message d'erreur détaillé
 *               example: "Image not found"
 */
imageRouter.post("/image/gallery/add", async (req, res) => {
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
    res
      .status(201)
      .send(
        await resolverSetImageGallery(image, data, patient.data.email),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /image/gallery/get:
 *   post:
 *     summary: Récupère les images de la galerie d'un patient
 *     description: Récupère les images de la galerie d'un patient en utilisant un token d'authentification.
 *     tags:
 *       - Image
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token) du patient
 *       - in: body
 *         name: body
 *         description: ID du patient (optionnel)
 *         required: false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_patient:
 *                   type: string
 *                   description: ID du patient (optionnel)
 *     responses:
 *       200:
 *         description: Images récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     description: Données de l'image encodées
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message d'erreur
 *               example: "Unauthorized"
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message d'erreur détaillé
 *               example: "Images not found"
 */
imageRouter.post("/image/gallery/get", async (req, res) => {
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
  const { id_patient } = req.body;
  const patient: any = jwtDecode(token);
  try {
    if (id_patient) {
      res
        .status(200)
        .send(
          await resolverGetImageGallery(
            image,
            patient.data.email,
            id_patient,
          ),
        );
    } else {
      res
        .status(200)
        .send(await resolverGetImageGallery(image, patient.data.email));
    }
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /image/folder/get:
 *   get:
 *     summary: Récupère toutes les informations sur les dossiers d'un professionnel de santé
 *     description: Récupère toutes les informations sur les dossiers d'un professionnel de santé en utilisant un token d'authentification.
 *     tags:
 *       - Image
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token d'authentification JWT (Bearer token) du professionnel de santé
 *     responses:
 *       200:
 *         description: Informations sur les dossiers récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID du dossier
 *                   name:
 *                     type: string
 *                     description: Nom du dossier
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         image:
 *                           type: string
 *                           description: Données de l'image encodées
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message d'erreur
 *               example: "Unauthorized"
 *       404:
 *         description: Ressource non trouvée ou autre erreur
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Message d'erreur détaillé
 *               example: "Folders not found"
 */
imageRouter.get("/image/folder/get", async (req, res) => {
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
    res
      .status(200)
      .send(
        await resolverGetAllFolder(image, professional.data.email),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

module.exports = imageRouter;
