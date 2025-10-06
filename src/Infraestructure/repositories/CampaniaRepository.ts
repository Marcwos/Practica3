import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ICampania, CampaniaCreator, CampaniaUpdater } from "../../Domain/repositories/icampania";
import { Campania as DomainCampania } from "../../Domain/entities/campania";
import { Campania as RCampania } from "../entities/rcampania";

export class CampaniaRepository implements ICampania {
    private repository: Repository<RCampania>;

    constructor() {
        this.repository = AppDataSource.getRepository(RCampania);
    }

    insert(campania: CampaniaCreator, callback: (err: Error | null, result?: DomainCampania) => void): void {
        this.createCampania(campania)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async getById(id: string): Promise<DomainCampania | null> {
        const campania = await this.repository.findOne({
            where: { id_campania: id },
            relations: ["tipo_campania"]
        });
        return campania ? this.toDomainEntity(campania) : null;
    }

    async getAll(): Promise<DomainCampania[]> {
        const campanias = await this.repository.find({
            relations: ["tipo_campania"]
        });
        return campanias.map(this.toDomainEntity);
    }

    async update(id: string, data: CampaniaUpdater): Promise<DomainCampania | null> {
        await this.repository.update({ id_campania: id }, data);
        const updatedCampania = await this.repository.findOne({
            where: { id_campania: id },
            relations: ["tipo_campania"]
        });
        if (!updatedCampania) {
            return null;
        }
        return this.toDomainEntity(updatedCampania);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_campania: id });
        return (result.affected ?? 0) > 0;
    }

    private async createCampania(campaniaData: CampaniaCreator): Promise<DomainCampania> {
        const rCampania = this.toInfrastructureEntity(campaniaData);
        const savedCampania = await this.repository.save(rCampania);
        return this.toDomainEntity(savedCampania);
    }

    private toDomainEntity(rCampania: RCampania): DomainCampania {
        const domainCampania: DomainCampania = {
            id_campania: rCampania.id_campania,
            titulo: rCampania.titulo,
            id_tipo_campania: rCampania.id_tipo_campania,
            estado: rCampania.estado,
            fecha_inicio: rCampania.fecha_inicio,
            fecha_fin: rCampania.fecha_fin
        };
        
        // Asignar propiedades opcionales solo si tienen valor
        if (rCampania.descripcion) {
            domainCampania.descripcion = rCampania.descripcion;
        }
        if (rCampania.lugar) {
            domainCampania.lugar = rCampania.lugar;
        }
        if (rCampania.organizador) {
            domainCampania.organizador = rCampania.organizador;
        }
        
        return domainCampania;
    }

    private toInfrastructureEntity(campania: CampaniaCreator): RCampania {
        const rCampania = new RCampania();
        rCampania.titulo = campania.titulo;
        rCampania.id_tipo_campania = campania.id_tipo_campania;
        rCampania.estado = campania.estado;
        rCampania.fecha_inicio = campania.fecha_inicio;
        rCampania.fecha_fin = campania.fecha_fin;
        
        // Asignar propiedades opcionales solo si tienen valor
        if (campania.descripcion) {
            rCampania.descripcion = campania.descripcion;
        }
        if (campania.lugar) {
            rCampania.lugar = campania.lugar;
        }
        if (campania.organizador) {
            rCampania.organizador = campania.organizador;
        }
        
        return rCampania;
    }
}