import "reflect-metadata";
import { DataSource } from "typeorm";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";

export class Register {
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

    this.client
      .initialize()
      .then(() => {
        console.log("register repository initialized");
      })
      .catch((err) => {
        console.log("register repository failed to initialize");
        console.log(err);
      });
  }

  public async insertUser(
    user: PatientEntity | ProfessionalEntity,
  ): Promise<string> {
    const repo = this.client.getRepository(user.constructor.name);
    console.log("user.constructor.name: ", user.constructor.name);
    const foundUser = await repo.findOne({ where: { email: user.email } });
    if (foundUser) {
      throw new Error("User already exists");
    }
    const newUser = repo.create(user);
    await repo.save(newUser);
    return "ok";
  }

  public async printPatients(): Promise<void> {
    const repo = this.client.getRepository(PatientEntity);
    const patients = await repo.find();
    console.log(patients);
  }

  public async printProfessionals(): Promise<void> {
    const repo = this.client.getRepository(ProfessionalEntity);
    const professionals = await repo.find();
    console.log(professionals);
  }
}
