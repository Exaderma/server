import express from "express";
import {
  resolverLinkDoctorToPatient,
  resolverLinkPatientToDoctor,
} from "../api/resolver";
import { Link } from "../repository/link";
import jwt_decode from "jwt-decode";

let router = express.Router();
let link = new Link();

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
  // TODO : add jwt_decode(token) to get patientId
<<<<<<< HEAD
  const patientId : any = jwt_decode(token);
=======
  const patientId = 1;
>>>>>>> 2fb2b8dc7c49b1436dd56e507c49730be64973fe
  const result = await resolverLinkPatientToDoctor(link, code, patientId);
  res.status(201).send(result);
});

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
  // TODO : add jwt_decode(token) to get patientId
<<<<<<< HEAD
  const patientId : any = jwt_decode(token);
=======
  const patientId = 1;
>>>>>>> 2fb2b8dc7c49b1436dd56e507c49730be64973fe
  res.status(200).send(await link.getLinkPatient(patientId));
});

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
  // TODO : add jwt_decode(token) to get doctorId
<<<<<<< HEAD
  const doctorId : any = jwt_decode(token);
=======
  const doctorId = 1;
>>>>>>> 2fb2b8dc7c49b1436dd56e507c49730be64973fe
  res.status(200).send(await resolverLinkDoctorToPatient(link, doctorId, email));
});

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
  // TODO : add jwt_decode(token) to get doctorId
<<<<<<< HEAD
  const doctorId : any = jwt_decode(token);
=======
  const doctorId = 1;
>>>>>>> 2fb2b8dc7c49b1436dd56e507c49730be64973fe
  res.status(200).send(await link.getLinkDoctor(doctorId));
});

module.exports = router;
