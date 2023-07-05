import express from "express";
import {
  resolverLinkDoctorToPatient,
  resolverLinkPatientToDoctor,
} from "../api/resolver";
import { Link } from "../repository/link";

let router = express.Router();
let link = new Link();

router.get("/patient/link", async (req, res) => {
  res.send(await resolverLinkPatientToDoctor(link));
});

router.post("/professional/link", async (req, res) => {
  res.send(await resolverLinkDoctorToPatient(link));
});

module.exports = router;
