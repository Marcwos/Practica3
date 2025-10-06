import { Animal } from "../entities/animal";

// Ajustado a la interfaz de dominio Animal (ver src/Domain/entities/animal.ts)
export interface AnimalCreador {
  nombre: string;
  id_especie: string;
  edad: string;
  estado: string;
  descripcion?: string;
  fotos?: string[];
  estado_adopcion: string;
  id_refugio: string;
}

export interface AnimalUpdate {
  nombre?: string;
  id_especie?: string;
  edad?: string;
  estado?: string;
  descripcion?: string;
  fotos?: string[];
  estado_adopcion?: string;
  id_refugio?: string;
}

export interface IAnimalRepo {
  insert(animal: AnimalCreador, callback: (err: Error | null, result?: Animal) => void): void;
  findById(id: string): Promise<Animal | null>;
  findAll(): Promise<Animal[]>;
  update(id: string, data: AnimalUpdate): Promise<Animal>;
  delete(id: string): Promise<boolean>;
}