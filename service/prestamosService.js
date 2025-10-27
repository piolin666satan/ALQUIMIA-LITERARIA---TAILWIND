const servicioPrestamos = {
    obtenerPrestamos: function() {
        const prestamos = localStorage.getItem('prestamos');
        return prestamos ? JSON.parse(prestamos) : [];
    },
    
    crearPrestamo: function(usuarioId, libroId) {
        const usuario = servicioUsuario.obtenerUsuarioActivo();
        if (!usuario) return null;
        
        const libro = servicioLibros.buscarPorId(libroId);
        if (!libro || !libro.disponible) return null;
        
        const prestamo = crearPrestamo({
            usuarioId: usuario.id,
            libroId: libroId
        });
        
        const prestamos = this.obtenerPrestamos();
        prestamos.push(prestamo);
        localStorage.setItem('prestamos', JSON.stringify(prestamos));
        
        servicioLibros.marcarComoReservado(libroId);
        
        return prestamo;
    },
    
    devolverLibro: function(prestamoId) {
        const prestamos = this.obtenerPrestamos();
        const prestamo = prestamos.find(p => p.id === prestamoId);
        
        if (prestamo && prestamo.estado === estadosPrestamo.ACTIVO) {
            prestamo.estado = estadosPrestamo.DEVUELTO;
            prestamo.fechaDevolucionReal = new Date().toISOString();
            
            localStorage.setItem('prestamos', JSON.stringify(prestamos));
            servicioLibros.marcarComoDisponible(prestamo.libroId);
            
            return true;
        }
        
        return false;
    },
    
    renovarPrestamo: function(prestamoId) {
        const prestamos = this.obtenerPrestamos();
        const prestamo = prestamos.find(p => p.id === prestamoId);
        
        if (prestamo && puedeRenovar(prestamo)) {
            const nuevaFecha = new Date(prestamo.fechaDevolucion);
            nuevaFecha.setDate(nuevaFecha.getDate() + 15);
            
            prestamo.fechaDevolucion = nuevaFecha.toISOString();
            prestamo.renovaciones++;
            
            localStorage.setItem('prestamos', JSON.stringify(prestamos));
            return true;
        }
        
        return false;
    },
    
    obtenerPrestamosUsuario: function(usuarioId) {
        const prestamos = this.obtenerPrestamos();
        return prestamos.filter(prestamo => prestamo.usuarioId === usuarioId);
    },
    
    obtenerPrestamosActivos: function(usuarioId) {
        const prestamos = this.obtenerPrestamosUsuario(usuarioId);
        return prestamos.filter(prestamo => prestamo.estado === estadosPrestamo.ACTIVO);
    },
    
    obtenerHistorialPrestamos: function(usuarioId) {
        const prestamos = this.obtenerPrestamosUsuario(usuarioId);
        return prestamos.filter(prestamo => prestamo.estado === estadosPrestamo.DEVUELTO);
    },
    
    obtenerPrestamosVencidos: function() {
        const prestamos = this.obtenerPrestamos();
        return prestamos.filter(prestamo => {
            if (prestamo.estado !== estadosPrestamo.ACTIVO) return false;
            return estaVencido(prestamo);
        });
    },
    
    actualizarEstadosVencidos: function() {
        const prestamos = this.obtenerPrestamos();
        let huboChangios = false;
        
        prestamos.forEach(prestamo => {
            if (estaVencido(prestamo) && prestamo.estado === estadosPrestamo.ACTIVO) {
                prestamo.estado = estadosPrestamo.VENCIDO;
                huboChangios = true;
            }
        });
        
        if (huboChangios) {
            localStorage.setItem('prestamos', JSON.stringify(prestamos));
        }
        
        return huboChangios;
    }
};