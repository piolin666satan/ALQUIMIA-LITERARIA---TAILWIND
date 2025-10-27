const sistemaAlertas = {
    exito: function(mensaje, titulo = 'Éxito') {
        return Swal.fire({
            icon: 'success',
            title: titulo,
            text: mensaje,
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
            customClass: {
                popup: 'swal-popup-success'
            }
        });
    },
    
    error: function(mensaje, titulo = 'Error') {
        return Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensaje,
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ef4444',
            toast: true,
            position: 'top-end',
            customClass: {
                popup: 'swal-popup-error'
            }
        });
    },
    
    advertencia: function(mensaje, titulo = 'Atención') {
        return Swal.fire({
            icon: 'warning',
            title: titulo,
            text: mensaje,
            timer: 4500,
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#f59e0b',
            toast: true,
            position: 'top-end',
            customClass: {
                popup: 'swal-popup-warning'
            }
        });
    },
    
    info: function(mensaje, titulo = 'Información') {
        return Swal.fire({
            icon: 'info',
            title: titulo,
            text: mensaje,
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
            customClass: {
                popup: 'swal-popup-info'
            }
        });
    },
    
    confirmar: function(mensaje, titulo = 'Confirmar acción', onConfirmar, onCancelar) {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'swal-popup-confirm',
                confirmButton: 'swal-btn-confirm',
                cancelButton: 'swal-btn-cancel'
            },
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed && onConfirmar) {
                onConfirmar();
            } else if (result.isDismissed && onCancelar) {
                onCancelar();
            }
        });
    },
    
    cargando: function(titulo = 'Cargando...', mensaje = 'Por favor espera') {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    },
    
    cerrarCargando: function() {
        Swal.close();
    },
    
    personalizadoExito: function(titulo, mensaje, callback) {
        return Swal.fire({
            icon: 'success',
            title: titulo,
            text: mensaje,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#10b981',
            customClass: {
                popup: 'swal-popup-custom'
            }
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    }
};

// Estilos personalizados para SweetAlert2
const estilosSweetAlert = document.createElement('style');
estilosSweetAlert.textContent = `
    .swal-popup-success {
        border-left: 5px solid #10b981 !important;
    }
    .swal-popup-error {
        border-left: 5px solid #ef4444 !important;
    }
    .swal-popup-warning {
        border-left: 5px solid #f59e0b !important;
    }
    .swal-popup-info {
        border-left: 5px solid #3b82f6 !important;
    }
    .swal-popup-confirm {
        border-top: 4px solid #3b82f6 !important;
    }
    .swal-btn-confirm {
        font-weight: 600 !important;
        padding: 10px 20px !important;
    }
    .swal-btn-cancel {
        font-weight: 600 !important;
        padding: 10px 20px !important;
    }
    .swal2-toast {
        font-family: 'Poppins', sans-serif !important;
    }
`;
document.head.appendChild(estilosSweetAlert);