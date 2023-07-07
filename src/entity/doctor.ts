import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "professional" }) // Spécifiez le nom de la table si nécessaire
export class DoctorEntity extends BaseEntity {
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

  @Column({ default: false })
  admin: boolean;

  @Column({ type: "json", default: () => "'[]'" })
  roles: any[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column()
  code: string;
}