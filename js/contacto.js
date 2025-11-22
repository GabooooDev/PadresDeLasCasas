// Script para la página de contacto
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    const mensajeExito = document.createElement('div');
    const mensajeError = document.createElement('div');
    
    mensajeExito.className = 'mensaje-exito';
    mensajeError.className = 'mensaje-error';
    
    formulario.parentNode.insertBefore(mensajeExito, formulario);
    formulario.parentNode.insertBefore(mensajeError, formulario);

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (validarFormulario()) {
            enviarFormulario();
        }
    });

    function validarFormulario() {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Ocultar mensajes anteriores
        mensajeExito.style.display = 'none';
        mensajeError.style.display = 'none';
        
        // Validaciones
        if (nombre === '') {
            mostrarError('Por favor, ingresa tu nombre completo.');
            return false;
        }
        
        if (email === '') {
            mostrarError('Por favor, ingresa tu correo electrónico.');
            return false;
        }
        
        if (!validarEmail(email)) {
            mostrarError('Por favor, ingresa un correo electrónico válido.');
            return false;
        }
        
        if (asunto === '') {
            mostrarError('Por favor, selecciona un asunto.');
            return false;
        }
        
        if (mensaje === '') {
            mostrarError('Por favor, escribe tu mensaje.');
            return false;
        }
        
        if (mensaje.length < 10) {
            mostrarError('El mensaje debe tener al menos 10 caracteres.');
            return false;
        }
        
        return true;
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function enviarFormulario() {
        const formData = new FormData(formulario);
        
        // Simular envío del formulario 
        setTimeout(() => {
            mostrarExito('¡Mensaje enviado correctamente! Te contactaremos pronto.');
            formulario.reset();
        }, 1000);
    }

    function mostrarExito(mensaje) {
        mensajeExito.textContent = mensaje;
        mensajeExito.style.display = 'block';
        mensajeError.style.display = 'none';
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            mensajeExito.style.display = 'none';
        }, 5000);
    }

    function mostrarError(mensaje) {
        mensajeError.textContent = mensaje;
        mensajeError.style.display = 'block';
        mensajeExito.style.display = 'none';
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            mensajeError.style.display = 'none';
        }, 5000);
    }

    // Efectos visuales para los campos del formulario
    const inputs = formulario.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Menú fijo al hacer scroll
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Menú hamburguesa para móviles
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú móvil al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        if (!isClickInsideNavbar && mobileMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});