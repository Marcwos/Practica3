import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "causa_urgente" })
export class CausaUrgente {
    @PrimaryGeneratedColumn("uuid")
    id_causa_urgente!: string;
        
    @Column()
    titulo!: string;

    @Column()
    descripcion?: string;

    @Column()
    meta!: number;

    @Column()
    fecha_limite!: Date;

    @Column({ nullable: true })
    id_refugio?: string;

    @Column({ nullable: true })
    id_animal?: string;
}
