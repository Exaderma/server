import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "messages" })
export class MessagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "sender_id" })
  sender_id: number;

  @Column({ name: "sender_email" })
  sender_email: string;

  @Column({ name: "receiver_id" })
  receiver_id: number;

  @Column({ name: "receiver_email" })
  receiver_email: string;

  @Column({ name: "room_id" })
  room_id: number;

  @Column({ name: "message" })
  message: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
