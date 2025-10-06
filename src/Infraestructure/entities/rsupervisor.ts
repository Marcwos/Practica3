import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "supervisor" })
export class Supervisor{ 
    @PrimaryGeneratedColumn("uuid")
    id_supervisor!: string;

    @Column()
    nombre!: string;

    @Column()
    total_animales!: number;

    @Column({ nullable: true })
    id_refugio?: string; 

    @Column({ nullable: true })
    id_animal?: string;

}