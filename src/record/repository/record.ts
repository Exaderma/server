import "reflect-metadata";
import { DataSource } from "typeorm";
import { RecordEntity } from "../../entity/record";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";
import { RepositoryRecord } from "../api/domain";

export class Record implements RepositoryRecord {
  private dbClient: DataSource;
  constructor() {
    this.dbClient = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [RecordEntity, PatientEntity, ProfessionalEntity],
      synchronize: true,
      logging: false,
    });

    this.dbClient
      .initialize()
      .then(() => {
        console.log("Record repository initialized");
      })
      .catch((err) => {
        console.log("Record repository failed to initialize");
        console.log(err);
      });
    }

    public async NewRecord(
        description: string,
        type: string,
        patientEmail: string,
        doctorEmail: string,
    ): Promise<string> {
        const patient = await this.dbClient.manager.findOne(PatientEntity, {
            where: { email: patientEmail },
        });
        if (!patient) {
            throw new Error("Patient not found");
        }
        const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
            where: { email: doctorEmail },
        });
        if (!doctor) {
            throw new Error("Doctor not found");
        }
        const record = new RecordEntity();
        record.description = description;
        record.type = type;
        record.patientId = patient.id;
        record.doctorId = doctor.id;
        record.date = new Date();
        await this.dbClient.manager.save(record);
        return "Success";
    }

    public async GetRecord(
        patientEmail: string,
        doctorEmail: string,
    ): Promise<any> {
        const patient = await this.dbClient.manager.findOne(PatientEntity, {
            where: { email: patientEmail },
        });
        if (!patient) {
            throw new Error("Patient not found");
        }
        const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
            where: { email: doctorEmail },
        });
        if (!doctor) {
            throw new Error("Doctor not found");
        }
        const record = await this.dbClient.manager.find(RecordEntity, {
            where: { patientId: patient.id, doctorId: doctor.id },
        });
        if (!record) {
            throw new Error("Record not found");
        }
        return record;
    }

    public async UpdateRecord(
        id: number,
        description: string,
        type: string,
        patientEmail: string,
        doctorEmail: string,
    ): Promise<string> {
        const patient = await this.dbClient.manager.findOne(PatientEntity, {
            where: { email: patientEmail },
        });
        if (!patient) {
            throw new Error("Patient not found");
        }
        const doctor = await this.dbClient.manager.findOne(ProfessionalEntity, {
            where: { email: doctorEmail },
        });
        if (!doctor) {
            throw new Error("Doctor not found");
        }
        const record = await this.dbClient.manager.findOne(RecordEntity, {
            where: { patientId: patient.id, doctorId: doctor.id, id: id },
        });
        if (!record) {
            throw new Error("Record not found");
        }
        record.description = description;
        record.type = type;
        await this.dbClient.manager.save(record);
        return "Success";
    }
}