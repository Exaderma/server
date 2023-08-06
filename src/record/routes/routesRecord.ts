import express from "express";
import jwt_decode from "jwt-decode";
import { resolverNewRecord, resolverGetRecord, resolverUpdateRecord } from "../api/resolver";
import { Record } from "../repository/record";

let router = express.Router();
let record = new Record();

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
    const { description, type, patientEmail, doctorEmail } = req.body;
    const patientId: any = jwt_decode(token);
    try {
        res
        .status(201)
        .send(
            await resolverNewRecord(
            record,
            description,
            type,
            patientEmail,
            doctorEmail,
            ),
        );
    } catch (err : any) {
        res.status(404).send(err.message);
    }
});

router.get("/record/get", async (req, res) => {
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
    const { patientEmail, doctorEmail } = req.body;
    const patientId: any = jwt_decode(token);
    try {
        res
        .status(200)
        .send(
            await resolverGetRecord(
            record,
            patientEmail,
            doctorEmail,
            ),
        );
    } catch (err : any) {
        res.status(404).send(err.message);
    }
});

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
    const { description, type, patientEmail, doctorEmail } = req.body;
    const patientId: any = jwt_decode(token);
    try {
        res
        .status(200)
        .send(
            await resolverUpdateRecord(
            record,
            description,
            type,
            patientEmail,
            doctorEmail,
            ),
        );
    } catch (err : any) {
        res.status(404).send(err.message);
    }
});

module.exports = router;