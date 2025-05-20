// --- Старт: переменные и утилиты ---
const trayWindows = {};

// --- Тема, иконки, обои ---
const windowIcons = {
  about: { light: 'icons/about-dark.svg', dark: 'icons/about-light.svg' },
  portfolio: { light: 'icons/portfolio-dark.svg', dark: 'icons/portfolio-light.svg' },
  services: { light: 'icons/services-dark.svg', dark: 'icons/services-light.svg' },
  contacts: { light: 'icons/contacts-dark.svg', dark: 'icons/contacts-light.svg' },
  calculator: { light: 'icons/calculator-dark.svg', dark: 'icons/calculator-light.svg' },
  website: { light: 'icons/website-dark.svg', dark: 'icons/website-light.svg' },
  // --- Добавляем model3d с корректными путями ---
  model3d: { light: 'icons/model3d-dark.svg', dark: 'icons/model3d-light.svg' },
  game: { light: 'icons/game-dark.svg', dark: 'icons/game-light.svg' },
  github: { light: 'icons/github-light.svg', dark: 'icons/github-dark.svg' },
  kitty: { dark: 'icons/kitty-light.svg', light: 'icons/kitty-dark.svg' }
};
function getIconForTheme(iconType) {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  return isDarkTheme ? iconType.dark : iconType.light;
}
const dayWallpapers = ['img/day/1.jpg', 'img/day/2.jpg'];
const nightWallpapers = ['img/night/1.jpg', 'img/night/2.jpg'];
function getWallpaperIndex(theme) {
  // Используем общий индекс для day/night
  return parseInt(localStorage.getItem('wallpaperIndex')) || 0;
}
function setWallpaperIndex(theme, index) {
  localStorage.setItem(`wallpaperIndex-${theme}`, index);
}
function setWallpaperForTheme(theme) {
  let wallpapers, index;
  if (theme === 'dark') {
    wallpapers = nightWallpapers;
    index = getWallpaperIndex('night');
    document.body.style.setProperty('--wallpaper', `url('${wallpapers[index]}')`);
  } else {
    wallpapers = dayWallpapers;
    index = getWallpaperIndex('day');
    document.body.style.setProperty('--wallpaper', `url('${wallpapers[index]}')`);
  }
}

// --- При загрузке страницы: переключаем индекс обоев синхронно для day/night ---
(function rotateWallpaperIndexes() {
  let idx = parseInt(localStorage.getItem('wallpaperIndex')) || 0;
  idx = (idx + 1) % dayWallpapers.length;
  localStorage.setItem('wallpaperIndex', idx);
  setWallpaperIndex('day', idx);
  setWallpaperIndex('night', idx);
})();

// --- Тема и переключение ---
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  document.body.classList.toggle('dark-theme');
  const isDarkTheme = document.body.classList.contains('dark-theme');
  localStorage.setItem('darkTheme', isDarkTheme);
  Object.values(trayWindows).forEach(win => {
    win.setBackground(isDarkTheme ? '#2e3436' : '#f6f5f4');
  });
  updateWindowIcons();
  updateTaskbar();
  setWallpaperForTheme(isDarkTheme ? 'dark' : 'light');
}
function updateWindowIcons() {
  Object.entries(trayWindows).forEach(([type, win]) => {
    let iconPath;
    if (type.startsWith('model-') || type.startsWith('gallery-')) {
      iconPath = getIconForTheme(windowIcons.model3d);
    } else if (type === 'about') iconPath = getIconForTheme(windowIcons.about);
    else if (type === 'portfolio') iconPath = getIconForTheme(windowIcons.portfolio);
    else if (type === 'services') iconPath = getIconForTheme(windowIcons.services);
    else if (type === 'contacts') iconPath = getIconForTheme(windowIcons.contacts);
    else if (type === 'calculator') iconPath = getIconForTheme(windowIcons.calculator);
    else if (type === 'github') iconPath = getIconForTheme(windowIcons.github);
    else if (type.startsWith('project-')) iconPath = getIconForTheme(windowIcons.website);
    else if (type === 'minesweeper' || type === 'game2048' || type === 'tictactoe') iconPath = getIconForTheme(windowIcons.game);
    else if (type === 'kitty') iconPath = getIconForTheme(windowIcons.kitty);
    else iconPath = getIconForTheme(windowIcons.about);

    if (typeof win.setIcon === 'function') {
      win.setIcon(iconPath);
    }

    // --- Принудительно обновлять background-image и src для .wb-icon ---
    if (win.dom) {
      const iconDiv = win.dom.querySelector('.wb-icon');
      if (iconDiv) {
        iconDiv.style.backgroundImage = '';
        setTimeout(() => {
          iconDiv.style.backgroundImage = `url('${iconPath}')`;
          const iconImg = iconDiv.querySelector('img');
          if (iconImg) iconImg.src = iconPath;
        }, 0);
      }
    }
  });
}
function initWindowIcons() {
  updateWindowIcons();
}

// --- Календарь ---
function generateCalendar(year, month) {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;
  let now = new Date();
  if (typeof year !== 'number') year = now.getFullYear();
  if (typeof month !== 'number') month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Цвет стрелок всегда актуальный
  const getArrowColor = () => document.body.classList.contains('dark-theme') ? '#fff' : '#000';
  let calendarHTML = `
    <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;">
      <button id="calendar-prev" style="background:none;border:none;font-size:22px;cursor:pointer;color:${getArrowColor()};padding:0 10px;">&#8592;</button>
      <div class="calendar-month" style="flex:1;text-align:center;">${monthNames[month]} ${year}</div>
      <button id="calendar-next" style="background:none;border:none;font-size:22px;cursor:pointer;color:${getArrowColor()};padding:0 10px;">&#8594;</button>
    </div>
    <div class="calendar-grid">
      <div class="day-name">Пн</div>
      <div class="day-name">Вт</div>
      <div class="day-name">Ср</div>
      <div class="day-name">Чт</div>
      <div class="day-name">Пт</div>
      <div class="day-name">Сб</div>
      <div class="day-name">Вс</div>
  `;
  let dayIndex = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < dayIndex; i++) calendarHTML += `<div class="day empty"></div>`;
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = (i === now.getDate() && month === now.getMonth() && year === now.getFullYear()) ? 'today' : '';
    calendarHTML += `<div class="day ${isToday}">${i}</div>`;
  }
  calendarHTML += `</div>`;
  calendar.innerHTML = calendarHTML;
  // Не закрываем календарь при переключении месяца
  calendar.querySelector('#calendar-prev').onclick = (e) => {
    e.stopPropagation();
    generateCalendar(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1);
    // Обновить цвет стрелок после рендера
    updateCalendarArrowColors();
  };
  calendar.querySelector('#calendar-next').onclick = (e) => {
    e.stopPropagation();
    generateCalendar(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1);
    updateCalendarArrowColors();
  };
  // При смене темы обновлять цвет стрелок
  updateCalendarArrowColors();
}
function updateCalendarArrowColors() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;
  const color = document.body.classList.contains('dark-theme') ? '#fff' : '#000';
  const prev = calendar.querySelector('#calendar-prev');
  const next = calendar.querySelector('#calendar-next');
  if (prev) prev.style.color = color;
  if (next) next.style.color = color;
}
const originalToggleTheme = toggleTheme;
toggleTheme = function() {
  originalToggleTheme();
  updateCalendarArrowColors();
};

// --- Меню Пуск ---
function renderStartMenu() {
  const menu = document.getElementById('startMenu');
  let menuHTML = `<div class="menu-section">`;
  const isDarkTheme = document.body.classList.contains('dark-theme');
  window.startMenuItems.main.forEach(item => {
    const iconPath = isDarkTheme ? item.icon : (item.iconLight || item.icon);
    menuHTML += `
      <div class="menu-item" data-window="${item.action}">
        <img src="${iconPath}" alt="${item.title}">
        <span>${item.title}</span>
      </div>
    `;
  });
  menuHTML += `</div>`;
  menu.innerHTML = menuHTML;
  menu.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
      const windowType = this.getAttribute('data-window');
      if (windowType) {
        openWindow(windowType);
        closeStartMenu();
      }
    });
  });
}
function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  if (menu.style.display === 'block') {
    closeStartMenu();
  } else {
    menu.style.display = 'block';
    renderStartMenu();
  }
}
function closeStartMenu() {
  const menu = document.getElementById('startMenu');
  menu.style.display = 'none';
}

// --- Таскбар ---
function updateTaskbar() {
  const taskbar = document.getElementById('taskbarItems');
  // --- Не показывать окна в таскбаре на планшетах и мобилках ---
  if (window.innerWidth <= 992) {
    taskbar.innerHTML = '';
    return;
  }
  taskbar.innerHTML = '';
  Object.entries(trayWindows).forEach(([type, win]) => {
    const item = document.createElement('div');
    item.className = 'taskbar-item' + (win.dom?.classList.contains('active') ? ' active' : '');
    let title = win.title || type;
    let iconPath;
    
    // Определение иконки как раньше
    const isDarkTheme = document.body.classList.contains('dark-theme');
    if (type === 'about') iconPath = getIconForTheme(windowIcons.about);
    else if (type === 'portfolio') iconPath = getIconForTheme(windowIcons.portfolio);
    else if (type === 'services') iconPath = getIconForTheme(windowIcons.services);
    else if (type === 'contacts') iconPath = getIconForTheme(windowIcons.contacts);
    else if (type === 'calculator') iconPath = getIconForTheme(windowIcons.calculator);
    else if (type === 'github') iconPath = getIconForTheme(windowIcons.github);
    else if (type.startsWith('project-')) iconPath = getIconForTheme(windowIcons.website);
    else if (type.startsWith('model-') || type.startsWith('gallery-')) iconPath = getIconForTheme(windowIcons.model3d);
    else if (type === 'minesweeper' || type === 'game2048' || type === 'tictactoe') iconPath = getIconForTheme(windowIcons.game);
    else if (type === 'kitty') iconPath = getIconForTheme(windowIcons.kitty);
    else iconPath = getIconForTheme(windowIcons.about);

    item.innerHTML = `<img src="${iconPath}"><span class="taskbar-item-title">${title}</span>`;

    // Исправленное поведение: используем только win.minimize()/win.restore()
    item.onclick = () => {
      if (win.dom && win.dom.classList.contains('active')) {
        if (typeof win.minimize === 'function') win.minimize();
      } else {
        if (typeof win.restore === 'function') win.restore();
        activateWindow(type);
      }
    };

    taskbar.appendChild(item);
  });
}

// --- Вкладки ---
function setupTabs(container) {
  // Главные вкладки
  container.querySelectorAll('.main-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabs = Array.from(container.querySelectorAll('.main-tabs .tab'));
      const activeTab = container.querySelector('.main-tabs .tab.active');
      if (activeTab === this) return;
      const activeTabId = activeTab.getAttribute('data-tab');
      const activeContent = document.getElementById(`${activeTabId}-tab`);
      const clickedTabIndex = tabs.indexOf(this);
      const activeTabIndex = tabs.indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      tabs.forEach(t => t.classList.remove('active'));
      // Скрыть все tab-content внутри container
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = document.getElementById(`${tabId}-tab`);
          if (newContent) {
            newContent.classList.add(`slide-${direction}`);
            newContent.classList.add('active');
            setTimeout(() => {
              newContent.classList.remove(`slide-${direction}`);
            }, 10);
          }
        }, 300);
      } else {
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const newContent = document.getElementById(`${tabId}-tab`);
        if (newContent) {
          newContent.classList.add(`slide-${direction}`);
          newContent.classList.add('active');
          setTimeout(() => {
            newContent.classList.remove(`slide-${direction}`);
          }, 10);
        }
      }
    });
  });

  // Подвкладки для веб-сайтов
  container.querySelectorAll('#websites-tab .sub-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabs = Array.from(container.querySelectorAll('#websites-tab .sub-tabs .tab'));
      const activeTab = container.querySelector('#websites-tab .sub-tabs .tab.active');
      if (activeTab === this) return;
      const activeTabId = activeTab.getAttribute('data-tab');
      const activeContent = document.getElementById(`${activeTabId}-tab`);
      const clickedTabIndex = tabs.indexOf(this);
      const activeTabIndex = tabs.indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      tabs.forEach(t => t.classList.remove('active'));
      // Скрыть все tab-content внутри websites-tab
      const parent = document.getElementById('websites-tab');
      if (parent) parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = document.getElementById(`${tabId}-tab`);
          if (newContent) {
            newContent.classList.add(`slide-${direction}`);
            newContent.classList.add('active');
            setTimeout(() => {
              newContent.classList.remove(`slide-${direction}`);
            }, 10);
          }
        }, 300);
      } else {
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const newContent = document.getElementById(`${tabId}-tab`);
        if (newContent) {
          newContent.classList.add(`slide-${direction}`);
          newContent.classList.add('active');
          setTimeout(() => {
            newContent.classList.remove(`slide-${direction}`);
          }, 10);
        }
      }
    });
  });

  // Подвкладки для 3D моделей
  container.querySelectorAll('#models3d-tab .sub-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabs = Array.from(container.querySelectorAll('#models3d-tab .sub-tabs .tab'));
      const activeTab = container.querySelector('#models3d-tab .sub-tabs .tab.active');
      if (activeTab === this) return;
      const activeTabId = activeTab.getAttribute('data-tab');
      const activeContent = document.getElementById(`${activeTabId}-tab`);
      const clickedTabIndex = tabs.indexOf(this);
      const activeTabIndex = tabs.indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      tabs.forEach(t => t.classList.remove('active'));
      // Скрыть все tab-content внутри models3d-tab
      const parent = document.getElementById('models3d-tab');
      if (parent) parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = document.getElementById(`${tabId}-tab`);
          if (newContent) {
            newContent.classList.add(`slide-${direction}`);
            newContent.classList.add('active');
            setTimeout(() => {
              newContent.classList.remove(`slide-${direction}`);
            }, 10);
          }
        }, 300);
      } else {
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const newContent = document.getElementById(`${tabId}-tab`);
        if (newContent) {
          newContent.classList.add(`slide-${direction}`);
          newContent.classList.add('active');
          setTimeout(() => {
            newContent.classList.remove(`slide-${direction}`);
          }, 10);
        }
      }
    });
  });

  // Для остальных вкладок (обычные .tabs)
  container.querySelectorAll('.tabs .tab:not(.main-tabs .tab):not(.sub-tabs .tab)').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabsContainer = this.closest('.tabs');
      if (!tabsContainer) return;
      tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      // Скрыть все tab-content в родителе .tabs
      const parent = tabsContainer.parentElement;
      if (parent) parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const tabContent = document.getElementById(`${tabId}-tab`);
      if (tabContent) {
        setTimeout(() => {
          tabContent.classList.add('active');
        }, 50);
      }
    });
  });

  // Волна при наведении на проекты и модели
  container.querySelectorAll('.project-container, .model-container, .color-block').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.classList.add('wave-effect');
    });
    element.addEventListener('mouseleave', function() {
      this.classList.remove('wave-effect');
    });
  });
}

// --- Окна ---
function activateWindow(type) {
  // Деактивируем все окна
  Object.values(trayWindows).forEach(win => {
    win.removeClass('active');
    if (win.dom) {
      win.dom.classList.remove('active');
      // Не сбрасываем zIndex, чтобы не ломать порядок окон
    }
  });
  // Активируем нужное окно
  if (trayWindows[type]) {
    trayWindows[type].addClass('active');
    if (trayWindows[type].dom) {
      trayWindows[type].dom.classList.add('active');
      // Найти максимальный z-index среди всех окон и сделать этот больше
      let maxZ = 100;
      Object.values(trayWindows).forEach(w => {
        if (w.dom && w.dom.style.zIndex) {
          const z = parseInt(w.dom.style.zIndex) || 10;
          if (z > maxZ) maxZ = z;
        }
      });
      trayWindows[type].dom.style.zIndex = maxZ + 1;
      // --- Перемещаем DOM в конец body, чтобы окно было поверх всех ---
      document.body.appendChild(trayWindows[type].dom);
    }
    trayWindows[type].focus();
    updateTaskbar();
  }
}
function openWindow(type) {
  // Предотвращаем двойной вызов (например, с ярлыка и меню)
  if (window._windowOpening) return;
  window._windowOpening = true;
  setTimeout(() => { window._windowOpening = false; }, 100);

  if (trayWindows[type]) {
    if (trayWindows[type].minimized) {
      trayWindows[type].restore();
    }
    activateWindow(type);
    if (trayWindows[type].dom) {
      document.body.appendChild(trayWindows[type].dom);
    }
    return;
  }
  const isDarkTheme = document.body.classList.contains('dark-theme');
  let title, content, icon;
  switch(type) {
    case 'about':
      title = 'Обо мне';
      content = window.renderAboutContent();
      icon = getIconForTheme(windowIcons.about);
      break;
    case 'portfolio':
      title = 'Портфолио';
      content = window.renderPortfolioContent();
      icon = getIconForTheme(windowIcons.portfolio);
      break;
    case 'services':
      title = 'Услуги';
      content = window.renderServicesContent();
      icon = getIconForTheme(windowIcons.services);
      break;
    case 'contacts':
      title = 'Контакты';
      content = window.renderContactsContent();
      icon = getIconForTheme(windowIcons.contacts);
      break;
    case 'calculator':
      title = 'Калькулятор услуг';
      content = window.renderCalculatorContent();
      icon = getIconForTheme(windowIcons.calculator);
      break;
    case 'minesweeper':
      title = 'Сапер';
      content = window.renderMinesweeperContent();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'game2048':
      title = '2048';
      content = window.render2048Content();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'tictactoe':
      title = 'Крестики-нолики';
      content = window.renderTicTacToeContent();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'github':
      title = 'GitHub Stats';
      content = window.renderGitHubStatsContent ? window.renderGitHubStatsContent() : '<div>GitHub Stats</div>';
      icon = getIconForTheme(windowIcons.github);
      break;
    case 'kitty':
      title = 'Лучший компаньон';
      content = window.renderKittyGalleryContent();
      icon = getIconForTheme(windowIcons.kitty);
      break;
    default:
      content = '<p>Содержимое окна</p>';
      icon = getIconForTheme(windowIcons.about);
  }
  // --- Определяем размеры окна для мобильных/планшетов ---
  let winboxOpts = {};
  const mobileOpts = getMobileWinboxOptions();
  if (mobileOpts) {
    winboxOpts = { ...mobileOpts };
  } else {
    winboxOpts = {
      width: 800,
      height: 600,
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100) + 50,
      top: 40
    };
  }
  const win = new WinBox({
    title: title,
    class: ['adwaita-theme', 'active'],
    width: winboxOpts.width,
    height: winboxOpts.height,
    x: winboxOpts.x,
    y: winboxOpts.y,
    top: winboxOpts.top,
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    shadow: true,
    max: false,
    html: content,
    header: 36,
    icon: icon,
    onclose: () => {
      delete trayWindows[type];
      updateTaskbar();
      return false;
    },
    onminimize: () => {
      if (win.dom) win.dom.style.display = 'none'; // Скрываем окно при сворачивании
      updateTaskbar();
    },
    onrestore: () => {
      win.minimized = false;
      if (win.dom) win.dom.style.display = ''; // Показываем окно при восстановлении
      activateWindow(type);
    },
    onfocus: () => {
      activateWindow(type);
    },
    // Добавим вызов инициализации калькулятора после рендера окна
    oncreate: () => {
      if (type === 'calculator') {
        setTimeout(() => {
          if (typeof window.initCalculator === 'function') window.initCalculator();
        }, 10);
      }
      // --- После создания окна, если мобильник/планшет — растянуть на весь экран ---
      if (mobileOpts && win.dom) {
        win.dom.style.left = '0px';
        win.dom.style.top = '36px';
        win.dom.style.width = `${winboxOpts.width}px`;
        win.dom.style.height = `${winboxOpts.height}px`;
        win.dom.style.maxWidth = '100vw';
        win.dom.style.maxHeight = `calc(100vh - 36px)`;
      }
    }
  });
  trayWindows[type] = win;
  activateWindow(type);
  if (win.dom) {
    document.body.appendChild(win.dom);
    // Для калькулятора: инициализация после вставки DOM
    if (type === 'calculator') {
      setTimeout(() => {
        if (typeof window.initCalculator === 'function') window.initCalculator();
      }, 10);
    }
  }
  // --- После вставки DOM, если мобильник/планшет — корректируем размеры ---
  if (win.dom && mobileOpts) {
    win.dom.style.left = '0px';
    win.dom.style.top = '36px';
    win.dom.style.width = `${winboxOpts.width}px`;
    win.dom.style.height = `${winboxOpts.height}px`;
    win.dom.style.maxWidth = '100vw';
    win.dom.style.maxHeight = `calc(100vh - 36px)`;
  }
  // Вкладки и проекты
  if (type === 'about' || type === 'portfolio' || type === 'services') setupTabs(win.body);
  if (type === 'portfolio') {
    win.body.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        openProjectWindow(url);
      });
    });
    // Удаляем вызов init3DModels();
    // if (typeof init3DModels === 'function') init3DModels();
  }
  // Игры
  if (type === 'minesweeper') setTimeout(() => {
    if (document.getElementById('minesweeper-board')) window.initMinesweeper();
  }, 100);
  if (type === 'game2048') setTimeout(() => {
    if (document.getElementById('game2048-board')) window.init2048();
  }, 100);
  if (type === 'tictactoe') setTimeout(() => {
    if (document.getElementById('tictactoe-board')) window.initTicTacToe();
  }, 100);
  if (type === 'kitty') {
    setTimeout(() => {
      if (typeof window.initKittyGallery === 'function') window.initKittyGallery();
    }, 10);
  }
  updateTaskbar();
}

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
  // Тема
  const savedTheme = localStorage.getItem('darkTheme');
  if (savedTheme === 'false') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.add('dark-theme');
  }
  // Часы
  function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    if (!clockElement || !dateElement) return;
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    const dateString = now.toLocaleDateString('ru-RU', options);
    dateElement.textContent = dateString;
  }
  updateClock();
  setInterval(updateClock, 60000);
  // Меню Пуск
  renderStartMenu();
  // Ярлыки
  document.querySelectorAll('.shortcut').forEach(shortcut => {
    shortcut.addEventListener('click', function(e) {
      if (this.getAttribute('data-dragging') === 'true') return;
      const type = this.getAttribute('data-window');
      if (type) openWindow(type);
    });
  });
  // Проверка иконок
  ['about', 'portfolio'].forEach(type => {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const iconPath = isDarkTheme ? `icons/${type}-dark.svg` : `icons/${type}-light.svg`;
    const img = new Image();
    img.onload = () => console.log(`Иконка ${iconPath} загружена успешно`);
    img.onerror = () => console.error(`Ошибка загрузки иконки ${iconPath}`);
    img.src = iconPath;
  });
  // Календарь и закрытие меню
  document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.activities-button');
    if (startMenu.style.display === 'block' && !startMenu.contains(event.target) && !startButton.contains(event.target)) {
      closeStartMenu();
    }
    const calendar = document.getElementById('calendar');
    const dateElement = document.getElementById('date');
    if (calendar && dateElement && calendar.style.display === 'block' && !calendar.contains(event.target) && !dateElement.contains(event.target)) {
      calendar.style.display = 'none';
    }
  });
  generateCalendar();
  // Иконки окон
  setTimeout(initWindowIcons, 500);
  // Обои
  const isDark = document.body.classList.contains('dark-theme');
  setWallpaperForTheme(isDark ? 'dark' : 'light');
  // Таскбар
  updateTaskbar();
});
window.addEventListener('resize', () => {
  // --- При изменении размера экрана — корректировать размеры всех окон на мобилках/планшетах ---
  if (window.innerWidth <= 992) {
    Object.values(trayWindows).forEach(win => {
      if (win.dom) {
        win.dom.style.left = '0px';
        win.dom.style.top = '36px';
        win.dom.style.width = `${Math.max(window.innerWidth - 8, 320)}px`;
        win.dom.style.height = `${Math.max(window.innerHeight - 44, 320)}px`;
        win.dom.style.maxWidth = '100vw';
        win.dom.style.maxHeight = `calc(100vh - 36px)`;
      }
    });
  }
});

// --- Остальной код (обработчики, прелоадер, fixWindowActivation и т.д.) ---
// --- Прелоадер Hacknet/Bitburner style ---
// (должен быть до DOMContentLoaded)
(function() {
  const preloader = document.createElement('div');
  preloader.id = 'preloader-overlay';
  preloader.innerHTML = `
    <div class="preloader-console" style="display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;">
      <div class="preloader-text" id="preloader-text" style="flex:1;overflow:auto;max-height:160px;"></div>
      <div class="preloader-progress-bar">
        <div class="preloader-progress-fill" id="preloader-progress"></div>
      </div>
    </div>
  `;
  document.body.appendChild(preloader);

  const lines = [
    'Initializing virtual desktop environment...',
    'Loading GNOME-like UI modules...',
    'Connecting to remote repositories...',
    'Fetching project data...',
    'Loading 3D models...',
    'Applying Adwaita theme...',
    'Optimizing assets...',
    'Establishing secure connection...',
    'Finalizing setup...',
    'Ready.'
  ];
  let currentLine = 0;
  let progress = 0;
  const total = lines.length;
  const textEl = preloader.querySelector('#preloader-text');
  const progressEl = preloader.querySelector('#preloader-progress');
  function nextLine() {
    if (currentLine < lines.length) {
      const line = lines[currentLine];
      const span = document.createElement('div');
      span.textContent = '> ' + line;
      textEl.appendChild(span);
      progress = Math.round(((currentLine + 1) / total) * 100);
      progressEl.style.width = progress + '%';
      currentLine++;
      textEl.scrollTop = textEl.scrollHeight;
      setTimeout(nextLine, 250 + Math.random() * 250);
    } else {
      setTimeout(() => {
        preloader.classList.add('preloader-hide');
        setTimeout(() => preloader.remove(), 700);
        document.body.classList.remove('preloader-active');
      }, 600);
    }
  }
  document.body.classList.add('preloader-active');
  setTimeout(nextLine, 400);
})();

// --- Календарь: исправить открытие (делать display: block) ---
function toggleCalendar() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;
  calendar.style.display = (calendar.style.display === 'block') ? 'none' : 'block';
}

// --- Окна просмотра 3D моделей и галерей ---
// Удалено: функция open3DModelViewer (должна быть только в threeviewer.js)
// Но! Нужно убедиться, что функция window.open3DModelViewer действительно определена к моменту использования.
// Для этого threeviewer.js должен быть подключён до app.js в index.html (это уже так).

// --- Галерея в окне: стрелки правильного цвета ---
function openModelGallery(modelId) {
  const type = 'gallery-' + modelId;
  if (trayWindows[type]) {
    activateWindow(type);
    return;
  }
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const arrowColor = isDarkTheme ? '#fff' : '#000';
  const model = window.projects.models3d.static.find(m => m.id === modelId);
  if (!model) return;
  const images = [model.preview].concat(model.gallery || []);
  let current = 0;
  // Инструменты и логотипы
  const tools = [
    { name: 'Blender', icon: 'icons/blender.svg' },
    { name: 'ArmorPaint', icon: 'icons/armorpaint.svg' }
  ];
  function renderGallery(win) {
    win.body.innerHTML = `
      <div class="gallery-window-flex" style="display:flex;flex-direction:row;height:100%;">
        <div class="gallery-viewer-col" style="flex:0 0 65%;min-width:0;display:flex;align-items:center;justify-content:center;height:100%;">
          <div class="gallery-main-img-wrapper" style="position:relative;width:100%;height:340px;display:flex;align-items:center;justify-content:center;">
            <button class="gallery-nav-btn" id="gallery-prev" style="left:10px;">&#8592;</button>
            <img src="${images[current]}" id="gallery-main-img" style="max-width:100%;max-height:340px;border-radius:12px;box-shadow:0 2px 10px #0003;display:block;margin:0 auto;">
            <button class="gallery-nav-btn" id="gallery-next" style="right:10px;">&#8594;</button>
            <div style="position:absolute;bottom:-60px;left:0;width:100%;display:flex;gap:10px;justify-content:center;">
              ${images.map((img, i) => `<img src="${img}" class="model-gallery-thumb${i === current ? ' active' : ''}" data-idx="${i}" style="width:60px;height:45px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid ${i === current ? '#3584e4' : '#ccc'};">`).join('')}
            </div>
          </div>
        </div>
        <div class="gallery-info-col" style="flex:0 0 35%;min-width:0;padding:30px 30px 30px 30px;display:flex;flex-direction:column;justify-content:center;height:100%;">
          <div class="model-title" style="font-size:22px;font-weight:bold;margin-bottom:10px;">${model.title}</div>
          <div class="model-description" style="margin-bottom:15px;">${model.description || ''}</div>
          <div class="model-tools" style="margin-bottom:15px;">
            <b>Инструменты:</b>
            ${tools.map(t => `<img src="${t.icon}" alt="${t.name}" title="${t.name}" style="width:28px;height:28px;vertical-align:middle;margin:0 6px 0 0;">`).join('')}
          </div>
          <div class="model-footer">
            <div class="model-credits"><b>Автор:</b> ${model.credits}</div>
            <div class="model-date"><b>Дата:</b> ${model.date || ''}</div>
          </div>
        </div>
      </div>
    `;
    // Навигация
    win.body.querySelector('#gallery-prev').onclick = () => {
      current = (current - 1 + images.length) % images.length;
      renderGallery(win);
    };
    win.body.querySelector('#gallery-next').onclick = () => {
      current = (current + 1) % images.length;
      renderGallery(win);
    };
    win.body.querySelectorAll('.model-gallery-thumb').forEach(thumb => {
      thumb.onclick = () => {
        current = parseInt(thumb.dataset.idx);
        renderGallery(win);
      };
    });
    // Полноэкранный просмотр
    win.body.querySelector('#gallery-main-img').onclick = () => {
      openFullscreenGallery(images, current, model);
    };
  }
  const win = new WinBox({
    title: model.title,
    class: ['adwaita-theme', 'active'],
    width: 900,
    height: 500,
    x: 160,
    y: 120,
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    shadow: true,
    max: false,
    html: '<div></div>',
    header: 36,
    icon: getIconForTheme(windowIcons.model3d),
    onclose: () => {
      delete trayWindows[type];
      updateTaskbar();
      return false;
    },
    onminimize: () => updateTaskbar(),
    onrestore: () => { win.minimized = false; activateWindow(type); },
    onfocus: () => activateWindow(type)
  });
  trayWindows[type] = win;
  activateWindow(type);
  if (win.dom) document.body.appendChild(win.dom);
  renderGallery(win);
  updateTaskbar();
}
window.openModelGallery = openModelGallery;

// --- Полноэкранная галерея для статичных моделей ---
function openFullscreenGallery(images, startIdx, model) {
  let current = startIdx;
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const arrowColor = isDarkTheme ? '#fff' : '#000';
  let overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.97)';
  overlay.style.zIndex = 99999;
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <button id="fullscreen-close" style="position:absolute;top:30px;right:40px;z-index:2;font-size:32px;color:${arrowColor};background:none;border:none;cursor:pointer;">&times;</button>
    <div style="display:flex;align-items:center;justify-content:center;width:100vw;position:relative;">
      <button id="fullscreen-prev" style="position:relative;left:0;z-index:2;font-size:40px;background:none;border:none;cursor:pointer;margin-right:20px;color:${arrowColor};">&#8592;</button>
      <div style="display:flex;flex-direction:column;align-items:center;">
        <img id="fullscreen-img" src="${images[current]}" style="max-width:80vw;max-height:80vh;border-radius:12px;box-shadow:0 2px 20px #000a;display:block;">
        <div style="display:flex;gap:10px;margin:10px 0 0 0;justify-content:center;">
          ${images.map((img, i) => `<img src="${img}" class="fullscreen-thumb${i === current ? ' active' : ''}" data-idx="${i}" style="width:70px;height:50px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid ${i === current ? '#3584e4' : '#ccc'};">`).join('')}
        </div>
      </div>
      <button id="fullscreen-next" style="position:relative;right:0;z-index:2;font-size:40px;background:none;border:none;cursor:pointer;margin-left:20px;color:${arrowColor};">&#8594;</button>
    </div>
  `;
  document.body.appendChild(overlay);
  function updateFullscreen() {
    overlay.querySelector('#fullscreen-img').src = images[current];
    overlay.querySelectorAll('.fullscreen-thumb').forEach((thumb, i) => {
      thumb.style.border = i === current ? '2px solid #3584e4' : '2px solid #ccc';
    });
  }
  overlay.querySelector('#fullscreen-prev').onclick = (e) => {
    e.stopPropagation();
    current = (current - 1 + images.length) % images.length;
    updateFullscreen();
  };
  overlay.querySelector('#fullscreen-next').onclick = (e) => {
    e.stopPropagation();
    current = (current + 1) % images.length;
    updateFullscreen();
  };
  overlay.querySelectorAll('.fullscreen-thumb').forEach(thumb => {
    thumb.onclick = (e) => {
      e.stopPropagation();
      current = parseInt(thumb.dataset.idx);
      updateFullscreen();
    };
  });
  overlay.querySelector('#fullscreen-close').onclick = () => {
    overlay.remove();
  };
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

// --- WinBox header: не уходит за taskbar при максимизации ---
(function patchWinBoxHeader() {
  const origWinBox = window.WinBox;
  if (!origWinBox || origWinBox._patchedForTaskbar) return;
  window.WinBox = function(options) {
    // --- Исправление: для project/model3d/gallery окон ---
    const type = options && options.title && typeof options.title === 'string'
      ? options.title.toLowerCase()
      : '';
    const isGalleryOrModel =
      (options && options.icon && (
        options.icon.includes('model3d') ||
        options.icon.includes('gallery')
      )) ||
      (type.includes('галерея') || type.includes('gallery') || type.includes('3d') || type.includes('модель'));
    if (options && options.class && options.class.includes('adwaita-theme')) {
      const origOnMaximize = options.onmaximize;
      options.onmaximize = function() {
        const win = this;
        setTimeout(() => {
          if (win.dom) {
            win.dom.style.top = '36px';
            win.dom.style.height = 'calc(100% - 36px)';
          }
        }, 10);
        if (origOnMaximize) origOnMaximize.call(this);
      };
      const origOnRestore = options.onrestore;
      options.onrestore = function() {
        const win = this;
        setTimeout(() => {
          if (win.dom) {
            win.dom.style.top = '';
            win.dom.style.height = '';
          }
        }, 10);
        if (origOnRestore) origOnRestore.call(this);
      };
    }
    return new origWinBox(options);
  };
  Object.assign(window.WinBox, origWinBox);
  window.WinBox._patchedForTaskbar = true;
})();

// --- Калькулятор: исправить расчет итоговой стоимости и работу кнопки ---
window.initCalculator = function() {
  const checkboxes = Array.from(document.querySelectorAll('.service-checkbox'));
  const totalPriceElement = document.getElementById('total-price');
  const orderButton = document.getElementById('order-button');
  if (!checkboxes.length || !totalPriceElement || !orderButton) return;

  // --- Новое: динамически обновлять лейблы доп. услуг со скидкой ---
  function updateAdditionalLabels(hasWebsite) {
    checkboxes.forEach(checkbox => {
      if (checkbox.dataset.type === 'additional') {
        const label = checkbox.nextElementSibling;
        const basePrice = parseInt(checkbox.dataset.price, 10) || 0;
        if (hasWebsite) {
          const discounted = Math.round(basePrice * 0.8);
          label.innerHTML = label.textContent.replace(/\(.+\)/, '') + `(<span style="color:#33d17a;">${discounted.toLocaleString('ru-RU')}₽ со скидкой</span>)`;
        } else {
          label.innerHTML = label.textContent.replace(/\(.+\)/, '') + `(${basePrice.toLocaleString('ru-RU')}₽)`;
        }
      }
    });
  }

  function calculateTotal() {
    let websiteSum = 0;
    let additionalSum = 0;
    let hasWebsite = false;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked && checkbox.dataset.type === 'website') {
        hasWebsite = true;
        websiteSum += parseInt(checkbox.dataset.price, 10) || 0;
      }
    });
    // Обновить лейблы доп. услуг при каждом пересчёте
    updateAdditionalLabels(hasWebsite);

    checkboxes.forEach(checkbox => {
      if (checkbox.checked && checkbox.dataset.type === 'additional') {
        let price = parseInt(checkbox.dataset.price, 10) || 0;
        if (hasWebsite) {
          additionalSum += Math.round(price * 0.8);
        } else {
          additionalSum += price;
        }
      }
    });
    const total = websiteSum + additionalSum;
    totalPriceElement.textContent = total.toLocaleString('ru-RU');
  }

  checkboxes.forEach(checkbox => {
    checkbox.onchange = null;
    checkbox.removeEventListener('change', calculateTotal);
    checkbox.addEventListener('change', calculateTotal);
  });

  orderButton.onclick = null;
  orderButton.addEventListener('click', function() {
    const selectedServices = [];
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        selectedServices.push(checkbox.nextElementSibling.textContent);
      }
    });
    const totalPrice = totalPriceElement.textContent.replace(/\s/g, '');
    if (selectedServices.length > 0) {
      let message = 'Здравствуйте, хочу приобрести у вас:\n';
      selectedServices.forEach(service => {
        message += `- ${service}\n`;
      });
      message += `\nИтоговая сумма: ${totalPrice} ₽`;
      const encoded = encodeURIComponent(message);
      window.open(`https://t.me/looptoquit?text=${encoded}`, '_blank');
    } else {
      alert('Пожалуйста, выберите хотя бы одну услугу.');
    }
  });

  calculateTotal();
};

// --- Полноэкранная галерея для статичных моделей: миниатюры сразу под картинкой, стрелки вне картинки ---
function openFullscreenGallery(images, startIdx, model) {
  let current = startIdx;
  let overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.97)';
  overlay.style.zIndex = 99999;
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <button id="fullscreen-close" style="position:absolute;top:30px;right:40px;z-index:2;font-size:32px;color:#fff;background:none;border:none;cursor:pointer;">&times;</button>
    <div style="display:flex;align-items:center;justify-content:center;width:100vw;position:relative;">
      <button id="fullscreen-prev" style="position:relative;left:0;z-index:2;font-size:40px;color:#fff;background:none;border:none;cursor:pointer;margin-right:20px;">&#8592;</button>
      <div style="display:flex;flex-direction:column;align-items:center;">
        <img id="fullscreen-img" src="${images[current]}" style="max-width:80vw;max-height:80vh;border-radius:12px;box-shadow:0 2px 20px #000a;display:block;">
        <div style="display:flex;gap:10px;margin:10px 0 0 0;justify-content:center;">
          ${images.map((img, i) => `<img src="${img}" class="fullscreen-thumb${i === current ? ' active' : ''}" data-idx="${i}" style="width:70px;height:50px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid ${i === current ? '#3584e4' : '#ccc'};">`).join('')}
        </div>
      </div>
      <button id="fullscreen-next" style="position:relative;right:0;z-index:2;font-size:40px;color:#fff;background:none;border:none;cursor:pointer;margin-left:20px;">&#8594;</button>
    </div>
  `;
  document.body.appendChild(overlay);
  function updateFullscreen() {
    overlay.querySelector('#fullscreen-img').src = images[current];
    overlay.querySelectorAll('.fullscreen-thumb').forEach((thumb, i) => {
      thumb.style.border = i === current ? '2px solid #3584e4' : '2px solid #ccc';
    });
  }
  overlay.querySelector('#fullscreen-prev').onclick = (e) => {
    e.stopPropagation();
    current = (current - 1 + images.length) % images.length;
    updateFullscreen();
  };
  overlay.querySelector('#fullscreen-next').onclick = (e) => {
    e.stopPropagation();
    current = (current + 1) % images.length;
    updateFullscreen();
  };
  overlay.querySelectorAll('.fullscreen-thumb').forEach(thumb => {
    thumb.onclick = (e) => {
      e.stopPropagation();
      current = parseInt(thumb.dataset.idx);
      updateFullscreen();
    };
  });
  overlay.querySelector('#fullscreen-close').onclick = () => {
    overlay.remove();
  };
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

// --- Добавить функцию для открытия сайта в новой вкладке ---
function openProjectWindow(url) {
  if (url) window.open(url, '_blank');
}

// --- Автоматическое обновление иконок 3D окон и галерей при смене темы ---
if (!window._themeChangeObserver) {
  window._themeChangeObserver = true;
  const observer = new MutationObserver(() => {
    updateWindowIcons();
    updateTaskbar();
    // --- Обновлять иконки для окон model- и gallery- при смене темы ---
    if (window.trayWindows && window.windowIcons && window.getIconForTheme) {
      Object.entries(window.trayWindows).forEach(([type, win]) => {
        if ((type.startsWith('model-') || type.startsWith('gallery-')) && typeof win.setIcon === 'function') {
          win.setIcon(window.getIconForTheme(window.windowIcons.model3d));
        }
      });
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

// --- Функция для определения размеров окна на мобильных/планшетах ---
function getMobileWinboxOptions() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w <= 600) {
    // Смартфон
    return {
      width: Math.max(w - 8, 320),
      height: Math.max(h - 44, 320),
      x: 0,
      y: 36,
      top: 36
    };
  } else if (w <= 992) {
    // Планшет
    return {
      width: Math.max(w - 32, 480),
      height: Math.max(h - 52, 400),
      x: 0,
      y: 36,
      top: 36
    };
  }
  // Десктоп — стандартные значения
  return null;
}