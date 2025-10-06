import "reflect-metadata";
import { DataSource } from "typeorm";
import {Animal} from "./Domain/entities/animal";
import {Campania} from "./Domain/entities/campania";
import {Donacion} from "./Domain/entities/donacion";
import {Especie} from "./Domain/entities/especie";
import {Refugio} from "./Domain/entities/refugio";
import {TipoCampania} from "./Domain/entities/tipo_campania";
import {Usuario} from "./Domain/entities/usuario";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Animal, Campania, Donacion, Especie, Refugio, TipoCampania, Usuario],
});
