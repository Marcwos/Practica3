import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "tipo_campania"})
export class TipoCampania {
    @PrimaryGeneratedColumn("uuid")
    id_tipo_campania!: string;

    @Column()
    nombre!: string;

    @Column({ nullable: true, type: "text" })
    descripcion?: string;
}