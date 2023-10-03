import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "member" })
export class OrganisationMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "organisation_id" })
  organisationId: number;

  @Column({ name: "user_type" })
  userType: string;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "role" })
  role: string;
}

@Entity({ name: "organisation" })
export class OrganisationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ unique: false })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  code: string;
}
