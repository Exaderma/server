import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "record" })
export class RecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "patient_id" })
  patientId: number;

  @Column({ name: "doctor_id" })
  doctorId: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  type: string;
}
