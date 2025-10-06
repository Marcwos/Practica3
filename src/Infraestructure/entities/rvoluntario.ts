import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "voluntario" })
export class Voluntario {
    @PrimaryGeneratedColumn("uuid")
    id_voluntario!: string;

    @Column()
    rol!: string;
    
    @Column()
    estado!: string;

    @Column()
    id_usuario!: string; // FK a USUARIO

    @Column()
    id_campania!: string; // FK a CAMPANIA
}
