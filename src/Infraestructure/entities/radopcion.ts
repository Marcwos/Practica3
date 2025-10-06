import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "adopcion" })
export class radopcion {
    @PrimaryGeneratedColumn("uuid")
    id_adopcion: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })

    @Column()
    estado: string;

    @Column()
    id_publicacion: string;

    @Column()
    id_usuario: string;

}