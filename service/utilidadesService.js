const servicioUtilidades = {
    limpiarLocalStorage: function() {
        localStorage.removeItem('usuarios');
        localStorage.removeItem('usuarioActivo');
    },
    
    exportarDatos: function() {
        return {
            usuarios: servicioUsuario.obtenerUsuarios(),
            usuarioActivo: servicioUsuario.obtenerUsuarioActivo()
        };
    },
    
    importarDatos: function(datos) {
        if (datos.usuarios) {
            localStorage.setItem('usuarios', JSON.stringify(datos.usuarios));
        }
        if (datos.usuarioActivo) {
            localStorage.setItem('usuarioActivo', JSON.stringify(datos.usuarioActivo));
        }
    },
    
    contarUsuarios: function() {
        return servicioUsuario.obtenerUsuarios().length;
    },
    
    formatearFecha: function(fecha) {
        return new Date(fecha).toLocaleDateString('es-ES');
    }
};