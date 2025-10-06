import { ICampania, CampaniaCreator, CampaniaUpdater } from "../../Domain/repositories/icampania";
import { Campania as DomainCampania } from "../../Domain/entities/campania";
export declare class CampaniaRepository implements ICampania {
    private repository;
    constructor();
    insert(campania: CampaniaCreator, callback: (err: Error | null, result?: DomainCampania) => void): void;
    getById(id: string): Promise<DomainCampania | null>;
    getAll(): Promise<DomainCampania[]>;
    update(id: string, data: CampaniaUpdater): Promise<DomainCampania | null>;
    delete(id: string): Promise<boolean>;
    private createCampania;
    private toDomainEntity;
    private toInfrastructureEntity;
}
//# sourceMappingURL=CampaniaRepository.d.ts.map