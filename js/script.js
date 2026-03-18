// CATEGORY SCROLL + ARROWS

const categoryBar = document.getElementById('category-scroll-track');
const scrollLeftBtn = document.getElementById('left-scroll-btn');
const scrollRightBtn = document.getElementById('right-scroll-btn');

if (categoryBar && scrollRightBtn) {
  // Scroll buttons
  scrollRightBtn.addEventListener('click', () => {
    categoryBar.scrollBy({ left: 200, behavior: 'smooth' });
  });

  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', () => {
      categoryBar.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }

  // Arrow visibility logic (merged + optimized)

  const updateCategoryArrowState = () => {
    const maxScrollLeft = categoryBar.scrollWidth - categoryBar.clientWidth;

    // Right arrow
    if (categoryBar.scrollLeft >= maxScrollLeft - 5 || maxScrollLeft <= 1) {
      scrollRightBtn.style.opacity = '0';
      scrollRightBtn.style.pointerEvents = 'none';
    } else {
      scrollRightBtn.style.opacity = '1';
      scrollRightBtn.style.pointerEvents = 'auto';
    }

    // Left arrow
    if (scrollLeftBtn) {
      if (categoryBar.scrollLeft <= 5 || maxScrollLeft <= 1) {
        scrollLeftBtn.style.opacity = '0';
        scrollLeftBtn.style.pointerEvents = 'none';
      } else {
        scrollLeftBtn.style.opacity = '1';
        scrollLeftBtn.style.pointerEvents = 'auto';
      }
    }
  };

  categoryBar.addEventListener('scroll', updateCategoryArrowState);
  window.addEventListener('resize', updateCategoryArrowState);
  window.addEventListener('load', updateCategoryArrowState);

  updateCategoryArrowState();
}

// VIDEO CARD HOVER COLOR
const cards = document.querySelectorAll('.video-card');

function changeRandomDark() {
  let red = Math.floor(Math.random() * 71 + 130);
  let green = Math.floor(Math.random() * 71 + 130);
  let blue = Math.floor(Math.random() * 71 + 130);
  let alpha = 0.25;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const randomColor = changeRandomDark();
    card.style.setProperty('--hover-color', randomColor);
  });
});

// SIDEBAR TOGGLE
const menuBtn = document.querySelector('.left-section .hamburger-menu');
const closeBtn = document.getElementById('close-sidebar-btn');
const expandedSidebar = document.getElementById('expanded-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

const desktopBreakpoint = 991;

function syncSidebarLayoutMode() {
  if (window.innerWidth <= desktopBreakpoint) {
    document.body.classList.remove('sidebar-open');
  }
}

function toggleSidebar() {
  expandedSidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');

  if (window.innerWidth > desktopBreakpoint) {
    document.body.classList.toggle('sidebar-open');
  } else {
    document.body.classList.remove('sidebar-open');
  }
}

if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

window.addEventListener('resize', syncSidebarLayoutMode);
syncSidebarLayoutMode();

// DARK MODE
const themeToggle = document.getElementById('theme-toggle');
const logos = document.querySelectorAll('.youtube-logo');

function updateThemeUI(isDarkMode) {
  document.body.classList.toggle('dark-mode', isDarkMode);

  logos.forEach(logo => {
    const lightLogo = logo.getAttribute('data-light-logo');
    const darkLogo = logo.getAttribute('data-dark-logo');
    logo.src = isDarkMode ? darkLogo : lightLogo;
  });
}

if (themeToggle) {
  themeToggle.addEventListener('change', function () {
    updateThemeUI(this.checked);
  });
}
