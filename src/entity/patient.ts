import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "patient" }) // Spécifiez le nom de la table si nécessaire
export class PatientEntity extends BaseEntity {
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
  imageProfile: number;

  @Column({ default: false })
  admin: boolean;

  @Column({ type: "json", default: () => "'[]'" })
  roles: any[];

  @Column({ nullable: true })
  note: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
