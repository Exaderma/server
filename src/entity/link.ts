import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class LinkEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    patient_id: number

    @Column()
    doctor_id: number
}