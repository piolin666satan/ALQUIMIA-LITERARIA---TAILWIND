const servicioLibros = {
    obtenerLibros: function() {
        const libros = localStorage.getItem('libros');
        return libros ? JSON.parse(libros) : this.obtenerLibrosIniciales();
    },
    
    guardarLibro: function(libro) {
        const libros = this.obtenerLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));
        return libro;
    },
    
    buscarPorId: function(id) {
        const libros = this.obtenerLibros();
        return libros.find(libro => libro.id === id);
    },
    
    buscarPorTitulo: function(titulo) {
        const libros = this.obtenerLibros();
        return libros.filter(libro => 
            libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
    },
    
    buscarPorCategoria: function(categoria) {
        const libros = this.obtenerLibros();
        return libros.filter(libro => 
            libro.categoria.toLowerCase() === categoria.toLowerCase()
        );
    },
    
    obtenerDisponibles: function() {
        const libros = this.obtenerLibros();
        return libros.filter(libro => libro.disponible);
    },
    
    marcarComoReservado: function(id) {
        const libros = this.obtenerLibros();
        const libro = libros.find(l => l.id === id);
        if (libro) {
            libro.disponible = false;
            libro.vecesReservado++;
            localStorage.setItem('libros', JSON.stringify(libros));
        }
        return libro;
    },
    
    marcarComoDisponible: function(id) {
        const libros = this.obtenerLibros();
        const libro = libros.find(l => l.id === id);
        if (libro) {
            libro.disponible = true;
            localStorage.setItem('libros', JSON.stringify(libros));
        }
        return libro;
    },
    
    obtenerLibrosIniciales: function() {
        const librosIniciales = [
            {
                id: 'libro_1',
                titulo: 'Cien Años de Soledad',
                autor: 'Gabriel García Márquez',
                isbn: '978-84-376-0494-7',
                categoria: 'Ficción',
                descripcion: 'Una obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 5,
                imagen: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_2',
                titulo: 'El Amor en los Tiempos del Cólera',
                autor: 'Gabriel García Márquez',
                isbn: '978-84-376-0495-4',
                categoria: 'Romance',
                descripcion: 'Una historia de amor que perdura a través de los años, ambientada en el Caribe colombiano.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 3,
                imagen: 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_3',
                titulo: 'La Casa de los Espíritus',
                autor: 'Isabel Allende',
                isbn: '978-84-204-8370-5',
                categoria: 'Ficción',
                descripcion: 'La saga de una familia sudamericana a través de cuatro generaciones de mujeres.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 2,
                imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_4',
                titulo: 'Rayuela',
                autor: 'Julio Cortázar',
                isbn: '978-84-376-0401-5',
                categoria: 'Ficción',
                descripcion: 'Una novela experimental que puede leerse de múltiples maneras.',
                disponible: false,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 8,
                imagen: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_5',
                titulo: 'El Laberinto de la Soledad',
                autor: 'Octavio Paz',
                isbn: '978-968-16-0123-4',
                categoria: 'No ficción',
                descripcion: 'Ensayo sobre la identidad y psicología del pueblo mexicano.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 1,
                imagen: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_6',
                titulo: 'Pedro Páramo',
                autor: 'Juan Rulfo',
                isbn: '978-84-376-0402-2',
                categoria: 'Ficción',
                descripcion: 'Una novela breve pero intensa sobre la búsqueda de un padre en un pueblo fantasmal.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 4,
                imagen: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_7',
                titulo: 'La Sombra del Viento',
                autor: 'Carlos Ruiz Zafón',
                isbn: '978-84-322-1901-0',
                categoria: 'Misterio',
                descripcion: 'Una novela gótica ambientada en la Barcelona de posguerra, llena de secretos y libros olvidados.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 7,
                imagen: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_8',
                titulo: 'El Alquimista',
                autor: 'Paulo Coelho',
                isbn: '978-84-08-04328-8',
                categoria: 'Autoayuda',
                descripcion: 'La historia de Santiago, un joven pastor andaluz que viaja desde España hasta Egipto en busca de un tesoro.',
                disponible: false,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 12,
                imagen: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_9',
                titulo: 'Sapiens: De Animales a Dioses',
                autor: 'Yuval Noah Harari',
                isbn: '978-84-9992-278-5',
                categoria: 'Historia',
                descripcion: 'Una breve historia de la humanidad que explora cómo el Homo sapiens llegó a dominar el mundo.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 6,
                imagen: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_10',
                titulo: 'El Principito',
                autor: 'Antoine de Saint-Exupéry',
                isbn: '978-84-206-6776-4',
                categoria: 'Fantasía',
                descripcion: 'Un cuento poético que narra las aventuras de un joven príncipe que viaja de planeta en planeta.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 9,
                imagen: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_11',
                titulo: '1984',
                autor: 'George Orwell',
                isbn: '978-84-376-0811-2',
                categoria: 'Ciencia',
                descripcion: 'Una distopía que presenta un futuro totalitario donde el gobierno controla cada aspecto de la vida.',
                disponible: true,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 8,
                imagen: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop&crop=center'
            },
            {
                id: 'libro_12',
                titulo: 'Orgullo y Prejuicio',
                autor: 'Jane Austen',
                isbn: '978-84-376-1234-5',
                categoria: 'Romance',
                descripcion: 'La historia de Elizabeth Bennet y su compleja relación con el orgulloso Sr. Darcy.',
                disponible: false,
                fechaCreacion: new Date().toISOString(),
                vecesReservado: 5,
                imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop&crop=center'
            }
        ];
        
        localStorage.setItem('libros', JSON.stringify(librosIniciales));
        return librosIniciales;
    }
};