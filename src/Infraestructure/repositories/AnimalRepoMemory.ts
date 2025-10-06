import { IAnimalRepo, AnimalCreador, AnimalUpdate} from "../../Domain/repositories/ianimal";
import { Animal, CreadorDeAnimal} from "../../Domain/entities/animal";

export class AnimalRepoMemory implements IAnimalRepo {
    private animals: Animal[] = [];

    constructor() {
        this.Animalestontos();
    }

    private Animalestontos() {
        const datos = [
            { nombre: "Firulais", id_especie: "especie-perro", edad: "5", estado: "Saludable", descripcion: "Un perro muy amigable", fotos: ["foto1.jpg"], estado_adopcion: "Disponible", id_refugio: "refugio1" },
            { nombre: "Luna", id_especie: "especie-gato", edad: "3", estado: "Saludable", descripcion: "Gata muy cariñosa y juguetona", fotos: ["luna1.jpg", "luna2.jpg"], estado_adopcion: "Disponible", id_refugio: "refugio2" },
            { nombre: "Max", id_especie: "especie-perro", edad: "2", estado: "En tratamiento", descripcion: "Cachorro energético, necesita entrenamiento", fotos: ["max1.jpg"], estado_adopcion: "En proceso", id_refugio: "refugio1" },
            { nombre: "Mimi", id_especie: "especie-gato", edad: "7", estado: "Saludable", descripcion: "Gata mayor muy tranquila, ideal para apartamento", fotos: ["mimi1.jpg", "mimi2.jpg", "mimi3.jpg"], estado_adopcion: "Disponible", id_refugio: "refugio3" },
            { nombre: "Rocky", id_especie: "especie-perro", edad: "4", estado: "Saludable", descripcion: "Perro guardián muy leal y protector", fotos: ["rocky1.jpg"], estado_adopcion: "Adoptado", id_refugio: "refugio2" },
            { nombre: "Nala", id_especie: "especie-gato", edad: "1", estado: "Saludable", descripcion: "Gatita bebé muy curiosa y activa", fotos: ["nala1.jpg", "nala2.jpg"], estado_adopcion: "Disponible", id_refugio: "refugio1" },
            { nombre: "Toby", id_especie: "especie-perro", edad: "6", estado: "Saludable", descripcion: "Perro maduro muy obediente y calmado", fotos: ["toby1.jpg"], estado_adopcion: "En proceso", id_refugio: "refugio3" },
            { nombre: "Simba", id_especie: "especie-gato", edad: "4", estado: "Saludable", descripcion: "Gato grande y majestuoso, muy independiente", fotos: ["simba1.jpg", "simba2.jpg"], estado_adopcion: "Disponible", id_refugio: "refugio2" },
            { nombre: "Bella", id_especie: "especie-perro", edad: "3", estado: "Saludable", descripcion: "Perra muy dulce y sociable con niños", fotos: ["bella1.jpg", "bella2.jpg", "bella3.jpg"], estado_adopcion: "Disponible", id_refugio: "refugio1" },
            { nombre: "Coco", id_especie: "especie-gato", edad: "5", estado: "En tratamiento", descripcion: "Gato rescatado, en recuperación pero muy amoroso", fotos: ["coco1.jpg"], estado_adopcion: "No disponible", id_refugio: "refugio3" }
        ];
        
        // Usa el factory para crear con ID automático
        this.animals.push(...datos.map(CreadorDeAnimal));
    }
    insert(DatosAnimal: AnimalCreador, callback: (err: Error | null, result?: Animal) => void): void {
        setTimeout(() => {
            try {
                // Validar que los datos no estén vacíos
                if (!DatosAnimal) {
                    return callback(new Error("Datos del animal son requeridos"));
                }

                // Crear el animal usando el factory (genera ID automáticamente)
                const nuevoAnimal = CreadorDeAnimal(DatosAnimal);
                // Verificar duplicados por nombre y refugio (regla de negocio)
                const existeDuplicado = this.animals.some(
                    a => a.nombre.toLowerCase() === nuevoAnimal.nombre.toLowerCase() && 
                         a.id_refugio === nuevoAnimal.id_refugio
                );
                
                if (existeDuplicado) {
                    return callback(new Error(`Ya existe un animal con el nombre "${nuevoAnimal.nombre}" en este refugio`));
                }

                // Insertar en memoria
                this.animals.push(nuevoAnimal);
                
                // Éxito: callback(null, resultado)
                callback(null, nuevoAnimal);
                
            } catch (error) {
                // Error: callback(error)
                if (error instanceof Error) {
                    callback(error);
                } else {
                    callback(new Error("Error desconocido al insertar animal"));
                }
            }
        }, 500);
    }
    async findById(id: string): Promise<Animal | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const animal = this.animals.find(a => a.id_animal === id) || null;
                resolve(animal);
            }, 500);
        });
    }   
    async findAll(): Promise<Animal[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.animals);
            }, 500);
        });
    }
    async update(id: string, data: AnimalUpdate): Promise<Animal> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    //Aqui se valida si entra o no un ID
                    if (!id || id.trim() === "") {
                        return reject(new Error("EL ID es requerido"))
                    }
                    //Aqui voy a validar lo que son los objetos o campos a actualizar
                    if (!data || Object.keys(data).length === 0) {
                        return reject(new Error("Los datos que se van a actualizar son requeridos"))
                    }
                    //Buscar el animal por ID(se crea una nueva busqueda para evitar conflictos)
                    const indice= this.animals.findIndex(a => a.id_animal === id);
                    if (indice === -1) {
                        return reject(new Error("No se pudo encontrar el animal con el ID proporcionado"));
    
                    }
                    // Obtener el animal actual (sabemos que existe porque ya validamos el índice)
                    const animalActual = this.animals[indice]!; // Assertion operator
                    
                    //Ahora se verifica si el animal esta duplicado
                    if (data.nombre){
                        const animalDuplicado = this.animals.some(
                            a => a.id_animal !== id && 
                            a.nombre.toLowerCase() === data.nombre!.toLowerCase() &&
                            a.id_refugio === (data.id_refugio || animalActual.id_refugio)
                        );
                        if(animalDuplicado){
                            return reject(new Error(`Ya existe un animal con el nombre "${data.nombre}" en este refugio`));
                        }
                    }
                    
                    // Crear el animal actualizado con todos los campos requeridos
                    const animalActualizado = {
                        id_animal: animalActual.id_animal, // Preservar el ID original
                        nombre: data.nombre ?? animalActual.nombre,
                        id_especie: data.id_especie ?? animalActual.id_especie,
                        edad: data.edad ?? animalActual.edad,
                        estado: data.estado ?? animalActual.estado,
                        descripcion: data.descripcion ?? animalActual.descripcion,
                        fotos: data.fotos ?? animalActual.fotos,
                        estado_adopcion: data.estado_adopcion ?? animalActual.estado_adopcion,
                        id_refugio: data.id_refugio ?? animalActual.id_refugio
                    } as Animal;

                    // Guardar los cambios en el array
                    this.animals[indice] = animalActualizado;

                    // Resolver la promesa con el animal actualizado
                    resolve(animalActualizado);
                    
                } catch (error) {
                    // Manejar errores
                    if (error instanceof Error) {
                        reject(error);
                    } else {
                        reject(new Error("Error desconocido al actualizar animal"));
                    }
                }
            }, 500);
        });
    }

    // DELETE - Async/Await (faltaba implementar)
    async delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Validar ID
                    if (!id || id.trim() === "") {
                        return reject(new Error("ID del animal es requerido"));
                    }

                    // Buscar el animal
                    const index = this.animals.findIndex(a => a.id_animal === id);
                    if (index === -1) {
                        return resolve(false); // No encontrado, pero no es error
                    }

                    // Eliminar del array
                    this.animals.splice(index, 1);
                    resolve(true); // Eliminado exitosamente
                    
                } catch (error) {
                    if (error instanceof Error) {
                        reject(error);
                    } else {
                        reject(new Error("Error desconocido al eliminar animal"));
                    }
                }
            }, 500);
        });
    }
}
