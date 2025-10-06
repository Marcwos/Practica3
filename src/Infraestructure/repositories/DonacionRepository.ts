import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IDonacionRepo, DonacionCreador, DonacionUpdate } from "../../Domain/repositories/idonacion";
import { Donacion as DomainDonacion } from "../../Domain/entities/donacion";
import { Donacion as RDonacion } from "../entities/rdonacion";

export class DonacionRepository implements IDonacionRepo {
    private repository: Repository<RDonacion>;

    constructor() {
        this.repository = AppDataSource.getRepository(RDonacion);
    }

    insert(donacion: DonacionCreador, callback: (err: Error | null, result?: DomainDonacion) => void): void {
        this.createDonacion(donacion)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainDonacion | null> {
        const donacion = await this.repository.findOne({
            where: { id_donacion: id },
            relations: ["usuario", "campania"]
        });
        return donacion ? this.toDomainEntity(donacion) : null;
    }

    async findAll(): Promise<DomainDonacion[]> {
        const donaciones = await this.repository.find({
            relations: ["usuario", "campania"]
        });
        return donaciones.map(this.toDomainEntity);
    }

    async update(id: string, data: DonacionUpdate): Promise<DomainDonacion> {
        await this.repository.update({ id_donacion: id }, data);
        const updatedDonacion = await this.repository.findOne({
            where: { id_donacion: id },
            relations: ["usuario", "campania"]
        });
        if (!updatedDonacion) {
            throw new Error(`Donacion with id ${id} not found`);
        }
        return this.toDomainEntity(updatedDonacion);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_donacion: id });
        return (result.affected ?? 0) > 0;
    }

    private async createDonacion(donacionData: DonacionCreador): Promise<DomainDonacion> {
        const rDonacion = this.toInfrastructureEntity(donacionData);
        const savedDonacion = await this.repository.save(rDonacion);
        return this.toDomainEntity(savedDonacion);
    }

    private toDomainEntity(rDonacion: RDonacion): DomainDonacion {
        const domainDonacion: DomainDonacion = {
            id_donacion: rDonacion.id_donacion,
            monto: rDonacion.monto,
            fecha: rDonacion.fecha,
            id_usuario: rDonacion.id_usuario
        };
        
        // Asignar propiedades opcionales solo si tienen valor
        if (rDonacion.id_causa_urgente) {
            domainDonacion.id_causa_urgente = rDonacion.id_causa_urgente;
        }
        
        return domainDonacion;
    }

    private toInfrastructureEntity(donacion: DonacionCreador): RDonacion {
        const rDonacion = new RDonacion();
        rDonacion.monto = donacion.monto;
        rDonacion.fecha = donacion.fecha;
        rDonacion.id_usuario = donacion.id_usuario;
        
        // Asignar propiedades opcionales solo si tienen valor
        if (donacion.id_causa_urgente) {
            rDonacion.id_causa_urgente = donacion.id_causa_urgente;
        }
        
        return rDonacion;
    }
}