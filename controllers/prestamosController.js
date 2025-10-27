const controladorPrestamos = {
    usuario: null,
    prestamosActivos: [],
    historialPrestamos: [],
    tabActiva: 'activos',
    
    inicializar: function() {
        componenteHeader.inicializar('prestamos');
        menuInferior.inicializar('prestamos');
        
        const tieneAcceso = proteccionRutas.verificarAcceso('prestamos', () => {
            this.usuario = servicioUsuario.obtenerUsuarioActivo();
            this.cargarDatos();
            this.configurarEventos();
            this.actualizarContadores();
            servicioPrestamos.actualizarEstadosVencidos();
        });
        
        if (!tieneAcceso) {
            return;
        }
    },
    
    cargarDatos: function() {
        if (!this.usuario) return;
        
        this.prestamosActivos = servicioPrestamos.obtenerPrestamosActivos(this.usuario.id);
        this.historialPrestamos = servicioPrestamos.obtenerHistorialPrestamos(this.usuario.id);
        
        this.mostrarPrestamosActivos();
        this.mostrarHistorial();
    },
    
    mostrarPrestamosActivos: function() {
        const lista = document.getElementById('lista-prestamos-activos');
        const mensaje = document.getElementById('mensaje-sin-activos');
        
        lista.innerHTML = '';
        
        if (this.prestamosActivos.length === 0) {
            mensaje.classList.remove('hidden');
            return;
        }
        
        mensaje.classList.add('hidden');
        
        this.prestamosActivos.forEach(prestamo => {
            const libro = servicioLibros.buscarPorId(prestamo.libroId);
            if (libro) {
                const item = this.crearItemPrestamo(prestamo, libro, true);
                lista.appendChild(item);
            }
        });
    },
    
    mostrarHistorial: function() {
        const lista = document.getElementById('lista-historial');
        const mensaje = document.getElementById('mensaje-sin-historial');
        
        lista.innerHTML = '';
        
        if (this.historialPrestamos.length === 0) {
            mensaje.classList.remove('hidden');
            return;
        }
        
        mensaje.classList.add('hidden');
        
        this.historialPrestamos.forEach(prestamo => {
            const libro = servicioLibros.buscarPorId(prestamo.libroId);
            if (libro) {
                const item = this.crearItemPrestamo(prestamo, libro, false);
                lista.appendChild(item);
            }
        });
    },
    
    crearItemPrestamo: function(prestamo, libro, esActivo) {
        const item = document.createElement('div');
        item.className = 'border border-gray-200 rounded-lg p-4 mb-4';
        
        const diasRestantes = calcularDiasVencimiento(prestamo.fechaDevolucion);
        const estaVencido = diasRestantes < 0;
        const proximoAVencer = diasRestantes <= 3 && diasRestantes >= 0;
        
        let estadoInfo = '';
        let estadoClass = '';
        
        if (esActivo) {
            if (estaVencido) {
                estadoInfo = `Vencido hace ${Math.abs(diasRestantes)} días`;
                estadoClass = 'text-red-600 font-semibold';
            } else if (proximoAVencer) {
                estadoInfo = diasRestantes === 0 ? 'Vence hoy' : `Vence en ${diasRestantes} días`;
                estadoClass = 'text-orange-600 font-semibold';
            } else {
                estadoInfo = `Vence en ${diasRestantes} días`;
                estadoClass = 'text-green-600';
            }
        } else {
            const fechaDevolucion = new Date(prestamo.fechaDevolucionReal).toLocaleDateString('es-ES');
            estadoInfo = `Devuelto el ${fechaDevolucion}`;
            estadoClass = 'text-gray-600';
        }
        
        const puedeRenovarLibro = esActivo && puedeRenovar(prestamo);
        
        item.innerHTML = `
            <div class="flex flex-col md:flex-row gap-4">
                <img src="${libro.imagen}" alt="${libro.titulo}" class="w-16 h-24 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-bold text-lg mb-1">${libro.titulo}</h3>
                    <p class="text-gray-600 mb-2">${libro.autor}</p>
                    <div class="text-sm text-gray-500 space-y-1">
                        <p>Prestado: ${new Date(prestamo.fechaPrestamo).toLocaleDateString('es-ES')}</p>
                        <p class="${estadoClass}">${estadoInfo}</p>
                        ${prestamo.renovaciones > 0 ? `<p>Renovaciones: ${prestamo.renovaciones}/${prestamo.maxRenovaciones}</p>` : ''}
                    </div>
                </div>
                ${esActivo ? `
                    <div class="flex flex-col gap-2">
                        <button onclick="controladorPrestamos.confirmarDevolucion('${prestamo.id}')"
                                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm">
                            Devolver
                        </button>
                        ${puedeRenovarLibro ? `
                            <button onclick="controladorPrestamos.confirmarRenovacion('${prestamo.id}')"
                                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                                Renovar
                            </button>
                        ` : `
                            <button disabled class="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed text-sm">
                                No renovable
                            </button>
                        `}
                    </div>
                ` : ''}
            </div>
        `;
        
        return item;
    },
    
    confirmarDevolucion: function(prestamoId) {
        const prestamo = this.prestamosActivos.find(p => p.id === prestamoId);
        const libro = servicioLibros.buscarPorId(prestamo.libroId);
        
        sistemaAlertas.confirmar(
            `¿Estás seguro de que quieres devolver "${libro.titulo}"?`,
            'Confirmar devolución',
            () => this.devolverLibro(prestamoId)
        );
    },
    
    confirmarRenovacion: function(prestamoId) {
        const prestamo = this.prestamosActivos.find(p => p.id === prestamoId);
        const libro = servicioLibros.buscarPorId(prestamo.libroId);
        
        sistemaAlertas.confirmar(
            `¿Quieres renovar el préstamo de "${libro.titulo}" por 15 días más?`,
            'Confirmar renovación',
            () => this.renovarPrestamo(prestamoId)
        );
    },
    
    devolverLibro: function(prestamoId) {
        if (servicioPrestamos.devolverLibro(prestamoId)) {
            sistemaAlertas.exito(
                'El libro ha sido devuelto y está disponible para otros usuarios.',
                'Devolución exitosa'
            );
            this.cargarDatos();
            this.actualizarContadores();
        } else {
            sistemaAlertas.error(
                'No se pudo procesar la devolución. Intenta nuevamente.',
                'Error en la devolución'
            );
        }
    },
    
    renovarPrestamo: function(prestamoId) {
        if (servicioPrestamos.renovarPrestamo(prestamoId)) {
            sistemaAlertas.exito(
                'Tu préstamo ha sido extendido por 15 días más.',
                'Renovación exitosa'
            );
            this.cargarDatos();
            this.actualizarContadores();
        } else {
            sistemaAlertas.error(
                'No se pudo renovar el préstamo. Verifica los límites de renovación.',
                'Error en la renovación'
            );
        }
    },
    

    
    cambiarTab: function(tab) {
        this.tabActiva = tab;
        
        document.getElementById('tab-activos').classList.remove('border-[var(--color-primario)]', 'text-[var(--color-primario)]');
        document.getElementById('tab-activos').classList.add('border-transparent', 'text-gray-500');
        
        document.getElementById('tab-historial').classList.remove('border-[var(--color-primario)]', 'text-[var(--color-primario)]');
        document.getElementById('tab-historial').classList.add('border-transparent', 'text-gray-500');
        
        if (tab === 'activos') {
            document.getElementById('tab-activos').classList.add('border-[var(--color-primario)]', 'text-[var(--color-primario)]');
            document.getElementById('tab-activos').classList.remove('border-transparent', 'text-gray-500');
            document.getElementById('contenido-activos').classList.remove('hidden');
            document.getElementById('contenido-historial').classList.add('hidden');
        } else {
            document.getElementById('tab-historial').classList.add('border-[var(--color-primario)]', 'text-[var(--color-primario)]');
            document.getElementById('tab-historial').classList.remove('border-transparent', 'text-gray-500');
            document.getElementById('contenido-historial').classList.remove('hidden');
            document.getElementById('contenido-activos').classList.add('hidden');
        }
    },
    
    actualizarContadores: function() {
        const activos = this.prestamosActivos.length;
        const proximos = this.prestamosActivos.filter(p => {
            const dias = calcularDiasVencimiento(p.fechaDevolucion);
            return dias <= 3 && dias >= 0;
        }).length;
        const devueltos = this.historialPrestamos.length;
        
        document.getElementById('contador-activos').textContent = activos;
        document.getElementById('contador-proximos').textContent = proximos;
        document.getElementById('contador-devueltos').textContent = devueltos;
    },
    
    configurarEventos: function() {
        document.getElementById('tab-activos').addEventListener('click', () => this.cambiarTab('activos'));
        document.getElementById('tab-historial').addEventListener('click', () => this.cambiarTab('historial'));
    }
};

document.addEventListener('DOMContentLoaded', function() {
    controladorPrestamos.inicializar();
});