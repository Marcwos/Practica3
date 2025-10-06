import { Campania } from "../entities/campania";

export interface CampaniaCreator {
    id_tipo_campania: string; // FK a TIPO_CAMPANIA
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    lugar?: string;
    organizador?: string;
    estado: string;
}

export interface CampaniaUpdater {
    id_tipo_campania?: string;
    titulo?: string;
    descripcion?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    lugar?: string;
    organizador?: string;
    estado?: string;
}

export interface ICampania {
    insert(campania: CampaniaCreator, callback: (err: Error | null, result?: Campania) => void): void;
    getById(id: string) : Promise<Campania | null>;
    getAll(): Promise<Campania[]>;
    update(id: string, data: CampaniaUpdater): Promise<Campania | null>;
    delete(id: string): Promise<boolean>;
}
