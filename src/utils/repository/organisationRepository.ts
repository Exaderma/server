import "reflect-metadata";
import { DataSource } from "typeorm";
import { OrganisationEntity } from "../../entity/organisation";

export class OrganisationRepository {
  private client: DataSource;

  constructor() {
    this.client = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [OrganisationEntity],
      synchronize: true,
      logging: false,
    });

    this.client
      .initialize()
      .then(() => {
        console.log("Organisation repository initialized");
      })
      .catch((err) => {
        console.log("Organisation repository failed to initialize");
        console.log(err);
      });
  }

  public async createOrganisation(organisation: OrganisationEntity): Promise<void> {
      const repo = this.client.getRepository(OrganisationEntity);
      const foundUser = await repo.findOne({ where: { name: organisation.name } });
      if (foundUser) {
        throw new Error("Organisation already exists");
      }
      const newOrg = repo.create(organisation);
      await repo.save(newOrg);
  }

  public async deleteOrganisation(id: number): Promise<void> {
      const repo = this.client.getRepository(OrganisationEntity);
      const foundUser = await repo.findOne({ where: { id: id } });
      if (!foundUser) {
        throw new Error("Organisation does not exist");
      }
      await repo.remove(foundUser);
  }

  public async getOrganisationId(name: string): Promise<number> {
    const repo = this.client.getRepository(OrganisationEntity);
    const foundUser = await repo.findOne({ where: { name: name } });
    if (!foundUser) {
      throw new Error("Organisation does not exist");
    }
    return foundUser.id;
  }
}
