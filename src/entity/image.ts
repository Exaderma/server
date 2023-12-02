import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "image" })
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  type: string;

  @Column({ type: 'bytea', nullable: false })
  data: Buffer;

  @Column({ type: 'text', nullable: true })
  filename: string | null;

  @Column({ type: 'date', default: () => 'CURRENT_DATE', nullable: false, name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'integer', nullable: true, name: 'folder_id' })
  folderId: number | null;
}
