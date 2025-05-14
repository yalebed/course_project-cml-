document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (!header) return;
  
    let lastScroll = 0;
    const scrollThreshold = 100;
    let ticking = false;
    const headerHeight = header.offsetHeight;
  
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const currentScroll = window.pageYOffset;
  
          if (currentScroll <= 0) {
            header.classList.remove('hidden');
            lastScroll = currentScroll;
            ticking = false;
            return;
          }
  
          if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            header.classList.add('hidden');
          } 
          else if (currentScroll < lastScroll) {
            header.classList.remove('hidden');
          }
  
          lastScroll = currentScroll;
          ticking = false;
        });
  
        ticking = true;
      }
    });
  });