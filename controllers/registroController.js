const controladorRegistro = {
    inicializar: function() {
        const formulario = document.querySelector('form');
        formulario.addEventListener('submit', this.manejarEnvio.bind(this));
        
        const campos = ['nombres', 'apellidos', 'telefono', 'email', 'ciudad', 'password'];
        campos.forEach(campo => {
            const input = document.getElementById(campo);
            input.addEventListener('blur', () => this.validarCampo(campo, input.value));
        });
    },
    
    manejarEnvio: function(evento) {
        evento.preventDefault();
        
        const datos = this.obtenerDatosFormulario();
        const errores = validarCampos(datos);
        
        if (Object.keys(errores).length > 0) {
            this.mostrarErrores(errores);
            return;
        }
        
        if (servicioUsuario.existeEmail(datos.email)) {
            this.mostrarError('email', 'Este email ya está registrado');
            return;
        }
        
        const usuario = crearUsuario(datos);
        servicioUsuario.guardarUsuario(usuario);
        
        sistemaAlertas.personalizadoExito(
            'Registro completado',
            `¡Bienvenido ${datos.nombres}! Tu cuenta ha sido creada exitosamente.`,
            () => {
                window.location.href = '../iniciar sesion/login.html';
            }
        );
    },
    
    obtenerDatosFormulario: function() {
        return {
            nombres: document.getElementById('nombres').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            email: document.getElementById('email').value.trim(),
            ciudad: document.getElementById('ciudad').value.trim(),
            password: document.getElementById('password').value
        };
    },
    
    validarCampo: function(campo, valor) {
        const errores = validarCampos({[campo]: valor});
        
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
    controladorRegistro.inicializar();
});