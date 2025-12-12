/**
 * Modern Academic Website JavaScript
 * For POSTECH Machine Learning Lab
 *
 * Data is loaded from external files in /data/ folder:
 *   - data/news.js       -> NEWS_DATA
 *   - data/publications.js -> PUBLICATIONS_DATA
 *   - data/team.js       -> TEAM_DATA
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initParticles();
  initNavbar();
  initScrollAnimations();
  initResearchCards();
  loadNews();
  loadPublications();
  loadTeam();
});

/**
 * Particle Animation for Hero Section
 */
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
    particlesContainer.appendChild(particle);
  }
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarNav = document.getElementById('navbarNav');

  // Scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbarNav.classList.toggle('active');
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }

      // Close mobile menu
      navbarNav.classList.remove('active');
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.navbar-nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Research Cards Expand/Collapse
 */
function initResearchCards() {
  document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('click', function() {
      // Toggle expanded state
      const wasExpanded = this.classList.contains('expanded');

      // Close all other cards
      document.querySelectorAll('.research-card').forEach(c => {
        c.classList.remove('expanded');
      });

      // Toggle this card
      if (!wasExpanded) {
        this.classList.add('expanded');
      }
    });
  });
}

/**
 * Load News Items as Timeline
 * Data source: data/news.js -> NEWS_DATA
 */
function loadNews() {
  const newsContainer = document.getElementById('news-timeline');
  if (!newsContainer) return;

  // Check if NEWS_DATA is loaded from external file
  if (typeof NEWS_DATA === 'undefined') {
    console.warn('NEWS_DATA not found. Make sure data/news.js is loaded.');
    return;
  }

  NEWS_DATA.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item fade-in';
    timelineItem.style.transitionDelay = (index * 0.1) + 's';

    timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${item.date}</div>
        <p class="timeline-text"><span class="timeline-emoji">${item.emoji}</span>${item.text}</p>
      </div>
    `;

    newsContainer.appendChild(timelineItem);
  });

  // Re-init scroll animations for new elements
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
}

/**
 * Load Publications
 * Data source: data/publications.js -> PUBLICATIONS_DATA
 */
function loadPublications() {
  const pubContainer = document.getElementById('publications-container');
  if (!pubContainer) return;

  // Check if PUBLICATIONS_DATA is loaded from external file
  if (typeof PUBLICATIONS_DATA === 'undefined') {
    console.warn('PUBLICATIONS_DATA not found. Make sure data/publications.js is loaded.');
    return;
  }

  // Sort years in reverse chronological order (newest first)
  const sortedYears = Object.keys(PUBLICATIONS_DATA).sort((a, b) => parseInt(b) - parseInt(a));

  sortedYears.forEach((year, yearIndex) => {
    const yearSection = document.createElement('div');
    yearSection.className = 'pub-year fade-in';
    yearSection.style.transitionDelay = (yearIndex * 0.1) + 's';

    yearSection.innerHTML = `
      <div class="pub-year-header">
        <span class="pub-year-badge">${year}</span>
        <div class="pub-year-line"></div>
      </div>
      <ul class="pub-list"></ul>
    `;

    const pubList = yearSection.querySelector('.pub-list');

    PUBLICATIONS_DATA[year].forEach(pub => {
      const pubItem = document.createElement('li');
      pubItem.className = 'pub-item';

      let linksHtml = '';
      if (pub.arxiv) linksHtml += `<a href="${pub.arxiv}" target="_blank" class="pub-link"><i class="fas fa-file-alt"></i> arXiv</a>`;
      if (pub.pdf) linksHtml += `<a href="${pub.pdf}" target="_blank" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>`;
      if (pub.github) linksHtml += `<a href="${pub.github}" target="_blank" class="pub-link"><i class="fab fa-github"></i> Code</a>`;
      if (pub.project) linksHtml += `<a href="${pub.project}" target="_blank" class="pub-link"><i class="fas fa-globe"></i> Project</a>`;

      let badgeHtml = `<span class="pub-badge pub-badge-venue">${pub.venue}</span>`;
      if (pub.badge) {
        const badgeEmoji = pub.badge.toLowerCase() === 'oral' || pub.badge.toLowerCase() === 'spotlight' ? '🔥 ' : '';
        badgeHtml += `<span class="pub-badge pub-badge-award">${badgeEmoji}${pub.badge}</span>`;
      }

      pubItem.innerHTML = `
        <div class="pub-title">${pub.title}</div>
        <div class="pub-authors">${pub.authors}</div>
        <div class="pub-meta">${badgeHtml}${linksHtml}</div>
      `;

      pubList.appendChild(pubItem);
    });

    pubContainer.appendChild(yearSection);
  });

  setTimeout(() => {
    initScrollAnimations();
  }, 100);
}

/**
 * Load Team Members
 * Data source: data/team.js -> TEAM_DATA
 */
function loadTeam() {
  const teamContainer = document.getElementById('team-container');
  if (!teamContainer) return;

  // Check if TEAM_DATA is loaded from external file
  if (typeof TEAM_DATA === 'undefined') {
    console.warn('TEAM_DATA not found. Make sure data/team.js is loaded.');
    return;
  }

  Object.keys(TEAM_DATA).forEach((category, catIndex) => {
    const section = document.createElement('div');
    section.className = 'student-section-grid fade-in';
    section.style.transitionDelay = (catIndex * 0.1) + 's';

    section.innerHTML = `<h3 class="student-section-title">${category}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'students-grid';

    TEAM_DATA[category].forEach(member => {
      const card = document.createElement('div');
      card.className = 'student-card';

      const initials = member.name.split(' ').map(n => n[0]).join('');

      let linksHtml = '';
      if (member.homepage) {
        linksHtml += `<a href="${member.homepage}" target="_blank" class="student-link" title="Homepage"><i class="fas fa-home"></i></a>`;
      }
      if (member.scholar) {
        linksHtml += `<a href="${member.scholar}" target="_blank" class="student-link" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>`;
      }

      card.innerHTML = `
        <img src="${member.photo}" alt="${member.name}" class="student-photo"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="fallback-avatar" style="display:none;">${initials}</div>
        <div class="student-info">
          <h4>${member.name}</h4>
          <div class="student-dept">@${member.dept}/POSTECH</div>
          <div class="student-research">${member.research}</div>
          ${linksHtml ? `<div class="student-links">${linksHtml}</div>` : ''}
        </div>
      `;

      grid.appendChild(card);
    });

    section.appendChild(grid);
    teamContainer.appendChild(section);
  });

  setTimeout(() => {
    initScrollAnimations();
  }, 100);
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Google Analytics (if needed)
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-92946797-1', 'auto');
ga('send', 'pageview');
