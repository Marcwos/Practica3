import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "animal" })
export class Animal {
    @PrimaryGeneratedColumn("uuid")
    id_animal!: string;
    @Column()
    nombre!: string;
    @Column()
    id_especie!: string;
    @Column()
    edad!: string;
    @Column()
    estado!: string;
    @Column({ nullable: true, type: "text" })
    descripcion?: string;
    @Column("text", { array: true, nullable: true })
    fotos?: string[];
    @Column()
    estado_adopcion!: string;
    @Column()
    id_refugio!: string;
}