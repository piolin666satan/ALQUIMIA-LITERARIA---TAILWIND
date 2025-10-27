const menuInferior = {
    generar: function(paginaActiva = 'inicio') {
        const paginas = {
            inicio: { 
                url: paginaActiva === 'inicio' ? '#' : '../../index.html', 
                icono: '<i class="fas fa-home"></i>', 
                texto: 'Inicio' 
            },
            libreria: { 
                url: paginaActiva === 'inicio' ? 'views/libreria/libreria.html' : '../libreria/libreria.html', 
                icono: '<i class="fas fa-book"></i>', 
                texto: 'Librería' 
            },
            prestamos: { 
                url: paginaActiva === 'inicio' ? 'views/prestamos/prestamos.html' : '../prestamos/prestamos.html', 
                icono: '<i class="fas fa-clipboard-list"></i>', 
                texto: 'Préstamos' 
            }
        };
        
        let items = '';
        Object.keys(paginas).forEach(key => {
            const activa = key === paginaActiva;
            const claseActiva = activa ? 'text-white' : 'text-[var(--color-dos)] hover:text-white';
            items += `
                <a href="${paginas[key].url}" class="flex flex-col items-center ${claseActiva} text-sm font-semibold transition">
                    <span class="text-lg">${paginas[key].icono}</span> 
                    ${paginas[key].texto}
                </a>
            `;
        });
        
        return `
            <div class="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-primario)] border-t-2 border-[var(--color-dos)] flex justify-around py-2 z-50 shadow-lg">
                ${items}
            </div>
        `;
    },
    
    inicializar: function(paginaActiva) {
        const menuExistente = document.querySelector('.md\\:hidden.fixed.bottom-0');
        if (menuExistente) {
            const nuevoMenu = document.createElement('div');
            nuevoMenu.innerHTML = this.generar(paginaActiva);
            menuExistente.replaceWith(...nuevoMenu.children);
        } else {
            // Si no existe, agregarlo al final del body
            document.body.insertAdjacentHTML('beforeend', this.generar(paginaActiva));
        }
    }
};