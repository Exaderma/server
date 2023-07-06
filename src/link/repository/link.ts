import "reflect-metadata"
import { DataSource } from "typeorm"
import { LinkEntity } from "../../entity/link";
import { PatientEntity } from "../../entity/patient";
import { DoctorEntity } from "../../entity/doctor";


export class Link {
  private dbClient: DataSource;
  constructor() {
    console.log(process.env.DB_HOST)
    this.dbClient = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [LinkEntity, PatientEntity, DoctorEntity],
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

  // TODO: Implement this
  public async LinkPatientToDoctor(): Promise<string> {
    const link = new LinkEntity();
    link.doctor_id = 1;
    link.patient_id = 2;
    await this.dbClient.manager.save(link);
    console.log("Link saved");
  
    return "Hello World!";
  }

  // TODO: Implement this
  public async LinkDoctorToPatient(): Promise<string> {
    const link = new LinkEntity();
    link.doctor_id = 1;
    link.patient_id = 2;
    await this.dbClient.manager.save(link);
    console.log("Link saved");

    return "Hello World!";
  }
}
