import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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
