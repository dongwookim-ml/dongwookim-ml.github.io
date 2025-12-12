/**
 * Modern Academic Website JavaScript
 * For POSTECH Machine Learning Lab
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
 */
function loadNews() {
  const newsContainer = document.getElementById('news-timeline');
  if (!newsContainer) return;

  const newsItems = [
    { date: 'Sep 2025', emoji: '📄', text: 'Two papers accepted to NeurIPS 2025 (1 spotlight)' },
    { date: 'Aug 2025', emoji: '🎉', text: 'Four papers accepted to EMNLP 2025 (2 mains, 2 findings)' },
    { date: 'Jul 2025', emoji: '🏆', text: 'Serving as Area Chair for NeurIPS 2025' },
    { date: 'Jun 2025', emoji: '📄', text: 'Paper accepted to ICCV 2025' },
    { date: 'Jun 2025', emoji: '🏆', text: 'Seunghyuk wins Presidential Science Scholarship' },
    { date: 'May 2025', emoji: '📊', text: 'Paper accepted to KDD 2025 (Dataset & Benchmark)' },
    { date: 'May 2025', emoji: '💊', text: 'Paper accepted to ICML 2025' },
    { date: 'Feb 2025', emoji: '👋', text: 'Seokwon and Sunghyun join the lab. Welcome!' },
    { date: 'Jan 2025', emoji: '🎉', text: 'Moonjeong wins BK21 Best Paper Award at POSTECH GSAI' },
    { date: 'Jan 2025', emoji: '📝', text: 'Paper accepted to ICLR 2025' }
  ];

  newsItems.forEach((item, index) => {
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
 * Load Publications (Recent/Featured)
 */
function loadPublications() {
  const pubContainer = document.getElementById('publications-container');
  if (!pubContainer) return;

  const publications = {
    '2025': [
      {
        title: 'High-order Equivariant Flow Matching for DFT Hamiltonian Prediction',
        authors: 'Seongsu Kim, Nayoung Kim, Dongwoo Kim, Sungsoo Ahn',
        venue: 'NeurIPS',
        badge: 'Spotlight',
        arxiv: 'https://arxiv.org/abs/2505.18817'
      },
      {
        title: 'Influence Functions for Edge Edits in Non-Convex Graph Neural Networks',
        authors: 'Jaeseung Heo, Kyeongheung Yun, Seokwon Yoon, MoonJeong Park, Jungseul Ok, Dongwoo Kim',
        venue: 'NeurIPS',
        arxiv: 'https://arxiv.org/abs/2506.04694'
      },
      {
        title: 'CoPL: Collaborative Preference Learning for Personalizing LLMs',
        authors: 'Youngbin Choi, Seunghyuk Cho, Minjong Lee, MoonJeong Park, Yesong Ko, Jungseul Ok, Dongwoo Kim',
        venue: 'EMNLP',
        arxiv: 'https://arxiv.org/abs/2503.01658'
      },
      {
        title: 'Holistic Unlearning Benchmark for Text-to-Image Diffusion Models',
        authors: 'Saemi Moon*, Minjong Lee*, Sangdon Park, Dongwoo Kim',
        venue: 'ICCV',
        arxiv: 'https://arxiv.org/abs/2410.05664',
        github: 'https://github.com/ml-postech/HUB',
        project: 'https://saemi410.github.io/HUB/'
      },
      {
        title: 'Enhancing Ligand Validity and Affinity with Multi-Reward Optimization',
        authors: 'Seungbeom Lee*, Munsun Jo*, Jungseul Ok, Dongwoo Kim',
        venue: 'ICML',
        pdf: 'https://openreview.net/pdf?id=gmFeso9sXJ'
      },
      {
        title: 'Towards Bridging Generalization and Expressivity of Graph Neural Networks',
        authors: 'Shouheng Li, Floris Geerts, Dongwoo Kim, Qing Wang',
        venue: 'ICLR',
        arxiv: 'https://arxiv.org/abs/2410.10051'
      }
    ],
    '2024': [
      {
        title: 'Mitigating Over-smoothing through Reverse Process GNN for Heterophilic Graphs',
        authors: 'MoonJeong Park, Jaeseung Heo, Dongwoo Kim',
        venue: 'ICML',
        arxiv: 'https://arxiv.org/abs/2403.10543'
      },
      {
        title: 'Few-shot Unlearning',
        authors: 'Youngsik Yoon*, Jinhwan Nam*, Jaeho Lee, Dongwoo Kim, Jungseul Ok',
        venue: 'IEEE S&P',
        arxiv: 'https://arxiv.org/abs/2205.15567',
        github: 'https://github.com/ml-postech/Few-shot-Unlearning'
      },
      {
        title: 'Hierarchical Graph Generation with K2-trees',
        authors: 'Yunhui Jang, Dongwoo Kim, Sungsoo Ahn',
        venue: 'ICLR',
        arxiv: 'https://arxiv.org/abs/2305.19125'
      },
      {
        title: 'Feature Unlearning for Pre-trained GANs and VAEs',
        authors: 'Saemi Moon, Seunghyuk Cho, Dongwoo Kim',
        venue: 'AAAI',
        arxiv: 'https://arxiv.org/abs/2303.05699'
      }
    ]
  };

  Object.keys(publications).forEach((year, yearIndex) => {
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

    publications[year].forEach(pub => {
      const pubItem = document.createElement('li');
      pubItem.className = 'pub-item';

      let linksHtml = '';
      if (pub.arxiv) linksHtml += `<a href="${pub.arxiv}" target="_blank" class="pub-link"><i class="fas fa-file-alt"></i> arXiv</a>`;
      if (pub.pdf) linksHtml += `<a href="${pub.pdf}" target="_blank" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>`;
      if (pub.github) linksHtml += `<a href="${pub.github}" target="_blank" class="pub-link"><i class="fab fa-github"></i> Code</a>`;
      if (pub.project) linksHtml += `<a href="${pub.project}" target="_blank" class="pub-link"><i class="fas fa-globe"></i> Project</a>`;

      let badgeHtml = `<span class="pub-badge pub-badge-venue">${pub.venue}</span>`;
      if (pub.badge) badgeHtml += `<span class="pub-badge pub-badge-award">${pub.badge}</span>`;

      pubItem.innerHTML = `
        <div class="pub-title">${pub.title}</div>
        <div class="pub-authors">${pub.authors}</div>
        <div class="pub-venue">${badgeHtml}</div>
        <div class="pub-links">${linksHtml}</div>
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
 */
function loadTeam() {
  const teamContainer = document.getElementById('team-container');
  if (!teamContainer) return;

  const team = {
    'PhD & Combined Students': [
      {
        name: 'Moonjeong Park',
        dept: 'GSAI',
        research: 'Graph Neural Networks, Dynamical Systems',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/mjpark_profile.jpeg',
        homepage: 'https://jeong27.github.io/',
        scholar: 'https://scholar.google.com/citations?user=EY_FX_sAAAAJ'
      },
      {
        name: 'Seungbeom Lee',
        dept: 'GSAI',
        research: 'Geometric Deep Learning, ML for Biology',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/sblee_profile.jpg'
      },
      {
        name: 'Seunghyuk Cho',
        dept: 'GSAI',
        research: 'Generative Models, Riemannian Geometry',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/shcho_profile.jpg',
        homepage: 'https://seunghyukcho.github.io',
        scholar: 'https://scholar.google.com/citations?hl=en&user=4OOM9_cAAAAJ'
      },
      {
        name: 'Jaeseung Heo',
        dept: 'GSAI',
        research: 'Graph Neural Networks, Data-Centric AI',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/jsheo_profile.jpg'
      },
      {
        name: 'Saemi Moon',
        dept: 'CSE',
        research: 'Trustworthy AI',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/smmoon_profile.jpeg',
        homepage: 'https://saemi410.github.io/',
        scholar: 'https://scholar.google.com/citations?user=FKyWiZMAAAAJ'
      },
      {
        name: 'Youngbin Choi',
        dept: 'CSE',
        research: 'LLM Personalization',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/ybchoi_profile.jpg',
        scholar: 'https://scholar.google.com/citations?user=oh2ATg8AAAAJ'
      },
      {
        name: 'Minjong Lee',
        dept: 'CSE',
        research: 'Generative Models',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/minjonglee_profile.jpg',
        homepage: 'https://minjong-lee.github.io/',
        scholar: 'https://scholar.google.com/citations?hl=en&user=peXGkQwAAAAJ'
      },
      {
        name: 'Kyeongheung Yun',
        dept: 'CSE',
        research: 'Graph Neural Networks',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/khyun_profile.jpg'
      },
      {
        name: 'Seokwon Yoon',
        dept: 'CSE',
        research: 'Machine Learning',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/swyoon_profile.JPG'
      },
      {
        name: 'Chongtae Ahn',
        dept: 'GSAI',
        research: 'Machine Learning (Industrial PhD from POSCO)',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/chongtaeahn_profile.jpg'
      }
    ],
    'MS Students': [
      {
        name: 'Yesong Ko',
        dept: 'CSE',
        research: 'Machine Learning',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/ysko_profile.png'
      },
      {
        name: 'Sunghyun Choi',
        dept: 'GSAI',
        research: 'Machine Learning, Generative Models',
        photo: 'https://raw.githubusercontent.com/ml-postech/ml-postech.github.io/master/img/shchoi_profile.jpg'
      }
    ]
  };

  Object.keys(team).forEach((category, catIndex) => {
    const section = document.createElement('div');
    section.className = 'student-section-grid fade-in';
    section.style.transitionDelay = (catIndex * 0.1) + 's';

    section.innerHTML = `<h3 class="student-section-title">${category}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'students-grid';

    team[category].forEach(member => {
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
