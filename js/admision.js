// Script para la página de admisión
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const pregunta = item.querySelector('.faq-pregunta');
        
        pregunta.addEventListener('click', function() {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar item actual
            item.classList.toggle('active');
        });
    });

    // Modal para formularios
    const modal = document.getElementById('modal-admision');
    const modalContenido = document.getElementById('modal-contenido');
    const modalCerrar = document.getElementById('modal-cerrar');
    const botonesFormulario = document.querySelectorAll('.btn-formulario');
    

    // Abrir modal para formularios
    botonesFormulario.forEach(boton => {
        boton.addEventListener('click', function() {
            const tipoFormulario = this.getAttribute('data-formulario');
            mostrarFormulario(tipoFormulario);
        });
    });

    
    // Cerrar modal
    modalCerrar.addEventListener('click', function() {
        modal.classList.remove('mostrar');
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('mostrar');
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('mostrar')) {
            modal.classList.remove('mostrar');
        }
    });

    function mostrarFormulario(tipo) {
        let contenido = '';
        
        switch(tipo) {
            case 'pre-inscripcion':
                contenido = `
                    <h3>Formulario de Pre-Inscripción</h3>
                    <form class="formulario-modal">
                        <div class="form-group">
                            <label for="nombre-estudiante">Nombre del Estudiante *</label>
                            <input type="text" id="nombre-estudiante" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="grado">Grado a Cursar *</label>
                            <select id="grado" required>
                                <option value="">Selecciona el grado</option>
                                <option value="1ro">1er Año</option>
                                <option value="2do">2do Año</option>
                                <option value="3ro">3er Año</option>
                                <option value="4to">4to Año</option>
                                <option value="5to">5to Año</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="nombre-representante">Nombre del Representante *</label>
                            <input type="text" id="nombre-representante" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="telefono">Teléfono de Contacto *</label>
                            <input type="tel" id="telefono" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Correo Electrónico *</label>
                            <input type="email" id="email" required>
                        </div>
                        
                        <button type="submit" class="btn-enviar-modal">Enviar Pre-Inscripción</button>
                    </form>
                `;
                break;
                
            case 'agendar-cita':
                contenido = `
                    <h3>Agendar Visita Guiada</h3>
                    <form class="formulario-modal">
                        <div class="form-group">
                            <label for="fecha-visita">Fecha Preferida *</label>
                            <input type="date" id="fecha-visita" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="hora-visita">Hora Preferida *</label>
                            <select id="hora-visita" required>
                                <option value="">Selecciona una hora</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="nombre-visita">Nombre Completo *</label>
                            <input type="text" id="nombre-visita" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="telefono-visita">Teléfono *</label>
                            <input type="tel" id="telefono-visita" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="motivo">Motivo de la Visita</label>
                            <textarea id="motivo" rows="3" placeholder="Información general, proceso de admisión, etc."></textarea>
                        </div>
                        
                        <button type="submit" class="btn-enviar-modal">Agendar Visita</button>
                    </form>
                `;
                break;
        }
        
        modalContenido.innerHTML = contenido;
        modal.classList.add('mostrar');
        
        // Agregar funcionalidad al formulario del modal
        const formularioModal = document.querySelector('.formulario-modal');
        if (formularioModal) {
            formularioModal.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Formulario enviado correctamente. Nos pondremos en contacto contigo pronto.');
                modal.classList.remove('mostrar');
            });
        }
    }

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

    // Animación para los pasos del proceso
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    // Observar los pasos del proceso
    const pasos = document.querySelectorAll('.paso');
    pasos.forEach((paso, index) => {
        paso.style.opacity = '0';
        paso.style.transform = 'translateX(-20px)';
        paso.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        observer.observe(paso);
    });
});