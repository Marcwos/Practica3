import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class rcampania {
    @PrimaryGeneratedColumn("uuid")
    id_campania: string;

    @Column()
    nombre: string;
}