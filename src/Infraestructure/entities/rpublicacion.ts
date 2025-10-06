import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class rcampania {
    @PrimaryGeneratedColumn("uuid")
    id_publicacion: string;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descripcion?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_subida: Date;

    @Column()
    estado: string;

    @Column()
    id_usuario: string;

    @Column()
    id_animal: string;
}