import "reflect-metadata";
import { DataSource } from "typeorm";
import { PatientEntity } from "../../../entity/patient";
import { ProfessionalEntity } from "../../../entity/professional";

/**
 * @description
 * This class is used to register the user on Exaderma and add it to the database. it handles all the registration process.
 */
export class Register {
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

    this.client
      .initialize()
      .then(() => {
        console.log("register repository initialized");
      })
      .catch((err: any) => {
        console.log("register repository failed to initialize");
        console.log(err);
      });
  }

  public async getUserId(
    user: PatientEntity | ProfessionalEntity,
  ): Promise<number> {
    const repo = this.client.getRepository(user.constructor.name);
    const foundUser = await repo.findOne({ where: { email: user.email } });
    if (foundUser) {
      return foundUser.id;
    }
    throw new Error("User not found");
  }

  /**
   * @description insert a user in the database
   * @param user the user to insert in the database
   * @returns ok if the user is inserted, throws an error otherwise depending on the case
   */
  public async insertUser(
    user: PatientEntity | ProfessionalEntity,
  ): Promise<string> {
    const repo = this.client.getRepository(user.constructor.name);
    const foundUser = await repo.findOne({ where: { email: user.email } });
    if (foundUser) {
      throw new Error("User already exists");
    }
    const newUser = repo.create(user);
    await repo.save(newUser);
    return newUser.id;
  }

  /**
   * @returns all the patients in the database
   */
  public async printPatients(): Promise<void> {
    const repo = this.client.getRepository(PatientEntity);
    const patients = await repo.find();
    console.log(patients);
  }

  /**
   * @returns all the professionals in the database
   */
  public async printProfessionals(): Promise<void> {
    const repo = this.client.getRepository(ProfessionalEntity);
    const professionals = await repo.find();
    console.log(professionals);
  }
}
