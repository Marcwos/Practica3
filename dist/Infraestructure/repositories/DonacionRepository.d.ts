import { IDonacionRepo, DonacionCreador, DonacionUpdate } from "../../Domain/repositories/idonacion";
import { Donacion as DomainDonacion } from "../../Domain/entities/donacion";
export declare class DonacionRepository implements IDonacionRepo {
    private repository;
    constructor();
    insert(donacion: DonacionCreador, callback: (err: Error | null, result?: DomainDonacion) => void): void;
    findById(id: string): Promise<DomainDonacion | null>;
    findAll(): Promise<DomainDonacion[]>;
    update(id: string, data: DonacionUpdate): Promise<DomainDonacion>;
    delete(id: string): Promise<boolean>;
    private createDonacion;
    private toDomainEntity;
    private toInfrastructureEntity;
}
//# sourceMappingURL=DonacionRepository.d.ts.map