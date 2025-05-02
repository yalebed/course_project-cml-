document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let slideInterval;
  
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });
  
    const dots = document.querySelectorAll('.dot');
  
    function updateSlider() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    function startInterval() {
      slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      }, 5000);
    }
  
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
  
    const slider = document.querySelector('.cafe-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startInterval);
  
    startInterval();
  });