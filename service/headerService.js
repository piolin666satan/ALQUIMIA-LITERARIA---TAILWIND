const componenteHeader = {
    generar: function(paginaActiva = 'inicio') {
        const usuario = servicioUsuario.obtenerUsuarioActivo();
        
        const paginas = {
            inicio: { url: '../../index.html', texto: 'Inicio' },
            libreria: { url: '../libreria/libreria.html', texto: 'Librería' },
            prestamos: { url: '../prestamos/prestamos.html', texto: 'Préstamos' }
        };
        
        // Ajustar URLs según la página actual
        if (paginaActiva === 'inicio') {
            paginas.libreria.url = 'views/libreria/libreria.html';
            paginas.prestamos.url = 'views/prestamos/prestamos.html';
        }
        
        let navItems = '';
        Object.keys(paginas).forEach(key => {
            const activa = key === paginaActiva;
            const claseActiva = activa ? 'border-b-2 border-[var(--color-secundario)] text-[var(--color-secundario)]' : 'hover:text-[var(--color-secundario)] hover:border-b-2 border-[var(--color-secundario)] transition-all text-[var(--color-secundario)]';
            navItems += `<a href="${paginas[key].url}" class="text-lg mx-4 ${claseActiva}">${paginas[key].texto}</a>`;
        });
        
        let botonesUsuario = '';
        if (usuario) {
            botonesUsuario = `
                <span class="text-[var(--color-secundario)] mr-3">Hola, ${usuario.nombres}</span>
                <button onclick="componenteHeader.cerrarSesion()" class="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                    Cerrar sesión
                </button>
            `;
        } else {
            const rutaLogin = paginaActiva === 'inicio' ? 'views/iniciar sesion/login.html' : '../iniciar sesion/login.html';
            const rutaRegistro = paginaActiva === 'inicio' ? 'views/registrarse/registro.html' : '../registrarse/registro.html';
            
            botonesUsuario = `
                <a href="${rutaLogin}" class="bg-white text-[var(--color-primario)] px-3 py-1 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Iniciar sesión
                </a>
                <a href="${rutaRegistro}" class="bg-[var(--color-secundario)] text-[var(--color-primario)] px-3 py-1 rounded-lg font-semibold hover:bg-[var(--color-gris)] transition ml-2">
                    Registrarse
                </a>
            `;
        }
        
        return `
            <header class="fixed top-0 left-0 w-full px-6 py-4 bg-[var(--color-primario)] flex justify-between items-center shadow-md z-50">
                <a href="${paginaActiva === 'inicio' ? '#' : '../../index.html'}" class="text-2xl font-extrabold text-[var(--color-secundario)] hover:scale-110 transition-transform">
                    Alquimia.Literaria
                </a>
                <nav class="hidden md:flex">
                    ${navItems}
                </nav>
                <div class="hidden md:flex items-center space-x-2">
                    ${botonesUsuario}
                </div>
                <button onclick="componenteHeader.toggleMenu()" class="md:hidden text-[var(--color-secundario)] text-2xl">
                    ☰
                </button>
            </header>
            
            <div id="menu-movil" class="fixed top-0 left-0 w-full h-full bg-[var(--color-primario)] z-40 transform -translate-x-full transition-transform duration-300 md:hidden">
                <div class="flex justify-between items-center px-6 py-4 border-b border-[var(--color-secundario)]">
                    <span class="text-2xl font-bold text-[var(--color-secundario)]">Menú</span>
                    <button onclick="componenteHeader.toggleMenu()" class="text-[var(--color-secundario)] text-2xl">✕</button>
                </div>
                <nav class="px-6 py-4 space-y-4">
                    ${Object.keys(paginas).map(key => 
                        `<a href="${paginas[key].url}" class="block text-lg text-[var(--color-secundario)] py-2 border-b border-gray-600">${paginas[key].texto}</a>`
                    ).join('')}
                </nav>
                <div class="px-6 py-4 border-t border-gray-600">
                    ${usuario ? `
                        <p class="text-[var(--color-secundario)] mb-4">Hola, ${usuario.nombres}</p>
                        <button onclick="componenteHeader.cerrarSesion()" class="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                            Cerrar sesión
                        </button>
                    ` : `
                        <div class="space-y-2">
                            <a href="${paginaActiva === 'inicio' ? 'views/iniciar sesion/login.html' : '../iniciar sesion/login.html'}" 
                               class="block w-full text-center bg-white text-[var(--color-primario)] py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition">
                                Iniciar sesión
                            </a>
                            <a href="${paginaActiva === 'inicio' ? 'views/registrarse/registro.html' : '../registrarse/registro.html'}" 
                               class="block w-full text-center bg-[var(--color-secundario)] text-[var(--color-primario)] py-2 px-4 rounded-lg font-semibold hover:bg-[var(--color-gris)] transition">
                                Registrarse
                            </a>
                        </div>
                    `}
                </div>
            </div>
        `;
    },
    
    inicializar: function(paginaActiva) {
        const headerExistente = document.querySelector('header');
        if (headerExistente) {
            const nuevoHeader = document.createElement('div');
            nuevoHeader.innerHTML = this.generar(paginaActiva);
            headerExistente.replaceWith(...nuevoHeader.children);
        }
        
        this.verificarAccesoProtegido(paginaActiva);
    },
    
    verificarAccesoProtegido: function(paginaActiva) {
        // Esta función ahora solo genera el header
        // La protección se maneja en proteccionService.js
    },
    
    toggleMenu: function() {
        const menu = document.getElementById('menu-movil');
        if (menu) {
            menu.classList.toggle('-translate-x-full');
        }
    },
    
    cerrarSesion: function() {
        sistemaAlertas.confirmar(
            '¿Estás seguro de que quieres cerrar sesión?',
            'Confirmar cierre de sesión',
            () => {
                servicioUsuario.cerrarSesion();
                sistemaAlertas.exito('Sesión cerrada correctamente');
                setTimeout(() => {
                    window.location.href = window.location.pathname.includes('views') ? '../../index.html' : 'index.html';
                }, 1500);
            }
        );
    }
};