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

  /**
   * Link a patient to a doctor
   * @param doctorId
   * @param patientId
   * @returns success or error
   * @memberof Link
   */
  public async LinkPatientToDoctor(
    code: number,
    patientEmail: string,
  ): Promise<string> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
      where: { code: String(code) },
    });
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    const link = new LinkEntity();
    link.doctorId = doctor.id;
    link.patientId = patient.id;
    await this.dbClient.manager.save(link);
    return "success";
  }

  /**
   * Link a doctor to a patient
   * @param doctorId
   * @param patientId
   * @returns success or error
   * @memberof Link
   */
  public async LinkDoctorToPatient(
    doctorEmail: string,
    email: string,
  ): Promise<string> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
      where: { email: doctorEmail },
    });
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: email },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }

    const link = await this.dbClient.manager.findOne(LinkEntity, {
      where: { doctorId: doctor.id, patientId: patient.id },
    });
    if (link) {
      throw new Error("Link already exists");
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
   * @returns all information about the doctors
   * @memberof Link
   */
  public async getLinkPatient(patientEmail: string): Promise<any> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }
    const links = await this.dbClient.manager.find(LinkEntity, {
      where: { patientId: patient.id },
    });
    console.log(links);
    if (!links) {
      throw new Error("Link not found");
    }
    const doctors: any[] = [];

  for (const link of links) {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
      where: { id: link.doctorId },
    });
    console.log(doctor);
    if (doctor) doctors.push(doctor);
  }

  if (doctors.length === 0) {
    throw new Error("Doctor not found");
  }

  return doctors;
  }

  /**
   * Get all patients linked to a doctor
   * @param doctorId
   * @returns all information about the patients
   * @memberof Link
   */
  public async getLinkDoctor(doctorEmail: string): Promise<any> {
    const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
      where: { email: doctorEmail },
    });
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    const links = await this.dbClient.manager.find(LinkEntity, {
      where: { doctorId: doctor.id },
    });
    if (!links) {
      throw new Error("Link not found");
    }
    const patients: any[] = [];

  for (const link of links) {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { id: link.patientId },
    });

    if (patient) patients.push(patient);
  }

  if (patients.length === 0) {
    throw new Error("Patient not found");
  }

  return patients;
  }
}
