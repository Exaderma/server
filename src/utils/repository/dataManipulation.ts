import "reflect-metadata"
import { DataSource } from "typeorm"
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";

/**
 * @description
 * This class is used to manipulate any kind of data regarding the users in the database.
 */ 
export class DataManipulation {
  private client: DataSource;
  /**
   * @description
   * This constructor initializes the database connection and allows to communicate with it.
   */
  constructor() {
    this.client = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [PatientEntity, ProfessionalEntity],
      synchronize: true,
      logging: false,
    });

    this.client.initialize()
    .then(() => {
      console.log("DataManipulation repository initialized");
    })
    .catch((err) => {
      console.log("DataManipulation repository failed to initialize");
      console.log(err);
    });
  }

  /**
   * @description check if a user exists in the database based on the provided email
   * @param email the email of the user to check
   * @param entity the type of the user (patient or professional)
   * @returns true if the user exists, throws an error otherwise
   */
  public async doesUserExists(email: string, entity: Function): Promise<boolean> {
    const repo = this.client.getRepository(entity);
    const foundUser = await repo.findOne({ where: { email: email } });
    if (foundUser) {
      return true;
    }
    throw new Error("User not found");
  }

  public async getUserProfile(id: string, entity: Function): Promise<any> {
    const repo = this.client.getRepository(entity);
    const foundUser = await repo.findOne({ where: { id: id } });
    if (foundUser) {
      return foundUser;
    }
    throw new Error("User not found");
  }

  /**
   * @description prints all the patients in the database
   */
  public async printPatients(): Promise<void> {
    const repo = this.client.getRepository(PatientEntity);
    const patients = await repo.find();
    console.log(patients);
  }

  /**
   * @description prints all the professionals in the database
   */
  public async printProfessionals(): Promise<void> {
    const repo = this.client.getRepository(ProfessionalEntity);
    const professionals = await repo.find();
    console.log(professionals);
  }
}
