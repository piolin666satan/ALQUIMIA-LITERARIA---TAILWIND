const estadosPrestamo = {
    ACTIVO: 'activo',
    DEVUELTO: 'devuelto',
    VENCIDO: 'vencido'
};

const crearPrestamo = function(datos) {
    const fechaPrestamo = new Date();
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaPrestamo.getDate() + 15);
    
    return {
        id: generarIdPrestamo(),
        usuarioId: datos.usuarioId,
        libroId: datos.libroId,
        fechaPrestamo: fechaPrestamo.toISOString(),
        fechaDevolucion: fechaDevolucion.toISOString(),
        fechaDevolucionReal: null,
        estado: estadosPrestamo.ACTIVO,
        renovaciones: 0,
        maxRenovaciones: 2
    };
};

const validarPrestamo = function(datos) {
    const errores = {};
    
    if (!datos.usuarioId) {
        errores.usuario = 'Usuario es requerido';
    }
    
    if (!datos.libroId) {
        errores.libro = 'Libro es requerido';
    }
    
    return errores;
};

const calcularDiasVencimiento = function(fechaDevolucion) {
    const hoy = new Date();
    const fechaDev = new Date(fechaDevolucion);
    const diferencia = fechaDev - hoy;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
};

const estaVencido = function(prestamo) {
    if (prestamo.estado !== estadosPrestamo.ACTIVO) return false;
    return calcularDiasVencimiento(prestamo.fechaDevolucion) < 0;
};

const puedeRenovar = function(prestamo) {
    return prestamo.estado === estadosPrestamo.ACTIVO && 
           prestamo.renovaciones < prestamo.maxRenovaciones &&
           !estaVencido(prestamo);
};

const generarIdPrestamo = function() {
    return 'prestamo_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
};