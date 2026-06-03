interface SubCategoria {
    id: string;
    titulo: string;
    descripcion: string;
}

interface Categoria {
    id: string;
    titulo: string;
    descripcion: string;
    subcategoria: SubCategoria;
}

interface Libro {
    id: string;
    titulo: string;
    autor: string;
    categoria: Categoria;
    disponible: boolean;
}

interface Usuario {
    id: string;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
}

interface Prestamo {
    id: string;
    libroId: string;
    usuarioId: string;
    fechaPrestamo: string;
    fechaDevolucion: string | null;
}

class Biblioteca {

    private libros: Libro[] = [];
    private usuarios: Usuario[] = [];
    private prestamos: Prestamo[] = [];

      //Gestion de libros


    agregarLibro(libro: Libro): void {
        this.libros.push(libro);
        console.log("Libro agregado correctamente");
    }

    eliminarLibro(id: string): void {

        const indice = this.libros.findIndex(
            libro => libro.id === id
        );

        if (indice !== -1) {
            this.libros.splice(indice, 1);
            console.log("Libro eliminado");
        } else {
            console.log("Libro no encontrado");
        }
    }

    buscarLibro(id: string): Libro | undefined {

        return this.libros.find(
            libro => libro.id === id
        );
    }

    consultarLibro(id: string): void {

        const libro = this.buscarLibro(id);

        if (libro) {
            console.log(libro);
        } else {
            console.log("Libro no encontrado");
        }
    }

    verificarDisponibilidad(libroId: string): boolean {

        const libro = this.buscarLibro(libroId);

        if (!libro) {
            console.log("Libro no encontrado");
            return false;
        }

        return libro.disponible;
    }

    actualizarDisponibilidad(
        libroId: string,
        estado: boolean
    ): void {

        const libro = this.buscarLibro(libroId);

        if (!libro) {
            console.log("Libro no encontrado");
            return;
        }

        libro.disponible = estado;

        console.log("Disponibilidad actualizada");
    }

    listarLibros(): void {

        console.log("===== LISTA DE LIBROS =====");

        this.libros.forEach(libro => {

            console.log(`
ID: ${libro.id}
Título: ${libro.titulo}
Autor: ${libro.autor}
Categoría: ${libro.categoria.titulo}
Subcategoría: ${libro.categoria.subcategoria.titulo}
Disponible: ${libro.disponible}
            `);

        });
    }

    //Buscar libros 

    buscarLibroPorTitulo(
        titulo: string
    ): Libro[] {

        return this.libros.filter(
            libro =>
                libro.titulo
                    .toLowerCase()
                    .includes(titulo.toLowerCase())
        );
    }

    buscarLibroPorAutor(
        autor: string
    ): Libro[] {

        return this.libros.filter(
            libro =>
                libro.autor
                    .toLowerCase()
                    .includes(autor.toLowerCase())
        );
    }

    mostrarLibros(
        libros: Libro[]
    ): void {

        if (libros.length === 0) {
            console.log("No se encontraron libros");
            return;
        }

        libros.forEach(libro => {

            console.log(`
ID: ${libro.id}
Título: ${libro.titulo}
Autor: ${libro.autor}
Disponible: ${libro.disponible}
            `);

        });
    }

    //Gestion de usuarios

    registrarUsuario(usuario: Usuario): void {

        this.usuarios.push(usuario);

        console.log("Usuario registrado correctamente");
    }

    buscarUsuario(id: string): Usuario | undefined {

        return this.usuarios.find(
            usuario => usuario.id === id
        );
    }

    validarUsuario(id: string): boolean {

        return this.usuarios.some(
            usuario => usuario.id === id
        );
    }

    buscarUsuarioPorNombre(
        nombre: string
    ): Usuario[] {

        return this.usuarios.filter(
            usuario =>
                usuario.nombre
                    .toLowerCase()
                    .includes(nombre.toLowerCase())
        );
    }

    listarUsuarios(): void {

        console.log("===== LISTA DE USUARIOS =====");

        this.usuarios.forEach(usuario => {

            console.log(`
ID: ${usuario.id}
Nombre: ${usuario.nombre}
Correo: ${usuario.correo}
Teléfono: ${usuario.telefono}
Dirección: ${usuario.direccion}
            `);

        });
    }

    mostrarUsuarios(
        usuarios: Usuario[]
    ): void {

        if (usuarios.length === 0) {
            console.log("No se encontraron usuarios");
            return;
        }

        usuarios.forEach(usuario => {

            console.log(`
ID: ${usuario.id}
Nombre: ${usuario.nombre}
Correo: ${usuario.correo}
            `);

        });
    }

    //Gestión de préstamos

    prestarLibro(
        libroId: string,
        usuarioId: string,
        fechaPrestamo: string
    ): void {

        const libro = this.buscarLibro(libroId);
        const usuario = this.buscarUsuario(usuarioId);

        if (!libro) {
            console.log("Libro no encontrado");
            return;
        }

        if (!usuario) {
            console.log("Usuario no encontrado");
            return;
        }

        if (!libro.disponible) {
            console.log("El libro no está disponible");
            return;
        }

        const nuevoPrestamo: Prestamo = {
            id: "P" + (this.prestamos.length + 1),
            libroId: libroId,
            usuarioId: usuarioId,
            fechaPrestamo: fechaPrestamo,
            fechaDevolucion: null
        };

        this.prestamos.push(nuevoPrestamo);

        libro.disponible = false;

        console.log("Préstamo realizado correctamente");
    }

    
    listarPrestamos(): void {

        console.log("===== LISTA DE PRÉSTAMOS =====");

        this.prestamos.forEach(prestamo => {

            console.log(`
ID: ${prestamo.id}
Libro ID: ${prestamo.libroId}
Usuario ID: ${prestamo.usuarioId}
Fecha Préstamo: ${prestamo.fechaPrestamo}
Fecha Devolución: ${prestamo.fechaDevolucion}
            `);

        });
    }

    //Gestión de devoluciones

    buscarPrestamoActivo(
        libroId: string
    ): Prestamo | undefined {

        return this.prestamos.find(
            prestamo =>
                prestamo.libroId === libroId &&
                prestamo.fechaDevolucion === null
        );
    }

    devolverLibro(libroId: string): void {

        const prestamo =
            this.buscarPrestamoActivo(libroId);

        if (!prestamo) {
            console.log("No existe préstamo activo");
            return;
        }

        prestamo.fechaDevolucion =
            new Date().toLocaleDateString();

        const libro = this.buscarLibro(libroId);

        if (libro) {
            libro.disponible = true;
        }

        console.log("Libro devuelto correctamente");
    }
}


const sub1: SubCategoria = {
    id: "S1",
    titulo: "Programación Web",
    descripcion: "Libros de desarrollo web"
};

const sub2: SubCategoria = {
    id: "S2",
    titulo: "Bases de Datos",
    descripcion: "Libros de bases de datos"
};

const categoria1: Categoria = {
    id: "C1",
    titulo: "Tecnología",
    descripcion: "Libros tecnológicos",
    subcategoria: sub1
};

const categoria2: Categoria = {
    id: "C2",
    titulo: "Informática",
    descripcion: "Libros informáticos",
    subcategoria: sub2
};

const libro1: Libro = {
    id: "L1",
    titulo: "TypeScript Básico",
    autor: "Juan Pérez",
    categoria: categoria1,
    disponible: true
};

const libro2: Libro = {
    id: "L2",
    titulo: "SQL Server",
    autor: "María López",
    categoria: categoria2,
    disponible: true
};

const usuario1: Usuario = {
    id: "U1",
    nombre: "Andy Ortega",
    correo: "andy@gmail.com",
    telefono: "0999999999",
    direccion: "Cuenca"
};

const usuario2: Usuario = {
    id: "U2",
    nombre: "Carlos Pérez",
    correo: "carlos@gmail.com",
    telefono: "0888888888",
    direccion: "Quito"
};

const biblioteca = new Biblioteca();

biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);
biblioteca.registrarUsuario(usuario1);
biblioteca.registrarUsuario(usuario2);
biblioteca.listarLibros();
biblioteca.listarUsuarios();
console.log("Disponibilidad L1:");
console.log(
    biblioteca.verificarDisponibilidad("L1")
);
biblioteca.prestarLibro(
    "L1",
    "U1",
    "29/05/2026"
);
biblioteca.listarPrestamos();
console.log("Disponibilidad después del préstamo:");
console.log(
    biblioteca.verificarDisponibilidad("L1")
);
console.log("Buscar libro por título:");
biblioteca.mostrarLibros(
    biblioteca.buscarLibroPorTitulo("TypeScript")
);
console.log("Buscar libro por autor:");
biblioteca.mostrarLibros(
    biblioteca.buscarLibroPorAutor("Juan")
);
console.log("Buscar usuario por nombre:");
biblioteca.mostrarUsuarios(
    biblioteca.buscarUsuarioPorNombre("Andy")
);
console.log("Validar usuario:");
console.log(
    biblioteca.validarUsuario("U1")
);
biblioteca.consultarLibro("L1");
biblioteca.devolverLibro("L1");
biblioteca.listarPrestamos();
console.log("Disponibilidad después de devolución:");
console.log(
    biblioteca.verificarDisponibilidad("L1")
);
biblioteca.listarLibros();
