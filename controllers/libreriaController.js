const controladorLibreria = {
    libros: [],
    librosOriginales: [],
    
    inicializar: function() {
        componenteHeader.inicializar('libreria');
        menuInferior.inicializar('libreria');
        
        const tieneAcceso = proteccionRutas.verificarAcceso('libreria', () => {
            this.cargarCategorias();
            this.cargarLibros();
            this.configurarEventos();
        });
        
        if (!tieneAcceso) {
            return;
        }
    },
    
    cargarCategorias: function() {
        const select = document.getElementById('filtro-categoria');
        categoriasLibros.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            select.appendChild(option);
        });
    },
    
    cargarLibros: function() {
        this.libros = servicioLibros.obtenerLibros();
        this.librosOriginales = [...this.libros];
        this.mostrarLibros();
        this.actualizarContador();
    },
    
    mostrarLibros: function() {
        const contenedor = document.getElementById('contenedor-libros');
        const mensajeSinResultados = document.getElementById('mensaje-sin-resultados');
        
        contenedor.innerHTML = '';
        
        if (this.libros.length === 0) {
            mensajeSinResultados.classList.remove('hidden');
            return;
        }
        
        mensajeSinResultados.classList.add('hidden');
        
        this.libros.forEach(libro => {
            const tarjeta = this.crearTarjetaLibro(libro);
            contenedor.appendChild(tarjeta);
        });
    },
    
    crearTarjetaLibro: function(libro) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'libro-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer fade-in';
        
        const estadoBadgeClass = libro.disponible ? 'disponible-badge' : 'no-disponible-badge';
        const estadoTexto = libro.disponible ? 'Disponible' : 'No disponible';
        
        tarjeta.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${libro.imagen}" alt="${libro.titulo}" 
                     class="imagen-libro w-full h-48 object-cover"
                     onerror="this.src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center'; this.onerror=null;"
                     onload="this.style.opacity='1'"
                     style="opacity: 0; transition: opacity 0.3s ease;">
                <div class="absolute top-3 right-3">
                    <span class="inline-block px-3 py-1 text-xs font-bold text-white ${estadoBadgeClass} rounded-full shadow-lg">
                        ${estadoTexto}
                    </span>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                    <div class="flex justify-between items-end">
                        <span class="categoria-badge text-xs text-white px-2 py-1 rounded-full font-medium shadow-sm">
                            ${libro.categoria}
                        </span>
                        <span class="text-xs text-white bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                            <i class="fas fa-star text-yellow-400"></i> ${libro.vecesReservado}
                        </span>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg mb-1 line-clamp-2 text-gray-800 hover:text-[var(--color-primario)] transition-colors">
                    ${libro.titulo}
                </h3>
                <p class="text-gray-600 text-sm mb-3 font-medium">por ${libro.autor}</p>
                <button onclick="controladorLibreria.mostrarDetalles('${libro.id}')" 
                        class="w-full bg-gradient-to-r from-[var(--color-primario)] to-gray-700 text-white py-2.5 px-4 rounded-lg hover:from-gray-700 hover:to-[var(--color-primario)] transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                    <span class="flex items-center justify-center">
                        <i class="fas fa-book-open mr-1"></i>Ver detalles
                    </span>
                </button>
            </div>
        `;
        
        return tarjeta;
    },
    
    mostrarDetalles: function(libroId) {
        const libro = servicioLibros.buscarPorId(libroId);
        if (!libro) return;
        
        const modal = document.getElementById('modal-libro');
        const contenido = document.getElementById('contenido-modal');
        
        const estadoClass = libro.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        const estadoTexto = libro.disponible ? 'Disponible' : 'No disponible';
        
        contenido.innerHTML = `
            <div class="flex flex-col md:flex-row gap-6 mb-6">
                <div class="flex-shrink-0 mx-auto md:mx-0">
                    <div class="relative">
                        <img src="${libro.imagen}" alt="${libro.titulo}" 
                             class="w-40 h-56 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                             onerror="this.src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center'; this.onerror=null;">
                        <div class="absolute -top-2 -right-2">
                            <span class="inline-block px-3 py-1 text-xs font-bold text-white ${libro.disponible ? 'disponible-badge' : 'no-disponible-badge'} rounded-full shadow-lg">
                                ${estadoTexto}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 space-y-4">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">${libro.titulo}</h3>
                        <p class="text-lg text-gray-600 font-medium">por ${libro.autor}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <span class="font-semibold text-gray-700">Categoría:</span>
                            <p class="categoria-badge text-white px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block">
                                ${libro.categoria}
                            </p>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <span class="font-semibold text-gray-700">ISBN:</span>
                            <p class="text-gray-600 mt-1 font-mono">${libro.isbn}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                        <span class="text-sm font-medium text-gray-700">Popularidad:</span>
                        <div class="flex items-center space-x-1">
                            <i class="fas fa-star text-yellow-500"></i>
                            <span class="font-bold text-gray-800">${libro.vecesReservado}</span>
                            <span class="text-sm text-gray-500">reservas</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-6">
                <h4 class="font-bold text-gray-800 mb-3 text-lg flex items-center">
                    <i class="fas fa-clipboard-list mr-1"></i>Descripción
                </h4>
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <p class="text-sm text-gray-700 leading-relaxed">${libro.descripcion}</p>
                </div>
            </div>
            <div class="flex gap-3">
                ${libro.disponible ? 
                    `<button onclick="controladorLibreria.reservarLibro('${libro.id}')" 
                             class="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                        <i class="fas fa-book mr-1"></i>Reservar libro
                    </button>` :
                    `<button disabled class="flex-1 bg-gray-400 text-white py-2.5 px-4 rounded-lg cursor-not-allowed font-medium">
                        <i class="fas fa-times-circle mr-1"></i>No disponible
                    </button>`
                }
                <button onclick="controladorLibreria.cerrarModal()" 
                        class="flex-1 bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium">
                    Cerrar
                </button>
            </div>
        `;
        
        modal.classList.remove('hidden');
    },
    
    reservarLibro: function(libroId) {
        const libro = servicioLibros.buscarPorId(libroId);
        
        sistemaAlertas.cargando('Procesando reserva...', 'Guardando tu solicitud');
        
        setTimeout(() => {
            const prestamo = servicioPrestamos.crearPrestamo(null, libroId);
            
            sistemaAlertas.cerrarCargando();
            
            if (prestamo) {
                const fechaDevolucion = new Date(prestamo.fechaDevolucion).toLocaleDateString('es-ES');
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Reserva exitosa!',
                    html: `
                        <div class="text-left">
                            <p><strong>Libro:</strong> ${libro.titulo}</p>
                            <p><strong>Autor:</strong> ${libro.autor}</p>
                            <p><strong>Fecha de devolución:</strong> ${fechaDevolucion}</p>
                            <p class="text-sm text-gray-600 mt-2">Puedes ver tus préstamos en la sección "Mis Préstamos"</p>
                        </div>
                    `,
                    confirmButtonText: 'Ver mis préstamos',
                    showCancelButton: true,
                    cancelButtonText: 'Continuar explorando',
                    confirmButtonColor: '#3b82f6'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../prestamos/prestamos.html';
                    }
                });
                
                this.cerrarModal();
                this.cargarLibros();
            } else {
                sistemaAlertas.error(
                    'No se pudo completar la reserva. El libro podría no estar disponible.',
                    'Error en la reserva'
                );
            }
        }, 800);
    },
    
    configurarEventos: function() {
        document.getElementById('buscar-libro').addEventListener('input', this.filtrarLibros.bind(this));
        document.getElementById('filtro-categoria').addEventListener('change', this.filtrarLibros.bind(this));
        document.getElementById('filtro-disponibilidad').addEventListener('change', this.filtrarLibros.bind(this));
        
        document.getElementById('cerrar-modal').addEventListener('click', this.cerrarModal.bind(this));
        document.getElementById('modal-libro').addEventListener('click', (e) => {
            if (e.target.id === 'modal-libro') {
                this.cerrarModal();
            }
        });
        
    },
    
    filtrarLibros: function() {
        const textoBusqueda = document.getElementById('buscar-libro').value.toLowerCase();
        const categoriaFiltro = document.getElementById('filtro-categoria').value;
        const disponibilidadFiltro = document.getElementById('filtro-disponibilidad').value;
        
        this.libros = this.librosOriginales.filter(libro => {
            const coincideTitulo = libro.titulo.toLowerCase().includes(textoBusqueda) ||
                                 libro.autor.toLowerCase().includes(textoBusqueda);
            
            const coincideCategoria = !categoriaFiltro || libro.categoria === categoriaFiltro;
            
            const coincideDisponibilidad = !disponibilidadFiltro ||
                (disponibilidadFiltro === 'disponible' && libro.disponible) ||
                (disponibilidadFiltro === 'no-disponible' && !libro.disponible);
            
            return coincideTitulo && coincideCategoria && coincideDisponibilidad;
        });
        
        this.mostrarLibros();
        this.actualizarContador();
    },
    
    actualizarContador: function() {
        const contador = document.getElementById('contador-libros');
        const total = this.libros.length;
        const disponibles = this.libros.filter(l => l.disponible).length;
        
        contador.textContent = `Mostrando ${total} libros (${disponibles} disponibles)`;
    },
    
    cerrarModal: function() {
        document.getElementById('modal-libro').classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    controladorLibreria.inicializar();
});