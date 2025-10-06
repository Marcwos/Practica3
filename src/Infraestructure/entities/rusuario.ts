import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class rcampania {
    @PrimaryGeneratedColumn("uuid")
    id_usuario: string;

    @Column()
    nombre!: string;

    @Column()
    email!: string;

    @Column()
    contrasenia!: string;

    @Column()
    telefono?: string;

    @Column()
    direccion?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_registro: Date;
}