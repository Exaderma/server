import express from "express";
import jwtDecode from "jwt-decode";
import {
  resolverSetPatientImageProfile,
  resolverGetPatientImageProfile,
  resolverGetProfessionalImageProfile,
  resolverSetProfessionalImageProfile,
  resolverGetAllFolder,
  resolverSetImageGallery,
  resolverGetImageGallery,
  resolverRemoveFolder,
  resolverRemoveImages,
  resolverRemoveImageGallery
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

/**
 * @swagger
 * /image/folder/remove:
 *   post:
 *     summary: Supprimer un dossier d'images
 *     description: Supprime un dossier d'images spécifié pour un professionnel authentifié.
 *     tags:
 *       - Image
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Jeton d'authentification JWT (Bearer Token)
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: id_folder
 *         description: ID du dossier à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dossier supprimé avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: Dossier supprimé avec succès
 *       401:
 *         description: Non autorisé
 *         content:
 *           text/plain:
 *             example: Unauthorized
 *       404:
 *         description: Le dossier spécifié n'a pas été trouvé
 *         content:
 *           text/plain:
 *             example: Dossier non trouvé
 */
imageRouter.post("/image/folder/remove", async (req, res) => {
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
  const { id_folder } = req.body;

  if (!id_folder) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    res
      .status(200)
      .send(
        await resolverRemoveFolder(image, professional.data.email, id_folder),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /image/remove/several:
 *   post:
 *     summary: Supprimer plusieurs images
 *     description: Supprime plusieurs images spécifiées pour un professionnel authentifié.
 *     tags:
 *       - Image
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Jeton d'authentification JWT (Bearer Token)
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: requestBody
 *         description: Informations nécessaires pour supprimer plusieurs images
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_folder:
 *                   type: string
 *                   description: ID du dossier contenant les images à supprimer
 *                 id_image:
 *                   type: string
 *                   description: ID des images à supprimer (peut être une liste d'IDs)
 *     responses:
 *       200:
 *         description: Images supprimées avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: Images supprimées avec succès
 *       401:
 *         description: Non autorisé
 *         content:
 *           text/plain:
 *             example: Unauthorized
 *       404:
 *         description: Les images spécifiées n'ont pas été trouvées
 *         content:
 *           text/plain:
 *             example: Images non trouvées
 */
imageRouter.post("/image/remove/several", async (req, res) => {
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
  const { id_folder, id_image } = req.body;

  if (!id_folder || !id_image) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    res
      .status(200)
      .send(
        await resolverRemoveImages(image, professional.data.email, id_folder, id_image),
      );
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * @swagger
 * /image/remove:
 *   post:
 *     summary: Supprimer une image
 *     description: Supprime une image spécifiée pour un professionnel authentifié.
 *     tags:
 *       - Image
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: Jeton d'authentification JWT (Bearer Token)
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: requestBody
 *         description: Informations nécessaires pour supprimer une image
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_patient:
 *                   type: string
 *                   description: (Facultatif) ID du patient associé à l'image
 *                 id_image:
 *                   type: string
 *                   description: ID de l'image à supprimer
 *     responses:
 *       200:
 *         description: Image supprimée avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: Image supprimée avec succès
 *       401:
 *         description: Non autorisé
 *         content:
 *           text/plain:
 *             example: Unauthorized
 *       404:
 *         description: L'image spécifiée n'a pas été trouvée
 *         content:
 *           text/plain:
 *             example: Image non trouvée
 */
imageRouter.post("/image/remove", async (req, res) => {
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
  const { id_patient, id_image } = req.body;

  if (!id_image) {
    res.status(401).send("id_image is missing");
    return;
  }
  try {
    if (id_patient) {
      res
        .status(200)
        .send(
          await resolverRemoveImageGallery(image, professional.data.email, id_image, id_patient),
        );
    } else {
      res
        .status(200)
        .send(
          await resolverRemoveImageGallery(image, professional.data.email, id_image),
        );
    }
  } catch (err: any) {
    res.status(404).send(err.message);
  }
});

module.exports = imageRouter;