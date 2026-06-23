document.addEventListener("DOMContentLoaded", () => {
  const shelfItems = document.querySelectorAll('.shelf-item');
  const themePullString = document.getElementById('theme-pull-string');
  const stage = document.getElementById('ambient-stage');
  const body = document.body;

  // Helper function to safely update text content
  const updateText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const syncShowroomLayout = (item) => {
    if (!item || !stage) return;

    // Shift Background
    stage.style.background = item.getAttribute('data-stage-bg');

    // Update Hero Text
    const dynamicWord = document.getElementById('hero-dynamic-word');
    if (dynamicWord) {
      dynamicWord.textContent = item.getAttribute('data-word');
      dynamicWord.style.color = item.getAttribute('data-accent');
    }

    updateText('hero-dynamic-subtext', item.getAttribute('data-desc'));
    updateText('hero-label-name', item.getAttribute('data-name'));
    updateText('badge-title', item.getAttribute('data-name'));
    updateText('badge-meta', item.getAttribute('data-tag'));
    updateText('badge-price', item.getAttribute('data-price'));

    // Update Sidebar Notes
    updateText('side-top', item.getAttribute('data-top'));
    updateText('side-heart', item.getAttribute('data-heart'));
    updateText('side-base', item.getAttribute('data-base'));
  };

  // Interaction Logic
  shelfItems.forEach(item => {
    item.addEventListener('mouseenter', () => syncShowroomLayout(item));
    
    item.addEventListener('click', () => {
      document.querySelector('.shelf-item.locked')?.classList.remove('locked');
      item.classList.add('locked');
      syncShowroomLayout(item);
    });
  });

  // Dark Mode Toggle
  themePullString?.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
  });
});