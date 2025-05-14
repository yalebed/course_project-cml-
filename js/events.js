document.addEventListener('DOMContentLoaded', function() {
    const lookAroundBtn = document.getElementById('lookAroundBtn');
    
    if (lookAroundBtn) {
      lookAroundBtn.addEventListener('click', function() {
        document.querySelector('.welcome-block').scrollIntoView({ 
          behavior: 'smooth' 
        });
        
        const welcomeBlock = document.querySelector('.welcome-block');
        welcomeBlock.style.animation = 'none';
        welcomeBlock.offsetHeight;
        welcomeBlock.style.animation = 'pulse 0.8s';
      });
    }
    
    const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      hamburger.classList.add('active');
      document.querySelector('.header').classList.add('force-hidden');
    });
  }
  
  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.querySelector('.header').classList.remove('force-hidden');
    });
  }
 
  const dropdownItems = document.querySelectorAll('.dropdown');
  
  dropdownItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdownMenu = item.querySelector('.dropdown-menu');
    
    if (window.innerWidth <= 768) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('active');
      });
    }
  });

  const categoryLinks = document.querySelectorAll('.category-nav__link');
  const sections = document.querySelectorAll('.category-section');
  
  if (categoryLinks.length > 0) {
    categoryLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.querySelector('.header').classList.remove('force-hidden');
          }
          
          const headerHeight = document.querySelector('.header').offsetHeight;
          const scrollPosition = targetSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
          
          categoryLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
    
    window.addEventListener('scroll', function() {
      if (categoryLinks.length === 0) return;
      
      let current = '';
      const scrollPosition = window.pageYOffset;
      const headerHeight = document.querySelector('.header').offsetHeight;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= (sectionTop - headerHeight - 100)) {
          current = section.getAttribute('id');
        }
      });
      
      categoryLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
    
    if (sections.length > 0) {
      const firstSectionId = sections[0].getAttribute('id');
      document.querySelector(`.category-nav__link[href="#${firstSectionId}"]`).classList.add('active');
    }
  }
  });