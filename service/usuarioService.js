const servicioUsuario = {
    obtenerUsuarios: function() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    },
    
    guardarUsuario: function(usuario) {
        const usuarios = this.obtenerUsuarios();
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return usuario;
    },
    
    buscarPorEmail: function(email) {
        const usuarios = this.obtenerUsuarios();
        return usuarios.find(usuario => usuario.email === email);
    },
    
    autenticar: function(email, password) {
        const usuario = this.buscarPorEmail(email);
        if (usuario && usuario.password === password && usuario.activo) {
            localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
            return usuario;
        }
        return null;
    },
    
    obtenerUsuarioActivo: function() {
        const usuario = localStorage.getItem('usuarioActivo');
        return usuario ? JSON.parse(usuario) : null;
    },
    
    cerrarSesion: function() {
        localStorage.removeItem('usuarioActivo');
    },
    
    existeEmail: function(email) {
        return this.buscarPorEmail(email) !== undefined;
    }
};