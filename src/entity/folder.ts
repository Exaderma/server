import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('folder')
export class FolderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'Default', nullable: false })
  name: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE', nullable: false, name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'integer', nullable: false, name: 'patient_id' })
  patientId: number;
}