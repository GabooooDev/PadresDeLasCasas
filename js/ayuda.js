document.addEventListener('DOMContentLoaded', function() {
    
    const carruselItems = document.querySelectorAll('.carrusel-item');
    const prevButton = document.querySelector('.carrusel-prev'); 
    const nextButton = document.querySelector('.carrusel-next'); 
    const totalItems = carruselItems.length;
    let carruselIndex = 0;
    let carruselInterval; // Variable para almacenar el ID del intervalo
    
    if (totalItems > 0) { 
        
        function updateCarrusel() {
            // Elimina la clase 'active' de todos y la añade al elemento actual
            carruselItems.forEach(item => item.classList.remove('active'));
            carruselItems[carruselIndex].classList.add('active');
        }

        function nextItem() {
            // Mueve al siguiente, reiniciando al principio con el operador %
            carruselIndex = (carruselIndex + 1) % totalItems; 
            updateCarrusel();
        }
        
        function prevItem() {
            // Mueve al anterior, manejando el retorno al final de la lista
            carruselIndex = (carruselIndex - 1 + totalItems) % totalItems;
            updateCarrusel();
        }

        function startCarrusel() {
            // Inicia el movimiento automático (5 segundos)
            carruselInterval = setInterval(nextItem, 5000);
        }

        function stopCarrusel() {
            // Detiene el movimiento automático
            clearInterval(carruselInterval);
        }
        
        // Event Listeners para los botones
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                stopCarrusel(); 
                nextItem();
                startCarrusel(); 
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                stopCarrusel(); 
                prevItem();
                startCarrusel(); 
            });
        }
        
        // Inicializar el carrusel y empezar el movimiento
        updateCarrusel();
        startCarrusel(); 
    }


    // menu fijo
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
        
    });


    //  Menu amburguesa para telefono
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        // Toggle del menú
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
            // Comprobación de existencia para evitar errores si los elementos no están
            if (navbar && mobileMenu && menuToggle) { 
                const isClickInsideNavbar = navbar.contains(event.target);
                const isClickToggle = menuToggle.contains(event.target); 

                if (!isClickInsideNavbar && !isClickToggle && mobileMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    }
});