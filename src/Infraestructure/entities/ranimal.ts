import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RAnimal {
    @PrimaryGeneratedColumn("uuid")
    id_ranimal: string;
    @Column()

    