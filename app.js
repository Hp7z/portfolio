// Глобальные переменные
const activeWindows = {};
let clickTimer = null;

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
  loadDesktopLayout();
  setupEventListeners();
  updateClock();
  setInterval(updateClock, 1000);
});

// Настройка всех обработчиков событий
function setupEventListeners() {
  // Двойной клик
  document.querySelectorAll('.shortcut, .menu-item').forEach(item => {
    item.addEventListener('click', function(e) {
      if (clickTimer === null) {
        clickTimer = setTimeout(() => {
          clickTimer = null;
        }, 300);
      } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        const type = this.getAttribute('data-window');
        if (type) openWindow(type);
      }
    });
  });

  // Drag&Drop для ярлыков
  document.querySelectorAll('.shortcut').forEach(shortcut => {
    shortcut.setAttribute('draggable', 'true');
    
    shortcut.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', shortcut.id);
      setTimeout(() => { shortcut.style.opacity = '0.4'; }, 0);
    });

    shortcut.addEventListener('dragend', () => {
      shortcut.style.opacity = '1';
    });
  });

  document.querySelector('.desktop').addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  document.querySelector('.desktop').addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const shortcut = document.getElementById(id);
    if (shortcut) {
      shortcut.style.position = 'absolute';
      shortcut.style.left = `${e.clientX - 40}px`;
      shortcut.style.top = `${e.clientY - 40}px`;
      saveDesktopLayout();
    }
  });

  // Контекстное меню
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const menu = document.getElementById('contextMenu');
    menu.style.display = 'block';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
  });

  document.addEventListener('click', () => {
    document.getElementById('contextMenu').style.display = 'none';
  });
}

// Функции окон
function openWindow(type) {
  playSound('Click');
  
  const titleMap = {
    about: "Обо мне — Windows Explorer",
    portfolio: "Портфолио — Windows Explorer"
  };

  const win = new WinBox({
    title: titleMap[type],
    url: `windows/${type}.html`,
    width: type === 'portfolio' ? 800 : 600,
    height: 500,
    x: "center",
    y: "center",
    class: "win7-theme",
    top: 40,
    background: "linear-gradient(to bottom, #d6e5f8, #c6d9f4)",
    border: "1px solid #a3bde3",
    onclose: function() {
      playSound('Error');
      return false;
    }
  });

  // Кастомное закрытие с анимацией
  win.close = function() {
    win.body.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => {
      WinBox.prototype.close.call(win);
      delete activeWindows[type];
      updateTaskbar();
    }, 300);
  };

  // Добавляем в панель задач
  activeWindows[type] = win;
  updateTaskbar();
}

// Обновление панели задач
function updateTaskbar() {
  const taskbar = document.getElementById('taskbarItems');
  taskbar.innerHTML = '';
  
  Object.keys(activeWindows).forEach(type => {
    const item = document.createElement('div');
    item.className = 'taskbar-item';
    item.innerHTML = `<img src="icons/${type}.png" alt="${type}">`;
    item.onclick = () => activeWindows[type].focus();
    taskbar.appendChild(item);
  });
}

// LocalStorage функции
function saveDesktopLayout() {
  const layout = [];
  document.querySelectorAll('.shortcut').forEach(shortcut => {
    layout.push({
      id: shortcut.id,
      left: shortcut.style.left,
      top: shortcut.style.top
    });
  });
  localStorage.setItem('desktopLayout', JSON.stringify(layout));
}

function loadDesktopLayout() {
  const layout = JSON.parse(localStorage.getItem('desktopLayout')) || [];
  layout.forEach(item => {
    const shortcut = document.getElementById(item.id);
    if (shortcut) {
      shortcut.style.position = 'absolute';
      shortcut.style.left = item.left;
      shortcut.style.top = item.top;
    }
  });
}

// Системные функции
function playSound(type) {
  const sound = document.getElementById(`sound${type}`);
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function refreshDesktop() {
  localStorage.removeItem('desktopLayout');
  location.reload();
}

function changeWallpaper() {
  const wallpapers = ['wallpaper1.jpg', 'wallpaper2.jpg'];
  const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
  document.body.style.backgroundImage = `url('${randomWallpaper}')`;
}