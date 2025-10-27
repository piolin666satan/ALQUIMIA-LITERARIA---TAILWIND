const modeloCompra = {
    crear: function(datos) {
        return {
            id: this.generarId(),
            usuarioId: datos.usuarioId,
            libroId: datos.libroId,
            precio: datos.precio || 15000,
            metodoPago: datos.metodoPago,
            fechaCompra: new Date().toISOString(),
            estado: 'completada'
        };
    },
    
    validar: function(datos) {
        const errores = {};
        
        if (!datos.usuarioId) {
            errores.usuario = 'Usuario requerido';
        }
        
        if (!datos.libroId) {
            errores.libro = 'Libro requerido';
        }
        
        if (!datos.metodoPago) {
            errores.metodoPago = 'Método de pago requerido';
        }
        
        return errores;
    },
    
    generarId: function() {
        return 'compra_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

const servicioCompras = {
    obtenerCompras: function() {
        const compras = localStorage.getItem('compras');
        return compras ? JSON.parse(compras) : [];
    },
    
    guardarCompra: function(compra) {
        const compras = this.obtenerCompras();
        compras.push(compra);
        localStorage.setItem('compras', JSON.stringify(compras));
        return compra;
    },
    
    obtenerComprasUsuario: function(usuarioId) {
        const compras = this.obtenerCompras();
        return compras.filter(compra => compra.usuarioId === usuarioId);
    }
};