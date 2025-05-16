const trayWindows = {};
const projects = {
  websites: {
    landing: [
      {
        title: "Istok Lab",
        url: "https://xn--80aehlcj0acakfhgax4r.xn--p1ai/",
        preview: "img/cooperativ.jpg",
        description: "Лендинг для научно-исследовательской лаборатории с современным дизайном и удобной навигацией.",
        credits: "Design by Leria agency",
        date: "15 марта 2023"
      },
      {
        title: "Istok Lab Pro",
        url: "https://istoklabpro.ru/",
        preview: "img/istoklabpro.jpg",
        description: "Профессиональная версия сайта для лаборатории с расширенным функционалом и интерактивными элементами.",
        credits: "Design by Leria agency",
        date: "22 июня 2023"
      },
      {
        title: "Fiorichi",
        url: "https://fiorichi.shop/",
        preview: "img/fiorichi.jpg",
        description: "Стильный лендинг для бренда модной одежды с акцентом на визуальную составляющую и удобство заказа.",
        credits: "Design by Leria agency",
        date: "10 сентября 2023"
      }
    ],
    shop: [
      {
        title: "Larfex Shop",
        url: "https://larfex.com/",
        preview: "img/larfex.jpg",
        description: "Современный интернет-магазин с адаптивным дизайном, удобным каталогом и интуитивно понятной корзиной.",
        credits: "Design by Leria agency",
        date: "5 декабря 2023"
      }
    ],
    corporate: [
      {
        title: "Larfex STM",
        url: "https://larfexstm.com/",
        preview: "img/larfexstm.jpg",
        description: "Корпоративный сайт компании с презентацией услуг, портфолио и контактной информацией.",
        credits: "Design by Leria agency",
        date: "18 января 2024"
      },
      {
        title: "Leri Agency",
        url: "https://leriagency.ru/",
        preview: "img/leriagency.jpg",
        description: "Сайт дизайн-агентства с креативным оформлением, демонстрирующий работы и компетенции команды.",
        credits: "Design by Leria agency",
        date: "3 марта 2024"
      }
    ]
  },
  models3d: {
    interactive: [
      {
        id: "mishkakake",
        title: "Мишка-кекс",
        preview: "models/preview/mishkakake.jpg",
        modelUrl: "models/mishkaKake.glb",
        type: "interactive",
        description: "Интерактивная 3D модель милого мишки-кекса с детализированной текстурой и материалами.",
        credits: "Hp7z",
        date: "12 октября 2023"
      },
      {
        id: "coffeemarshmallow",
        title: "Кофе с зефиром",
        preview: "models/preview/coffee murshmallow.jpg",
        modelUrl: "models/mishkaKake.glb", // Временно используем ту же модель для теста
        description: "Уютная чашка кофе с зефиром, созданная в стиле низкополигональной графики.",
        credits: "Hp7z",
        date: "25 ноября 2023"
      }
    ],
    static: [
      {
        id: "toastcat",
        title: "Кот-тост",
        preview: "models/preview/toast cat.jpg",
        type: "static",
        description: "Милый кот в форме тоста, выполненный в стиле мультяшной графики.",
        credits: "Hp7z",
        date: "7 февраля 2024"
      },
      {
        id: "icecream",
        title: "Мороженое",
        preview: "models/preview/ice cream.png",
        type: "static",
        description: "Аппетитное мороженое с детализированной текстурой и реалистичными материалами.",
        credits: "Hp7z",
        date: "19 апреля 2024"
      },
      {
        id: "tvnight",
        title: "Ночной телевизор",
        preview: "models/preview/tv night.jpg",
        type: "static",
        description: "Атмосферная сцена с телевизором в ночное время, с проработанным освещением.",
        credits: "Hp7z",
        date: "5 марта 2024"
      }
    ]
  }
};

// Структура меню "Пуск"
const startMenuItems = {
  main: [
    {
      title: "Сапер",
      icon: "icons/game-light.svg",      // поменяли местами
      iconLight: "icons/game-dark.svg",  // поменяли местами
      action: "minesweeper"
    },
    {
      title: "2048",
      icon: "icons/game-light.svg",
      iconLight: "icons/game-dark.svg",
      action: "game2048"
    },
    {
      title: "Крестики-нолики",
      icon: "icons/game-light.svg",
      iconLight: "icons/game-dark.svg",
      action: "tictactoe"
    }
  ]
};

// --- Удаляем старую функцию updateParallaxEffect и её вызовы ---
// --- Используем только initParallax для плавного параллакса ---

// Функция для инициализации эффектов
function initEffects() {
  // Пустая функция, эффект глитча удален
}

document.addEventListener('DOMContentLoaded', () => {
  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem('darkTheme');
  if (savedTheme === 'false') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.add('dark-theme');
  }
  
  // Инициализируем эффект параллакса
  initParallax();
  
  // Эффект глитча удален

  function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    
    if (!clockElement || !dateElement) return;
    
    const now = new Date();
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
    
    // Форматируем дату
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    const dateString = now.toLocaleDateString('ru-RU', options);
    dateElement.textContent = dateString;
  }
  
  updateClock();
  // Обновляем часы каждую минуту вместо каждой секунды
  setInterval(updateClock, 60000);
  
  // Рендерим меню "Пуск"
  renderStartMenu();
  document.querySelectorAll('.shortcut').forEach(shortcut => {
    // Добавляем обработчик клика для открытия окна
    shortcut.addEventListener('click', function() {
      // Проверяем, не находится ли ярлык в процессе перетаскивания
      if (this.getAttribute('data-dragging') === 'true') return;
      
      const type = this.getAttribute('data-window');
      if (type) {
        openWindow(type);
      }
    });
  });
  
  // Проверяем наличие иконок для окон
  console.log("Проверка наличия иконок для окон:");
  ['about', 'portfolio'].forEach(type => { // Проверяем только существующие иконки
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const iconPath = isDarkTheme ? 
      `icons/${type}-dark.svg` : 
      `icons/${type}-light.svg`;
    const img = new Image();
    img.onload = () => console.log(`Иконка ${iconPath} загружена успешно`);
    img.onerror = () => console.error(`Ошибка загрузки иконки ${iconPath}`);
    img.src = iconPath;
  });
  
  // Закрытие меню "Пуск" при клике вне его
  document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.activities-button');
    
    if (startMenu.style.display === 'block' && 
        !startMenu.contains(event.target) && 
        !startButton.contains(event.target)) {
      closeStartMenu();
    }
    
    const calendar = document.getElementById('calendar');
    const dateElement = document.getElementById('date');
    
    if (calendar && dateElement && calendar.style.display === 'block' && 
        !calendar.contains(event.target) && 
        !dateElement.contains(event.target)) {
      calendar.style.display = 'none';
    }
  });
  
  // Генерируем календарь
  generateCalendar();
});

// Добавляем библиотеку Interact.js для перетаскивания элементов
document.addEventListener('DOMContentLoaded', function() {
  // Загружаем библиотеку Interact.js динамически
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js';
  script.onload = function() {
    // Инициализируем перетаскивание для ярлыков после загрузки библиотеки
    if (typeof interact !== 'undefined') {
      // Получаем размеры рабочего стола
      const desktop = document.querySelector('.desktop');
      if (!desktop) return;
      
      const taskbarHeight = 36; // Высота панели задач
      const desktopRect = desktop.getBoundingClientRect();
      
      // Настраиваем перетаскивание для всех ярлыков
      interact('.shortcut').draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: {
              left: 0,
              top: taskbarHeight,
              right: desktopRect.width - 80, // Ширина ярлыка
              bottom: desktopRect.height
            }
          })
        ],
        autoScroll: true,
        listeners: {
          start: function(event) {
            // Устанавливаем флаг начала перетаскивания
            event.target.setAttribute('data-dragging', 'true');
          },
          move: dragMoveListener,
          end: function(event) {
            const target = event.target;
            const type = target.getAttribute('data-window');
            if (type) {
              localStorage.setItem(`shortcut-${type}-pos`, 
                JSON.stringify({
                  top: target.style.top,
                  left: target.style.left
                }));
            }
            // Устанавливаем таймер для сброса флага перетаскивания
            // Это предотвратит открытие окна сразу после перетаскивания
            setTimeout(() => {
              target.removeAttribute('data-dragging');
            }, 300); // 300мс должно быть достаточно
          }
        }
      });
      
      function dragMoveListener(event) {
        const target = event.target;
        // Получаем текущую позицию из data-x/data-y или устанавливаем 0
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
        // Обновляем позицию элемента
        target.style.transform = `translate(${x}px, ${y}px)`;
        
        // Сохраняем позицию в атрибутах
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
      
      // Добавляем обработчик клика для открытия окон
      document.querySelectorAll('.shortcut').forEach(shortcut => {
        shortcut.addEventListener('click', function(e) {
          // Проверяем, был ли это клик или завершение перетаскивания
          if (!this.getAttribute('data-dragging')) {
            const type = this.getAttribute('data-window');
            if (type) {
              openWindow(type);
            }
          }
        });
      });
    }
  };
  document.head.appendChild(script);
});

// Функция для рендеринга меню "Пуск"
function renderStartMenu() {
  const menu = document.getElementById('startMenu');
  let menuHTML = `<div class="menu-section">`;
  const isDarkTheme = document.body.classList.contains('dark-theme');
  startMenuItems.main.forEach(item => {
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

// Функция для переключения темы
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  document.body.classList.toggle('dark-theme');
  
  // Сохраняем предпочтение пользователя
  const isDarkTheme = document.body.classList.contains('dark-theme');
  localStorage.setItem('darkTheme', isDarkTheme);
  
  // Обновляем стили открытых окон
  Object.values(trayWindows).forEach(win => {
    if (document.body.classList.contains('dark-theme')) {
      win.setBackground('#2e3436');
    } else {
      win.setBackground('#f6f5f4');
    }
  });
  
  // Обновляем иконки
  updateWindowIcons();
  
  // Обновляем таскбар
  updateTaskbar();
  
  // Устанавливаем фон
  const isDark = document.body.classList.contains('dark-theme');
  setWallpaperForTheme(isDark ? 'dark' : 'light');
}

// Функция для отображения календаря
function toggleCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
}

// Функция для генерации календаря
function generateCalendar() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;
  
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  let calendarHTML = `
    <div class="calendar-header">
      <div class="calendar-month">${monthNames[month]} ${year}</div>
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
  
  // Корректировка для начала недели с понедельника
  let dayIndex = firstDay === 0 ? 6 : firstDay - 1;
  
  // Добавляем пустые ячейки для начала месяца
  for (let i = 0; i < dayIndex; i++) {
    calendarHTML += `<div class="day empty"></div>`;
  }
  
  // Добавляем дни месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === now.getDate() ? 'today' : '';
    calendarHTML += `<div class="day ${isToday}">${i}</div>`;
  }
  
  calendarHTML += `</div>`;
  calendar.innerHTML = calendarHTML;
}

// Функция для активации окна
function activateWindow(type) {
  console.log('Активация окна:', type);
  
  // Деактивируем все окна
  Object.values(trayWindows).forEach(win => {
    win.removeClass('active');
    
    // Принудительно удаляем класс active с DOM-элемента
    if (win.dom) {
      win.dom.classList.remove('active');
      win.dom.style.zIndex = 10;
    }
  });
  
  // Активируем нужное окно
  if (trayWindows[type]) {
    console.log('Найдено окно для активации:', type);
    
    // Добавляем класс active
    trayWindows[type].addClass('active');
    
    // Принудительно обновляем стили для активного окна
    if (trayWindows[type].dom) {
      trayWindows[type].dom.classList.add('active');
      trayWindows[type].dom.style.zIndex = 100;
      
      // Перемещаем окно на передний план в DOM
      document.body.appendChild(trayWindows[type].dom);
    }
    
    // Фокусируем окно
    trayWindows[type].focus();
    
    // Обновляем панель задач
    updateTaskbar();
  }
}

function openWindow(type) {
  // Если окно уже открыто и свернуто - развернуть
  if (trayWindows[type]) {
    if (trayWindows[type].minimized) {
      trayWindows[type].restore();
    }
    // Поднимаем окно на передний план
    activateWindow(type);
    
    // Принудительно перемещаем окно на передний план в DOM
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
      content = renderAboutContent();
      icon = getIconForTheme(windowIcons.about);
      break;
    case 'portfolio':
      title = 'Портфолио';
      content = renderPortfolioContent();
      icon = getIconForTheme(windowIcons.portfolio);
      break;
    case 'services':
      title = 'Услуги';
      content = renderServicesContent();
      icon = getIconForTheme(windowIcons.services);
      break;
    case 'contacts':
      title = 'Контакты';
      content = renderContactsContent();
      icon = getIconForTheme(windowIcons.contacts);
      break;
    case 'calculator':
      title = 'Калькулятор услуг';
      content = renderCalculatorContent();
      icon = getIconForTheme(windowIcons.calculator);
      break;
    case 'minesweeper':
      title = 'Сапер';
      content = renderMinesweeperContent();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'game2048':
      title = '2048';
      content = render2048Content();
      icon = getIconForTheme(windowIcons.game);
      break;
    case 'tictactoe':
      title = 'Крестики-нолики';
      content = renderTicTacToeContent();
      icon = getIconForTheme(windowIcons.game);
      break;
    default:
      content = '<p>Содержимое окна</p>';
      icon = getIconForTheme(windowIcons.about);
  }
  
  const win = new WinBox({
    title: title,
    class: ['adwaita-theme', 'active'], // Добавляем класс active сразу при создании
    width: 800,
    height: 600,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100) + 50,
    top: 40, // <-- теперь 40px для игр
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    shadow: true,
    max: false, // Отключаем автоматическое разворачивание окна на весь экран
    html: content,
    header: 36, // Устанавливаем высоту заголовка
    icon: icon, // Добавляем иконку с учетом текущей темы
    onclose: () => {
      delete trayWindows[type];
      updateTaskbar();
      return false;
    },
    onminimize: () => {
      updateTaskbar();
    },
    onrestore: () => {
      win.minimized = false;
      activateWindow(type);
    },
    onfocus: () => {
      activateWindow(type);
    }
  });

  // Добавляем обработчики для вкладок, если они есть
  if (type === 'about' || type === 'portfolio' || type === 'services') {
    setupTabs(win.body);
  }
  
  // Добавляем обработчики для проектов, если они есть
  if (type === 'portfolio') {
    win.body.querySelectorAll('.project-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        openProjectWindow(url);
      });
    });
    
    // Инициализируем 3D модели, если они есть
    if (typeof init3DModels === 'function') {
      init3DModels();
    }
  }

  // Сохраняем окно в объекте trayWindows
  trayWindows[type] = win;
  
  // Активируем новое окно
  activateWindow(type);
  
  // Добавляем обработчик клика на окно для активации
  if (win.dom) {
    // Используем делегирование событий для всего окна
    win.dom.addEventListener('mousedown', function(e) {
      // Предотвращаем всплытие события, чтобы оно не перехватывалось другими обработчиками
      e.stopPropagation();
      // Активируем окно при любом клике внутри него
      activateWindow(type);
    });
    
    // Добавляем обработчик для заголовка окна
    const header = win.dom.querySelector('.wb-header');
    if (header) {
      header.addEventListener('mousedown', function(e) {
        e.stopPropagation();
        activateWindow(type);
      });
    }
    
    // Добавляем обработчик для тела окна
    const body = win.dom.querySelector('.wb-body');
    if (body) {
      body.addEventListener('mousedown', function(e) {
        e.stopPropagation();
        activateWindow(type);
      });
    }
  }
  
  // --- Инициализация игр ---
  if (type === 'minesweeper') setTimeout(() => {
    if (document.getElementById('minesweeper-board')) initMinesweeper();
  }, 100);
  if (type === 'game2048') setTimeout(() => {
    if (document.getElementById('game2048-board')) init2048();
  }, 100);
  if (type === 'tictactoe') setTimeout(() => {
    if (document.getElementById('tictactoe-board')) initTicTacToe();
  }, 100);
  
  updateTaskbar();
}

function renderAboutContent() {
  return `
    <div class="tabs">
      <div class="tab active" data-tab="about">Обо мне</div>
      <div class="tab" data-tab="skills">Навыки</div>
      <div class="tab" data-tab="experience">Опыт</div>
    </div>
    
    <div class="tab-content active" id="about-tab">
      <h2>Информация обо мне</h2>
      <p>Я веб-разработчик с опытом создания современных и функциональных сайтов. Моя цель - помочь вашему бизнесу выделиться в интернете с помощью качественного веб-дизайна и разработки.</p>
      <p>Я специализируюсь на создании лендингов, интернет-магазинов и корпоративных сайтов, которые не только красиво выглядят, но и эффективно решают бизнес-задачи.</p>
    </div>
    
    <div class="tab-content" id="skills-tab">
      <h2>Мои навыки</h2>
      <ul>
        <li>HTML5, CSS3, JavaScript</li>
        <li>React, Vue.js</li>
        <li>Node.js, Express</li>
        <li>MongoDB, MySQL</li>
        <li>Figma, Adobe Photoshop</li>
        <li>SEO-оптимизация</li>
      </ul>
    </div>
    
    <div class="tab-content" id="experience-tab">
      <h2>Опыт работы</h2>
      <div class="project-container">
        <div class="project-info">
          <div class="project-title">Веб-разработчик, Компания XYZ</div>
          <p>2020 - настоящее время</p>
          <p>Разработка и поддержка веб-сайтов для клиентов из различных отраслей.</p>
        </div>
      </div>
      <div class="project-container">
        <div class="project-info">
          <div class="project-title">Фрилансер</div>
          <p>2018 - 2020</p>
          <p>Создание сайтов для малого и среднего бизнеса.</p>
        </div>
      </div>
    </div>
  `;
}

function renderPortfolioContent() {
  return `
    <div class="tabs main-tabs">
      <div class="tab active" data-tab="websites">Веб-сайты</div>
      <div class="tab" data-tab="models3d">3D Модели</div>
    </div>
    
    <div class="tab-content active" id="websites-tab">
      <div class="tabs sub-tabs">
        <div class="tab active" data-tab="landing">Лендинг</div>
        <div class="tab" data-tab="shop">Магазин</div>
        <div class="tab" data-tab="corporate">Корпоративный</div>
      </div>
      
      <div class="tab-content active" id="landing-tab">
        ${renderProjects(projects.websites.landing)}
      </div>
      
      <div class="tab-content" id="shop-tab">
        ${renderProjects(projects.websites.shop)}
      </div>
      
      <div class="tab-content" id="corporate-tab">
        ${renderProjects(projects.websites.corporate)}
      </div>
    </div>
    
    <div class="tab-content" id="models3d-tab">
      <div class="tabs sub-tabs">
        <div class="tab active" data-tab="interactive">Интерактивные</div>
        <div class="tab" data-tab="static">Статичные</div>
      </div>
      
      <div class="tab-content active" id="interactive-tab">
        ${render3DModels(projects.models3d.interactive)}
      </div>
      
      <div class="tab-content" id="static-tab">
        ${render3DModels(projects.models3d.static)}
      </div>
    </div>
  `;
}

function renderServicesContent() {
  return `
    <div class="tabs">
      <div class="tab active" data-tab="web">Разработка сайтов</div>
      <div class="tab" data-tab="design">Дизайн</div>
      <div class="tab" data-tab="seo">SEO-продвижение</div>
    </div>
    
    <div class="tab-content active" id="web-tab">
      <h2>Разработка сайтов</h2>
      <p>Я предлагаю полный цикл разработки веб-сайтов:</p>
      <ul>
        <li>Лендинги от 20 000₽</li>
      </ul>
      <p class="service-description">Одностраничный сайт для презентации товара, услуги или события. Включает современный дизайн, адаптивную верстку, формы обратной связи и интеграцию с аналитикой.</p>
      
      <ul>
        <li>Интернет-магазины от 50 000₽</li>
      </ul>
      <p class="service-description">Полноценный онлайн-магазин с каталогом товаров, корзиной, личным кабинетом и системой оплаты. Включает настройку CMS, фильтры товаров, SEO-оптимизацию и мобильную версию.</p>
      
      <ul>
        <li>Корпоративные сайты от 80 000₽</li>
      </ul>
      <p class="service-description">Многостраничный сайт для представления компании в интернете. Включает уникальный дизайн, структурированную информацию о компании, блог, интеграцию с CRM и социальными сетями.</p>
      
      <p>Все сайты адаптивны, оптимизированы для поисковых систем и имеют удобную панель управления.</p>
    </div>
    
    <div class="tab-content" id="design-tab">
      <h2>Дизайн</h2>
      <p>Создаю уникальный дизайн для вашего бренда:</p>
      <ul>
        <li>UI/UX дизайн</li>
      </ul>
      <p class="service-description">Разработка интерфейсов с фокусом на удобство использования. Включает прототипирование, создание макетов всех экранов, анимации и интерактивные элементы.</p>
      
      <ul>
        <li>Логотипы и фирменный стиль</li>
      </ul>
      <p class="service-description">Создание уникального логотипа и фирменного стиля компании. Включает несколько концепций на выбор, финальные файлы в различных форматах и брендбук.</p>
      
      <ul>
        <li>Баннеры и рекламные материалы</li>
      </ul>
      <p class="service-description">Разработка графических материалов для рекламных кампаний. Включает баннеры для сайтов, социальных сетей, email-рассылок и печатной продукции.</p>
    </div>
    
    <div class="tab-content" id="seo-tab">
      <h2>SEO-продвижение</h2>
      <p>Помогу вашему сайту занять высокие позиции в поисковых системах:</p>
      <ul>
        <li>Аудит сайта</li>
      </ul>
      <p class="service-description">Комплексный анализ сайта для выявления технических ошибок и SEO-проблем. Включает проверку скорости загрузки, мобильной версии, структуры URL и метатегов.</p>
      
      <ul>
        <li>Оптимизация контента</li>
      </ul>
      <p class="service-description">Создание и оптимизация текстов для повышения релевантности поисковым запросам. Включает подбор ключевых слов, написание SEO-текстов и оптимизацию существующего контента.</p>
      
      <ul>
        <li>Техническое SEO</li>
      </ul>
      <p class="service-description">Устранение технических проблем, влияющих на индексацию сайта. Включает настройку robots.txt, XML-карты сайта, микроразметки и ускорение загрузки страниц.</p>
      
      <ul>
        <li>Анализ конкурентов</li>
      </ul>
      <p class="service-description">Исследование стратегий продвижения конкурентов для выявления эффективных подходов. Включает анализ ключевых слов, ссылочного профиля и контент-стратегии.</p>
    </div>
  `;
}

function renderContactsContent() {
  return `
    <div class="contacts-container">
      <h2>Мои контакты</h2>
      <h3>Максим Лузан</h3>
      <p><strong>Email:</strong> example@mail.com</p>
      <p><strong>Телефон:</strong> +7 (123) 456-78-90</p>
      
      <div class="social-links-container">
        <h3>Социальные сети</h3>
        <div class="social-links">
          <a href="https://vk.com/hp7zk" target="_blank" class="social-link vk-link" title="ВКонтакте">
            <i class="fab fa-vk"></i>
            <span class="social-link-text">ВКонтакте</span>
          </a>
          <a href="https://t.me/looptoquit" target="_blank" class="social-link telegram-link" title="Telegram">
            <i class="fab fa-telegram-plane"></i>
            <span class="social-link-text">Telegram</span>
          </a>
          <a href="https://github.com/username" target="_blank" class="social-link github-link" title="GitHub">
            <i class="fab fa-github"></i>
            <span class="social-link-text">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderProjects(projects) {
  return projects.map(project => `
    <div class="project-container">
      <div class="project-content">
        <div class="project-title">${project.title}</div>
        <p class="project-description">${project.description || 'Описание проекта отсутствует'}</p>
        <a href="#" class="project-link" data-url="${project.url}">Открыть проект</a>
        <div class="project-footer">
          <span class="project-credits">${project.credits}</span>
          <span class="project-date">${project.date || ''}</span>
        </div>
      </div>
      <div class="project-preview">
        <img src="${project.preview}" alt="${project.title}">
      </div>
    </div>
  `).join('');
}

function render3DModels(models) {
  return models.map(model => {
    // Для интерактивных моделей используем превью с кнопкой Play
    if (model.type === 'interactive' && model.modelUrl) {
      return `
        <div class="project-container model-container color-block" onclick="open3DModelViewer('${model.id}')">
          <div class="model-content">
            <div class="model-title color-text">${model.title}</div>
            <p class="model-description color-text">${model.description || 'Описание модели отсутствует'}</p>
            <div class="model-footer">
              <span class="model-credits color-text">${model.credits}</span>
              <span class="model-date color-text">${model.date || ''}</span>
            </div>
          </div>
          <div class="model-preview static-model-preview">
            <img src="${model.preview}" alt="${model.title}">
            <!-- Кнопка Play поверх превью -->
            <div class="model-play-btn"></div>
          </div>
        </div>
      `;
    } else {
      // Для статичных моделей используем изображение с увеличенной высотой
      return `
        <div class="project-container model-container color-block" onclick="openModelGallery('${model.id}')">
          <div class="model-content">
            <div class="model-title color-text">${model.title}</div>
            <p class="model-description color-text">${model.description || 'Описание модели отсутствует'}</p>
            <div class="model-footer">
              <span class="model-credits color-text">${model.credits}</span>
              <span class="model-date color-text">${model.date || ''}</span>
            </div>
          </div>
          <div class="model-preview static-model-preview">
            <img src="${model.preview}" alt="${model.title}">
          </div>
        </div>
      `;
    }
  }).join('');
}

// Функция для открытия просмотрщика 3D моделей
function open3DModelViewer(modelId) {
  // Находим модель по ID
  let modelData = null;
  Object.values(projects.models3d).forEach(category => {
    category.forEach(model => {
      if (model.id === modelId) {
        modelData = model;
      }
    });
  });
  
  if (!modelData) {
    console.error('Модель не найдена:', modelId);
    return;
  }
  
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const windowId = `model-${modelId}-${Date.now()}`;
  
  // Получаем иконку для 3D модели в зависимости от темы
  const icon = getIconForTheme(windowIcons.model3d);
  
  // Создаем окно для просмотра 3D модели
  const win = new WinBox({
    title: modelData.title,
    class: ['adwaita-theme', 'active'], // Добавляем класс active сразу при создании
    width: 800,
    height: 600,
    x: "center",
    y: "center",
    top: 36, // Отступ сверху равен высоте панели задач
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false, // Отключаем автоматическое разворачивание окна
    header: 36, // Устанавливаем высоту заголовка
    icon: icon, // Добавляем иконку для 3D модели
    html: `
      <div class="model-3d-container">
        <!-- Превью модели -->
        <div class="model-preview-container">
          <img src="${modelData.preview}" alt="${modelData.title}">
          <div class="model-play-btn"></div>
        </div>
        
        <!-- 3D просмотрщик -->
        <div class="model-3d-viewer hidden" id="model-viewer-${modelId}"></div>
        
        <!-- Индикатор загрузки -->
        <div class="model-loading hidden">
          <div class="loading-spinner"></div>
          <span>Загрузка модели...</span>
          <div class="model-loading-progress">
            <div class="model-loading-bar" id="loading-bar-${modelId}"></div>
          </div>
        </div>
        
        <!-- Информация о модели -->
        <div class="model-info-overlay">
          ${modelData.title}
        </div>
        
        <!-- Элементы управления -->
        <div class="model-controls">
          <div class="model-control-btn" title="Сбросить вид" onclick="resetModelView('${modelId}')">
            <i class="fas fa-sync-alt"></i>
          </div>
          <div class="model-control-btn" title="Полный экран" onclick="toggleModelFullscreen('${modelId}')">
            <i class="fas fa-expand"></i>
          </div>
        </div>
      </div>
      
      <div class="model-description">
        ${modelData.description || 'Описание отсутствует'}
      </div>
      
      <div class="model-info-footer">
        <span class="model-credits">${modelData.credits}</span>
        <span class="model-date">${modelData.date || ''}</span>
      </div>
    `,
    onclose: () => {
      // Удаляем окно из списка окон
      delete trayWindows[windowId];
      updateTaskbar();
      return false;
    }
  });
  
  // Сохраняем окно в объекте trayWindows
  trayWindows[windowId] = win;
  
  // --- Добавлено: сразу устанавливаем иконку ---
  if (win.setIcon) win.setIcon(icon);
  
  // Активируем окно
  activateWindow(windowId);
  
  // Добавляем обработчик для кнопки Play
  const playBtn = win.body.querySelector('.model-play-btn');
  const previewContainer = win.body.querySelector('.model-preview-container');
  const modelViewer = win.body.querySelector(`#model-viewer-${modelId}`);
  const loadingIndicator = win.body.querySelector('.model-loading');
  
  if (playBtn) {
    playBtn.addEventListener('click', function() {
      // Показываем индикатор загрузки
      loadingIndicator.classList.remove('hidden');
      
      // Загружаем модель
      loadModel(modelData.modelUrl, modelId).then(() => {
        // Скрываем превью и показываем 3D просмотрщик
        previewContainer.classList.add('hidden');
        modelViewer.classList.remove('hidden');
        
        // Скрываем индикатор загрузки
        loadingIndicator.classList.add('hidden');
      }).catch(error => {
        console.error('Ошибка загрузки модели:', error);
        
        // Показываем сообщение об ошибке
        loadingIndicator.innerHTML = `
          <div class="model-error">
            <h3>Ошибка загрузки модели</h3>
            <p>${error.message || 'Не удалось загрузить 3D модель'}</p>
            <button onclick="this.parentNode.parentNode.classList.add('hidden'); document.querySelector('.model-preview-container').classList.remove('hidden');">
              Вернуться к превью
            </button>
          </div>
        `;
      });
    });
  }
  
  // Функция для загрузки модели
  window.loadModel = function(url, modelId) {
    return new Promise((resolve, reject) => {
      // Имитация загрузки модели
      const loadingBar = document.getElementById(`loading-bar-${modelId}`);
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Здесь должна быть реальная загрузка модели
          // Например, с использованием Three.js или другой библиотеки
          
          // Для демонстрации просто показываем сообщение об успешной загрузке
          const modelViewer = document.getElementById(`model-viewer-${modelId}`);
          if (modelViewer) {
            modelViewer.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div>
                  <h3>3D модель загружена</h3>
                  <p>Это демонстрационный режим. В реальном приложении здесь была бы интерактивная 3D модель.</p>
                </div>
              </div>
            `;
            
            // Добавляем небольшую задержку перед разрешением промиса
            setTimeout(() => {
              resolve();
            }, 500);
          } else {
            reject(new Error('Элемент просмотрщика не найден'));
          }
        }
        
        if (loadingBar) {
          loadingBar.style.width = `${progress}%`;
        }
      }, 200);
    });
  };
  
  // Функции для управления моделью
  window.resetModelView = function(modelId) {
    console.log('Сброс вида модели:', modelId);
    // Здесь должен быть код для сброса вида модели
  };
  
  window.toggleModelFullscreen = function(modelId) {
    const container = document.querySelector('.model-3d-container');
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen().catch(err => {
          console.error('Ошибка при переходе в полноэкранный режим:', err);
        });
      }
    }
  };
}

// Функция для открытия галереи статичных моделей
function openModelGallery(modelId) {
  // Находим модель по ID
  let modelData = null;
  Object.values(projects.models3d).forEach(category => {
    category.forEach(model => {
      if (model.id === modelId) {
        modelData = model;
      }
    });
  });
  
  if (!modelData) {
    console.error('Модель не найдена:', modelId);
    return;
  }
  
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const windowId = `gallery-${modelId}-${Date.now()}`;
  
  // Получаем иконку для 3D модели в зависимости от темы
  const icon = getIconForTheme(windowIcons.model3d);
  
  // Создаем окно для просмотра галереи
  const win = new WinBox({
    title: modelData.title,
    class: ['adwaita-theme', 'active'], // Добавляем класс active сразу при создании
    width: 800,
    height: 600,
    x: "center",
    y: "center",
    top: 36, // Отступ сверху равен высоте панели задач
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false, // Отключаем автоматическое разворачивание окна
    header: 36, // Устанавливаем высоту заголовка
    icon: icon, // Добавляем иконку для 3D модели
    html: `
      <div class="model-gallery-container">
        <div class="model-gallery-left">
          <div class="model-gallery-main">
            <img src="${modelData.preview}" alt="${modelData.title}">
            <div class="gallery-nav">
              <button class="gallery-nav-btn gallery-prev">❮</button>
              <button class="gallery-nav-btn gallery-next">❯</button>
            </div>
          </div>
          <div class="model-gallery-thumbnails">
            <div class="model-gallery-thumb active">
              <img src="${modelData.preview}" alt="${modelData.title}">
            </div>
            <!-- Дополнительные изображения будут добавлены динамически -->
          </div>
        </div>
        <div class="model-gallery-right">
          <h2>${modelData.title}</h2>
          <p class="model-description">${modelData.description || 'Описание отсутствует'}</p>
          <div class="model-info-footer">
            <span class="model-credits">${modelData.credits}</span>
            <span class="model-date">${modelData.date || ''}</span>
          </div>
        </div>
      </div>
    `,
    onclose: () => {
      // Удаляем окно из списка окон
      delete trayWindows[windowId];
      updateTaskbar();
      return false;
    }
  });
  
  // Сохраняем окно в объекте trayWindows
  trayWindows[windowId] = win;
  
  // --- Добавлено: сразу устанавливаем иконку ---
  if (win.setIcon) win.setIcon(icon);
  
  // Активируем окно
  activateWindow(windowId);
}

function openProjectWindow(url) {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Получаем заголовок из URL
  let projectTitle = 'Проект';
  // Извлекаем домен из URL для использования в заголовке
  try {
    const urlObj = new URL(url);
    projectTitle = urlObj.hostname.replace(/^www\./, '');
  } catch (e) {
    console.error('Ошибка при парсинге URL:', e);
  }

  // Находим информацию о проекте по URL
  let projectInfo = null;
  Object.values(projects.websites).forEach(category => {
    category.forEach(project => {
      if (project.url === url) {
        projectInfo = project;
      }
    });
  });

  // Создаем уникальный ID для окна
  const windowId = `project-${Date.now()}`;

  // Получаем иконку для веб-сайта в зависимости от темы
  const icon = getIconForTheme(windowIcons.website);

  // Пробуем открыть сайт в iframe
  const win = new WinBox({
    title: projectInfo ? projectInfo.title : projectTitle,
    class: ['adwaita-theme', 'active'], // Добавляем класс active сразу при создании
    width: 800,
    height: 600,
    x: "center",
    y: "center",
    top: 36, // Отступ сверху равен высоте панели задач
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false, // Отключаем автоматическое разворачивание окна на весь экран
    header: 36, // Устанавливаем высоту заголовка
    index: 9999, // Устанавливаем высокий z-index, чтобы окно было поверх других
    icon: icon, // Добавляем иконку для веб-сайта
    html: `
      <div class="window-body">
        <div id="iframe-container-${Date.now()}" class="iframe-container">
          <iframe src="${url}" frameborder="0" width="100%" height="100%" 
            onload="this.style.display='block'; this.parentNode.classList.add('loaded')" 
            onerror="handleIframeError(this, '${url}')"
            style="display:none;"></iframe>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" id="progress-fill-${Date.now()}"></div>
              <div class="progress-text" id="progress-text-${Date.now()}">0%</div>
            </div>
          </div>
        </div>
      </div>
    `,
    onclose: () => {
      // Удаляем окно из списка окон
      delete trayWindows[windowId];
      updateTaskbar();
      return false;
    }
  });
  
  // Сохраняем окно в объекте trayWindows
  trayWindows[windowId] = win;
  
  // --- Добавлено: сразу устанавливаем иконку ---
  if (win.setIcon) win.setIcon(icon);
  
  // Активируем окно
  activateWindow(windowId);
  
  // Запускаем анимацию загрузки
  const progressId = Date.now();
  const progressFill = document.getElementById(`progress-fill-${progressId}`);
  const progressText = document.getElementById(`progress-text-${progressId}`);
  
  if (progressFill && progressText) {
    simulateLoadingForElement(progressFill, progressText);
  }
  
  // Добавляем обработчик ошибок для iframe
  window.handleIframeError = function(iframe, url) {
    const container = iframe.parentNode;
    
    // Удаляем прогресс-бар
    const progressContainer = container.querySelector('.progress-container');
    if (progressContainer) {
      container.removeChild(progressContainer);
    }
    
    // Показываем сообщение об ошибке с информацией о проекте
    iframe.style.display = 'none';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'iframe-error';
    
    let errorHTML = '';
    if (projectInfo) {
      errorHTML = `
        <h2>${projectInfo.title}</h2>
        <p class="project-description">${projectInfo.description || 'Описание отсутствует'}</p>
        <p>Этот сайт не может быть открыт во встроенном окне из-за политики безопасности.</p>
        <p>Нажмите кнопку ниже, чтобы открыть его в новой вкладке.</p>
        <button onclick="window.open('${url}', '_blank')" class="btn">
          Открыть в новой вкладке
        </button>
      `;
    } else {
      errorHTML = `
        <p>Этот сайт не может быть открыт во встроенном окне из-за политики безопасности.</p>
        <p>Нажмите кнопку ниже, чтобы открыть его в новой вкладке.</p>
        <button onclick="window.open('${url}', '_blank')" class="btn">
          Открыть в новой вкладке
        </button>
      `;
    }
    
    errorDiv.innerHTML = errorHTML;
    container.appendChild(errorDiv);
  };
  
  // Проверяем возможность загрузки через 3 секунды
  setTimeout(() => {
    const iframe = win.body.querySelector('iframe');
    if (iframe) {
      try {
        // Пытаемся получить доступ к содержимому iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // Если доступ получен, показываем iframe
        iframe.style.display = 'block';
        
        // Удаляем прогресс-бар
        const progressContainer = iframe.parentNode.querySelector('.progress-container');
        if (progressContainer) {
          iframe.parentNode.removeChild(progressContainer);
        }
      } catch (e) {
        // Если произошла ошибка доступа, вызываем обработчик ошибки
        handleIframeError(iframe, url);
      }
    }
  }, 3000);
}

function setupTabs(container) {
  // Настраиваем главные вкладки
  container.querySelectorAll('.main-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Находим активную вкладку
      const activeTab = container.querySelector('.main-tabs .tab.active');
      const activeTabId = activeTab.getAttribute('data-tab');
      const activeContent = document.getElementById(`${activeTabId}-tab`);
      
      // Определяем направление свайпа
      const clickedTabIndex = Array.from(container.querySelectorAll('.main-tabs .tab')).indexOf(this);
      const activeTabIndex = Array.from(container.querySelectorAll('.main-tabs .tab')).indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      
      // Деактивируем все главные вкладки
      container.querySelectorAll('.main-tabs .tab').forEach(t => t.classList.remove('active'));
      
      // Анимируем уход текущего контента
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          
          // Активируем текущую главную вкладку
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = document.getElementById(`${tabId}-tab`);
          
          // Анимируем появление нового контента
          if (newContent) {
            newContent.classList.add(`slide-${direction}`);
            newContent.classList.add('active');
            setTimeout(() => {
              newContent.classList.remove(`slide-${direction}`);
            }, 10);
          }
        }, 300);
      } else {
        // Активируем текущую главную вкладку
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const newContent = document.getElementById(`${tabId}-tab`);
        
        // Анимируем появление нового контента
        if (newContent) {
          newContent.classList.add(`slide-${direction}`);
          newContent.classList.add('active');
          setTimeout(() => {
            newContent.classList.remove(`slide-${direction}`);
          }, 10);
        }
      }
      }
    ,);
  });
  
  // Настраиваем подвкладки для веб-сайтов
  container.querySelectorAll('#websites-tab .sub-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Находим активную подвкладку
      const activeTab = container.querySelector('#websites-tab .sub-tabs .tab.active');
      const activeTabId = activeTab.getAttribute('data-tab');
      const activeContent = document.getElementById(`${activeTabId}-tab`);
      
      // Определяем направление свайпа
      const clickedTabIndex = Array.from(container.querySelectorAll('#websites-tab .sub-tabs .tab')).indexOf(this);
      const activeTabIndex = Array.from(container.querySelectorAll('#websites-tab .sub-tabs .tab')).indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      
      // Деактивируем все подвкладки веб-сайтов
      container.querySelectorAll('#websites-tab .sub-tabs .tab').forEach(t => t.classList.remove('active'));
      
      // Анимируем уход текущего контента
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          
          // Активируем текущую подвкладку после исчезновения предыдущего контента
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = document.getElementById(`${tabId}-tab`);
          
          // Анимируем появление нового контента
          if (newContent) {
            newContent.classList.add(`slide-${direction}`);
            newContent.classList.add('active');
            setTimeout(() => {
              newContent.classList.remove(`slide-${direction}`);
            }, 10);
          }
        }, 300);
      } else {
        // Активируем текущую подвкладку если нет активного контента
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const newContent = document.getElementById(`${tabId}-tab`);
        
        // Анимируем появление нового контента
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
  
  // Настраиваем подвкладки для 3D моделей
  container.querySelectorAll('#models3d-tab .sub-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Находим активную подвкладку
      const activeTab = container.querySelector('#models3d-tab .sub-tabs .tab.active');
      const activeTabId = activeTab.getAttribute('data-tab');
      const activeContent = document.getElementById(`${activeTabId}-tab`);
      
      // Определяем направление свайпа
      const clickedTabIndex = Array.from(container.querySelectorAll('#models3d-tab .sub-tabs .tab')).indexOf(this);
      const activeTabIndex = Array.from(container.querySelectorAll('#models3d-tab .sub-tabs .tab')).indexOf(activeTab);
      const direction = clickedTabIndex > activeTabIndex ? 'right' : 'left';
      
      // Деактивируем все подвкладки 3D моделей
      container.querySelectorAll('#models3d-tab .sub-tabs .tab').forEach(t => t.classList.remove('active'));
      
      // Анимируем уход текущего контента
      if (activeContent) {
        activeContent.classList.add(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
        setTimeout(() => {
          activeContent.classList.remove('active');
          activeContent.classList.remove(`slide-out-${direction === 'right' ? 'left' : 'right'}`);
          
          // Активируем текущую подвкладку после исчезновения предыдущего контента
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const newContent = document.getElementById(`${tabId}-tab`);
          
          // Анимируем появление нового контента
          if (newContent) {
            newContent.classList.add(`slide-${direction}`);
            newContent.classList.add('active');
            setTimeout(() => {
              newContent.classList.remove(`slide-${direction}`);
            }, 10);
          }
        }, 300);
      } else {
        // Активируем текущую подвкладку если нет активного контента
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        const newContent = document.getElementById(`${tabId}-tab`);
        
        // Анимируем появление нового контента
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
  
  // Для обратной совместимости с другими вкладками
  container.querySelectorAll('.tab:not(.main-tabs .tab):not(.sub-tabs .tab)').forEach(tab => {
    tab.addEventListener('click', function() {
      // Находим ближайший родительский контейнер с вкладками
      const tabsContainer = this.closest('.tabs');
      if (!tabsContainer) return;
      
      // Деактивируем все вкладки в этом контейнере
      tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      
      // Находим родительский контейнер с содержимым вкладок
      const contentContainer = tabsContainer.parentElement;
      if (!contentContainer) return;
      
      // Деактивируем все содержимое вкладок
      contentContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Активируем текущую вкладку
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const tabContent = document.getElementById(`${tabId}-tab`);
      
      // Добавляем небольшую задержку для плавного перехода
      if (tabContent) {
        setTimeout(() => {
          tabContent.classList.add('active');
        }, 50);
      }
    });
  });
  
  // Добавляем эффект волны при наведении на проекты и модели
  container.querySelectorAll('.project-container, .model-container, .color-block').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.classList.add('wave-effect');
    });
    
    element.addEventListener('mouseleave', function() {
      this.classList.remove('wave-effect');
    });
  });
}

function simulateLoadingForElement(progressFill, progressText) {
  if (!progressFill || !progressText) return;
  
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.floor(progress)}%`;
  }, 200);
}

function updateTaskbar() {
  const taskbar = document.getElementById('taskbarItems');
  taskbar.innerHTML = '';
  Object.entries(trayWindows).forEach(([type, win]) => {
    const item = document.createElement('div');
    item.className = 'taskbar-item';
    let title = win.title || type;
    let iconPath;
    const isDarkTheme = document.body.classList.contains('dark-theme');
    // Корректно определяем иконку
    if (type === 'about') iconPath = getIconForTheme(windowIcons.about);
    else if (type === 'portfolio') iconPath = getIconForTheme(windowIcons.portfolio);
    else if (type === 'services') iconPath = getIconForTheme(windowIcons.services);
    else if (type === 'contacts') iconPath = getIconForTheme(windowIcons.contacts);
    else if (type === 'calculator') iconPath = getIconForTheme(windowIcons.calculator);
    else if (type.startsWith('project-')) iconPath = getIconForTheme(windowIcons.website);
    else if (type.startsWith('model-') || type.startsWith('gallery-')) iconPath = getIconForTheme(windowIcons.model3d);
    else iconPath = getIconForTheme(windowIcons.about);
    item.innerHTML = `<img src="${iconPath}"><span class="taskbar-item-title">${title}</span>`;
    item.onclick = () => {
      if (win.minimized) {
        win.restore();
        activateWindow(type);
      } else {
        win.minimize();
      }
    };
    taskbar.appendChild(item);
  });
}

function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  if (menu.style.display === 'block') {
    closeStartMenu();
  } else {
    menu.style.display = 'block';
    renderStartMenu(); // Всегда показываем главное меню при открытии
  }
}

function closeStartMenu() {
  const menu = document.getElementById('startMenu');
  menu.style.display = 'none';
}

// Глобальный объект для хранения загруженных моделей
const loadedModels = {};

// Функция для загрузки библиотеки Three.js и её компонентов
function loadThreeJS(callback) {
  // Проверяем, загружена ли уже библиотека
  if (typeof window.THREE !== 'undefined') {
    THREE = window.THREE;
    if (callback) callback();
    return;
  }
  
  // Загружаем основную библиотеку Three.js (UMD версия)
  const threeScript = document.createElement('script');
  threeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js';
  threeScript.onload = () => {
    THREE = window.THREE;
    
    // Загружаем GLTFLoader (UMD версия)
    const gltfLoaderScript = document.createElement('script');
    gltfLoaderScript.src = 'https://cdn.jsdelivr.net/npm/three@0.149.0/examples/js/loaders/GLTFLoader.js';
    gltfLoaderScript.onload = () => {
      
      // Загружаем OrbitControls (UMD версия)
      const orbitControlsScript = document.createElement('script');
      orbitControlsScript.src = 'https://cdn.jsdelivr.net/npm/three@0.149.0/examples/js/controls/OrbitControls.js';
      orbitControlsScript.onload = () => {
        // --- Исправление: присваиваем OrbitControls в THREE ---
        if (window.OrbitControls) {
          THREE.OrbitControls = window.OrbitControls;
        } else if (window.THREE && window.THREE.OrbitControls) {
          // ничего не делаем, уже есть
        }
        if (callback) callback();
      };
      document.head.appendChild(orbitControlsScript);
    };
    document.head.appendChild(gltfLoaderScript);
  };
  document.head.appendChild(threeScript);
}

// Функция для загрузки и отображения 3D модели по клику на кнопку Play
window.loadAndPlay = function(modelId) {
  const model = projects.models3d.interactive.find(m => m.id === modelId);
  if (!model) return;
  
  // Получаем элементы DOM
  const container = document.getElementById(`model-container-${modelId}`);
  const previewContainer = document.getElementById(`model-preview-${modelId}`);
  const playButton = document.getElementById(`model-play-${modelId}`);
  const viewerContainer = document.getElementById(`model-viewer-${modelId}`);
  const progressBar = document.getElementById(`model-progress-${modelId}`);
  const loadingElement = document.getElementById(`model-loading-${modelId}`);
  
  if (!container || !previewContainer || !playButton || !loadingElement || !viewerContainer) return;
  
  // Проверяем, загружена ли уже эта модель
  if (loadedModels[modelId]) {
    showModel(modelId);
    return;
  }
  
  // Показываем индикатор загрузки и скрываем кнопку Play
  loadingElement.classList.remove('hidden');
  playButton.classList.add('hidden');
  
  // Загружаем Three.js и инициализируем модель
  loadThreeJS(() => {
    // Проверяем, загружена ли уже эта модель
    if (loadedModels[modelId]) {
      showModel(modelId);
      return;
    }
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // Темный фон как в Sketchfab
    
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Добавляем canvas в контейнер
    viewerContainer.innerHTML = ''; // Очищаем контейнер перед добавлением
    viewerContainer.appendChild(renderer.domElement);
    viewerContainer.classList.remove('hidden'); // Показываем контейнер для 3D модели
    
    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Добавляем контроллер орбиты для вращения камеры
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    
    // Загружаем модель
    const loader = new THREE.GLTFLoader();
    loader.load(
      model.modelUrl,
      function(gltf) {
        const modelObject = gltf.scene;
        
        // Центрируем модель
        const box = new THREE.Box3().setFromObject(modelObject);
        const center = box.getCenter(new THREE.Vector3());
        modelObject.position.sub(center);
        
        // Масштабируем модель, чтобы она помещалась в поле зрения
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        modelObject.scale.set(scale, scale, scale);
        
        // Добавляем модель на сцену
        scene.add(modelObject);
        
        // Добавляем элементы управления
        addModelControls(container, camera, modelObject, renderer, scene, controls);
        
        // Сохраняем модель в глобальном объекте
        loadedModels[modelId] = {
          scene,
          camera,
          renderer,
          controls,
          model: modelObject,
          animate: function() {
            requestAnimationFrame(loadedModels[modelId].animate);
            controls.update();
            renderer.render(scene, camera);
          }
        };
        
        // Скрываем индикатор загрузки и превью
        loadingElement.classList.add('hidden');
        previewContainer.classList.add('hidden');
        
        // Запускаем анимацию
        loadedModels[modelId].animate();
        
        // Обработка изменения размера окна и родительского окна WinBox
        const resizeObserver = new ResizeObserver(() => {
          if (!container) return;
          
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        });
        
        resizeObserver.observe(container);
        
        // Также наблюдаем за изменением размера родительского окна WinBox
        const winboxContainer = container.closest('.wb-body');
        if (winboxContainer) {
          resizeObserver.observe(winboxContainer);
        }
      },
      function(xhr) {
        // Прогресс загрузки
        if (xhr.lengthComputable) {
          const percent = (xhr.loaded / xhr.total * 100).toFixed(0);
          if (progressBar) {
            progressBar.style.width = `${percent}%`;
          }
          if (loadingElement) {
            const progressText = loadingElement.querySelector('div:not(.loading-spinner):not(.model-loading-progress)');
            if (progressText) {
              progressText.textContent = `Загрузка: ${percent}%`;
            }
          }
        }
      },
      function(error) {
        // Ошибка загрузки
        console.error('Ошибка при загрузке модели:', error);
        loadingElement.classList.add('hidden');
        previewContainer.classList.remove('loading');
        playButton.classList.remove('hidden');
        
        // Показываем сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'model-error';
        errorDiv.innerHTML = `
          <div>Ошибка при загрузке 3D модели</div>
          <p>${error.message || 'Не удалось загрузить модель'}</p>
          <button onclick="loadAndPlay('${modelId}')">Повторить</button>
        `;
        container.appendChild(errorDiv);
      }
    );
  });
};

// Функция для отображения уже загруженной модели
function showModel(modelId) {
  const modelData = loadedModels[modelId];
  if (!modelData) return;
  
  const previewContainer = document.getElementById(`model-preview-${modelId}`);
  const loadingElement = document.getElementById(`model-loading-${modelId}`);
  const viewerContainer = document.getElementById(`model-viewer-${modelId}`);
  
  // Скрываем индикатор загрузки
  if (loadingElement) loadingElement.classList.add('hidden');
  
  // Скрываем превью и показываем 3D модель
  if (previewContainer) previewContainer.classList.add('hidden');
  if (viewerContainer) viewerContainer.classList.remove('hidden');
  
  // Запускаем анимацию, если она не запущена
  if (!modelData.animating) {
    modelData.animate();
    modelData.animating = true;
  }
}

// Функция для добавления элементов управления к модели
function addModelControls(container, camera, model, renderer, scene, controls) {
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'model-controls';
  
  // Кнопка сброса позиции
  const resetBtn = document.createElement('button');
  resetBtn.className = 'model-control-btn';
  resetBtn.innerHTML = '↺';
  resetBtn.title = 'Сбросить позицию';
  resetBtn.onclick = () => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  };
  
  // Кнопка полноэкранного режима
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'model-control-btn';
  fullscreenBtn.innerHTML = '⛶';
  fullscreenBtn.title = 'Полноэкранный режим';
  fullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  // Кнопка автовращения
  const autoRotateBtn = document.createElement('button');
  autoRotateBtn.className = 'model-control-btn';
  autoRotateBtn.innerHTML = '⟳';
  autoRotateBtn.title = 'Автовращение';
  autoRotateBtn.onclick = () => {
    controls.autoRotate = !controls.autoRotate;
    autoRotateBtn.style.background = controls.autoRotate ? 'rgba(53, 132, 228, 0.6)' : 'rgba(0, 0, 0, 0.6)';
  };
  
  controlsDiv.appendChild(resetBtn);
  controlsDiv.appendChild(autoRotateBtn);
  controlsDiv.appendChild(fullscreenBtn);
  container.appendChild(controlsDiv);
}

// Функция для инициализации 3D моделей при открытии раздела портфолио
function init3DModels() {
  // Загружаем Three.js, но не инициализируем модели автоматически
  loadThreeJS();
}

// Функция для отправки формы обратной связи
function submitContactForm() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  // Простая валидация
  if (!nameInput.value.trim()) {
    showTooltip(nameInput, 'Пожалуйста, введите ваше имя');
    return;
  }
  
  if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
    showTooltip(emailInput, 'Пожалуйста, введите корректный email');
    return;
  }
  
  if (!messageInput.value.trim()) {
    showTooltip(messageInput, 'Пожалуйста, введите сообщение');
    return;
  }
  
  // Имитация отправки формы
  const btn = document.querySelector('.contact-form .btn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Отправка...';
  
  setTimeout(() => {
    btn.textContent = 'Отправлено!';
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
    }, 2000);
  }, 1500);
}

// Функция для отображения подсказок
function showTooltip(element, message) {
  // Удаляем существующие подсказки
  const existingTooltips = document.querySelectorAll('.tooltip');
  existingTooltips.forEach(tooltip => tooltip.remove());
  
  // Создаем новую подсказку
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = message;
  
  // Позиционируем подсказку
  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.top - 40}px`;
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.transform = 'translateX(-50%)';
  
  // Добавляем подсказку на страницу
  document.body.appendChild(tooltip);
  
  // Показываем подсказку
  setTimeout(() => tooltip.classList.add('visible'), 10);
  
  // Скрываем подсказку через некоторое время
  setTimeout(() => {
    tooltip.classList.remove('visible');
    setTimeout(() => tooltip.remove(), 300);
  }, 3000);
  
  // Фокусируемся на элементе
  element.focus();
}

// Функция для инициализации эффекта параллакса
function initParallax() {
  let targetX = 0, targetY = 0;
  let lastX = 0, lastY = 0;

  document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    const speed = 50; // Было 20, стало 50 для большей интенсивности
    targetX = (mouseX - 0.5) * speed;
    targetY = (mouseY - 0.5) * speed;
  });

  function animate() {
    lastX += (targetX - lastX) * 0.08;
    lastY += (targetY - lastY) * 0.08;
    document.body.style.setProperty('--parallax-x', `${lastX}px`);
    document.body.style.setProperty('--parallax-y', `${lastY}px`);
    requestAnimationFrame(animate);
  }
  animate();
}

// Функция для инициализации подсказок для новых пользователей
function initUserTips() {
  // Проверяем, первый ли это визит пользователя
  if (!localStorage.getItem('visitedBefore')) {
    // Показываем подсказки с задержкой
    setTimeout(() => {
      showTip('Нажмите на ярлыки на рабочем столе, чтобы открыть соответствующие окна', document.querySelector('.shortcut'));
    }, 1000);
    
    setTimeout(() => {
      showTip('Нажмите на кнопку "Действия", чтобы открыть меню', document.querySelector('.activities-button'));
    }, 4000);
    
    setTimeout(() => {
      showTip('Нажмите на часы, чтобы открыть календарь', document.querySelector('.clock-container'));
    }, 7000);
    
    // Отмечаем, что пользователь уже посетил сайт
    localStorage.setItem('visitedBefore', 'true');
  }
}

// Функция для отображения подсказки
function showTip(message, element) {
  if (!element) return;
  
  const tip = document.createElement('div');
  tip.className = 'tooltip';
  tip.textContent = message;
  
  // Позиционируем подсказку
  const rect = element.getBoundingClientRect();
  tip.style.top = `${rect.bottom + 10}px`;
  tip.style.left = `${rect.left + rect.width / 2}px`;
  tip.style.transform = 'translateX(-50%)';
  
  // Добавляем подсказку на страницу
  document.body.appendChild(tip);
  
  // Показываем подсказку
  setTimeout(() => tip.classList.add('visible'), 10);
  
  // Скрываем подсказку через некоторое время
  setTimeout(() => {
    tip.classList.remove('visible');
    setTimeout(() => tip.remove(), 300);
  }, 5000);
}

// Функция для открытия 3D модели в отдельном окне
function open3DModelViewer(modelId) {
  const model = projects.models3d.interactive.find(m => m.id === modelId);
  if (!model) return;
  
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Создаем HTML для окна просмотра 3D модели
  let viewerHTML = `
    <div class="model-gallery-container">
      <div class="model-gallery-left model-3d-container" id="model-container-${modelId}" data-model-url="${model.modelUrl}" style="flex: 65;">
        <!-- Превью изображение с кнопкой Play поверх -->
        <div class="model-preview-container" id="model-preview-${modelId}">
          <img src="${model.preview}" alt="${model.title}">
          <!-- Кнопка Play внутри превью -->
          <div class="model-play-btn" id="model-play-${modelId}" onclick="loadAndPlay('${modelId}')"></div>
        </div>
        
        <!-- Контейнер для 3D модели (изначально скрыт) -->
        <div class="model-3d-viewer hidden" id="model-viewer-${modelId}"></div>
        
        <!-- Индикатор загрузки (скрыт изначально) -->
        <div class="model-loading hidden" id="model-loading-${modelId}">
          <div class="loading-spinner"></div>
          <div>Загрузка модели</div>
          <div class="model-loading-progress">
            <div class="model-loading-bar" id="model-progress-${modelId}"></div>
          </div>
        </div>
      </div>
      <div class="model-gallery-right" style="flex: 35;">
        <h2>${model.title}</h2>
        <p class="model-description">${model.description || 'Описание модели отсутствует'}</p>
        
        <div class="model-software">
          <h3>Используемые программы</h3>
          <div class="software-icons">
            ${model.software ? model.software.map(sw => `
              <div class="software-icon" title="${sw}">
                <img src="icons/software/${sw.toLowerCase()}.png" alt="${sw}">
                <span>${sw}</span>
              </div>
            `).join('') : '<span>Blender</span>'}
          </div>
        </div>
        
        <div class="model-info-footer">
          <div class="model-author">
            <strong>Автор:</strong> ${model.credits}
          </div>
          <div class="model-date">
            <strong>Дата:</strong> ${model.date || 'Не указана'}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Открываем окно с 3D моделью
  const win = new WinBox({
    title: model.title,
    class: ['adwaita-theme', 'model-viewer-window'],
    width: 1000,
    height: 600,
    x: "center",
    y: "center",
    top: 36,
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false,
    html: viewerHTML,
    onclose: () => {
      // Останавливаем анимацию и освобождаем ресурсы при закрытии окна
      if (loadedModels[modelId]) {
        if (loadedModels[modelId].renderer) {
          loadedModels[modelId].renderer.dispose();
        }
        delete loadedModels[modelId];
      }
    }
  });
}

// Функция для открытия галереи статичных моделей
function openModelGallery(modelId) {
  const model = projects.models3d.static.find(m => m.id === modelId);
  if (!model) return;
  
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Создаем массив изображений для галереи
  const images = [model.preview];
  if (model.additionalImages) {
    images.push(...model.additionalImages);
  }
  
  // Создаем HTML для галереи
  let galleryHTML = `
    <div class="model-gallery-container">
      <div class="model-gallery-left" style="flex: 65%;">
        <div class="model-gallery-main">
          <img src="${model.preview}" alt="${model.title}" id="gallery-main-image">
          <div class="gallery-nav">
            <button class="gallery-nav-btn prev" onclick="changeGalleryImage('prev')" title="Предыдущее изображение">❮</button>
            <button class="gallery-nav-btn next" onclick="changeGalleryImage('next')" title="Следующее изображение">❯</button>
          </div>
        </div>
        <div class="model-gallery-thumbnails">
  `;
  
  // Добавляем миниатюры
  images.forEach((img, index) => {
    galleryHTML += `
      <div class="model-gallery-thumb ${index === 0 ? 'active' : ''}" onclick="changeGalleryImage(${index})" data-index="${index}">
        <img src="${img}" alt="Вид ${index + 1}">
      </div>
    `;
  });
  
  // Добавляем информацию о модели
  galleryHTML += `
        </div>
      </div>
      <div class="model-gallery-right" style="flex: 35%;">
        <h2>${model.title}</h2>
        <p class="model-description">${model.description || 'Описание модели отсутствует'}</p>
        
        <div class="model-software">
          <h3>Используемые программы</h3>
          <div class="software-icons">
            ${model.software ? model.software.map(sw => `
              <div class="software-icon" title="${sw}">
                <img src="icons/software/${sw.toLowerCase()}.png" alt="${sw}">
                <span>${sw}</span>
              </div>
            `).join('') : '<span>Blender</span>'}
          </div>
        </div>
        
        <div class="model-info-footer">
          <div class="model-author">
            <strong>Автор:</strong> ${model.credits}
          </div>
          <div class="model-date">
            <strong>Дата:</strong> ${model.date || 'Не указана'}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Открываем окно с галереей
  const win = new WinBox({
    title: model.title,
    class: ['adwaita-theme', 'gallery-window'],
    width: 1000,
    height: 600,
    x: "center",
    y: "center",
    top: 36,
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false,
    html: galleryHTML
  });
  
  // Сохраняем информацию о текущей галерее
  window.currentGallery = {
    images: images,
    currentIndex: 0
  };
}

// Функция для изменения главного изображения в галерее
window.changeGalleryImage = function(indexOrDirection) {
  if (!window.currentGallery) return;
  
  const mainImage = document.getElementById('gallery-main-image');
  const thumbs = document.querySelectorAll('.model-gallery-thumb');
  const images = window.currentGallery.images;
  
  let newIndex;
  
  if (typeof indexOrDirection === 'number') {
    // Если передан индекс
    newIndex = indexOrDirection;
  } else {
    // Если передано направление (prev/next)
    const currentIndex = window.currentGallery.currentIndex;
    
    if (indexOrDirection === 'prev') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentIndex + 1) % images.length;
    }
  }
  
  // Обновляем главное изображение
  mainImage.src = images[newIndex];
  
  // Обновляем активную миниатюру
  thumbs.forEach(thumb => thumb.classList.remove('active'));
  thumbs[newIndex].classList.add('active');
  
  // Обновляем текущий индекс
  window.currentGallery.currentIndex = newIndex;
};

// Инициализируем эффект параллакса и подсказки при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Загружаем Font Awesome для иконок социальных сетей
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  document.head.appendChild(fontAwesome);
  
  // Инициализируем эффект параллакса
  initParallax();
  
  // Инициализируем подсказки для новых пользователей
  initUserTips();
});

// Функция для рендеринга содержимого калькулятора услуг
function renderCalculatorContent() {
  return `
    <h2>Калькулятор услуг</h2>
    <p>Выберите необходимые услуги для расчета стоимости:</p>
    
    <div class="calculator-section">
      <h3>Разработка сайта</h3>
      <div class="calculator-item">
        <input type="checkbox" id="landing" class="service-checkbox" data-price="20000" data-type="website">
        <label for="landing">Лендинг (20 000₽)</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="shop" class="service-checkbox" data-price="50000" data-type="website">
        <label for="shop">Интернет-магазин (50 000₽)</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="corporate" class="service-checkbox" data-price="80000" data-type="website">
        <label for="corporate">Корпоративный сайт (80 000₽)</label>
      </div>
    </div>
    
    <div class="calculator-section">
      <h3>Дополнительные услуги</h3>
      <div class="calculator-item">
        <input type="checkbox" id="design" class="service-checkbox" data-price="15000" data-type="additional">
        <label for="design">Дизайн (15 000₽)</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="seo" class="service-checkbox" data-price="20000" data-type="additional">
        <label for="seo">SEO-продвижение (20 000₽)</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="content" class="service-checkbox" data-price="10000" data-type="additional">
        <label for="content">Наполнение контентом (10 000₽)</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="hosting" class="service-checkbox" data-price="5000" data-type="additional">
        <label for="hosting">Хостинг на 1 год (5 000₽)</label>
      </div>
    </div>
    
    <div class="calculator-result">
      <div class="calculator-note">
        <p>* При заказе разработки сайта на все дополнительные услуги действует скидка 20%</p>
      </div>
      <div class="calculator-total">
        <h3>Итоговая стоимость: <span id="total-price">0</span> ₽</h3>
      </div>
      <button class="btn" id="order-button">Заказать</button>
    </div>
  `;
}

// Функция для инициализации калькулятора
function initCalculator() {
  const checkboxes = document.querySelectorAll('.service-checkbox');
  const totalPriceElement = document.getElementById('total-price');
  const orderButton = document.getElementById('order-button');
  
  // Функция для расчета итоговой стоимости
  function calculateTotal() {
    let totalPrice = 0;
    let hasWebsite = false;
    let additionalServicesPrice = 0;
    
    // Проверяем, выбран ли хотя бы один сайт
    checkboxes.forEach(checkbox => {
      if (checkbox.checked && checkbox.dataset.type === 'website') {
        hasWebsite = true;
      }
    });
    
    // Считаем стоимость
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const price = parseInt(checkbox.dataset.price);
        
        if (checkbox.dataset.type === 'website') {
          totalPrice += price;
        } else if (checkbox.dataset.type === 'additional') {
          // Если выбран сайт, то на дополнительные услуги скидка 20%
          if (hasWebsite) {
            additionalServicesPrice += price * 0.8; // Скидка 20%
          } else {
            additionalServicesPrice += price;
          }
        }
      }
    });
    
    totalPrice += additionalServicesPrice;
    totalPriceElement.textContent = totalPrice.toLocaleString('ru-RU');
  }
  
  // Добавляем обработчики событий для чекбоксов
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
  });
  
  // Добавляем обработчик для кнопки заказа
  if (orderButton) {
    orderButton.addEventListener('click', function() {
      const selectedServices = [];
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedServices.push(checkbox.nextElementSibling.textContent);
        }
      });
      
      const totalPrice = totalPriceElement.textContent.replace(/\s/g, '');
      if (selectedServices.length > 0) {
        // Формируем сообщение для Telegram
        let message = 'Здравствуйте, хочу приобрести у вас:\n';
        selectedServices.forEach(service => {
          message += `- ${service}\n`;
        });
        message += `\nИтоговая сумма: ${totalPrice} ₽`;
        // Открываем Telegram с автосообщением
        const encoded = encodeURIComponent(message);
        window.open(`https://t.me/looptoquit?text=${encoded}`, '_blank');
      } else {
        alert('Пожалуйста, выберите хотя бы одну услугу.');
      }
    });
  }
}

// Функция для активации окна
function activateWindow(type) {
  console.log('Активация окна:', type);
  
  // Деактивируем все окна
  Object.values(trayWindows).forEach(win => {
    win.removeClass('active');
    
    // Принудительно удаляем класс active с DOM-элемента
    if (win.dom) {
      win.dom.classList.remove('active');
      win.dom.style.zIndex = 10;
    }
  });
  
  // Активируем нужное окно
  if (trayWindows[type]) {
    console.log('Найдено окно для активации:', type);
    
    // Добавляем класс active
    trayWindows[type].addClass('active');
    
    // Принудительно обновляем стили для активного окна
    if (trayWindows[type].dom) {
      trayWindows[type].dom.classList.add('active');
      trayWindows[type].dom.style.zIndex = 100;
      
      // Перемещаем окно на передний план в DOM
      document.body.appendChild(trayWindows[type].dom);
    }
    
    // Фокусируем окно
    trayWindows[type].focus();
    
    // Обновляем панель задач
    updateTaskbar();
  }
}
// Модифицируем функцию открытия окон проектов и моделей
function registerWindowInSystem(win, type) {
  // Сохраняем окно в объекте trayWindows
  trayWindows[type] = win;
  
  // Активируем новое окно
  activateWindow(type);
  
  // Добавляем обработчик клика на окно для активации
  if (win.dom) {
    win.dom.addEventListener('mousedown', function(e) {
      e.stopPropagation();
      activateWindow(type);
    });
    
    // Добавляем обработчик для заголовка окна
    const header = win.dom.querySelector('.wb-header');
    if (header) {
      header.addEventListener('mousedown', function(e) {
        e.stopPropagation();
        activateWindow(type);
      });
    }
    
    // Добавляем обработчик для тела окна
    const body = win.dom.querySelector('.wb-body');
    if (body) {
      body.addEventListener('mousedown', function(e) {
        e.stopPropagation();
        activateWindow(type);
      });
    }
  }
  
  // Обновляем панель задач
  updateTaskbar();
}

// Модифицируем функцию открытия окна проекта
const originalOpenProjectWindow = window.openProjectWindow;
window.openProjectWindow = function(url) {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Получаем заголовок из URL
  let projectTitle = 'Проект';
  try {
    const urlObj = new URL(url);
    projectTitle = urlObj.hostname.replace(/^www\\./, '');
  } catch (e) {
    console.error('Ошибка при парсинге URL:', e);
  }

  // Находим информацию о проекте по URL
  let projectInfo = null;
  Object.values(projects.websites).forEach(category => {
    category.forEach(project => {
      if (project.url === url) {
        projectInfo = project;
      }
    });
  });

  // Генерируем уникальный идентификатор для окна
  const windowId = 'project-' + Date.now();

  // Создаем окно
  const win = new WinBox({
    title: projectInfo ? projectInfo.title : projectTitle,
    class: ['adwaita-theme'],
    width: 800,
    height: 600,
    x: "center",
    y: "center",
    top: 36,
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false,
    header: 36,
    index: 9999,
    html: `
      <div class="window-body">
        <div id="iframe-container-${Date.now()}" class="iframe-container">
          <iframe src="${url}" frameborder="0" width="100%" height="100%" 
            onload="this.style.display='block'; this.parentNode.classList.add('loaded')" 
            onerror="handleIframeError(this, '${url}')"
            style="display:none;"></iframe>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" id="progress-fill-${Date.now()}"></div>
              <div class="progress-text" id="progress-text-${Date.now()}">0%</</div>
            </div>
          </div>
        </div>
      </div>
    `,
    onclose: () => {
      delete trayWindows[windowId];
      updateTaskbar();
      return false;
    },
    onminimize: () => {
      updateTaskbar();
    },
    onrestore: () => {
      win.minimized = false;
      activateWindow(windowId);
    },
    onfocus: () => {
      activateWindow(windowId);
    }
  });
  
  // Регистрируем окно в системе
  registerWindowInSystem(win, windowId);
  
  // Запускаем анимацию загрузки
  const progressId = Date.now();
  const progressFill = document.getElementById(`progress-fill-${progressId}`);
  const progressText = document.getElementById(`progress-text-${progressId}`);
  
  if (progressFill && progressText) {
    simulateLoadingForElement(progressFill, progressText);
  }
  
  return win;
};

// Модифицируем функцию открытия 3D модели
const originalOpen3DModelViewer = window.open3DModelViewer;
window.open3DModelViewer = function(modelId) {
  const model = projects.models3d.interactive.find(m => m.id === modelId);
  if (!model) return;
  
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Генерируем уникальный идентификатор для окна
  const windowId = 'model-' + modelId + '-' + Date.now();
  
  // Создаем HTML для окна просмотра 3D модели
  let viewerHTML = `
    <div class="model-gallery-container">
      <div class="model-gallery-left model-3d-container" id="model-container-${modelId}" data-model-url="${model.modelUrl}" style="flex: 65;">
        <!-- Превью изображение с кнопкой Play поверх -->
        <div class="model-preview-container" id="model-preview-${modelId}">
          <img src="${model.preview}" alt="${model.title}">
          <!-- Кнопка Play внутри превью -->
          <div class="model-play-btn" id="model-play-${modelId}" onclick="loadAndPlay('${modelId}')"></div>
        </div>
        
        <!-- Контейнер для 3D модели (изначально скрыт) -->
        <div class="model-3d-viewer hidden" id="model-viewer-${modelId}"></div>
        
        <!-- Индикатор загрузки (скрыт изначально) -->
        <div class="model-loading hidden" id="model-loading-${modelId}">
          <div class="loading-spinner"></div>
          <div>Загрузка модели</div>
          <div class="model-loading-progress">
            <div class="model-loading-bar" id="model-progress-${modelId}"></div>
          </div>
        </div>
      </div>
      <div class="model-gallery-right" style="flex: 35;">
        <h2>${model.title}</h2>
        <p class="model-description">${model.description || 'Описание модели отсутствует'}</p>
        
        <div class="model-software">
          <h3>Используемые программы</h3>
          <div class="software-icons">
            ${model.software ? model.software.map(sw => `
              <div class="software-icon" title="${sw}">
                <img src="icons/software/${sw.toLowerCase()}.png" alt="${sw}">
                <span>${sw}</span>
              </div>
            `).join('') : '<span>Blender</span>'}
          </div>
        </div>
        
        <div class="model-info-footer">
          <div class="model-author">
            <strong>Автор:</strong> ${model.credits}
          </div>
          <div class="model-date">
            <strong>Дата:</strong> ${model.date || 'Не указана'}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Открываем окно с 3D моделью
  const win = new WinBox({
    title: model.title,
    class: ['adwaita-theme', 'model-viewer-window'],
    width: 1000,
    height: 600,
    x: "center",
    y: "center",
    top: 36,
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false,
    html: viewerHTML,
    onclose: () => {
      // Останавливаем анимацию и освобождаем ресурсы при закрытии окна
      if (loadedModels[modelId]) {
        if (loadedModels[modelId].renderer) {
          loadedModels[modelId].renderer.dispose();
        }
        delete loadedModels[modelId];
      }
      delete trayWindows[windowId];
      updateTaskbar();
      return false;
    },
    onminimize: () => {
      updateTaskbar();
    },
    onrestore: () => {
      win.minimized = false;
      activateWindow(windowId);
    },
    onfocus: () => {
      activateWindow(windowId);
    }
  });
  
  // Регистрируем окно в системе
  registerWindowInSystem(win, windowId);
  
  return win;
};

// Модифицируем функцию открытия галереи статичных моделей
const originalOpenModelGallery = window.openModelGallery;
window.openModelGallery = function(modelId) {
  const model = projects.models3d.static.find(m => m.id === modelId);
  if (!model) return;
  
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Генерируем уникальный идентификатор для окна
  const windowId = 'gallery-' + modelId + '-' + Date.now();
  
  // Создаем массив изображений для галереи
  const images = [model.preview];
  if (model.additionalImages) {
    images.push(...model.additionalImages);
  }
  
  // Создаем HTML для галереи
  let galleryHTML = `
    <div class="model-gallery-container">
      <div class="model-gallery-left" style="flex: 65;">
        <div class="model-gallery-main">
          <img src="${model.preview}" alt="${model.title}" id="gallery-main-image">
          <div class="gallery-nav">
            <button class="gallery-nav-btn prev" onclick="changeGalleryImage('prev')" title="Предыдущее изображение">❮</button>
            <button class="gallery-nav-btn next" onclick="changeGalleryImage('next')" title="Следующее изображение">❯</button>
          </div>
        </div>
        <div class="model-gallery-thumbnails">
  `;
  
  // Добавляем миниатюры
  images.forEach((img, index) => {
    galleryHTML += `
      <div class="model-gallery-thumb ${index === 0 ? 'active' : ''}" onclick="changeGalleryImage(${index})" data-index="${index}">
        <img src="${img}" alt="Вид ${index + 1}">
      </div>
    `;
  });
  
  // Добавляем информацию о модели
  galleryHTML += `
        </div>
      </div>
      <div class="model-gallery-right" style="flex: 35%;">
        <h2>${model.title}</h2>
        <p class="model-description">${model.description || 'Описание модели отсутствует'}</p>
        
        <div class="model-software">
          <h3>Используемые программы</h3>
          <div class="software-icons">
            ${model.software ? model.software.map(sw => `
              <div class="software-icon" title="${sw}">
                <img src="icons/software/${sw.toLowerCase()}.png" alt="${sw}">
                <span>${sw}</span>
              </div>
            `).join('') : '<span>Blender</span>'}
          </div>
        </div>
        
        <div class="model-info-footer">
          <div class="model-author">
            <strong>Автор:</strong> ${model.credits}
          </div>
          <div class="model-date">
            <strong>Дата:</strong> ${model.date || 'Не указана'}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Открываем окно с галереей
  const win = new WinBox({
    title: model.title,
    class: ['adwaita-theme', 'gallery-window'],
    width: 1000,
    height: 600,
    x: "center",
    y: "center",
    top: 36,
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    max: false,
    html: galleryHTML,
    onclose: () => {
      delete trayWindows[windowId];
      updateTaskbar();
      return false;
    },
    onminimize: () => {
      updateTaskbar();
    },
    onrestore: () => {
      win.minimized = false;
      activateWindow(windowId);
    },
    onfocus: () => {
      activateWindow(windowId);
    }
  });
  
  // Регистрируем окно в системе
  registerWindowInSystem(win, windowId);
  
  // Сохраняем информацию о текущей галерее
  window.currentGallery = {
    images: images,
    currentIndex: 0
  };
  
  return win;
};


// Функция для симуляции загрузки
function simulateLoadingForElement(progressFill, progressText) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    
    if (progressFill && progressText) {
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.floor(progress)}%`;
    }
  }, 100);
}
// Функция для исправления проблемы с активацией окон
function fixWindowActivation() {
  // Переопределяем метод создания окна в WinBox
  const originalWinBox = window.WinBox;
  window.WinBox = function() {
    // Создаем окно с помощью оригинального конструктора
    const win = new originalWinBox(...arguments);
    
    // Добавляем класс active сразу после создания
    if (win.dom) {
      win.dom.classList.add('active');
      win.dom.style.zIndex = 100;
      
      // Перемещаем окно на передний план в DOM
      document.body.appendChild(win.dom);
    }
    
    return win;
  };
  
  // Копируем все свойства и методы оригинального WinBox
  for (const prop in originalWinBox) {
    if (originalWinBox.hasOwnProperty(prop)) {
      window.WinBox[prop] = originalWinBox[prop];
    }
  }
  
  // Копируем прототип
  window.WinBox.prototype = originalWinBox.prototype;
}

// Вызываем функцию исправления после загрузки страницы
document.addEventListener('DOMContentLoaded', fixWindowActivation);
// Функция для проверки загрузки модели
function checkModelLoading() {
  // Находим все элементы загрузки модели
  const loadingElements = document.querySelectorAll('.model-loading:not(.hidden)');
  
  if (loadingElements.length > 0) {
    console.log('Обнаружена бесконечная загрузка модели, исправляем...');
    
    loadingElements.forEach(loadingElement => {
      // Находим родительский контейнер
      const container = loadingElement.closest('.model-3d-container');
      if (!container) return;
      
      // Находим элементы превью и просмотрщика
      const previewContainer = container.querySelector('.model-preview-container');
      const modelViewer = container.querySelector('.model-3d-viewer');
      
      // Скрываем индикатор загрузки
      loadingElement.classList.add('hidden');
      
      // Если есть просмотрщик, показываем его, иначе возвращаем превью
      if (modelViewer && modelViewer.innerHTML.trim() !== '') {
        previewContainer.classList.add('hidden');
        modelViewer.classList.remove('hidden');
      } else {
        previewContainer.classList.remove('hidden');
        
        // Добавляем сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'model-error';
        errorDiv.innerHTML = `
          <h3>Ошибка загрузки модели</h3>
          <p>Не удалось загрузить 3D модель</p>
          <button onclick="this.parentNode.classList.add('hidden');">
            Вернуться к превью
          </button>
        `;
        container.appendChild(errorDiv);
      }
    });
  }
}

// Запускаем проверку загрузки модели каждые 10 секунд
setInterval(checkModelLoading, 10000);

// Функция для исправления проблемы с активацией окон
function fixWindowActivation() {
  // Переопределяем метод создания окна в WinBox
  const originalWinBox = window.WinBox;
  if (!originalWinBox) return;
  
  window.WinBox = function() {
    // Получаем аргументы
    const args = Array.from(arguments);
    
    // Если есть объект с настройками, добавляем класс active
    if (args.length > 0 && typeof args[0] === 'object') {
      if (!args[0].class) {
        args[0].class = ['adwaita-theme', 'active'];
      } else if (Array.isArray(args[0].class)) {
        if (!args[0].class.includes('active')) {
          args[0].class.push('active');
        }
      } else if (typeof args[0].class === 'string') {
        args[0].class = [args[0].class, 'active'];
      }
    }
    
    // Создаем окно с помощью оригинального конструктора
    const win = new originalWinBox(...args);
    
    // Добавляем класс active сразу после создания
    if (win.dom) {
      win.dom.classList.add('active');
      win.dom.style.zIndex = 100;
      
      // Перемещаем окно на передний план в DOM
      document.body.appendChild(win.dom);
    }
    
    return win;
  };
  
  // Копируем все свойства и методы оригинального WinBox
  for (const prop in originalWinBox) {
    if (originalWinBox.hasOwnProperty(prop)) {
      window.WinBox[prop] = originalWinBox[prop];
    }
  }
  
  // Копируем прототип
  window.WinBox.prototype = originalWinBox.prototype;
  
  console.log('Исправление активации окон применено');
}

// Вызываем функцию исправления после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  // Даем небольшую задержку для загрузки WinBox
  setTimeout(fixWindowActivation, 500);
});
// Иконки для окон
const windowIcons = {
  // Основные иконки
  about: {
    light: 'icons/about-dark.svg',
    dark: 'icons/about-light.svg'
  },
  portfolio: {
    light: 'icons/portfolio-dark.svg',
    dark: 'icons/portfolio-light.svg'
  },
  services: {
    light: 'icons/services-dark.svg',
    dark: 'icons/services-light.svg'
  },
  contacts: {
    light: 'icons/contacts-dark.svg',
    dark: 'icons/contacts-light.svg'
  },
  calculator: {
    light: 'icons/calculator-dark.svg',
    dark: 'icons/calculator-light.svg'
  },
  
  // Иконки для веб-сайтов
  website: {
    light: 'icons/website-dark.svg',
    dark: 'icons/website-light.svg'
  },
  
  // Иконки для 3D моделей
  model3d: {
    light: 'icons/model3d-dark.svg',
    dark: 'icons/model3d-light.svg'
  },
  // Иконки для игр
  game: {
    light: 'icons/game-dark.svg', // поменяли местами
    dark: 'icons/game-light.svg'    // поменяли местами
  }
};

// Функция для получения иконки в зависимости от темы
function getIconForTheme(iconType) {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  return isDarkTheme ? iconType.dark : iconType.light;
}
// Функция для обновления иконок при смене темы
function updateWindowIcons() {
  // Обновляем иконки для всех открытых окон
  Object.entries(trayWindows).forEach(([type, win]) => {
    // Для основных окон
    if (type === 'about') {
      win.setIcon(getIconForTheme(windowIcons.about));
    }
    else if (type === 'portfolio') {
      win.setIcon(getIconForTheme(windowIcons.portfolio));
    }
    else if (type === 'services') {
      win.setIcon(getIconForTheme(windowIcons.services));
    }
    else if (type === 'contacts') {
      win.setIcon(getIconForTheme(windowIcons.contacts));
    }
    else if (type === 'calculator') {
      win.setIcon(getIconForTheme(windowIcons.calculator));
    }
    // Для окон проектов
    else if (type.startsWith('project-')) {
      win.setIcon(getIconForTheme(windowIcons.website));
    }
    // Для окон 3D моделей и галерей
    else if (type.startsWith('model-') || type.startsWith('gallery-')) {
      win.setIcon(getIconForTheme(windowIcons.model3d));
    }
    // Для окон игр
    else if (type === 'minesweeper' || type === 'game2048' || type === 'tictactoe') {
      win.setIcon(getIconForTheme(windowIcons.game));
    }
  });
}

// Добавляем обработчик для обновления иконок при смене темы
const originalToggleTheme = toggleTheme;
toggleTheme = function() {
  // Вызываем оригинальную функцию
  originalToggleTheme();
  
  // Обновляем иконки
  updateWindowIcons();
};
// Функция для инициализации иконок окон при загрузке страницы
function initWindowIcons() {
  // Устанавливаем иконки для всех открытых окон
  Object.entries(trayWindows).forEach(([type, win]) => {
    // Для основных окон
    if (type === 'about') {
      win.setIcon(getIconForTheme(windowIcons.about));
    }
    else if (type === 'portfolio') {
      win.setIcon(getIconForTheme(windowIcons.portfolio));
    }
    else if (type === 'services') {
      win.setIcon(getIconForTheme(windowIcons.services));
    }
    else if (type === 'contacts') {
      win.setIcon(getIconForTheme(windowIcons.contacts));
    }
    else if (type === 'calculator') {
      win.setIcon(getIconForTheme(windowIcons.calculator));
    }
    // Для окон проектов
    else if (type.startsWith('project-')) {
      win.setIcon(getIconForTheme(windowIcons.website));
    }
    // Для окон 3D моделей и галерей
    else if (type.startsWith('model-') || type.startsWith('gallery-')) {
      win.setIcon(getIconForTheme(windowIcons.model3d));
    }
    // Для окон игр
    else if (type === 'minesweeper' || type === 'game2048' || type === 'tictactoe') {
      win.setIcon(getIconForTheme(windowIcons.game));
    }
  });
}

// Вызываем функцию инициализации иконок после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initWindowIcons, 500);
});
// Обновляем таскбар при смене темы
const originalToggleTheme2 = toggleTheme;
toggleTheme = function() {
  // Вызываем предыдущую версию функции
  originalToggleTheme2();
  
  // Обновляем таскбар
  updateTaskbar();
};
// Модифицируем функцию openWindow для всех окон кроме калькулятора
const originalOpenWindow = openWindow;
openWindow = function(type) {
  // Калькулятор обрабатывается отдельно
  if (type === 'calculator') {
    console.log('Калькулятор открывается через специальный обработчик');
    return;
  }
  
  return originalOpenWindow(type);
};
// Обновляем иконки при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, какая тема активна
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Обновляем иконки в таскбаре
  updateTaskbar();
});
// Полностью удаляем все обработчики для калькулятора и создаем новый
document.addEventListener('DOMContentLoaded', function() {
  // Удаляем все существующие обработчики с ярлыка калькулятора
  const calculatorShortcut = document.querySelector('[data-window="calculator"]');
  if (calculatorShortcut) {
    // Клонируем элемент, чтобы удалить все обработчики событий
    const newCalculatorShortcut = calculatorShortcut.cloneNode(true);
    calculatorShortcut.parentNode.replaceChild(newCalculatorShortcut, calculatorShortcut);
    
    // Добавляем новый обработчик
    newCalculatorShortcut.addEventListener('click', function(e) {
      e.stopPropagation(); // Предотвращаем всплытие события
      
      // Если окно уже открыто, просто активируем его
      if (trayWindows['calculator']) {
        if (trayWindows['calculator'].minimized) {
          trayWindows['calculator'].restore();
        }
        activateWindow('calculator');
        return;
      }
      
      // Если окно не открыто, создаем его
      const isDarkTheme = document.body.classList.contains('dark-theme');
      const win = new WinBox({
        title: 'Калькулятор услуг',
        class: ['adwaita-theme', 'active'],
        width: 600,
        height: 750, // <--- высота 750px
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100) + 50,
        top: 36,
        background: isDarkTheme ? '#2e3436' : '#f6f5f4',
        border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
        borderRadius: '8px',
        shadow: true,
        max: false,
        html: renderCalculatorContent(),
        header: 36,
        icon: getIconForTheme(windowIcons.calculator),
        onclose: () => {
          delete trayWindows['calculator'];
          updateTaskbar();
          return false;
        },
        onminimize: () => {
          updateTaskbar();
        },
        onrestore: () => {
          win.minimized = false;
          activateWindow('calculator');
        },
        onfocus: () => {
          activateWindow('calculator');
        }
      });
      
      trayWindows['calculator'] = win;
      activateWindow('calculator');
      
      if (win.dom) {
        document.body.appendChild(win.dom);
      }
      
      setTimeout(initCalculator, 100);
      updateTaskbar();
    });
  }
});

// Массивы путей к картинкам
const dayWallpapers = [
  'img/day/1.jpg'
];
const nightWallpapers = [
  'img/night/1.jpg'
];

// Получение и установка индекса картинки
function getWallpaperIndex(theme) {
  return parseInt(localStorage.getItem(`wallpaperIndex-${theme}`)) || 0;
}
function setWallpaperIndex(theme, index) {
  localStorage.setItem(`wallpaperIndex-${theme}`, index);
}

// Установка фоновой картинки по теме
function setWallpaperForTheme(theme) {
  let wallpapers, index;
  if (theme === 'dark') {
    wallpapers = nightWallpapers;
    index = getWallpaperIndex('night');
    document.body.style.setProperty('--wallpaper', `url('${wallpapers[index]}')`);
    index = (index + 1) % wallpapers.length;
    setWallpaperIndex('night', index);
  } else {
    wallpapers = dayWallpapers;
    index = getWallpaperIndex('day');
    document.body.style.setProperty('--wallpaper', `url('${wallpapers[index]}')`);
    index = (index + 1) % wallpapers.length;
    setWallpaperIndex('day', index);
  }
}

// Модифицируем функцию toggleTheme для смены фона
const originalToggleThemeWallpaper = toggleTheme;
toggleTheme = function() {
  originalToggleThemeWallpaper();
  const isDark = document.body.classList.contains('dark-theme');
  setWallpaperForTheme(isDark ? 'dark' : 'light');
};

// Устанавливаем фон при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  const isDark = document.body.classList.contains('dark-theme');
  setWallpaperForTheme(isDark ? 'dark' : 'light');
});

// --- Прелоадер Hacknet/Bitburner style ---
(function() {
  // Создаем overlay для прелоадера
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

  // Текстовые строки для консоли
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
  const textEl = document.getElementById('preloader-text');
  const progressEl = document.getElementById('preloader-progress');

  function nextLine() {
    if (currentLine < lines.length) {
      const line = lines[currentLine];
      const span = document.createElement('div');
      span.textContent = '> ' + line;
      textEl.appendChild(span);
      progress = Math.round(((currentLine + 1) / total) * 100);
      progressEl.style.width = progress + '%';
      currentLine++;
      // --- скроллим вниз если не влезает ---
      textEl.scrollTop = textEl.scrollHeight;
      setTimeout(nextLine, 250 + Math.random() * 250);
    } else {
      setTimeout(() => {
        preloader.classList.add('preloader-hide');
        setTimeout(() => preloader.remove(), 700);
        // Показываем основной интерфейс (если был скрыт)
        document.body.classList.remove('preloader-active');
      }, 600);
    }
  }

  // Скрываем основной интерфейс до завершения прелоадера
  document.body.classList.add('preloader-active');
  setTimeout(nextLine, 400);
})();

// --- Окна для игр (заглушки) ---
function renderMinesweeperContent() {
  return `
    <div class="minesweeper-gnome" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
      <div class="minesweeper-header" style="width:100%;max-width:fit-content;">
        <span>Сапер</span>
        <select id="minesweeper-diff" class="btn" style="margin-left:10px;">
          <option value="9x9x10">Лёгко</option>
          <option value="16x16x40">Средне</option>
          <option value="30x16x99">Сложно</option>
        </select>
        <span id="minesweeper-timer" style="margin-left:auto;font-family:monospace;background:#111;color:#0f0;padding:2px 10px;border-radius:6px;">00:00</span>
        <button class="btn" id="minesweeper-restart">⟳</button>
      </div>
      <div id="minesweeper-board" style="margin:0 auto;"></div>
      <div class="minesweeper-footer" style="width:100%;text-align:center;">
        <span id="minesweeper-status"></span>
      </div>
    </div>
    <style>
      .minesweeper-gnome { font-family: 'Cantarell', 'Ubuntu', sans-serif; }
      .minesweeper-header { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
      #minesweeper-board { display:grid; gap:2px; background:var(--tab-bg); border-radius:8px; padding:6px; }
      .minesweeper-cell { width:32px; height:32px; background:var(--window-bg); border:1px solid var(--window-border); border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:16px; cursor:pointer; user-select:none; transition:background 0.2s; position:relative; }
      .minesweeper-cell.open { background:var(--tab-active-bg); cursor:default; }
      .minesweeper-cell.mine { color:#e01b24; }
      .minesweeper-cell.flag::after { content:'🚩'; position:absolute; left:0; right:0; top:0; bottom:0; display:flex; align-items:center; justify-content:center; font-size:18px; }
      .minesweeper-cell.num1 { color:#3584e4; }
      .minesweeper-cell.num2 { color:#33d17a; }
      .minesweeper-cell.num3 { color:#f6d32d; }
      .minesweeper-cell.num4 { color:#ff7800; }
      .minesweeper-footer { margin-top:10px; min-height:24px; }
    </style>
  `;
}
function initMinesweeper() {
  let size = 9, mines = 10, width = 9, height = 9;
  let board = [], opened = [], flagged = [], gameOver = false, cellsLeft = width*height-mines, timer = 0, timerInt = null, started = false;
  const boardDiv = document.getElementById('minesweeper-board');
  const status = document.getElementById('minesweeper-status');
  const timerSpan = document.getElementById('minesweeper-timer');
  const diffSel = document.getElementById('minesweeper-diff');
  function setGrid() {
    boardDiv.style.gridTemplateColumns = `repeat(${width},32px)`;
  }
  function placeMines() {
    board = Array(width*height).fill(0);
    let m = 0;
    while (m < mines) {
      let idx = Math.floor(Math.random()*width*height);
      if (board[idx] === 'M') continue;
      board[idx] = 'M'; m++;
    }
    for (let i=0;i<width*height;i++) {
      if (board[i] === 'M') continue;
      let n = 0;
      for (let dx=-1;dx<=1;dx++) for (let dy=-1;dy<=1;dy++) {
        if (dx===0&&dy===0) continue;
        let x=i%width+dx, y=Math.floor(i/width)+dy;
        if (x>=0&&x<width&&y>=0&&y<height&&board[y*width+x]==='M') n++;
      }
      board[i]=n;
    }
  }
  function render() {
    boardDiv.innerHTML = '';
    setGrid();
    for (let i=0;i<width*height;i++) {
      const cell = document.createElement('div');
      cell.className = 'minesweeper-cell';
      if (opened[i]) {
        cell.classList.add('open');
        if (board[i]==='M') cell.classList.add('mine'), cell.textContent='💣';
        else if (board[i]>0) cell.classList.add('num'+board[i]), cell.textContent=board[i];
      } else if (flagged[i]) {
        cell.classList.add('flag');
      }
      cell.onmousedown = (e) => {
        e.preventDefault();
        if (gameOver || opened[i]) return;
        if (e.button === 2) { // ПКМ
          flagged[i] = !flagged[i];
          render();
          return;
        }
        if (!started) startTimer();
        openCell(i);
      };
      cell.oncontextmenu = e => e.preventDefault();
      boardDiv.appendChild(cell);
    }
  }
  function openCell(i) {
    if (opened[i] || flagged[i]) return;
    opened[i]=1;
    if (board[i]==='M') {
      gameOver = true;
      stopTimer();
      status.textContent = '💥 Вы проиграли!';
      for (let j=0;j<width*height;j++) if (board[j]==='M') opened[j]=1;
      render();
      return;
    }
    cellsLeft--;
    if (board[i]===0) {
      let x=i%width, y=Math.floor(i/width);
      for (let dx=-1;dx<=1;dx++) for (let dy=-1;dy<=1;dy++) {
        let nx=x+dx, ny=y+dy, ni=ny*width+nx;
        if (nx>=0&&nx<width&&ny>=0&&ny<height&&!opened[ni]) openCell(ni);
      }
    }
    render();
    if (cellsLeft===0) {
      status.textContent = '🎉 Победа!';
      stopTimer();
      gameOver = true;
    }
  }
  function restart() {
    let val = diffSel.value.split('x');
    width = +val[0]; height = +val[1]; mines = +val[2];
    opened = Array(width*height).fill(0);
    flagged = Array(width*height).fill(0);
    gameOver = false;
    cellsLeft = width*height-mines;
    status.textContent = '';
    timer = 0; started = false;
    stopTimer(); updateTimer();
    placeMines();
    render();
  }
  function updateTimer() {
    timerSpan.textContent = (timer<6000?`${String(Math.floor(timer/60)).padStart(2,'0')}:${String(timer%60).padStart(2,'0')}`:'99:59');
  }
  function startTimer() {
    if (timerInt) return;
    started = true;
    timerInt = setInterval(() => {
      timer++; updateTimer();
      if (timer>=5999) stopTimer();
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timerInt); timerInt = null;
  }
  document.getElementById('minesweeper-restart').onclick = restart;
  diffSel.onchange = restart;
  restart();
}

// --- Реализация игры 2048 ---
function render2048Content() {
  return `
    <div class="game2048-gnome" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
      <div class="game2048-header" style="width:100%;max-width:fit-content;">
        <span>2048</span>
        <select id="game2048-size" class="btn" style="margin-left:10px;">
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
        </select>
        <button class="btn" id="game2048-restart">⟳</button>
      </div>
      <div id="game2048-board" style="margin:0 auto;"></div>
      <div class="game2048-footer" style="width:100%;text-align:center;">
        <span>Счёт: <span id="game2048-score">0</span></span>
      </div>
      <div style="margin-top:8px;font-size:13px;opacity:0.7;">Управление: стрелки или кнопки</div>
      <div class="game2048-controls" style="justify-content:center;">
        <button class="btn" data-move="up">↑</button>
        <button class="btn" data-move="left">←</button>
        <button class="btn" data-move="down">↓</button>
        <button class="btn" data-move="right">→</button>
      </div>
    </div>
    <style>
      .game2048-gnome { font-family: 'Cantarell', 'Ubuntu', sans-serif; }
      .game2048-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
      #game2048-board { display:grid; gap:6px; background:var(--tab-bg); border-radius:8px; padding:10px; border:2px solid #222; }
      .game2048-cell { width:56px; height:56px; background:var(--window-bg); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:bold; color:#333; transition:background 0.2s, transform 0.2s; border:1.5px solid #222; box-shadow:0 1px 4px #0002; }
      .game2048-cell[data-v="2"] { background:#e0f7fa; }
      .game2048-cell[data-v="4"] { background:#b2ebf2; }
      .game2048-cell[data-v="8"] { background:#80deea; color:#fff; }
      .game2048-cell[data-v="16"] { background:#4dd0e1; color:#fff; }
      .game2048-cell[data-v="32"] { background:#26c6da; color:#fff; }
      .game2048-cell[data-v="64"] { background:#00bcd4; color:#fff; }
      .game2048-cell[data-v="128"] { background:#0097a7; color:#fff; }
      .game2048-cell[data-v="256"] { background:#00838f; color:#fff; }
      .game2048-cell[data-v="512"] { background:#006064; color:#fff; }
      .game2048-cell[data-v="1024"] { background:#004d40; color:#fff; }
      .game2048-cell[data-v="2048"] { background:#388e3c; color:#fff; }
      .game2048-cell.new { animation: popin2048 0.18s; }
      .game2048-cell.merged { animation: merge2048 0.18s; }
      .game2048-footer { margin-top:10px; min-height:24px; }
      .game2048-controls { margin-top:10px; display:flex; gap:8px; justify-content:center; }
      @keyframes popin2048 { 0%{transform:scale(0.5);} 100%{transform:scale(1);} }
      @keyframes merge2048 { 0%{transform:scale(1.2);} 100%{transform:scale(1);} }
      .dark-theme #game2048-board, .dark-theme .game2048-cell { border-color:#444 !important; background:#222 !important; color:#fff !important; }
    </style>
  `;
}
function init2048() {
  let size = 4;
  let board = [], score = 0, won = false, anim = [];
  const boardDiv = document.getElementById('game2048-board');
  const scoreSpan = document.getElementById('game2048-score');
  const sizeSel = document.getElementById('game2048-size');
  function setGrid() {
    boardDiv.style.gridTemplateColumns = `repeat(${size},56px)`;
  }
  function addTile() {
    let empty = [];
    for (let i=0;i<size*size;i++) if (!board[i]) empty.push(i);
    if (empty.length) {
      let idx = empty[Math.floor(Math.random()*empty.length)];
      board[idx] = Math.random()<0.9?2:4;
      anim[idx] = 'new';
    }
  }
  function render() {
    boardDiv.innerHTML = '';
    setGrid();
    for (let i=0;i<size*size;i++) {
      const cell = document.createElement('div');
      cell.className = 'game2048-cell';
      if (board[i]) {
        cell.textContent = board[i];
        cell.setAttribute('data-v', board[i]);
        if (anim[i]) cell.classList.add(anim[i]);
      }
      boardDiv.appendChild(cell);
    }
    scoreSpan.textContent = score;
    anim = [];
  }
  function move(dir) {
    let moved = false;
    let b = board.slice(), a = [];
    function idx(x,y){return y*size+x;}
    for (let n=0;n<size;n++) {
      let line = [];
      for (let m=0;m<size;m++) {
        let i = dir==='left'||dir==='right'?idx(dir==='left'?m:size-1-m,n):idx(n,dir==='up'?m:size-1-m);
        if (b[i]) line.push(b[i]);
      }
      for (let k=0;k<line.length-1;k++) {
        if (line[k]===line[k+1]) { line[k]*=2; score+=line[k]; line[k+1]=0; a[dir==='left'||dir==='right'?idx(dir==='left'?k:size-1-k,n):idx(n,dir==='up'?k:size-1-k)]='merged'; }
      }
      line = line.filter(x=>x);
      while (line.length<size) line.push(0);
      for (let m=0;m<size;m++) {
        let i = dir==='left'||dir==='right'?idx(dir==='left'?m:size-1-m,n):idx(n,dir==='up'?m:size-1-m);
        if (b[i]!==line[m]) { b[i]=line[m]; moved=true; }
      }
    }
    if (moved) {
      board = b; anim = a;
      addTile();
      render();
      if (board.includes(2048) && !won) { won=true; setTimeout(()=>alert('🎉 Победа!'),100);}
      if (!canMove()) setTimeout(()=>alert('Игра окончена!'),100);
    }
  }
  function canMove() {
    for (let i=0;i<size*size;i++) if (!board[i]) return true;
    for (let y=0;y<size;y++) for (let x=0;x<size;x++) {
      let v=board[y*size+x];
      if (x<size-1&&v===board[y*size+x+1]) return true;
      if (y<size-1&&v===board[(y+1)*size+x]) return true;
    }
    return false;
  }
  function restart() {
    size = +sizeSel.value;
    board = Array(size*size).fill(0); score=0; won=false; anim=[];
    addTile(); addTile();
    render();
  }
  document.getElementById('game2048-restart').onclick = restart;
  sizeSel.onchange = restart;
  document.querySelectorAll('.game2048-controls .btn').forEach(btn=>{
    btn.onclick = ()=>move(btn.dataset.move);
  });
  window.addEventListener('keydown', function handler(e) {
    if (!document.getElementById('game2048-board')) return window.removeEventListener('keydown', handler);
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
      move({ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'}[e.key]);
      e.preventDefault();
    }
  });
  restart();
}

// --- Реализация игры Крестики-нолики ---
function renderTicTacToeContent() {
  return `
    <div class="tictactoe-gnome" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
      <div class="tictactoe-header" style="width:100%;max-width:fit-content;">
        <span>Крестики-нолики</span>
        <button class="btn" id="tictactoe-restart">⟳</button>
      </div>
      <div id="tictactoe-board" style="margin:0 auto;"></div>
      <div class="tictactoe-footer" style="width:100%;text-align:center;">
        <span id="tictactoe-status"></span>
      </div>
    </div>
    <style>
      .tictactoe-gnome { font-family: 'Cantarell', 'Ubuntu', sans-serif; }
      .tictactoe-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
      #tictactoe-board { display:grid; grid-template-columns:repeat(3,64px); gap:6px; background:var(--tab-bg); border-radius:8px; padding:10px; border:2px solid #222; }
      .tictactoe-cell { width:64px; height:64px; background:var(--window-bg); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; color:#3584e4; cursor:pointer; transition:background 0.2s; border:1.5px solid #222; }
      .tictactoe-cell.x { color:#3584e4; }
      .tictactoe-cell.o { color:#e01b24; }
      .tictactoe-cell.win { background:#33d17a; color:#fff; }
      .tictactoe-footer { margin-top:10px; min-height:24px; }
      .dark-theme #tictactoe-board, .dark-theme .tictactoe-cell { border-color:#444 !important; background:#222 !important; color:#fff !important; }
    </style>
  `;
}
function initTicTacToe() {
  let board = Array(9).fill(''), turn = 'X', gameOver = false;
  const boardDiv = document.getElementById('tictactoe-board');
  const status = document.getElementById('tictactoe-status');
  function render() {
    boardDiv.innerHTML = '';
    for (let i=0;i<9;i++) {
      const cell = document.createElement('div');
      cell.className = 'tictactoe-cell';
      if (board[i]) cell.classList.add(board[i].toLowerCase()), cell.textContent=board[i];
      cell.onclick = () => {
        if (gameOver || board[i]) return;
        board[i]=turn;
        render();
        if (checkWin(turn)) {
          status.textContent = (turn==='X'?'Вы':'Компьютер')+' победил!';
          gameOver = true;
          highlightWin(checkWin(turn));
          return;
        }
        if (board.every(x=>x)) { status.textContent='Ничья!'; gameOver=true; return; }
        turn = turn==='X'?'O':'X';
        if (turn==='O') setTimeout(aiMove, 400);
      };
      boardDiv.appendChild(cell);
    }
    status.textContent = gameOver ? status.textContent : (turn==='X'?'Ваш ход':'Ход компьютера');
  }
  function checkWin(t) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let w of wins) if (w.every(i=>board[i]===t)) return w;
    return null;
  }
  function highlightWin(w) {
    if (!w) return;
    const cells = boardDiv.querySelectorAll('.tictactoe-cell');
    w.forEach(i=>cells[i].classList.add('win'));
  }
  function aiMove() {
    let empty = board.map((v,i)=>v?'':i).filter(x=>x!==''), idx;
    if (empty.length) {
      idx = empty[Math.floor(Math.random()*empty.length)];
      board[idx]='O';
      render();
      if (checkWin('O')) {
        status.textContent = 'Компьютер победил!';
        gameOver = true;
        highlightWin(checkWin('O'));
      }
      if (board.every(x=>x) && !gameOver) { status.textContent='Ничья!'; gameOver=true; }
      turn = 'X';
    }
  }
  function restart() {
    board = Array(9).fill(''); turn='X'; gameOver=false; status.textContent=''; render();
  }
  document.getElementById('tictactoe-restart').onclick = restart;
  restart();
}

// ...existing code...
