const trayWindows = {};
const projects = [
  {
    title: "Istok Lab",
    url: "https://istoklabpro.ru/",
    preview: "img/istoklab.jpg",
    credits: "Design by Leria agency"
  },
  {
    title: "Fiorichi",
    url: "https://fiorichi.shop/",
    preview: "img/fiorichi.jpg",
    credits: "Design by Leria agency"
  },
  {
    title: "Larfex STM",
    url: "https://xn--80aehlcj0acakfhgax4r.xn--p1ai/",
    preview: "img/larfexstm.jpg",
    credits: "Design by Leria agency"
  },
  {
    title: "Larfex",
    url: "https://larfex.com/",
    preview: "img/larfex.jpg",
    credits: "Design by Leria agency"
  },
  {
    title: "Leri Agency",
    url: "https://leriagency.ru/",
    preview: "img/leriagency.jpg",
    credits: "Design by Leria agency"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
  
  document.querySelectorAll('.shortcut, .menu-item').forEach(item => {
    item.addEventListener('click', function() {
      const type = this.getAttribute('data-window');
      if (type) openWindow(type);
    });
  });
});

function openWindow(type) {
  if (trayWindows[type] && !trayWindows[type].closed) {
    trayWindows[type].focus();
    return;
  }

  const win = new WinBox({
    title: type === 'about' ? 'Обо мне' : 'Портфолио',
    class: 'win7-theme',
    width: 800,
    height: 600,
    x: "center",
    y: "center",
    background: '#ebf3ff',
    onclose: () => {
      delete trayWindows[type];
      updateTaskbar();
      return false;
    }
  });

  if (type === 'about') {
    win.body.innerHTML = `
      <div class="window-body">
        <h1>Обо мне</h1>
        <p>Информация о вас...</p>
      </div>
    `;
  } else {
    let portfolioContent = '<div class="window-body"><h1>Портфолио</h1>';
    
    projects.forEach(project => {
      portfolioContent += `
        <div class="project-container">
          <div class="project-info">
            <div class="project-title">${project.title}</div>
            <a href="#" class="project-link" data-url="${project.url}">Открыть проект</a>
            <span class="project-credits">${project.credits}</span>
          </div>
          <div class="project-preview">
            <img src="${project.preview}" alt="${project.title}">
          </div>
        </div>
      `;
    });
    
    portfolioContent += '</div>';
    win.body.innerHTML = portfolioContent;
    
    win.body.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        openProjectWindow(url);
      });
    });
  }

  trayWindows[type] = win;
  updateTaskbar();
}

function openProjectWindow(url) {
  new WinBox({
    title: 'Просмотр проекта',
    class: 'win7-theme',
    width: 1000,
    height: 700,
    x: "center",
    y: "center",
    background: '#ebf3ff',
    url: url,
    onclose: () => false
  });
}

function updateTaskbar() {
  const taskbar = document.getElementById('taskbarItems');
  taskbar.innerHTML = '';
  
  Object.entries(trayWindows).forEach(([type, win]) => {
    const item = document.createElement('button');
    item.className = 'taskbar-item';
    item.innerHTML = `<img src="icons/${type}.png">`;
    item.onclick = () => win.focus();
    taskbar.appendChild(item);
  });
}

function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function updateClock() {
  document.getElementById('clock').textContent = 
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}