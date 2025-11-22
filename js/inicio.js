// Script para funcionalidades interactivas mejoradas
document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de imágenes con efectos mejorados
    let carruselIndex = 0;
    const carruselItems = document.querySelectorAll('.carrusel-item');
    
    function rotateCarrusel() {
        carruselItems.forEach(item => item.classList.remove('active'));
        carruselIndex = (carruselIndex + 1) % carruselItems.length;
        carruselItems[carruselIndex].classList.add('active');
    }
    
    // Cuadrícula dinámica con frases
    let gridIndex = 0;
    const gridItems = document.querySelectorAll('.grid-item');
    
    function rotateGrid() {
        gridItems.forEach(item => item.classList.remove('active'));
        gridIndex = (gridIndex + 1) % gridItems.length;
        gridItems[gridIndex].classList.add('active');
    }
    
    // Iniciar rotaciones
    setInterval(rotateCarrusel, 5000);
    setInterval(rotateGrid, 6000);
    
    // Efecto hover en eventos del calendario
    const eventos = document.querySelectorAll('.evento');
    eventos.forEach(evento => {
        evento.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        evento.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Controles del video
    const video = document.querySelector('.video-presentacion');
    const muteBtn = document.querySelector('.mute-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    
    // Control de silencio
    muteBtn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            muteBtn.title = "Silenciar";
        } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            muteBtn.title = "Activar sonido";
        }
    });
    
    // Control de pausa/reproducción
    pauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            pauseBtn.title = "Pausar";
        } else {
            video.pause();
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            pauseBtn.title = "Reproducir";
        }
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