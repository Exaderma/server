import express from "express";
import {
  resolverLinkDoctorToPatient,
  resolverLinkPatientToDoctor,
} from "../api/resolver";
import { Link } from "../repository/link";

let router = express.Router();
let link = new Link();

router.get("/patient/link", async (req, res) => {
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
  const result = await resolverLinkDoctorToPatient(link);
  res.send(result);
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
  res.send(await resolverLinkDoctorToPatient(link));
});

module.exports = router;
