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
  const patientId: any = jwt_decode(token);
  const result = await resolverLinkPatientToDoctor(link, code, patientId.id);
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
  const patientId: any = jwt_decode(token);
  res.status(200).send(await link.getLinkPatient(patientId.id));
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
  const doctorId: any = jwt_decode(token);
  res
    .status(200)
    .send(await resolverLinkDoctorToPatient(link, doctorId.id, email));
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
  const doctorId: any = jwt_decode(token);
  res.status(200).send(await link.getLinkDoctor(doctorId.id));
});

module.exports = router;
