import { Donacion } from "../entities/donacion";

export interface DonacionCreador {
  monto: number;
  fecha: Date;
  id_usuario: string;
  id_causa_urgente?: string;
}

export interface DonacionUpdate {
  monto?: number;
  fecha?: Date;
  id_usuario?: string;
  id_causa_urgente?: string;
}

export interface IDonacionRepo {
  insert(donacion: DonacionCreador, callback: (err: Error | null, result?: Donacion) => void): void;
  findById(id: string): Promise<Donacion | null>;
  findAll(): Promise<Donacion[]>;
  update(id: string, data: DonacionUpdate): Promise<Donacion>;
  delete(id: string): Promise<boolean>;
  findByFechaRango?(fechaInicio: Date, fechaFin: Date): Promise<Donacion[]>;
  getTotalDonado?(id_usuario?: string): Promise<number>;
}