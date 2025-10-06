import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "donacion"})
export class Donacion {
    @PrimaryGeneratedColumn("uuid")
    id_donacion!: string;

    @Column()
    monto!: number;

    @Column()
    fecha!: Date;

    @Column()
    id_usuario!: string; // FK a USUARIO

    @Column({ nullable: true })
    id_causa_urgente?: string; // FK a CAUSA_URGENTE (opcional en algunos flujos)
}
