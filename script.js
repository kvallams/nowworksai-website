/* ========================================
   NowWorksAI — Production Website JS
   ======================================== */

(function () {
   'use strict';

   // --- Cursor follower ---
   const cursor = document.querySelector('.cursor-follower');
   if (cursor && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;

      document.addEventListener('mousemove', (e) => {
         mouseX = e.clientX;
         mouseY = e.clientY;
      });

      function animateCursor() {
         cursorX += (mouseX - cursorX) * 0.15;
         cursorY += (mouseY - cursorY) * 0.15;
         cursor.style.left = cursorX + 'px';
         cursor.style.top = cursorY + 'px';
         requestAnimationFrame(animateCursor);
      }
      animateCursor();

      // Hover effect on interactive elements
      const interactiveEls = document.querySelectorAll('a, button, .service-card, .why-card, input, textarea, select');
      interactiveEls.forEach((el) => {
         el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
         el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
      });
   }

   // --- Navigation scroll ---
   const nav = document.getElementById('nav');
   let lastScroll = 0;

   function handleNavScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
         nav.classList.add('scrolled');
      } else {
         nav.classList.remove('scrolled');
      }
      lastScroll = scrollY;
   }

   window.addEventListener('scroll', handleNavScroll, { passive: true });
   handleNavScroll();

   // --- Mobile menu ---
   const hamburger = document.getElementById('hamburger');
   const mobileMenu = document.getElementById('mobileMenu');
   const mobileMenuClose = document.getElementById('mobileMenuClose');
   const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');

   function openMobileMenu() {
      mobileMenu.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
   }

   function closeMobileMenu() {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
   }

   if (hamburger) hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
   });

   if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

   mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
   });

   // --- Smooth scroll for anchor links ---
   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
      });
   });

   // --- Scroll reveal ---
   const revealElements = document.querySelectorAll('.service-card, .process-step, .why-card');

   const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            const el = entry.target;
            const index = Array.from(el.parentElement.children).indexOf(el);
            const delay = index * 100;
            setTimeout(() => {
               el.classList.add('visible');
            }, delay);
            revealObserver.unobserve(el);
         }
      });
   }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
   });

   revealElements.forEach((el) => revealObserver.observe(el));

   // --- Counter animation ---
   const statNumbers = document.querySelectorAll('.stat-number[data-count]');

   function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1500;
      const start = performance.now();

      function update(now) {
         const elapsed = now - start;
         const progress = Math.min(elapsed / duration, 1);
         // Ease out cubic
         const eased = 1 - Math.pow(1 - progress, 3);
         const current = Math.round(eased * target);
         el.textContent = current;
         if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
   }

   const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
         }
      });
   }, { threshold: 0.5 });

   statNumbers.forEach((el) => counterObserver.observe(el));

   // --- Parallax on hero orbs ---
   if (window.matchMedia('(pointer: fine)').matches) {
      let ticking = false;

      window.addEventListener('scroll', () => {
         if (!ticking) {
            requestAnimationFrame(() => {
               const scrollY = window.scrollY;
               const orbs = document.querySelectorAll('.hero-orb');
               orbs.forEach((orb, i) => {
                  const speed = (i + 1) * 0.05;
                  orb.style.transform = `translateY(${scrollY * speed}px)`;
               });
               ticking = false;
            });
            ticking = true;
         }
      }, { passive: true });
   }

   // --- Form submission ---
   const form = document.getElementById('ctaForm');
   if (form) {
      form.addEventListener('submit', function (e) {
         e.preventDefault();

         const btn = form.querySelector('button[type="submit"]');
         const originalText = btn.innerHTML;
         btn.innerHTML = '<span>Sending...</span>';
         btn.disabled = true;

         // Simulate sending (replace with actual API call)
         setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 11"/></svg>';
            btn.style.background = 'linear-gradient(90deg, #06D6A0, #4D96FF)';

            setTimeout(() => {
               btn.innerHTML = originalText;
               btn.style.background = '';
               btn.disabled = false;
               form.reset();
            }, 3000);
         }, 1500);
      });
   }

   // --- Active nav link highlighting ---
   const sections = document.querySelectorAll('section[id]');
   const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

   const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
               link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
         }
      });
   }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
   });

   sections.forEach((section) => sectionObserver.observe(section));

})();
