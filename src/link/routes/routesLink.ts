import express from "express";
import {
  resolverGetLinkDoctor,
  resolverGetLinkPatient,
  resolverLinkDoctorToPatient,
  resolverLinkPatientToDoctor,
} from "../api/resolver";
import { Link } from "../repository/link";
import jwt_decode from "jwt-decode";

let router = express.Router();
let link = new Link();

/**
 * Link a patient to a doctor
 * @returns success or error
 * @memberof Link
 * @swagger
 * /patient/link:
 *  post:
 *   description: Link a patient to a doctor
 *  tags:
 *  - patient
 * parameters:
 * - in: body
 *  name: body
 * description: Link a patient to a doctor
 * required: true
 * schema:
 * type: object
 * properties:
 * code:
 * type: number
 * - in: header
 * name: Authorization
 * description: The token obtained at login
 * required: true
 * type: string
 * responses:
 * 201:
 * description: Link created
 * 404:
 * description: Link not found
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
        await resolverLinkPatientToDoctor(link, code, patientId.date.email)
      );
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * Get the link of a patient
 * @returns success or error
 * @memberof Link
 * @swagger
 * /patient/getLink:
 * get:
 * description: Get the link of a patient
 * tags:
 * - patient
 * - professional
 * - link
 * parameters:
 * - in: header
 * name: Authorization
 * description: The token obtained at login
 * required: true
 * type: string
 * responses:
 * 200:
 * description: Link found
 * 404:
 * description: Link not found
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
  const patientId: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(await resolverGetLinkPatient(link, patientId.date.email));
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * Link a doctor to a patient
 * @returns success or error
 * @memberof Link
 * @swagger
 * /professional/link:
 * post:
 * description: Link a doctor to a patient
 * tags:
 * - patient
 * - professional
 * - link
 * parameters:
 * - in: body
 * name: body
 * description: Link a doctor to a patient
 * required: true
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * - in: header
 * name: Authorization
 * description: The token obtained at login
 * required: true
 * type: string
 * responses:
 * 200:
 * description: mail sent
 * 404:
 * description: Patient not found or doctor not found
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
  const doctorId: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(await resolverLinkDoctorToPatient(link, doctorId.date.email, email));
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

/**
 * Get the link of a doctor
 * @returns success or error
 * @memberof Link
 * @swagger
 * /professional/getLink:
 * get:
 * description: Get the link of a doctor
 * tags:
 * - patient
 * - professional
 * - link
 * parameters:
 * - in: header
 * name: Authorization
 * description: The token obtained at login
 * required: true
 * type: string
 * responses:
 * 200:
 * description: Link found
 * 404:
 * description: Link not found
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
  const doctorId: any = jwt_decode(token);
  try {
    res
      .status(200)
      .send(await resolverGetLinkDoctor(link, doctorId.date.email));
  }
  catch (err: any) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
