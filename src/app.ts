import { AppDataSource } from "./data-source";
import { AnimalRepository } from "./Infraestructure/repositories/AnimalRepository";
import { UsuarioRepository } from "./Infraestructure/repositories/UsuarioRepository";
import { DonacionRepository } from "./Infraestructure/repositories/DonacionRepository";
import { CampaniaRepository } from "./Infraestructure/repositories/CampaniaRepository";



async function main() {
    try {
        // Inicializar la conexión a la base de datos
        await AppDataSource.initialize();
        console.log("Base de datos levantadas jjjjj");

        // Crear instancias de los repositorios TypeORM
        const animalRepo = new AnimalRepository();
        const usuarioRepo = new UsuarioRepository();
        const donacionRepo = new DonacionRepository();
        const campaniaRepo = new CampaniaRepository();

        console.log("Se inicio typeorm aqui ");

        const users = await usuarioRepo.findAll();
        console.log("Users in database:", users.length);

    } catch (error) {
        console.error("Error durante la inicialización de la aplicación:", error);
    }
}

main().catch((error) => {
    console.error("Error durante la inicialización de la fuente de datos:", error);
});

