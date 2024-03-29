import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "professional" }) // Spécifiez le nom de la table si nécessaire
export class ProfessionalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "firstName" })
  firstName: string;

  @Column({ name: "lastName" })
  lastName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ type: "json", default: () => "'[]'" })
  roles: any[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  code: string;

  @Column({ nullable: true })
  imageProfile: number;
}
