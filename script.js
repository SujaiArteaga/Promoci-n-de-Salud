document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    // Initialize carousel
    function showSlide(index) {
        // Hide all slides
        items.forEach(item => {
            item.classList.remove('active');
        });
        
        // Update indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show current slide and indicator
        items[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    }

    // Event listeners for carousel controls
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume auto slide when mouse leaves
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

  // Contact form submission
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe normalmente
        
        // Muestra mensaje de carga
        contactMessage.textContent = "Enviando mensaje...";
        contactMessage.style.color = "#333";
        
        // Obtiene los datos del formulario
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('email', document.getElementById('contact-email').value);
        formData.append('message', document.getElementById('message').value);
        
        // Envía los datos a FormSubmit
        fetch('https://formsubmit.co/ajax/sujaiarteaga404@gmail.com', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Muestra mensaje de éxito
            contactMessage.textContent = `¡Gracias ${document.getElementById('name').value}! Tu mensaje ha sido enviado. Te contactaremos pronto.`;
            contactMessage.style.color = '#4CAF50';
            contactForm.reset();
            
            // Oculta el mensaje después de 5 segundos
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        })
        .catch(error => {
            // Muestra mensaje de error
            contactMessage.textContent = "Error al enviar el mensaje. Por favor, intenta nuevamente.";
            contactMessage.style.color = "#f44336";
            console.error('Error:', error);
    });
    });
}

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Update active nav link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
});