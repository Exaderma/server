import "reflect-metadata"
import { DataSource } from "typeorm"
import { LinkEntity } from "../../entity/link";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";
import { Mail } from "../../mail/mail";
import { generateRandomNumber } from "../../utils/code";

let mail = new Mail({
  username: process.env.MAIL_USERNAME as string,
  apiKey: process.env.MAIL_API_KEY as string,
});

export class Link {
  private dbClient: DataSource;
  constructor() {
    this.dbClient = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [LinkEntity, PatientEntity, ProfessionalEntity],
      synchronize: true,
      logging: false,
    });

    this.dbClient.initialize()
    .then(() => {
      console.log("Link repository initialized");
    })
    .catch((err) => {
      console.log("Link repository failed to initialize");
      console.log(err);
    });
  }

  public async LinkPatientToDoctor(code : number, patientId : number): Promise<string> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {where: {code: String(code)}});
    if (!doctor) {
      return "Doctor not found";
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {where: {id: patientId}});
    if (!patient) {
      return "Patient not found";
    }
    const link = new LinkEntity();
    link.doctorId = doctor.id;
    link.patientId = patient.id;
    await this.dbClient.manager.save(link);
    console.log("Link saved");
    return "success";
  }

  public async LinkDoctorToPatient(doctorId : number, email: string): Promise<string> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {where: {id: doctorId}});
    if (!doctor) {
      return "Doctor not found";
    }

    const patient = await this.dbClient.manager.findOne(PatientEntity, {where: {email: email}});
    if (!patient) {
      return "Patient not found";
    }

    const link = await this.dbClient.manager.findOne(LinkEntity, {where: {doctorId: doctor.id, patientId: patient.id}});
    if (link) {
      return "Link already exists";
    }

    const newLink = new LinkEntity();
    newLink.doctorId = doctor.id;
    newLink.patientId = patient.id;
    await this.dbClient.manager.save(newLink);

    const generatedCode = generateRandomNumber(6);
    doctor.code = String(generatedCode);
    await this.dbClient.manager.save(doctor);
    return "success";
  }

  public async getLinkPatient(patientId: number): Promise<any> {
    const link = await this.dbClient.manager.findOne(LinkEntity, {where: {patientId: patientId}});
    if (!link) {
      return "Link not found";
    }
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {where: {id: link.doctorId}});
    if (!doctor) {
      return "Doctor not found";
    }
    return doctor;
  }

  public async getLinkDoctor(doctorId: number): Promise<any> {
    const link = await this.dbClient.manager.findOne(LinkEntity, {where: {doctorId: doctorId}});
    if (!link) {
      return "Link not found";
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {where: {id: link.patientId}});
    if (!patient) {
      return "Patient not found";
    }
    return patient;
  }
}
