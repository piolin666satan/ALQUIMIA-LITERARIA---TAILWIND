const proteccionRutas = {
    verificarAcceso: function(paginaRequerida, callback) {
        const usuario = servicioUsuario.obtenerUsuarioActivo();
        
        if (!usuario) {
            this.ocultarContenidoProtegido();
            this.mostrarAccesoDenegado(paginaRequerida);
            return false;
        }
        
        this.mostrarContenidoProtegido();
        if (callback) {
            callback();
        }
        return true;
    },
    
    mostrarAccesoDenegado: function(pagina) {
        const contenidoPrincipal = document.querySelector('main');
        
        if (contenidoPrincipal) {
            contenidoPrincipal.innerHTML = `
                <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[var(--color-fondo)] pt-24">
                    <div class="bg-white text-[var(--color-primario)] shadow-2xl rounded-2xl w-full max-w-md p-8 text-center">
                        <div class="mb-6">
                            <div class="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <i class="fas fa-lock text-4xl"></i>
                            </div>
                            <h1 class="text-3xl font-bold text-red-600 mb-2">Acceso Restringido</h1>
                            <p class="text-gray-600">
                                Debes iniciar sesión para acceder a ${this.obtenerNombrePagina(pagina)}
                            </p>
                        </div>
                        
                        <div class="space-y-4">
                            <a href="../iniciar sesion/login.html" 
                               class="block w-full bg-[var(--color-primario)] text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition">
                                Iniciar Sesión
                            </a>
                            
                            <a href="../registrarse/registro.html" 
                               class="block w-full border border-[var(--color-primario)] text-[var(--color-primario)] py-3 px-4 rounded-lg font-semibold hover:bg-[var(--color-primario)] hover:text-white transition">
                                Crear Cuenta
                            </a>
                            
                            <a href="../../index.html" 
                               class="block w-full text-gray-600 py-2 px-4 rounded-lg hover:text-gray-800 transition">
                                Volver al Inicio
                            </a>
                        </div>
                        
                        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h3 class="text-sm font-semibold text-blue-800 mb-2">¿Qué puedes hacer aquí?</h3>
                            <ul class="text-xs text-blue-600 space-y-1 text-left">
                                ${this.obtenerCaracteristicasPagina(pagina)}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Ocultar otros elementos que no sean el header
        const elementosOcultar = ['nav', '.bg-white.rounded-lg.shadow-md', '.grid.grid-cols-1'];
        elementosOcultar.forEach(selector => {
            const elementos = document.querySelectorAll(selector);
            elementos.forEach(el => {
                if (!el.closest('header')) {
                    el.style.display = 'none';
                }
            });
        });
    },
    
    obtenerNombrePagina: function(pagina) {
        const nombres = {
            'libreria': 'la Librería Digital',
            'prestamos': 'Mis Préstamos'
        };
        return nombres[pagina] || 'esta sección';
    },
    
    obtenerCaracteristicasPagina: function(pagina) {
        const caracteristicas = {
            'libreria': `
                <li><i class="fas fa-book mr-2"></i>Explorar más de 5 libros disponibles</li>
                <li>🔍 Buscar por título, autor o categoría</li>
                <li><i class="fas fa-book-open mr-2"></i>Ver detalles completos de cada libro</li>
                <li><i class="fas fa-clipboard-list mr-2"></i>Reservar libros por 15 días</li>
                <li><i class="fas fa-star mr-2"></i>Acceder a recomendaciones personalizadas</li>
            `,
            'prestamos': `
                <li><i class="fas fa-clipboard-list mr-2"></i>Ver todos tus préstamos activos</li>
                <li>📅 Controlar fechas de devolución</li>
                <li>🔄 Renovar préstamos (hasta 2 veces)</li>
                <li><i class="fas fa-book mr-2"></i>Devolver libros fácilmente</li>
                <li>📊 Ver estadísticas de tu actividad</li>
            `
        };
        return caracteristicas[pagina] || '<li>Acceder a funcionalidades exclusivas</li>';
    },
    
    protegerContenido: function(selector) {
        const elementos = document.querySelectorAll(selector);
        elementos.forEach(elemento => {
            elemento.style.display = 'none';
        });
    },
    
    mostrarContenido: function(selector) {
        const elementos = document.querySelectorAll(selector);
        elementos.forEach(elemento => {
            elemento.style.display = '';
        });
    },
    
    ocultarContenidoProtegido: function() {
        const contenidoProtegido = document.querySelectorAll('.contenido-protegido');
        contenidoProtegido.forEach(elemento => {
            elemento.classList.remove('mostrar');
        });
    },
    
    mostrarContenidoProtegido: function() {
        const contenidoProtegido = document.querySelectorAll('.contenido-protegido');
        contenidoProtegido.forEach(elemento => {
            elemento.classList.add('mostrar');
        });
    }
};