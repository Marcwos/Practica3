import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class rseguimiento {
    @PrimaryGeneratedColumn("uuid")
    id_seguimiento: string;

    @Column()
    titulo!: string;

    @Column({ nullable: true })
    observaciones?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_seguimiento: Date;

    @Column()
    id_animal: string;

    @Column()
    id_supervisor: string;
}