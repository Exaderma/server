import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bytea", nullable: false })
  data: Buffer;

  @Column({ type: "text", nullable: true })
  filename: string;

  @Column({ type: "text", nullable: true })
  mimetype: string;

  @Column({ type: "text", nullable: false })
  type: string;
}
