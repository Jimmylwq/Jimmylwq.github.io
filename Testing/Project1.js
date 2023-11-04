let slideIndex = 0;
showSlides(slideIndex);

function showSlides(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';
}

document.querySelector('.prev').textContent = '<';
document.querySelector('.next').textContent = '>';

document.querySelector('.prev').addEventListener('click', () => {
    showSlides(--slideIndex);
});

document.querySelector('.next').addEventListener('click', () => {
    showSlides(++slideIndex);
});

function autoSlide() {
    showSlides(++slideIndex);
}

// Automatically advance the slideshow every 3 seconds (3000 milliseconds)
setInterval(autoSlide, 3000);





