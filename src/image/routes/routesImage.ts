import express from "express";
import jwtDecode from "jwt-decode";
import { resolverSetPatientImageProfile, resolverGetPatientImageProfile } from "../api/resolver";
import { Image } from "../repository/image";

const imageRouter = express.Router();
const image = new Image();

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