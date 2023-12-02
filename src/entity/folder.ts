import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('folder')
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'Default', nullable: false })
  name: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE', nullable: false, name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'integer', nullable: true, name: 'image_id' })
  imageId: number | null;

  @Column({ type: 'integer', nullable: true, name: 'patient_id' })
  patientId: number | null;
}