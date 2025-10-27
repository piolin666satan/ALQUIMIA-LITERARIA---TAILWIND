const controladorLogin = {
    inicializar: function() {
        const formulario = document.querySelector('form');
        formulario.addEventListener('submit', this.manejarEnvio.bind(this));
        
        const campos = ['email', 'password'];
        campos.forEach(campo => {
            const input = document.getElementById(campo);
            input.addEventListener('blur', () => this.validarCampo(campo, input.value));
        });
    },
    
    manejarEnvio: function(evento) {
        evento.preventDefault();
        
        const datos = this.obtenerDatosFormulario();
        const errores = this.validarLogin(datos);
        
        if (Object.keys(errores).length > 0) {
            this.mostrarErrores(errores);
            return;
        }
        
        // Mostrar indicador de carga
        sistemaAlertas.cargando('Verificando credenciales...', 'Por favor espera un momento');
        
        setTimeout(() => {
            const usuario = servicioUsuario.autenticar(datos.email, datos.password);
            
            sistemaAlertas.cerrarCargando();
            
            if (usuario) {
                sistemaAlertas.personalizadoExito(
                    `¡Bienvenido de vuelta, ${usuario.nombres}!`,
                    'Serás redirigido al inicio en un momento.',
                    () => {
                        window.location.href = '../../index.html';
                    }
                );
            } else {
                this.mostrarError('email', 'Email o contraseña incorrectos');
                sistemaAlertas.error(
                    'Verifica tus credenciales e intenta nuevamente',
                    'Datos incorrectos'
                );
            }
        }, 1000);
    },
    
    obtenerDatosFormulario: function() {
        return {
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value
        };
    },
    
    validarLogin: function(datos) {
        const errores = {};
        
        if (!validacionesUsuario.email.test(datos.email)) {
            errores.email = 'Email no tiene formato válido';
        }
        
        if (!datos.password) {
            errores.password = 'Contraseña es requerida';
        }
        
        return errores;
    },
    
    validarCampo: function(campo, valor) {
        const errores = this.validarLogin({[campo]: valor});
        
        if (errores[campo]) {
            this.mostrarError(campo, errores[campo]);
        } else {
            this.limpiarError(campo);
        }
    },
    
    mostrarErrores: function(errores) {
        Object.keys(errores).forEach(campo => {
            this.mostrarError(campo, errores[campo]);
        });
    },
    
    mostrarError: function(campo, mensaje) {
        const input = document.getElementById(campo);
        let error = input.parentNode.querySelector('.error-mensaje');
        
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-mensaje text-red-500 text-sm mt-1';
            input.parentNode.appendChild(error);
        }
        
        error.textContent = mensaje;
        input.classList.add('border-red-500');
    },
    
    limpiarError: function(campo) {
        const input = document.getElementById(campo);
        const error = input.parentNode.querySelector('.error-mensaje');
        
        if (error) {
            error.remove();
        }
        
        input.classList.remove('border-red-500');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    controladorLogin.inicializar();
});