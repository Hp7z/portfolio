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
      title: "Обо мне",
      icon: "icons/about.png",
      action: "about"
    },
    {
      title: "Портфолио",
      icon: "icons/portfolio.png",
      action: "portfolio"
    },
    {
      title: "Услуги",
      icon: "icons/services.png",
      action: "services"
    },
    {
      title: "Контакты",
      icon: "icons/contacts.png",
      action: "contacts"
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem('darkTheme');
  if (savedTheme === 'false') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.add('dark-theme');
  }

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
  setInterval(updateClock, 1000);
  
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
    const iconPath = `icons/${type}.png`;
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
  
  startMenuItems.main.forEach(item => {
    menuHTML += `
      <div class="menu-item" data-window="${item.action}">
        <img src="${item.icon}" alt="${item.title}">
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

function openWindow(type) {
  // Если окно уже открыто и свернуто - развернуть
  if (trayWindows[type]) {
    if (trayWindows[type].minimized) {
      trayWindows[type].restore();
    }
    trayWindows[type].focus();
    return;
  }

  const isDarkTheme = document.body.classList.contains('dark-theme');
  let title, content;

  switch(type) {
    case 'about':
      title = 'Обо мне';
      content = renderAboutContent();
      break;
    case 'portfolio':
      title = 'Портфолио';
      content = renderPortfolioContent();
      break;
    case 'services':
      title = 'Услуги';
      content = renderServicesContent();
      break;
    case 'contacts':
      title = 'Контакты';
      content = renderContactsContent();
      break;
    default:
      content = '<p>Содержимое окна</p>';
  }
  
  const win = new WinBox({
    title: title,
    class: ['adwaita-theme'],
    width: 800,
    height: 600,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100) + 50,
    top: 36, // Отступ сверху равен высоте панели задач
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    shadow: true,
    max: false, // Отключаем автоматическое разворачивание окна на весь экран
    html: content,
    header: 36, // Устанавливаем высоту заголовка
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
      updateTaskbar();
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

  trayWindows[type] = win;
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
        <li>Интернет-магазины от 50 000₽</li>
        <li>Корпоративные сайты от 80 000₽</li>
      </ul>
      <p>Все сайты адаптивны, оптимизированы для поисковых систем и имеют удобную панель управления.</p>
    </div>
    
    <div class="tab-content" id="design-tab">
      <h2>Дизайн</h2>
      <p>Создаю уникальный дизайн для вашего бренда:</p>
      <ul>
        <li>UI/UX дизайн</li>
        <li>Логотипы и фирменный стиль</li>
        <li>Баннеры и рекламные материалы</li>
      </ul>
    </div>
    
    <div class="tab-content" id="seo-tab">
      <h2>SEO-продвижение</h2>
      <p>Помогу вашему сайту занять высокие позиции в поисковых системах:</p>
      <ul>
        <li>Аудит сайта</li>
        <li>Оптимизация контента</li>
        <li>Техническое SEO</li>
        <li>Анализ конкурентов</li>
      </ul>
    </div>
  `;
}

function renderContactsContent() {
  return `
    <div class="contacts-container">
      <h2>Мои контакты</h2>
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
      
      <h3>Форма обратной связи</h3>
      <form class="contact-form">
        <div class="form-group">
          <label for="name">Ваше имя</label>
          <input type="text" id="name" placeholder="Введите ваше имя">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Введите ваш email">
        </div>
        <div class="form-group">
          <label for="message">Сообщение</label>
          <textarea id="message" rows="5" placeholder="Введите ваше сообщение"></textarea>
        </div>
        <button type="button" class="btn" onclick="submitContactForm()">Отправить</button>
      </form>
    </div>
  `;
}

function renderProjects(projects) {
  return projects.map(project => `
    <div class="project-container">
      <div class="project-info">
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
          <div class="model-title color-text">${model.title}</div>
          <div class="model-preview static-model-preview">
            <img src="${model.preview}" alt="${model.title}">
            <!-- Кнопка Play поверх превью -->
            <div class="model-play-btn"></div>
          </div>
          <p class="model-description color-text">${model.description || 'Описание модели отсутствует'}</p>
          <div class="model-footer">
            <span class="model-credits color-text">${model.credits}</span>
            <span class="model-date color-text">${model.date || ''}</span>
          </div>
        </div>
      `;
    } else {
      // Для статичных моделей используем изображение с увеличенной высотой
      return `
        <div class="project-container model-container color-block" onclick="openModelGallery('${model.id}')">
          <div class="model-title color-text">${model.title}</div>
          <div class="model-preview static-model-preview">
            <img src="${model.preview}" alt="${model.title}">
          </div>
          <p class="model-description color-text">${model.description || 'Описание модели отсутствует'}</p>
          <div class="model-footer">
            <span class="model-credits color-text">${model.credits}</span>
            <span class="model-date color-text">${model.date || ''}</span>
          </div>
        </div>
      `;
    }
  }).join('');
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

  // Пробуем открыть сайт в iframe
  const win = new WinBox({
    title: projectInfo ? projectInfo.title : projectTitle,
    class: ['adwaita-theme'],
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
    index: 9999, // Устанавливаем высокий z-index, чтобы окно было поверх других
    html: `
      <div class="window-body">
        <div id="iframe-container-${Date.now()}" class="iframe-container">
          <iframe src="${url}" frameborder="0" width="100%" height="100%" 
            onload="this.parentNode.classList.add('loaded')" 
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
    onclose: () => false
  });
  
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
        }, 300);
      }
      
      // Активируем текущую главную вкладку
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const newContent = document.getElementById(`${tabId}-tab`);
      
      // Анимируем появление нового контента
      if (newContent) {
        newContent.classList.add(`slide-${direction}`);
        setTimeout(() => {
          newContent.classList.add('active');
          newContent.classList.remove(`slide-${direction}`);
        }, 10);
      }
    });
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
        }, 300);
      }
      
      // Активируем текущую подвкладку
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const newContent = document.getElementById(`${tabId}-tab`);
      
      // Анимируем появление нового контента
      if (newContent) {
        newContent.classList.add(`slide-${direction}`);
        setTimeout(() => {
          newContent.classList.add('active');
          newContent.classList.remove(`slide-${direction}`);
        }, 10);
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
        }, 300);
      }
      
      // Активируем текущую подвкладку
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      const newContent = document.getElementById(`${tabId}-tab`);
      
      // Анимируем появление нового контента
      if (newContent) {
        newContent.classList.add(`slide-${direction}`);
        setTimeout(() => {
          newContent.classList.add('active');
          newContent.classList.remove(`slide-${direction}`);
        }, 10);
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
  
  // Добавляем эффект волны при наведении на проекты
  container.querySelectorAll('.project-container').forEach(project => {
    project.addEventListener('mouseenter', function() {
      this.classList.add('wave-effect');
    });
    
    project.addEventListener('mouseleave', function() {
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
    
    // Определяем название окна
    let title;
    if (type === 'about') title = 'Обо мне';
    else if (type === 'portfolio') title = 'Портфолио';
    else if (type === 'portfolio-landing') title = 'Лендинги';
    else if (type === 'portfolio-shop') title = 'Интернет-магазины';
    else if (type === 'portfolio-corporate') title = 'Корпоративные сайты';
    else if (type === 'services') title = 'Услуги';
    else if (type === 'contacts') title = 'Контакты';
    else title = win.title;
    
    if (win.minimized) {
      item.style.opacity = '0.7';
    }
    
    // Определяем иконку
    let icon = type;
    if (type.startsWith('portfolio-')) icon = 'portfolio';
    if (type.startsWith('service-')) icon = 'services';
    
    item.innerHTML = `
      <img src="icons/${icon}.png">
      <span class="taskbar-item-title">${title}</span>
    `;
    
    item.onclick = () => {
      if (win.minimized) {
        win.restore();
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
        console.log('OrbitControls загружен');
        
        // Вызываем callback после загрузки всех библиотек
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
  // Создаем элемент для параллакса
  const parallaxBg = document.createElement('div');
  parallaxBg.className = 'parallax-bg';
  parallaxBg.style.backgroundImage = 'url("img/wallpaper.jpg")';
  document.body.insertBefore(parallaxBg, document.body.firstChild);
  
  // Добавляем обработчик движения мыши
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = mouseX * 20 - 10; // -10px to 10px
    const moveY = mouseY * 20 - 10; // -10px to 10px
    
    parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
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