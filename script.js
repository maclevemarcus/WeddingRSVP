(function () {
  'use strict';

  function initSealEntrance() {
    const sealEntrance = document.getElementById('seal-entrance');
    const invitation = document.getElementById('invitation');
    
    if (!sealEntrance || !invitation) return;

    sealEntrance.addEventListener('click', function() { breakSeal(); });

    setTimeout(function() {
      if (!sealEntrance.classList.contains('hidden')) { breakSeal(); }
    }, 3000);

    function breakSeal() {
      const seal = sealEntrance.querySelector('.wax-seal');
      seal.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      seal.style.transform = 'scale(1.2) rotate(15deg)';
      seal.style.opacity = '0';
      createCrackParticles(seal);
      setTimeout(function() {
        sealEntrance.classList.add('hidden');
        invitation.classList.add('revealed');
      }, 600);
    }

    function createCrackParticles(seal) {
      const rect = seal.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `position:fixed;left:${centerX}px;top:${centerY}px;width:8px;height:8px;background:#c4a35a;border-radius:50%;pointer-events:none;z-index:10000;`;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 800, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' })
        .onfinish = function() { particle.remove(); };
      }
    }
  }

  function initFallingPetals() {
    const petalsContainer = document.querySelector('.petals-fall');
    if (!petalsContainer) return;

    const petalTypes = ['🌸', '🌿', '🍃', '🌺', '💐'];
    
    setInterval(function() {
      if (Math.random() > 0.7) { createPetal(); }
    }, 1000);

    function createPetal() {
      const petal = document.createElement('div');
      petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];
      petal.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-5%;font-size:${1+Math.random()}rem;opacity:0;pointer-events:none;`;
      petalsContainer.appendChild(petal);

      const duration = 15000 + Math.random() * 10000;
      const drift = -50 + Math.random() * 100;

      petal.animate([
        { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
        { opacity: 0.6, offset: 0.1 },
        { opacity: 0.6, offset: 0.9 },
        { transform: `translateY(110vh) translateX(${drift}px) rotate(${360+Math.random()*360}deg)`, opacity: 0 }
      ], { duration: duration, easing: 'linear' }).onfinish = function() { petal.remove(); };
    }
  }

  function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const thanksMessage = document.getElementById('rsvp-thanks');
    if (!form || !thanksMessage) return;

    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        createRipple(this);
      });
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      console.log('RSVP Data:', Object.fromEntries(formData));
      showThankYou();
    });

    function showThankYou() {
      form.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      form.style.opacity = '0';
      form.style.transform = 'translateY(-20px) scale(0.95)';
      setTimeout(function() {
        form.style.display = 'none';
        thanksMessage.classList.remove('hidden');
        thanksMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        createConfetti();
      }, 500);
    }

    function createRipple(element) {
      const ripple = document.createElement('div');
      ripple.style.cssText = 'position:absolute;left:50%;top:100%;width:4px;height:4px;border-radius:50%;background:#c4a35a;transform:translate(-50%,-50%)scale(0);pointer-events:none;';
      element.parentElement.style.position = 'relative';
      element.parentElement.appendChild(ripple);
      ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.5 },
        { transform: 'translate(-50%, -50%) scale(20)', opacity: 0 }
      ], { duration: 600, easing: 'ease-out' }).onfinish = function() { ripple.remove(); };
    }
  }

  function createConfetti() {
    const colors = ['#9caf88', '#d4b87a', '#7d8b6f', '#c4a35a'];
    for (let i = 0; i < 30; i++) {
      setTimeout(function() {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.cssText = `position:fixed;left:50%;top:40%;width:8px;height:8px;background:${color};border-radius:${Math.random()>0.5?'50%':'0'};pointer-events:none;z-index:1000;`;
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 100;
        const rotation = Math.random() * 720 - 360;

        confetti.animate([
          { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
          { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rotation}deg)`, opacity: 0 }
        ], { duration: 1500 + Math.random() * 1000, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' })
        .onfinish = function() { confetti.remove(); };
      }, i * 50);
    }
  }

  function initCardTilt() {
    const cards = document.querySelectorAll('.invitation-card, .rsvp-card, .location-card');
    cards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        const currentRotation = card.style.transform.match(/rotate\(([^)]+)\)/);
        const baseRotation = currentRotation ? parseFloat(currentRotation[1]) : 0;
        card.style.transform = `rotate(${baseRotation}deg) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = 'transform 0.1s ease-out';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease-out';
      });
    });
  }

  function initParallax() {
    const cards = document.querySelectorAll('.invitation-card, .rsvp-card, .location-card');
    const pressedFlowers = document.querySelectorAll('.pressed-flowers');
    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      cards.forEach(function(card, index) {
        const speed = 0.05 + (index * 0.02);
        const yPos = -(scrolled * speed);
        const currentTransform = card.style.transform || '';
        const rotateMatch = currentTransform.match(/rotate\(([^)]+)\)/);
        const baseRotate = rotateMatch ? rotateMatch[0] : 'rotate(0deg)';
        card.style.transform = `${baseRotate} translateY(${yPos}px)`;
      });
      pressedFlowers.forEach(function(flower, index) {
        const speed = 0.08 + (index * 0.02);
        const yPos = -(scrolled * speed);
        flower.style.transform = `translateY(${yPos}px)`;
      });
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  function initOrnamentEffects() {
    const ornaments = document.querySelectorAll('.divider-ornament, .footer-heart');
    ornaments.forEach(function(ornament) {
      ornament.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.3) rotate(10deg)';
        this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      });
      ornament.addEventListener('mouseleave', function() {
        this.style.transform = '';
        const self = this;
        setTimeout(function() { self.style.animation = ''; }, 300);
      });
    });
  }

  function initScrollAnimations() {
    const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.detail-group, .form-group');
    animatedElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  function initKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.activeElement) {
        document.activeElement.blur();
      }
      const sealEntrance = document.getElementById('seal-entrance');
      if (sealEntrance && !sealEntrance.classList.contains('hidden')) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          sealEntrance.click();
        }
      }
    });

    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(function(el) {
      el.addEventListener('focus', function() {
        this.style.outline = '2px solid #c4a35a';
        this.style.outlineOffset = '2px';
      });
      el.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
      });
    });
  }

  function initConsoleMessage() {
    console.log('%c💒 Carolinegel & Macleve', 'font-size:20px;font-weight:bold;color:#8b9b7a;text-shadow:2px 2px 4px rgba(0,0,0,0.2)');
    console.log('%cWishing you a lifetime of love and happiness! 🌸', 'font-size:14px;color:#7d8b6f;');
    console.log('%cHandcrafted with love ♥', 'font-size:12px;color:#c4a35a;font-style:italic;');
  }

  const style = document.createElement('style');
  style.textContent = '@keyframes wiggle { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }';
  document.head.appendChild(style);

  const paperclip = document.querySelector('.paperclip');
  if (paperclip) {
    paperclip.addEventListener('mouseenter', function() {
      this.style.animation = 'wiggle 0.5s ease';
    });
  }

  const stamp = document.querySelector('.postcard-stamp');
  if (stamp) {
    stamp.addEventListener('mouseenter', function() {
      this.style.transform = 'rotate(-15deg) scale(1.1)';
      this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
    stamp.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  }

  function init() {
    initSealEntrance();
    initFallingPetals();
    initRSVPForm();
    initCardTilt();
    initParallax();
    initOrnamentEffects();
    initScrollAnimations();
    initKeyboardSupport();
    initConsoleMessage();
    document.body.classList.add('loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
