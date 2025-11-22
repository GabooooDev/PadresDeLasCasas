// Funcionalidad para el menú fijo y filtros de instalaciones
document.addEventListener('DOMContentLoaded', function() {
    // Variables para el menú fijo
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Variables para los filtros
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const tarjetasInstalacion = document.querySelectorAll('.tarjeta-instalacion');
    
    // Variables para el modal
    const modal = document.getElementById('modal-imagen');
    const modalImagen = document.getElementById('modal-imagen-src');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalCerrar = document.getElementById('modal-cerrar');
    
    // Función para el menú fijo - COMPORTAMIENTO SIMPLIFICADO
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    }
    
    // Función para el menú móvil
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
    
    // Función para filtrar instalaciones
    function filtrarInstalaciones(categoria) {
        tarjetasInstalacion.forEach(tarjeta => {
            if (categoria === 'todas' || tarjeta.dataset.categoria === categoria) {
                tarjeta.style.display = 'block';
                setTimeout(() => {
                    tarjeta.style.opacity = '1';
                    tarjeta.style.transform = 'translateY(0)';
                }, 100);
            } else {
                tarjeta.style.opacity = '0';
                tarjeta.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    tarjeta.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Función para abrir el modal
    function abrirModal(tarjeta) {
        const imagen = tarjeta.querySelector('.imagen-instalacion').src;
        const titulo = tarjeta.querySelector('.nombre-instalacion').textContent;
        const descripcion = tarjeta.querySelector('.descripcion-instalacion').textContent;
        
        modalImagen.src = imagen;
        modalImagen.alt = titulo;
        modalTitulo.textContent = titulo;
        modalDescripcion.textContent = descripcion;
        
        modal.classList.add('mostrar');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function cerrarModal() {
        modal.classList.remove('mostrar');
        document.body.style.overflow = 'auto';
    }
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    
    // Menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Filtros
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtroBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            // Filtrar instalaciones
            filtrarInstalaciones(this.dataset.categoria);
        });
    });
    
    // Modal
    tarjetasInstalacion.forEach(tarjeta => {
        tarjeta.addEventListener('click', function() {
            abrirModal(this);
        });
    });
    
    modalCerrar.addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('mostrar')) {
            cerrarModal();
        }
    });
    
    // Inicializar
    handleScroll();
});