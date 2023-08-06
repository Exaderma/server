import express from 'express';
import jwt_decode from 'jwt-decode';
import { resolverUpdatePatientEmail, resolverUpdatePatientFirstName, resolverUpdatePatientLastName, resolverUpdatePatientPassword, resolverUpdatePatientPhone, resolverUpdateProfessionalAddress, resolverUpdateProfessionalDepartment, resolverUpdateProfessionalEmail, resolverUpdateProfessionalFirstName, resolverUpdateProfessionalLastName, resolverUpdateProfessionalPassword, resolverUpdateProfessionalPhone } from '../api/resolver';
import { UpdateProfile } from '../repository/profile';

let router = express.Router();
let updateProfile = new UpdateProfile();

// Patient

router.post('/updateProfile/patient/firstName', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { firstName } = req.body;
    const patient: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdatePatientFirstName(patient.email, firstName, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/patient/lastName', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { lastName } = req.body;
    const patient: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdatePatientLastName(patient.email, lastName, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/patient/email', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { newEmail } = req.body;
    const patient: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdatePatientEmail(patient.email, newEmail, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/patient/password', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { password } = req.body;
    const patient: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdatePatientPassword(patient.email, password, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/patient/phone', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { phone } = req.body;
    const patient: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdatePatientPhone(patient.email, phone, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

// Professional

router.post('/updateProfile/professional/firstName', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { firstName } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdateProfessionalFirstName(professional.email, firstName, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/professional/lastName', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { lastName } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdateProfessionalLastName(professional.email, lastName, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/professional/email', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { newEmail } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdateProfessionalEmail(professional.email, newEmail, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/professional/password', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    const { password } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdateProfessionalPassword(professional.email, password, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/professional/phone', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
    }
    const token = auth?.split(' ')[1] ?? '';
    if (!token) {
        res.status(401).send('Unauthorized');
    }
    const { phone } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdateProfessionalPhone(professional.email, phone, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/professional/department', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
    }
    const token = auth?.split(' ')[1] ?? '';
    if (!token) {
        res.status(401).send('Unauthorized');
    }
    const { department } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdateProfessionalDepartment(professional.email, department, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

router.post('/updateProfile/professional/address', async (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.status(401).send('Unauthorized');
    }
    const token = auth?.split(' ')[1] ?? '';
    if (!token) {
        res.status(401).send('Unauthorized');
    }
    const { address } = req.body;
    const professional: any = jwt_decode(token);
    try {
        res.status(200).send(await resolverUpdateProfessionalAddress(professional.email, address, updateProfile));
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

module.exports = router;