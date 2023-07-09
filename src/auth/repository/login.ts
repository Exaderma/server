import "reflect-metadata"
import { DataSource } from "typeorm"
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";
import { comparePassword } from "../../utils/security/hashing";

export class Login {
  private client: DataSource;
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
      console.log("login repository initialized");
    })
    .catch((err) => {
      console.log("login repository failed to initialize");
      console.log(err);
    });
  }

  public async checkUserCredentials(email: string, password: string, entity: Function): Promise<string> {    
    const repo = this.client.getRepository(entity);
    const foundUser = await repo.findOne({ where: { email: email } });
    if (!foundUser) {
      throw new Error("User not found");
    }
    if (!comparePassword(password, foundUser.password)) {
      throw new Error("Wrong password");
    }
    return "ok";
  }
}
