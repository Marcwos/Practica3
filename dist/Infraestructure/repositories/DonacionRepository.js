"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonacionRepository = void 0;
const data_source_1 = require("../../data-source");
const rdonacion_1 = require("../entities/rdonacion");
class DonacionRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(rdonacion_1.Donacion);
    }
    insert(donacion, callback) {
        this.createDonacion(donacion)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }
    async findById(id) {
        const donacion = await this.repository.findOne({
            where: { id_donacion: id },
            relations: ["usuario", "campania"]
        });
        return donacion ? this.toDomainEntity(donacion) : null;
    }
    async findAll() {
        const donaciones = await this.repository.find({
            relations: ["usuario", "campania"]
        });
        return donaciones.map(this.toDomainEntity);
    }
    async update(id, data) {
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
    async delete(id) {
        const result = await this.repository.delete({ id_donacion: id });
        return (result.affected ?? 0) > 0;
    }
    async createDonacion(donacionData) {
        const rDonacion = this.toInfrastructureEntity(donacionData);
        const savedDonacion = await this.repository.save(rDonacion);
        return this.toDomainEntity(savedDonacion);
    }
    toDomainEntity(rDonacion) {
        const domainDonacion = {
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
    toInfrastructureEntity(donacion) {
        const rDonacion = new rdonacion_1.Donacion();
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
exports.DonacionRepository = DonacionRepository;
//# sourceMappingURL=DonacionRepository.js.map