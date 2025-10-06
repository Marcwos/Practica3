import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "refugio"})
export class Refugio {
    @PrimaryGeneratedColumn("uuid")
    id_refugio!: string;

    @Column()
    nombre!: string;

    @Column({ nullable: true })
    direccion?: string;

    @Column({ nullable: true })
    telefono?: string;

    @Column({ nullable: true, type: "text" })
    descripcion?: string;
}
