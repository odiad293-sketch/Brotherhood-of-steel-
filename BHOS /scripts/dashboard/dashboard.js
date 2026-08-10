function sidebar() {
  const sidebar = document.querySelector('.js-sidebar');
  const overlay = document.querySelector('.js-overlay');
  const sidebarBtn = document.querySelector('.js-sidebar-btn');
  const menuBtn = document.querySelector('.js-sidebar-icon');
  sidebarBtn.addEventListener('click', () => {
    console.log('hambuger active');

    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
      overlay.classList.add('open');
      menuBtn.classList.add('open');
      menuBtn.textContent = 'close';
    } else {
      overlay.classList.remove('open');
      menuBtn.textContent = 'menu';
    }
  });

  overlay.addEventListener('click', () => {
    overlay.classList.remove('open');
    sidebar.classList.remove('open');
    menuBtn.textContent = 'menu';
  });
}

sidebar();
