import "reflect-metadata";
import { DataSource } from "typeorm";
import { LinkEntity } from "../../entity/link";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";
import { Mail } from "../../mail/mail";
import { generateRandomNumber } from "../../utils/code";
import { RepositoryLink } from "../api/domain";

let mail = new Mail({
  username: process.env.MAIL_USERNAME as string,
  apiKey: process.env.MAIL_API_KEY as string,
});

export class Link implements RepositoryLink {
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

    this.dbClient
      .initialize()
      .then(() => {
        console.log("Link repository initialized");
      })
      .catch((err) => {
        console.log("Link repository failed to initialize");
        console.log(err);
      });
  }

  public async LinkPatientToDoctor(
    code: number,
    patientEmail: string,
  ): Promise<string> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
      where: { code: String(code) },
    });
    if (!doctor) {
      return "Doctor not found";
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
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

  public async LinkDoctorToPatient(
    doctorEmail: string,
    email: string,
  ): Promise<string> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
      where: { email: doctorEmail },
    });
    if (!doctor) {
      return "Doctor not found";
    }

    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: email },
    });
    if (!patient) {
      return "Patient not found";
    }

    const link = await this.dbClient.manager.findOne(LinkEntity, {
      where: { doctorId: doctor.id, patientId: patient.id },
    });
    if (link) {
      return "Link already exists";
    }

    const generatedCode = generateRandomNumber(6);
    doctor.code = String(generatedCode);
    await this.dbClient.manager.save(doctor);
    await mail.sendCode(
      "erwan-baillon@orange.fr",
      doctor.email,
      String(generatedCode),
    );
    return String(generatedCode);
  }

  /**
   * Get all doctors linked to a patient
   * @param patientId
   * @returns
   * @memberof Link
   */
  public async getLinkPatient(patientEmail: string): Promise<any> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });

    if (!patient) {
      return "Patient not found";
    }
    const link = await this.dbClient.manager.findOne(LinkEntity, {
      where: { patientId: patient.id },
    });
    if (!link) {
      return "Link not found";
    }
    const doctor = await this.dbClient.manager.find(ProfessionalEntity);
    if (!doctor) {
      return "Doctor not found";
    }
    // get all patients
    return doctor;
  }

  /**
   * Get all patients linked to a doctor
   * @param doctorId
   * @returns
   * @memberof Link
   */
  public async getLinkDoctor(doctorEmail: string): Promise<any> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
      where: { email: doctorEmail },
    });
    if (!doctor) {
      return "Doctor not found";
    }
    const link = await this.dbClient.manager.find(LinkEntity, {
      where: { doctorId: doctor.id },
    });
    console.log(link);
    if (!link) {
      return "Link not found";
    }
    const patient = link.filter(async (el) => {
      return await this.dbClient.manager.findOne(PatientEntity, {
        where: { id: el.patientId },
      });
    });
    if (!patient) {
      return "Patient not found";
    }
    return patient;
  }
}
