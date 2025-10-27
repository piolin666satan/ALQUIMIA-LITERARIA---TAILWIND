const validacionesUsuario = {
    nombres: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/,
    apellidos: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/,
    telefono: /^(\+57\s?)?[3][0-9]{9}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ciudad: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,20}$/,
    password: /^.{6,}$/
};

const crearUsuario = function(datos) {
    return {
        id: generarId(),
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        telefono: datos.telefono,
        email: datos.email,
        ciudad: datos.ciudad,
        password: datos.password,
        fechaCreacion: new Date().toISOString(),
        activo: true
    };
};

const validarCampos = function(datos) {
    const errores = {};
    
    if (!validacionesUsuario.nombres.test(datos.nombres)) {
        errores.nombres = 'Nombres debe tener entre 2 y 30 letras';
    }
    
    if (!validacionesUsuario.apellidos.test(datos.apellidos)) {
        errores.apellidos = 'Apellidos debe tener entre 2 y 30 letras';
    }
    
    if (!validacionesUsuario.telefono.test(datos.telefono)) {
        errores.telefono = 'Teléfono debe tener formato +57 3XX XXXXXXX';
    }
    
    if (!validacionesUsuario.email.test(datos.email)) {
        errores.email = 'Email no tiene formato válido';
    }
    
    if (!validacionesUsuario.ciudad.test(datos.ciudad)) {
        errores.ciudad = 'Ciudad debe tener entre 2 y 20 letras';
    }
    
    if (datos.password && !validacionesUsuario.password.test(datos.password)) {
        errores.password = 'Password debe tener mínimo 6 caracteres';
    }
    
    return errores;
};

const generarId = function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
