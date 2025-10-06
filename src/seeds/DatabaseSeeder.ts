import { AnimalService } from "../Aplication/AnimalService";
import { UsuarioService } from "../Aplication/UsuarioService";
import { DonacionService } from "../Aplication/DonacionService";
import { CampaniaService } from "../Aplication/CampaniaService";
import { EspecieService } from "../Aplication/EspecieService";
import { RefugioService } from "../Aplication/RefugioService";
import { TipoCampaniaService } from "../Aplication/TipoCampaniaService";

export class DatabaseSeeder {
    private animalService: AnimalService;
    private usuarioService: UsuarioService;
    private donacionService: DonacionService;
    private campaniaService: CampaniaService;
    private especieService: EspecieService;
    private refugioService: RefugioService;
    private tipoCampaniaService: TipoCampaniaService;

    constructor() {
        this.animalService = new AnimalService();
        this.usuarioService = new UsuarioService();
        this.donacionService = new DonacionService();
        this.campaniaService = new CampaniaService();
        this.especieService = new EspecieService();
        this.refugioService = new RefugioService();
        this.tipoCampaniaService = new TipoCampaniaService();
    }

    async seedDatabase(): Promise<void> {
        console.log("Aqui inicia lo que vendria a ser el seeding");

        try {
            // 1. Crear esecies (verificar si ya existen)
            console.log("Verificando/Creando especies...");
            let especiePerro = await this.especieService.findByNombre("Perro");
            if (!especiePerro) {
                especiePerro = await this.especieService.create("Perro");
            }
            
            let especieGato = await this.especieService.findByNombre("Gato");
            if (!especieGato) {
                especieGato = await this.especieService.create("Gato");
            }
            
            let especieConejo = await this.especieService.findByNombre("Conejo");
            if (!especieConejo) {
                especieConejo = await this.especieService.create("Conejo");
            }
            console.log(` Especies disponibles: ${especiePerro.nombre}, ${especieGato.nombre}, ${especieConejo.nombre}`);

            // 2. Crear refugios (verificar si ya existen)
            console.log(" Verificando/Creando refugios...");
            let refugio1 = await this.refugioService.findByNombre("Refugio San Francisco");
            if (!refugio1) {
                refugio1 = await this.refugioService.create(
                    "Refugio San Francisco", 
                    "Calle Principal 123", 
                    "555-0001", 
                    "Refugio dedicado al cuidado de animales abandonados"
                );
            }
            
            let refugio2 = await this.refugioService.findByNombre("Hogar Animal");
            if (!refugio2) {
                refugio2 = await this.refugioService.create(
                    "Hogar Animal", 
                    "Av. Libertad 456", 
                    "555-0002", 
                    "Centro de rescate y rehabilitación animal"
                );
            }
            console.log(`Refugios disponibles: ${refugio1.nombre}, ${refugio2.nombre}`);

            // 3. Crear tipos de campaña (verificar si ya existen)
            console.log(" Verificando/Creando tipos de campaña...");
            let tipoAdopcion = await this.tipoCampaniaService.findByNombre("Adopción");
            if (!tipoAdopcion) {
                tipoAdopcion = await this.tipoCampaniaService.create(
                    "Adopción", 
                    "Campañas enfocadas en encontrar hogares para animales"
                );
            }
            
            let tipoRecaudacion = await this.tipoCampaniaService.findByNombre("Recaudación");
            if (!tipoRecaudacion) {
                tipoRecaudacion = await this.tipoCampaniaService.create(
                    "Recaudación", 
                    "Campañas para recaudar fondos para el refugio"
                );
            }
            console.log(` Tipos de campaña disponibles: ${tipoAdopcion.nombre}, ${tipoRecaudacion.nombre}`);

            // 4. Crear usuarios (verificar si ya existen)
            console.log(" Verificando/Creando usuarios...");
            let usuario1 = await this.usuarioService.findByEmail("maria.gonzalez@email.com");
            if (!usuario1) {
                usuario1 = await this.usuarioService.create({
                    nombre: "María González",
                    email: "maria.gonzalez@email.com",
                    contrasenia: "password123",
                    telefono: "555-1001",
                    direccion: "Calle Luna 789"
                });
            }

            let usuario2 = await this.usuarioService.findByEmail("carlos.rodriguez@email.com");
            if (!usuario2) {
                usuario2 = await this.usuarioService.create({
                    nombre: "Carlos Rodríguez",
                    email: "carlos.rodriguez@email.com",
                    contrasenia: "password456",
                    telefono: "555-1002",
                    direccion: "Av. Sol 321"
                });
            }

            let usuario3 = await this.usuarioService.findByEmail("ana.lopez@email.com");
            if (!usuario3) {
                usuario3 = await this.usuarioService.create({
                    nombre: "Ana López",
                    email: "ana.lopez@email.com",
                    contrasenia: "password789"
                });
            }
            console.log(`✅ Usuarios disponibles: ${usuario1.nombre}, ${usuario2.nombre}, ${usuario3.nombre}`);

            // 5. Crear animales
            console.log("📝 Creando animales...");
            const animal1 = await this.animalService.create({
                nombre: "Max",
                edad: "2 años",
                estado: "Saludable",
                descripcion: "Perro muy amigable y juguetón",
                fotos: ["max1.jpg", "max2.jpg"],
                estado_adopcion: "Disponible",
                id_especie: especiePerro.id_especie,
                id_refugio: refugio1.id_refugio
            });

            const animal2 = await this.animalService.create({
                nombre: "Luna",
                edad: "1 año",
                estado: "Saludable",
                descripcion: "Gata muy cariñosa y tranquila",
                fotos: ["luna1.jpg"],
                estado_adopcion: "Disponible",
                id_especie: especieGato.id_especie,
                id_refugio: refugio1.id_refugio
            });

            const animal3 = await this.animalService.create({
                nombre: "Coco",
                edad: "6 meses",
                estado: "En tratamiento",
                descripcion: "Conejo rescatado, necesita cuidados especiales",
                estado_adopcion: "No disponible",
                id_especie: especieConejo.id_especie,
                id_refugio: refugio2.id_refugio
            });
            console.log(`Animales creados: ${animal1.nombre}, ${animal2.nombre}, ${animal3.nombre}`);

            // 6. Crear campañas
            console.log("Creando campañas...");
            const campania1 = await this.campaniaService.create({
                titulo: "Adopta un Amigo",
                descripcion: "Campaña de adopción de mascotas abandonadas",
                fecha_inicio: new Date(),
                fecha_fin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
                lugar: "Refugio San Francisco",
                organizador: "María González",
                estado: "activa",
                id_tipo_campania: tipoAdopcion.id_tipo_campania
            });

            const campania2 = await this.campaniaService.create({
                titulo: "Ayuda a Coco",
                descripcion: "Recaudación de fondos para el tratamiento médico de Coco",
                fecha_inicio: new Date(),
                fecha_fin: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 días
                lugar: "Hogar Animal",
                organizador: "Carlos Rodríguez",
                estado: "activa",
                id_tipo_campania: tipoRecaudacion.id_tipo_campania
            });
            console.log(`Campañas creadas: ${campania1.titulo}, ${campania2.titulo}`);

            // 7. Crear donaciones
            console.log("Creando donaciones...");
            const donacion1 = await this.donacionService.create({
                monto: 50.00,
                id_usuario: usuario1.id_usuario
            });

            const donacion2 = await this.donacionService.create({
                monto: 100.00,
                id_usuario: usuario2.id_usuario
            });

            const donacion3 = await this.donacionService.create({
                monto: 25.00,
                id_usuario: usuario3.id_usuario
            });
            console.log(`Donaciones creadas: $${donacion1.monto}, $${donacion2.monto}, $${donacion3.monto}`);

            console.log("¡Seeding completado exitosamente!");

        } catch (error) {
            console.error( "Error durante el seeding:", error);
            throw error;
        }
    }
}