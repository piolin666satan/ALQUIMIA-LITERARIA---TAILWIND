const controladorPrincipal = {
    inicializar: function() {
        componenteHeader.inicializar('inicio');
        menuInferior.inicializar('inicio');
        this.configurarEventos();
    },
    
    configurarEventos: function() {
        // Eventos adicionales si es necesario
    }
};

document.addEventListener('DOMContentLoaded', function() {
    controladorPrincipal.inicializar();
});