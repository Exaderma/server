import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  OrganisationEntity,
  OrganisationMember,
} from "../../entity/organisation";

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
      entities: [OrganisationEntity, OrganisationMember],
      synchronize: true,
      logging: false,
    });

    this.client
      .initialize()
      .then(() => {
        console.log("Organisation repositories initialized");
      })
      .catch((err) => {
        console.log("Organisation repositories failed to initialize");
        console.log(err);
      });
  }

  public async createOrganisation(
    organisation: OrganisationEntity,
    user: { id: number; type: string },
  ): Promise<void> {
    const repo = this.client.getRepository(OrganisationEntity);
    const memberRepo = this.client.getRepository(OrganisationMember);
    const founder = user;

    const foundUser = await repo.findOne({
      where: { name: organisation.name },
    });
    if (foundUser) {
      throw new Error("Organisation already exists");
    }
    const newOrg = repo.create(organisation);
    await repo.save(newOrg);

    const newFounder = memberRepo.create({
      organisationId: newOrg.id,
      userId: founder.id,
      userType: founder.type,
      role: "admin",
    });
    await memberRepo.save(newFounder);
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
      return -1;
    }
    return foundUser.id;
  }

  public async isAdmin(
    userId: number,
    organisationId: number,
  ): Promise<boolean> {
    const repo = this.client.getRepository(OrganisationMember);
    const foundUser = await repo.findOne({
      where: { userId: userId, organisationId: organisationId },
    });
    if (!foundUser) {
      return false;
    }
    if (foundUser.role === "admin") return true;
    return false;
  }

  public async addMember(
    organisationId: number,
    member: { id: number; type: string },
  ): Promise<void> {
    const repo = this.client.getRepository(OrganisationMember);
    const foundUser = await repo.findOne({
      where: { userId: member.id, organisationId: organisationId },
    });
    if (foundUser) {
      throw new Error("User already in organisation");
    }
    const newMember = repo.create({
      organisationId: organisationId,
      userId: member.id,
      userType: member.type,
      role: "member",
    });
    await repo.save(newMember);
    console.log("new member", newMember);
  }

  public async setRole(
    organisationId: number,
    member: { id: number; type: string },
    role: string,
  ): Promise<void> {
    const repo = this.client.getRepository(OrganisationMember);
    const foundUser = await repo.findOne({
      where: { userId: member.id, organisationId: organisationId },
    });
    if (!foundUser) {
      throw new Error("User not in organisation");
    }
    foundUser.role = role;
    await repo.save(foundUser);
    console.log("found user", foundUser);
  }
}
