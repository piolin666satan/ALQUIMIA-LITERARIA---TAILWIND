const validacionesLibro = {
    titulo: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-:,.0-9]{2,100}$/,
    autor: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]{2,50}$/,
    isbn: /^[0-9\-]{10,17}$/,
    categoria: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/,
    descripcion: /^[\s\S]{10,500}$/
};

const crearLibro = function(datos) {
    return {
        id: generarIdLibro(),
        titulo: datos.titulo,
        autor: datos.autor,
        isbn: datos.isbn,
        categoria: datos.categoria,
        descripcion: datos.descripcion,
        disponible: true,
        fechaCreacion: new Date().toISOString(),
        vecesReservado: 0,
        imagen: datos.imagen || 'https://via.placeholder.com/200x300?text=Libro'
    };
};

const validarCamposLibro = function(datos) {
    const errores = {};
    
    if (!validacionesLibro.titulo.test(datos.titulo)) {
        errores.titulo = 'Título debe tener entre 2 y 100 caracteres';
    }
    
    if (!validacionesLibro.autor.test(datos.autor)) {
        errores.autor = 'Autor debe tener entre 2 y 50 letras';
    }
    
    if (!validacionesLibro.isbn.test(datos.isbn)) {
        errores.isbn = 'ISBN debe tener formato válido';
    }
    
    if (!validacionesLibro.categoria.test(datos.categoria)) {
        errores.categoria = 'Categoría debe tener entre 2 y 30 letras';
    }
    
    if (!validacionesLibro.descripcion.test(datos.descripcion)) {
        errores.descripcion = 'Descripción debe tener entre 10 y 500 caracteres';
    }
    
    return errores;
};

const generarIdLibro = function() {
    return 'libro_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const categoriasLibros = [
    'Ficción',
    'No ficción',
    'Ciencia',
    'Historia',
    'Biografía',
    'Romance',
    'Misterio',
    'Fantasía',
    'Autoayuda',
    'Técnico'
];