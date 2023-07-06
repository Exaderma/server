import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "link" }) // Spécifiez le nom de la table si nécessaire
export class LinkEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "patient_id" })
  patientId: number;

  @Column({ name: "doctor_id" })
  doctorId: number;
}