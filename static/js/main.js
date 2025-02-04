document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Handle wrapping around in a cleaner way
        currentSlide = index;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        slides[currentSlide].classList.add('active');
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Show first slide initially
    showSlide(0);
});
