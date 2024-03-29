import "reflect-metadata";
import { DataSource } from "typeorm";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";

type userProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  roles: string[];
};

export class DataManipulation {
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
        console.log("DataManipulation repository initialized");
      })
      .catch((err) => {
        console.log("DataManipulation repository failed to initialize");
        console.log(err);
      });
  }

  public async doesUserExists(
    email: string,
    entity: Function,
  ): Promise<boolean> {
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
      const returnedData: userProfileData = {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        admin: foundUser.admin,
        roles: foundUser.roles,
      };
      return returnedData;
    }
    throw new Error("User not found");
  }

  public async getUserId(email: string, entity: Function): Promise<number> {
    const repo = this.client.getRepository(entity);
    const foundUser = await repo.findOne({ where: { email: email } });
    if (!foundUser) {
      return -1;
    }
    return foundUser.id;
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
