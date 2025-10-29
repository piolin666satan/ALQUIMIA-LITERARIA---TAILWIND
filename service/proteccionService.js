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

        let card = document.createElement('div');
        card.classList.add('min-h-screen', 'flex', 'items-center', 'justify-center', 'bg-gradient-to-b', 'from-white', 'to-[var(--color-fondo)]', 'pt-24');

        let div2 = document.createElement('div');
        div2.classList.add('bg-white', 'text-[var(--color-primario)]', 'shadow-2xl', 'rounded-2xl', 'w-full', 'max-w-md', 'p-8', 'text-center');

        let div3 = document.createElement('div');
        div3.classList.add('mb-6');

        let div4 = document.createElement('div');
        div4.classList.add('w-24', 'h-24', 'mx-auto', 'bg-red-100', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mb-4');

        let i = document.createElement('i');
        i.classList.add('fas', 'fa-lock', 'text-4xl');

        let h1 = document.createElement('h1');
        h1.classList.add('text-3xl', 'font-bold', 'text-red-600', 'mb-2');
        h1.textContent = 'Acceso Restringido';

        let p = document.createElement('p');
        p.classList.add('text-gray-600');
        p.textContent = `Debes iniciar sesión para acceder a ${this.obtenerNombrePagina(pagina)}`;

        div4.appendChild(i);
        div3.appendChild(div4);
        div3.appendChild(h1);
        div3.appendChild(p);
        div2.appendChild(div3);
        card.appendChild(div2);

        let div5 = document.createElement('div');
        div5.classList.add('space-y-4');

        let a1 = document.createElement('a');
        a1.href = "../iniciar sesion/login.html";
        a1.classList.add('block', 'w-full', 'bg-[var(--color-primario)]', 'text-white', 'py-3', 'px-4', 'rounded-lg', 'font-semibold', 'hover:bg-gray-800', 'transition');
        a1.textContent = 'Iniciar Sesión';

        let a2 = document.createElement('a');
        a2.href = "../registrarse/registro.html";
        a2.classList.add('block', 'w-full', 'border', 'border-[var(--color-primario)]', 'text-[var(--color-primario)]', 'py-3', 'px-4', 'rounded-lg', 'font-semibold', 'hover:bg-[var(--color-primario)]', 'hover:text-white', 'transition');
        a2.textContent = 'Crear Cuenta';

        let a3 = document.createElement('a');
        a3.href = "../../index.html";
        a3.classList.add('block', 'w-full', 'text-gray-600', 'py-2', 'px-4', 'rounded-lg', 'hover:text-gray-800', 'transition');
        a3.textContent = 'Volver al Inicio';

        div5.appendChild(a1);
        div5.appendChild(a2);
        div5.appendChild(a3);
        card.appendChild(div5);

        let div6 = document.createElement('div');
        div6.classList.add('mt-6', 'p-4', 'bg-blue-50', 'rounded-lg');

        let h3 = document.createElement('h3');
        h3.classList.add('text-sm', 'font-semibold', 'text-blue-800', 'mb-2');
        h3.textContent = '¿Qué puedes hacer aquí?';

        let ul = document.createElement('ul');
        ul.classList.add('text-xs', 'text-blue-600', 'space-y-1', 'text-left');
        ul.innerHTML = this.obtenerCaracteristicasPagina(pagina);

        div6.appendChild(h3);
        div6.appendChild(ul);
        card.appendChild(div6);

        contenidoPrincipal.appendChild(card);

        
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

        let li = document.createElement('li');
        li.classList.add('text-blue-600', 'text-xs');

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