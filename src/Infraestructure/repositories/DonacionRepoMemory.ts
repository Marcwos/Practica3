import { IDonacionRepo, DonacionCreador, DonacionUpdate} from "../../Domain/repositories/idonacion";
import { Donacion, CreadorDeDonacion} from "../../Domain/entities/donacion";

export class DonacionRepoMemory implements IDonacionRepo {
    private donaciones: Donacion[] = [];

    constructor() {
        this.DonacionesDummy();
    }

    private DonacionesDummy() {
        const datos: Omit<Donacion, 'id_donacion'>[] = [
            { monto: 100, fecha: new Date('2024-01-15'), id_usuario: 'usuario1' },
            { monto: 20, fecha: new Date('2024-02-10'), id_usuario: 'usuario2' },
            { monto: 250, fecha: new Date('2024-02-20'), id_usuario: 'usuario3' }
        ];
        this.donaciones.push(...datos.map(CreadorDeDonacion));
    }

    insert(DatosDonacion: DonacionCreador, callback: (err: Error | null, result?: Donacion) => void): void {
        setTimeout(() => {
            try {
                if (!DatosDonacion) return callback(new Error('Datos de la donacion requeridos'));
                const nueva = CreadorDeDonacion(DatosDonacion);
                this.donaciones.push(nueva);
                callback(null, nueva);
            } catch (error) {
                callback(error instanceof Error ? error : new Error('Error desconocido'));
            }
        }, 300);
    }

    async findById(id: string): Promise<Donacion | null> {
        return new Promise(resolve => setTimeout(() => resolve(this.donaciones.find(d => d.id_donacion === id) || null), 300));
    }

    async findAll(): Promise<Donacion[]> {
        return new Promise(resolve => setTimeout(() => resolve([...this.donaciones]), 300));
    }

    async update(id: string, data: DonacionUpdate): Promise<Donacion> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const idx = this.donaciones.findIndex(d => d.id_donacion === id);
                    if (idx === -1) return reject(new Error('Donacion no encontrada'));
                    const actual = this.donaciones[idx]!;
                    const actualizado = { ...actual, ...data } as Donacion;
                    this.donaciones[idx] = actualizado;
                    resolve(actualizado);
                } catch (err) { reject(err instanceof Error ? err : new Error('Error desconocido')); }
            }, 300);
        });
    }

    async delete(id: string): Promise<boolean> {
        return new Promise((resolve) => setTimeout(() => {
            const ix = this.donaciones.findIndex(d => d.id_donacion === id);
            if (ix === -1) return resolve(false);
            this.donaciones.splice(ix, 1);
            resolve(true);
        }, 300));
    }

}