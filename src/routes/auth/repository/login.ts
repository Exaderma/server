import "reflect-metadata";
import { DataSource } from "typeorm";
import { PatientEntity } from "../../../entity/patient";
import { ProfessionalEntity } from "../../../entity/professional";
import { comparePassword } from "../../../utils/security/hashing";

/**
 * @description
 * This class is used to check the credentials of a user in the database and handle everything related to the login process.
 */

export class Login {
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
        console.log("login repository initialized");
      })
      .catch((err) => {
        console.log("login repository failed to initialize");
        console.log(err);
      });
  }

  public async getUserId(mail: string, entity: Function): Promise<number> {
    const repo = this.client.getRepository(entity);
    const foundUser = await repo.findOne({ where: { email: mail } });
    if (foundUser) {
      return foundUser.id;
    }
    throw new Error("User not found");
  }

  /**
   * @description check the credentials of a user in the database based on the provided credentials
   * @param email email of the user
   * @param password password of the user
   * @param entity the type of the user (patient or professional)
   * @returns ok if the user is found and the password is correct, throws an error otherwise depending on the case
   *
   */
  public async checkUserCredentials(
    email: string,
    password: string,
    entity: Function,
  ): Promise<string> {
    const repo = this.client.getRepository(entity);
    const foundUser = await repo.findOne({ where: { email: email } });
    if (!foundUser) {
      throw new Error("User not found");
    }
    if (!comparePassword(password, foundUser.password)) {
      throw new Error("Wrong password");
    }
    return foundUser.id;
  }
}
