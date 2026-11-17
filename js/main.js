/**
 * MANISH GAUTAM PORTFOLIO - MAIN INTERACTION JAVASCRIPT
 * Features: Typewriter, ScrollSpy, Project Filtering, Modals, Clipboard, Smooth Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-drawer .nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target) && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  // 2. Sticky Navbar Blur & Shadow on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Dynamic Typewriter Effect
  const typewriteTarget = document.getElementById('heroTypewriter');
  if (typewriteTarget) {
    const phrases = [
      "MS in Computer Science @ Texas Tech",
      "Graduate GPA: 3.833 / 4.00",
      "AI & Machine Learning Developer",
      "Python & Django Backend Engineer",
      "Data Science & Automation Specialist"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function tick() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriteTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typewriteTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; // Pause at full phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before typing next
      }

      setTimeout(tick, typeSpeed);
    }

    tick();
  }

  // 4. ScrollSpy Active Nav Link Tracking
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');

  function scrollSpy() {
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Initial check

  // 5. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. Interactive Modal (For Images, PDFs, Transcript)
  const modalOverlay = document.getElementById('previewModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContentArea = document.getElementById('modalContentArea');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(title, contentHtml) {
    if (!modalOverlay || !modalTitle || !modalContentArea) return;
    modalTitle.textContent = title;
    modalContentArea.innerHTML = contentHtml;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalContentArea.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) {
      closeModal();
    }
  });

  // Attach modal triggers for Transcript
  const openTranscriptBtns = document.querySelectorAll('.trigger-transcript-modal');
  openTranscriptBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Texas Tech University - Unofficial Academic Transcript (GPA: 3.833)',
        `<div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
          <iframe src="files/Manish_Gautam_Transcript.pdf" width="100%" height="550px" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;"></iframe>
          <div style="display:flex; gap: 1rem;">
            <a href="files/Manish_Gautam_Transcript.pdf" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open in New Tab</a>
            <a href="files/Manish_Gautam_Transcript.pdf" download class="btn btn-secondary btn-sm"><i class="fa-solid fa-download"></i> Download PDF</a>
          </div>
        </div>`
      );
    });
  });

  // Attach modal triggers for Project Documents (Quiz App & Internship)
  const openDocBtns = document.querySelectorAll('.trigger-doc-modal');
  openDocBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docPath = btn.getAttribute('data-doc-path');
      const docTitle = btn.getAttribute('data-doc-title') || 'Project Documentation';
      openModal(
        docTitle,
        `<div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
          <iframe src="${docPath}" width="100%" height="550px" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;"></iframe>
          <div style="display:flex; gap: 1rem;">
            <a href="${docPath}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Full Document</a>
            <a href="${docPath}" download class="btn btn-secondary btn-sm"><i class="fa-solid fa-download"></i> Download PDF</a>
          </div>
        </div>`
      );
    });
  });

  // Attach modal triggers for Certificates
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.cert-title')?.textContent || 'Certificate';
      if (img) {
        openModal(
          title,
          `<img src="${img.src}" alt="${title}" style="max-height: 75vh; width: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">`
        );
      }
    });
  });

  // 7. Copy to Clipboard with Toast Notification
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastNoticeText');

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  const copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Selected: ${textToCopy}`);
        });
      }
    });
  });

  // 8. Contact Form Mailto Dispatcher
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value || '';
      const email = document.getElementById('senderEmail')?.value || '';
      const subject = document.getElementById('senderSubject')?.value || 'Opportunity / Project Collaboration';
      const message = document.getElementById('senderMessage')?.value || '';

      const mailtoUrl = `mailto:itsmanishgautam@gmail.com?subject=${encodeURIComponent(subject + " - " + name)}&body=${encodeURIComponent("Sender: " + name + " (" + email + ")\n\nMessage:\n" + message)}`;
      
      window.location.href = mailtoUrl;
      showToast('Opening your email client...');
    });
  }

  // 9. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});

