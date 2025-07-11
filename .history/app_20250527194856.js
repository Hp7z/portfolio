// --- Глобальные переменные ---
const trayWindows = {};

// --- Локализация ---
// locales.js должен быть подключён до app.js
// Используйте window.getLocaleString(key) для всех текстов

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
  const t = window.locales[window.currentLang];
  if (typeof year !== 'number') year = now.getFullYear();
  if (typeof month !== 'number') month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const monthNames = t.calendarMonths || [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  const weekdayNames = t.calendarWeekdays || ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const getArrowColor = () => document.body.classList.contains('dark-theme') ? '#fff' : '#000';
  let calendarHTML = `
    <div class="calendar-header" style="display:flex;align-items:center;justify-content:space-between;">
      <button id="calendar-prev" style="background:none;border:none;font-size:22px;cursor:pointer;color:${getArrowColor()};padding:0 10px;">&#8592;</button>
      <div class="calendar-month" style="flex:1;text-align:center;">${monthNames[month]} ${year}</div>
      <button id="calendar-next" style="background:none;border:none;font-size:22px;cursor:pointer;color:${getArrowColor()};padding:0 10px;">&#8594;</button>
    </div>
    <div class="calendar-grid">
      ${weekdayNames.map(w => `<div class="day-name">${w}</div>`).join('')}
  `;
  let dayIndex = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < dayIndex; i++) calendarHTML += `<div class="day empty"></div>`;
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = (i === now.getDate() && month === now.getMonth() && year === now.getFullYear()) ? 'today' : '';
    calendarHTML += `<div class="day ${isToday}">${i}</div>`;
  }
  calendarHTML += `</div>`;
  calendar.innerHTML = calendarHTML;
  calendar.querySelector('#calendar-prev').onclick = (e) => {
    e.stopPropagation();
    generateCalendar(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1);
    updateCalendarArrowColors();
  };
  calendar.querySelector('#calendar-next').onclick = (e) => {
    e.stopPropagation();
    generateCalendar(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1);
    updateCalendarArrowColors();
  };
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
    // Локализуем title
    const title = getLocaleString(item.action) || item.title;
    menuHTML += `
      <div class="menu-item" data-window="${item.action}">
        <img src="${iconPath}" alt="${title}">
        <span>${title}</span>
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
    // --- Локализуем title для таскбара ---
    let title = getLocaleString(type) || win.title || type;
    let iconPath;
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
  // Сбросить старые обработчики
  container.querySelectorAll('.tab').forEach(tab => {
    tab.replaceWith(tab.cloneNode(true));
  });

  // Главные вкладки
  container.querySelectorAll('.main-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabs = Array.from(container.querySelectorAll('.main-tabs .tab'));
      const activeTab = container.querySelector('.main-tabs .tab.active');
      if (activeTab === this) return;
      const activeTabId = activeTab.getAttribute('data-tab');
      const activeContent = container.querySelector(`#${activeTabId}-tab`);
      const clickedTabIndex = tabs.indexOf(this);
      const activeTabIndex = tabs.indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      tabs.forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = container.querySelector(`#${tabId}-tab`);
          if (newContent) {
            newContent.classList.add(`slide-${direction}`);
            newContent.classList.add('active');
            setTimeout(() => {
              newContent.classList.remove(`slide-${direction}`);
            }, 10);
            // --- Исправление: активируем первую подвкладку и её контент ---
            const subTabs = newContent.querySelectorAll('.sub-tabs .tab');
            if (subTabs.length) {
              subTabs.forEach(t => t.classList.remove('active'));
              const firstSubTab = subTabs[0];
              firstSubTab.classList.add('active');
              // Показать соответствующий контент
              const subTabId = firstSubTab.getAttribute('data-tab');
              newContent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
              const subTabContent = newContent.querySelector(`#${subTabId}-tab`);
              if (subTabContent) subTabContent.classList.add('active');
            }
          }
        }, 300);
      } else {
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const newContent = container.querySelector(`#${tabId}-tab`);
        if (newContent) {
          newContent.classList.add(`slide-${direction}`);
          newContent.classList.add('active');
          setTimeout(() => {
            newContent.classList.remove(`slide-${direction}`);
          }, 10);
          // --- Исправление: активируем первую подвкладку и её контент ---
          const subTabs = newContent.querySelectorAll('.sub-tabs .tab');
          if (subTabs.length) {
            subTabs.forEach(t => t.classList.remove('active'));
            const firstSubTab = subTabs[0];
            firstSubTab.classList.add('active');
            const subTabId = firstSubTab.getAttribute('data-tab');
            newContent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const subTabContent = newContent.querySelector(`#${subTabId}-tab`);
            if (subTabContent) subTabContent.classList.add('active');
          }
        }
      }
    }, { passive: false });
  });

  // Подвкладки для веб-сайтов
  container.querySelectorAll('#websites-tab .sub-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabs = Array.from(container.querySelectorAll('#websites-tab .sub-tabs .tab'));
      const activeTab = container.querySelector('#websites-tab .sub-tabs .tab.active');
      if (activeTab === this) return;
      const activeTabId = activeTab.getAttribute('data-tab');
      const parent = container.querySelector('#websites-tab');
      const activeContent = parent ? parent.querySelector(`#${activeTabId}-tab`) : null;
      const clickedTabIndex = tabs.indexOf(this);
      const activeTabIndex = tabs.indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      tabs.forEach(t => t.classList.remove('active'));
      if (parent) parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = parent ? parent.querySelector(`#${tabId}-tab`) : null;
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
        const newContent = parent ? parent.querySelector(`#${tabId}-tab`) : null;
        if (newContent) {
          newContent.classList.add(`slide-${direction}`);
          newContent.classList.add('active');
          setTimeout(() => {
            newContent.classList.remove(`slide-${direction}`);
          }, 10);
        }
      }
    }, { passive: false });
  });

  // Подвкладки для 3D моделей
  container.querySelectorAll('#models3d-tab .sub-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabs = Array.from(container.querySelectorAll('#models3d-tab .sub-tabs .tab'));
      const activeTab = container.querySelector('#models3d-tab .sub-tabs .tab.active');
      if (activeTab === this) return;
      const activeTabId = activeTab.getAttribute('data-tab');
      const parent = container.querySelector('#models3d-tab');
      const activeContent = parent ? parent.querySelector(`#${activeTabId}-tab`) : null;
      const clickedTabIndex = tabs.indexOf(this);
      const activeTabIndex = tabs.indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      tabs.forEach(t => t.classList.remove('active'));
      if (parent) parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = parent ? parent.querySelector(`#${tabId}-tab`) : null;
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
        const newContent = parent ? parent.querySelector(`#${tabId}-tab`) : null;
        if (newContent) {
          newContent.classList.add(`slide-${direction}`);
          newContent.classList.add('active');
          setTimeout(() => {
            newContent.classList.remove(`slide-${direction}`);
          }, 10);
        }
      }
    }, { passive: false });
  });

  // Для остальных вкладок (обычные .tabs)
  container.querySelectorAll('.tabs .tab:not(.main-tabs .tab):not(.sub-tabs .tab)').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabsContainer = this.closest('.tabs');
      if (!tabsContainer) return;
      tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      const parent = tabsContainer.parentElement;
      if (parent) parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const tabContent = parent ? parent.querySelector(`#${tabId}-tab`) : null;
      if (tabContent) {
        setTimeout(() => {
          tabContent.classList.add('active');
        }, 50);
      }
    }, { passive: false });
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
      title = getLocaleString('about');
      content = window.renderAboutContent();
      icon = getIconForTheme(windowIcons.about);
      break;
    case 'portfolio':
      title = getLocaleString('portfolio');
      content = window.renderPortfolioContent();
      icon = getIconForTheme(windowIcons.portfolio);
      break;
    case 'services':
      title = getLocaleString('services');
      content = window.renderServicesContent();
      icon = getIconForTheme(windowIcons.services);
      break;
    case 'contacts':
      title = getLocaleString('contacts');
      content = window.renderContactsContent();
      icon = getIconForTheme(windowIcons.contacts);
      break;
    case 'calculator':
      title = getLocaleString('calculator');
      content = window.renderCalculatorContent();
      icon = getIconForTheme(windowIcons.calculator);
      break;
    case 'minesweeper':
      title = getLocaleString('minesweeper');
      content = window.renderMinesweeperContent();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'game2048':
      title = getLocaleString('game2048');
      content = window.render2048Content();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'tictactoe':
      title = getLocaleString('tictactoe');
      content = window.renderTicTacToeContent();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'github':
      title = getLocaleString('github');
      content = window.renderGitHubStatsContent ? window.renderGitHubStatsContent() : '<div>GitHub Stats</div>';
      icon = getIconForTheme(windowIcons.github);
      break;
    case 'kitty':
      title = getLocaleString('kitty');
      content = window.renderKittyGalleryContent();
      icon = getIconForTheme(windowIcons.kitty);
      break;
    default:
      content = '<p>Содержимое окна</p>';
      icon = getIconForTheme(windowIcons.about);
  }
  // --- Определяем размеры окна для мобильных/планшетах ---
  let winboxOpts = {};
  const w = window.innerWidth, h = window.innerHeight;
  const mobileOpts = getMobileWinboxOptions();
  // --- Исправление: для дочерних окон 3D моделей и галерей ---
  if (
    type.startsWith('model-') ||
    type.startsWith('gallery-') ||
    type.startsWith('gallery-static-')
  ) {
    if (w <= 992) {
      winboxOpts = {
        width: w,
        height: h - 36,
        x: 0,
        y: 36,
        top: 36
      };
    } else {
      winboxOpts = {
        width: Math.min(900, w - 40),
        height: Math.min(540, h - 60),
        x: Math.max(0, Math.floor((w - Math.min(900, w - 40)) / 2)),
        y: Math.max(36, Math.floor((h - Math.min(540, h - 60)) / 2)),
        top: 36
      };
    }
  } else if (type === 'kitty') {
    // --- Теперь kitty всегда 900px шириной на десктопе ---
    if (w > 992) {
      winboxOpts = {
        width: Math.min(900, w - 40),
        height: Math.min(520, h - 60),
        x: Math.max(0, Math.floor((w - Math.min(900, w - 40)) / 2)),
        y: Math.max(36, Math.floor((h - Math.min(520, h - 60)) / 2)),
        top: 36
      };
    } else if (mobileOpts) {
      winboxOpts = { ...mobileOpts };
    } else {
      winboxOpts = {
        width: Math.min(900, w - 40),
        height: Math.min(520, h - 60),
        x: Math.max(0, Math.floor((w - Math.min(900, w - 40)) / 2)),
        y: Math.max(36, Math.floor((h - Math.min(520, h - 60)) / 2)),
        top: 36
      };
    }
  } else if (mobileOpts) {
    winboxOpts = { ...mobileOpts };
  } else {
    winboxOpts = {
      width: Math.min(900, w - 40),
      height: Math.min(540, h - 60),
      x: Math.max(0, Math.floor((w - Math.min(900, w - 40)) / 2)),
      y: Math.max(36, Math.floor((h - Math.min(540, h - 60)) / 2)),
      top: 36
    };
  }

  // --- oncreate вынесен в отдельную функцию ниже ---
  let win;
  function winOnCreate() {
    // this === WinBox instance
    // Для калькулятора: инициализация после вставки DOM
    if (type === 'calculator') {
      setTimeout(() => {
        if (typeof window.initCalculator === 'function') window.initCalculator();
      }, 10);
    }
    // --- После создания окна, если мобильник/планшет — растянуть на весь экран ---
    if (mobileOpts && this.dom) {
      this.dom.style.left = '0px';
      this.dom.style.top = '36px';
      this.dom.style.width = `${winboxOpts.width}px`;
      this.dom.style.height = `${winboxOpts.height}px`;
      this.dom.style.maxWidth = '100vw';
      this.dom.style.maxHeight = `calc(100vh - 36px)`;
    }
    // Для kitty: добавить отступ описанию на мобилке/планшете
    if (type === 'kitty' && this.body) {
      if (window.innerWidth <= 992) {
        const desc = this.body.querySelector('#kitty-gallery-description');
        if (desc) desc.style.marginTop = '18px';
      }
    }
    // Пересоздать обработчики вкладок после рендера (для мобильных)
    if (type === 'about' || type === 'portfolio' || type === 'services') {
      setupTabs(this.body);
    }
    // --- Исправление: для портфолио сразу показывать 3D модели ---
    if (type === 'portfolio') {
      // Активировать первую main-tab и первую sub-tab, если не активны
      const mainTab = this.body.querySelector('.main-tabs .tab.active');
      if (mainTab) mainTab.click();
      // Активировать первую sub-tab в текущем main-tab
      const activeMainTabId = mainTab ? mainTab.getAttribute('data-tab') : null;
      if (activeMainTabId) {
        const subTabs = this.body.querySelectorAll(`#${activeMainTabId}-tab .sub-tabs .tab`);
        const activeSubTab = Array.from(subTabs).find(tab => tab.classList.contains('active'));
        if (activeSubTab) activeSubTab.click();
      }
    }
  }

  win = new WinBox({
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
      if (win.dom) win.dom.style.display = 'none';
      updateTaskbar();
    },
    onrestore: () => {
      win.minimized = false;
      if (win.dom) win.dom.style.display = '';
      activateWindow(type);
    },
    onfocus: () => {
      activateWindow(type);
    },
    oncreate: winOnCreate
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
  // setupTabs теперь вызывается только в oncreate
  if (type === 'portfolio') {
    win.body.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        openProjectWindow(url);
      });
    });
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
      // Для kitty: добавить отступ описанию на мобилке/планшете
      if (win.body && window.innerWidth <= 992) {
        const desc = win.body.querySelector('#kitty-gallery-description');
        if (desc) desc.style.marginTop = '18px';
      }
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
    // --- Часы ---
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
    // --- Локализованная дата ---
    const t = window.locales[window.currentLang];
    const locale = t.dateFormat || 'ru-RU';
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    let dateString = now.toLocaleDateString(locale, options);
    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    dateElement.textContent = dateString;
  }
  updateClock();
  setInterval(updateClock, 60000);

  // --- Локализация даты под часами при смене языка ---
  window.addEventListener('languagechange', updateClock);

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

  // --- Инициализация калькулятора услуг ---
  function initCalculator(savedState) {
    const t = window.locales[window.currentLang];
    const checkboxes = document.querySelectorAll('.service-checkbox');
    const totalPriceEl = document.getElementById('total-price');
    const orderBtn = document.getElementById('order-button');
    if (!checkboxes.length || !totalPriceEl || !orderBtn) return;

    // --- Мапа соответствия id чекбокса и ключа локали ---
    const serviceLabels = {
      landing: t.calculatorLanding.replace(/\s*\(.*?\)/, '').trim(),
      shop: t.calculatorShop.replace(/\s*\(.*?\)/, '').trim(),
      corporate: t.calculatorCorp.replace(/\s*\(.*?\)/, '').trim(),
      design: t.calculatorDesign.replace(/\s*\(.*?\)/, '').trim(),
      seo: t.calculatorSeo.replace(/\s*\(.*?\)/, '').trim(),
      content: t.calculatorContent.replace(/\s*\(.*?\)/, '').trim(),
      hosting: t.calculatorHosting.replace(/\s*\(.*?\)/, '').trim(),
    };

    // --- Курс доллара (можно заменить на динамический при необходимости) ---
    const USD_RATE = 90; // Пример: 1 USD = 90 RUB

    // --- Восстановить состояние чекбоксов, если передано ---
    if (Array.isArray(savedState)) {
      checkboxes.forEach(cb => {
        cb.checked = savedState.includes(cb.id);
      });
    }

    function isAnyDevChecked() {
      return (
        document.getElementById('landing')?.checked ||
        document.getElementById('shop')?.checked ||
        document.getElementById('corporate')?.checked
      );
    }

    function formatPriceRUB(price, orig) {
      if (orig && price !== orig) {
        return `<span style="text-decoration:line-through;color:#888;">${orig} ₽</span> <span class="calc-discounted">— ${price} ₽</span>`;
      }
      return `— ${price} ₽`;
    }
    function formatPriceUSD(price, orig) {
      if (orig && price !== orig) {
        return `<span style="text-decoration:line-through;color:#888;">${orig} $</span> <span class="calc-discounted">— ${price} $</span>`;
      }
      return `— ${price} $`;
    }

    function recalc() {
      let total = 0;
      let addTotal = 0;
      let addDiscount = false;
      let checkedServices = [];
      let checkedAdd = [];
      let checkedAll = [];
      // --- Собираем отмеченные услуги ---
      checkboxes.forEach(cb => {
        if (cb.checked) {
          checkedAll.push(cb.id);
          const label = serviceLabels[cb.id] || cb.nextElementSibling?.textContent || '';
          if (cb.dataset.type === 'website') checkedServices.push(label);
          if (cb.dataset.type === 'additional') checkedAdd.push(label);
        }
      });
      // --- Скидка на доп. услуги ---
      addDiscount = isAnyDevChecked();
      // --- Пересчёт итоговой стоимости ---
      checkboxes.forEach(cb => {
        if (cb.checked) {
          let price = parseInt(cb.dataset.price, 10) || 0;
          if (cb.dataset.type === 'additional' && addDiscount) {
            addTotal += Math.round(price * 0.8);
          } else if (cb.dataset.type === 'additional') {
            addTotal += price;
          } else {
            total += price;
          }
        }
      });
      let fullTotal = total + addTotal;
      // --- Вывод итоговой суммы ---
      if (window.currentLang === 'en') {
        const usd = Math.round(fullTotal / USD_RATE);
        totalPriceEl.innerHTML = `<span class="calc-discounted">${usd} $</span>`;
      } else {
        totalPriceEl.innerHTML = `<span class="calc-discounted">${fullTotal} ₽</span>`;
      }
      // --- Обновить цены для всех услуг ---
      checkboxes.forEach(cb => {
        const label = cb.nextElementSibling;
        const orig = parseInt(cb.dataset.price, 10) || 0;
        const origText = serviceLabels[cb.id] || label.textContent.replace(/^[^а-яА-ЯA-Za-z]+/, '').replace(/^\s*-?\s*\d+\s*[₽$]/, '').replace(/—\s*\d+\s*[₽$]/, '').trim();
        let price, origVal;
        if (cb.dataset.type === 'additional' && addDiscount) {
          if (window.currentLang === 'en') {
            origVal = Math.round(orig / USD_RATE);
            price = Math.round(orig * 0.8 / USD_RATE);
            label.innerHTML = `${origText} ${formatPriceUSD(price, origVal)}`;
          } else {
            price = Math.round(orig * 0.8);
            label.innerHTML = `${origText} ${formatPriceRUB(price, orig)}`;
          }
        } else {
          if (window.currentLang === 'en') {
            price = Math.round(orig / USD_RATE);
            label.innerHTML = `${origText} — ${price} $`;
          } else {
            label.innerHTML = `${origText} — ${orig} ₽`;
          }
        }
      });
      // --- Сохраняем состояние чекбоксов для восстановления при смене языка ---
      window._calculatorChecked = checkedAll;
    }

    checkboxes.forEach(cb => {
      cb.onchange = recalc;
    });
    recalc();

    orderBtn.onclick = function() {
      // --- Собираем отмеченные услуги ---
      let checked = [];
      checkboxes.forEach(cb => {
        if (cb.checked) {
          const label = serviceLabels[cb.id] || cb.nextElementSibling?.textContent.replace(/<[^>]+>/g, '').replace(/^\s*-?\s*\d+\s*[₽$]/, '').replace(/—\s*\d+\s*[₽$]/, '').trim();
          checked.push(label);
        }
      });
      // --- Итоговая сумма ---
      let total = 0, addTotal = 0, addDiscount = isAnyDevChecked();
      checkboxes.forEach(cb => {
        if (cb.checked) {
          let price = parseInt(cb.dataset.price, 10) || 0;
          if (cb.dataset.type === 'additional' && addDiscount) {
            addTotal += Math.round(price * 0.8);
          } else if (cb.dataset.type === 'additional') {
            addTotal += price;
          } else {
            total += price;
          }
        }
      });
      let fullTotal = total + addTotal;
      let msg;
      if (window.currentLang === 'en') {
        msg = t.calculatorOrderMsgEn || "Hello, I would like to order:\n";
        checked.forEach(s => { msg += "• " + s + "\n"; });
        msg += "\n" + (t.calculatorTotal || "Total") + ": " + (Math.round(fullTotal / USD_RATE)) + " $";
      } else {
        msg = t.calculatorOrderMsgRu || "Здравствуйте, я хотел бы заказать у вас:\n";
        checked.forEach(s => { msg += "• " + s + "\n"; });
        msg += "\n" + (t.calculatorTotal || "Итог") + ": " + fullTotal + " ₽";
      }
      window.open(`https://t.me/looptoquit?text=${encodeURIComponent(msg)}`, '_blank');
    };
  }
  window.initCalculator = initCalculator;

  // --- В конце файла, после window.initCalculator = initCalculator; ---
  // Добавить стили для .calc-discounted для светлой темы:
  (function() {
    const style = document.createElement('style');
    style.innerHTML = `
      body.light-theme .calc-discounted {
        color: #31a355 !important;
      }  
      body.dark-theme .calc-discounted {
        color: #31a355 !important;
      }
      body.light-theme #total-price,
      body.light-theme .calculator-note-inline {
        color:rgb(49, 83, 60) !important;
      }
    `;
    document.head.appendChild(style);
  })();
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

// --- Календарь: исправить открытие (делать display: block) и локализацию при каждом открытии ---
function toggleCalendar() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;
  if (calendar.style.display === 'block') {
    calendar.style.display = 'none';
  } else {
    calendar.style.display = 'block';
    generateCalendar(); // всегда перерисовываем календарь по текущей локали
  }
}

// --- Окна просмотра 3D моделей и галерей ---
// Удалено: функция open3DModelViewer (должна быть только в threeviewer.js)
// Но! Нужно убедиться, что функция window.open3DModelViewer действительно определена к моменту использования.
// Для этого threeviewer.js должен быть подключён до app.js в index.html (это уже так).

// --- Галерея в окне: стрелки правильного цвета + свайп и drag ---
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
  // Инструменты и логотипи
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
            <img src="${images[current]}" id="gallery-main-img" style="max-width:100%;max-height:340px;border-radius:12px;box-shadow:0 2px 10px #0003;display:block;margin:0 auto;touch-action:pan-y;">
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

    // --- Свайп и drag для переключения изображений ---
    const img = win.body.querySelector('#gallery-main-img');
    let startX = null, dragging = false;
    // Touch events
    img.ontouchstart = function(e) {
      if (e.touches.length === 1) startX = e.touches[0].clientX;
    };
    img.ontouchmove = function(e) {
      if (startX !== null && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
          if (dx < 0) { // swipe left
            current = (current + 1) % images.length;
          } else { // swipe right
            current = (current - 1 + images.length) % images.length;
          }
          startX = null;
          renderGallery(win);
        }
      }
    };
    img.ontouchend = function() { startX = null; };

    // Mouse drag
    img.onmousedown = function(e) {
      dragging = true;
      startX = e.clientX;
      document.body.style.userSelect = 'none';
    };
    img.onmousemove = function(e) {
      if (dragging && startX !== null) {
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 40) {
          if (dx < 0) {
            current = (current + 1) % images.length;
          } else {
            current = (current - 1 + images.length) % images.length;
          }
          dragging = false;
          startX = null;
          document.body.style.userSelect = '';
          renderGallery(win);
        }
      }
    };
    img.onmouseup = img.onmouseleave = function() {
      dragging = false;
      startX = null;
      document.body.style.userSelect = '';
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

// --- Локализация: инициализация языка и переключение ---
window.currentLang = localStorage.getItem('lang') || 'ru';

function getLocaleString(key) {
  return (window.locales[window.currentLang] && window.locales[window.currentLang][key]) || key;
}

// --- Переключение языка ---
function toggleLang() {
  window.currentLang = window.currentLang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', window.currentLang);
  // Обновить label на кнопке
  const label = document.getElementById('lang-toggle-label');
  if (label) label.textContent = getLocaleString('langLabel');
  // Локализация ярлыков на рабочем столе
  document.querySelectorAll('.shortcut').forEach(shortcut => {
    const type = shortcut.getAttribute('data-window');
    if (type && window.getLocaleString) {
      const span = shortcut.querySelector('span');
      if (span) {
        span.textContent = getLocaleString(type) || span.textContent;
      }
    }
  });
  // --- Сохраняем активное окно и вкладки ---
  let activeWinType = null;
  let activeTabs = {};
  document.querySelectorAll('.adwaita-theme.active').forEach(winEl => {
    if (winEl.winboxObject && winEl.winboxObject.type) {
      activeWinType = winEl.winboxObject.type;
      // Сохраняем активные вкладки (main/sub) для этого окна
      const mainTab = winEl.querySelector('.main-tabs .tab.active');
      const subTab = winEl.querySelector('.sub-tabs .tab.active');
      activeTabs[activeWinType] = {
        main: mainTab ? mainTab.getAttribute('data-tab') : null,
        sub: subTab ? subTab.getAttribute('data-tab') : null
      };
    }
  });
  // Перерисовать все открытые окна без их закрытия/открытия
  Object.entries(trayWindows).forEach(([type, win]) => {
    if (win && win.body && typeof win.setTitle === 'function') {
      let newTitle = getLocaleString(type);
      if (!newTitle || newTitle === type) {
        newTitle = win.title;
      }
      win.setTitle(newTitle);
    }
    if (win && win.body) {
      let content = '';
      switch (type) {
        case 'about':
          content = window.renderAboutContent();
          break;
        case 'portfolio':
          content = window.renderPortfolioContent();
          break;
        case 'services':
          content = window.renderServicesContent();
          break;
        case 'contacts':
          content = window.renderContactsContent();
          break;
        case 'calculator':
          content = window.renderCalculatorContent();
          break;
        case 'minesweeper':
          content = window.renderMinesweeperContent();
          break;
        case 'game2048':
          content = window.render2048Content();
          break;
        case 'tictactoe':
          content = window.renderTicTacToeContent();
          break;
        case 'github':
          content = window.renderGitHubStatsContent ? window.renderGitHubStatsContent() : '<div>GitHub Stats</div>';
          break;
        case 'kitty':
          content = window.renderKittyGalleryContent();
          break;
        default:
          break;
      }
      if (content) {
        win.body.innerHTML = content;
        if (["about", "portfolio", "services"].includes(type)) {
          setupTabs(win.body);
          // --- Восстановить активные вкладки ---
          const tabs = activeTabs[type] || {};
          if (tabs.main) {
            const mainTab = win.body.querySelector(`.main-tabs .tab[data-tab='${tabs.main}']`);
            if (mainTab) mainTab.click();
          }
          if (tabs.sub) {
            // sub-tabs только внутри активного main-tab
            const mainTabId = tabs.main || (win.body.querySelector('.main-tabs .tab.active')?.getAttribute('data-tab'));
            if (mainTabId) {
              const subTab = win.body.querySelector(`#${mainTabId}-tab .sub-tabs .tab[data-tab='${tabs.sub}']`);
              if (subTab) subTab.click();
            }
          }
        }
        // --- Инициализация калькулятора после перерисовки, с восстановлением состояния чекбоксов ---
        if (type === 'calculator' && typeof window.initCalculator === 'function') {
          setTimeout(() => window.initCalculator(window._calculatorChecked || []), 10);
        }
      }
    }
  });
  // --- Восстановить активное окно ---
  if (activeWinType && trayWindows[activeWinType]) {
    activateWindow(activeWinType);
  }
  // Обновить меню Пуск
  renderStartMenu();
  // Обновить таскбар (локализация заголовков)
  updateTaskbar();
  // Обновить дату/часы (вызывает updateClock через languagechange)
  if (typeof Event === "function") {
    window.dispatchEvent(new Event('languagechange'));
  }
  // --- Обновить календарь при смене языка ---
  generateCalendar();
}

// --- При загрузке страницы: выставить язык и label ---
document.addEventListener('DOMContentLoaded', () => {
  // Язык
  const label = document.getElementById('lang-toggle-label');
  if (label) label.textContent = getLocaleString('langLabel');
  // Локализация ярлыков на рабочем столе
  document.querySelectorAll('.shortcut').forEach(shortcut => {
    const type = shortcut.getAttribute('data-window');
    if (type && window.getLocaleString) {
      const span = shortcut.querySelector('span');
      if (span) {
        span.textContent = getLocaleString(type) || span.textContent;
      }
    }
  });
});