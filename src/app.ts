import { AppDataSource } from "./data-source";
import { AnimalRepository } from "./Infraestructure/repositories/AnimalRepository";
import { UsuarioRepository } from "./Infraestructure/repositories/UsuarioRepository";
import { DonacionRepository } from "./Infraestructure/repositories/DonacionRepository";
import { CampaniaRepository } from "./Infraestructure/repositories/CampaniaRepository";

async function main() {
    try {
        // Inicializar la conexión a la base de datos
        await AppDataSource.initialize();
        console.log("Database connected!");

        // Crear instancias de los repositorios TypeORM
        const animalRepo = new AnimalRepository();
        const usuarioRepo = new UsuarioRepository();
        const donacionRepo = new DonacionRepository();
        const campaniaRepo = new CampaniaRepository();

        console.log("TypeORM Repositories initialized successfully!");

        // Aquí puedes agregar la lógica de tu aplicación
        // Por ejemplo:
        // const animals = await animalRepo.findAll();
        // console.log("Animals in database:", animals.length);

        // const users = await usuarioRepo.findAll();
        // console.log("Users in database:", users.length);

    } catch (error) {
        console.error("Error during application initialization:", error);
    }
}

main().catch((error) => {
    console.error("Error during Data Source initialization:", error);
});
