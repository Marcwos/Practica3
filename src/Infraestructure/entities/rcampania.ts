import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class rcampania {
    @PrimaryGeneratedColumn("uuid")
    id_campania: string;

    @Column()
    id_tipo_campania: string;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descripcion?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_inicio: Date;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_fin: Date;

    @Column({ nullable: true })
    lugar?: string;

    @Column({ nullable: true })
    organizador?: string;

    @Column()
    estado: string;
}