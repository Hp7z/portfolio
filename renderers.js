window.renderAboutContent = function() {
  return `
    <div class="tabs">
      <div class="tab active" data-tab="about">Обо мне</div>
      <div class="tab" data-tab="skills">Навыки</div>
      <div class="tab" data-tab="experience">Опыт</div>
    </div>
    
    <div class="tab-content active" id="about-tab">
      <h2>Информация обо мне</h2>
      <p>
        Я — веб-разработчик, дизайнер и 3D-художник с глубоким техническим и креативным опытом. 
        Моя специализация — создание современных, функциональных и эстетичных цифровых продуктов: от лендингов и интернет-магазинов до интерактивных 3D-сцен и игровых прототипов.
      </p>
      <p>
        В своей работе я совмещаю инженерный подход, внимание к деталям и любовь к визуальному стилю. 
        Для каждого проекта подбираю оптимальный стек технологий, чтобы обеспечить высокую производительность, безопасность и удобство для пользователя.
      </p>
      <p>
        Я активно развиваюсь в области геймдева и 3D-моделирования, создаю уникальные сцены и игровые механики, а также интегрирую 3D-контент в веб-приложения. 
        Открыт к новым задачам, всегда стремлюсь к совершенству и ценю честный диалог с заказчиком.
      </p>
      <p>
        Если вам нужен сайт, 3D-визуализация или игровой проект — буду рад сотрудничеству!
      </p>
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
        <li>3D моделирование (Blender, ArmorPaint)</li>
        <li>Разработка игр (Unity, Unreal Engine, геймдизайн)</li>
      </ul>
    </div>
    
    <div class="tab-content" id="experience-tab">
      <h2>Опыт работы</h2>
      <div class="project-container">
        <div class="project-info">
          <div class="project-title">Фрилансер</div>
          <p>2018 — настоящее время</p>
          <p>Веб-разработка, дизайн, 3D моделирование, геймдев.<br>
          Реализация проектов любой сложности: от лендингов и интернет-магазинов до интерактивных 3D-сцен и игровых прототипов. Креативный подход, современный стек, внимание к деталям.</p>
        </div>
      </div>
      <div class="project-container">
        <div class="project-info">
          <div class="project-title">Leria Agency</div>
          <p>2024 — настоящее время</p>
          <p>Веб-разработка, администрирование.</p>
        </div>
      </div>
      <div class="project-container">
        <div class="project-info">
          <div class="project-title">Лаборатория Касперского</div>
          <p>2020 — 2021</p>
          <p>Malware-аналитик. Анализ вредоносного ПО, исследование угроз, участие в разработке средств защиты.</p>
        </div>
      </div>
      <div class="project-container">
        <div class="project-info">
          <div class="project-title">Веб-разработчик, компания XYZ</div>
          <p>2019 — 2020</p>
          <p>Разработка и поддержка веб-сайтов для клиентов из различных отраслей.</p>
        </div>
      </div>
    </div>
  `;
};

window.renderPortfolioContent = function() {
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
        ${window.renderProjects(window.projects.websites.landing)}
      </div>
      
      <div class="tab-content" id="shop-tab">
        ${window.renderProjects(window.projects.websites.shop)}
      </div>
      
      <div class="tab-content" id="corporate-tab">
        ${window.renderProjects(window.projects.websites.corporate)}
      </div>
    </div>
    
    <div class="tab-content" id="models3d-tab">
      <div class="tabs sub-tabs">
        <div class="tab active" data-tab="interactive">Интерактивные</div>
        <div class="tab" data-tab="static">Статичные</div>
      </div>
      
      <div class="tab-content active" id="interactive-tab">
        ${window.render3DModels(window.projects.models3d.interactive)}
      </div>
      
      <div class="tab-content" id="static-tab">
        ${renderStaticModelCollections()}
      </div>
    </div>
  `;
};

window.renderServicesContent = function() {
  return `
    <div class="tabs">
      <div class="tab active" data-tab="web">Разработка сайтов</div>
      <div class="tab" data-tab="design">Дизайн</div>
      <div class="tab" data-tab="seo">SEO-продвижение</div>
      <div class="tab" data-tab="model3d">3D моделирование</div>
      <div class="tab" data-tab="gamedev">Разработка игр</div>
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
        <li>UI/UX дизайн от 35 000₽</li>
      </ul>
      <p class="service-description">Разработка интерфейсов с фокусом на удобство использования. Включает прототипирование, создание макетов всех экранов, анимации и интерактивные элементы.</p>
      
      <ul>
        <li>Логотипы и фирменный стиль от 35 000₽</li>
      </ul>
      <p class="service-description">Создание уникального логотипа и фирменного стиля компании. Включает несколько концепций на выбор, финальные файлы в различных форматах и брендбук.</p>
      
      <ul>
        <li>Баннеры и рекламные материалы от 35 000₽</li>
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

    <div class="tab-content" id="model3d-tab">
      <h2>3D моделирование</h2>
      <p>Создаю 3D-модели и сцены для визуализации, презентаций и веба:</p>
      <ul>
        <li>3D-моделирование (Blender, ArmorPaint)</li>
        <li>Визуализация и рендеринг сцен</li>
        <li>Интерактивные 3D-приложения (Three.js, WebGL)</li>
        <li>Интеграция 3D-контента в сайты и приложения</li>
        <li>Анимация, оптимизация для WebGL</li>
      </ul>
      <p>В портфолио представлены примеры 3D-моделей, реализованных с нуля.</p>
    </div>

    <div class="tab-content" id="gamedev-tab">
      <h2>Разработка игр</h2>
      <p>Разрабатываю игровые прототипы и приложения для Web и ПК:</p>
      <ul>
        <li>Unity (C#)</li>
        <li>Unreal Engine (Blueprints, C++)</li>
        <li>Three.js, WebGL</li>
        <li>Геймдизайн, создание игровых механик, логики и UI</li>
        <li>Интеграция 3D-моделей и анимаций</li>
        <li>Оптимизация и экспорт под разные платформы</li>
      </ul>
      <p>Возможна разработка интерактивных презентаций, мини-игр и прототипов под заказ.</p>
    </div>
  `;
};

window.renderContactsContent = function() {
  return `
    <div class="contacts-container">
      <h2>Мои контакты</h2>
      <h3>Максим Лузан</h3>
      <p><strong>Email:</strong> luzan.maksim@mail.ru</p>
      <p><strong>Телефон:</strong> +7 999 475-95-92</p>
      
      <div class="social-links-container">
        <h3>Социальные сети</h3>
        <div class="social-links">
          <a href="https://vk.com/hp7zk" target="_blank" class="social-link vk-link" title="ВКонтакте">
            <span class="social-link-icon">
              <img src="icons/vk-dark.svg" class="dark-theme-icon" alt="VK" style="width:35px;height:35px;">
              <img src="icons/vk-light.svg" class="light-theme-icon" alt="VK" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">ВКонтакте</span>
          </a>
          <a href="https://t.me/looptoquit" target="_blank" class="social-link telegram-link" title="Telegram">
            <span class="social-link-icon">
              <img src="icons/telegram-dark.svg" class="light-theme-icon" alt="Telegram" style="width:35px;height:35px;">
              <img src="icons/telegram-light.svg" class="dark-theme-icon" alt="Telegram" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">Telegram</span>
          </a>
          <a href="https://github.com/hp7z" target="_blank" class="social-link github-link" title="GitHub">
            <span class="social-link-icon">
              <img src="icons/github-dark.svg" class="dark-theme-icon" alt="GitHub" style="width:35px;height:35px;">
              <img src="icons/github-light.svg" class="light-theme-icon" alt="GitHub" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  `;
};

window.renderProjects = function(projects) {
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
};

window.render3DModels = function(models) {
  return models.map(model => {
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
            <div class="model-play-btn"></div>
          </div>
        </div>
      `;
    } else {
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
};

// renderCalculatorContent должен быть в этом файле! Не удаляйте его.
// Оставьте функцию как есть, чтобы калькулятор корректно отображался и работал.
// Вот правильный блок:
window.renderCalculatorContent = function() {
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
        <input type="checkbox" id="design" class="service-checkbox" data-price="35000" data-type="additional">
        <label for="design">Дизайн (35 000₽)</label>
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
        <p class="calculator-note-inline" style="font-size:12px;opacity:0.7;margin-top:4px;">
          * Окончательная цена на дизайн может варьироваться в зависимости от индивидуальных запросов
        </p>
      </div>
      <div class="calculator-total">
        <h3>Итоговая стоимость: <span id="total-price">0</span> ₽</h3>
      </div>
      <button class="btn" id="order-button">Заказать</button>
    </div>
  `;
};

// --- Галереи статичных моделей по папкам ---
function renderStaticModelCollections() {
  const collections = [
    {
      key: 'favourite',
      title: 'My Favourite',
      folder: 'My_favourite', 
      description: 'Атмосферные и любимые сцены с особым настроением.',
      images: [
        { file: 'amlet.jpg', title: 'Завтрак', description: 'Уютная сцена с французским завтраком в неоновом освещении.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-01-10' },
        { file: 'bottle.jpg', title: 'Бутылочка', description: 'Стеклянная бутылка с жидкостью и подсветкой.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-02-14' },
        { file: 'cake-with-cat.png', title: 'Кото-торт', description: 'Милый торт в виде спящего котика.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-02-14' },
        { file: 'Mango.png', title: 'Манго', description: 'Реалистичное манго со свежими каплями воды.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-02-14' }
      ]
    },
    {
      key: 'start',
      title: 'Start Modeling',
      folder: 'Start_modeling',
      description: 'Первые шаги в мире 3D моделирования.',
      images: [
        { file: 'beach_cave.jpg', title: 'Пляжная пещера', description: 'Живописный вид на пещеру у моря.', tools: ['Blender'], credits: 'Hp7z', date: '2022-10-01' },
        { file: 'bird.jpg', title: 'Птица', description: 'Модель птицы.', tools: ['Blender'], credits: 'Hp7z', date: '2022-10-15' },
        { file: 'cattendo.jpg', title: 'Кити-приставка', description: 'Игровая приставка в стиле кошки.', tools: ['Blender'], credits: 'Hp7z', date: '2022-10-15' },
        { file: 'cofee brake.jpg', title: 'Кофе-брейк', description: 'Сцена с кофе.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-01' },
        { file: 'coffee murshmallow.jpg', title: 'Кофе с маршмеллоу', description: 'Уютная сцена с горячим напитком.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-05' },
        { file: 'first cake.jpg', title: 'Первый торт', description: 'Первая модель торта.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-10' },
        { file: 'lesson 1.jpg', title: 'Урок 1', description: 'Результат первого урока.', tools: ['Blender'], credits: 'Hp7z', date: '2022-09-01' },
        { file: 'lesson 2.jpg', title: 'Урок 2', description: 'Результат второго урока.', tools: ['Blender'], credits: 'Hp7z', date: '2022-09-15' },
        { file: 'soke.jpg', title: 'Сок', description: 'Модель стакана с соком.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-20' },
        { file: 'toast cat.jpg', title: 'Кот-тост', description: 'Милый кот в виде тоста.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-01' },
        { file: 'toast.jpg', title: 'Тост', description: 'Модель тоста.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-05' },
        { file: 'tv day.jpg', title: 'Телевизор днём', description: 'Сцена с телевизором в дневное время.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-10' },
        { file: 'tv night.jpg', title: 'Телевизор ночью', description: 'Атмосферная сцена с телевизором ночью.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-15' }
      ]
    },
    {
      key: 'middle',
      title: 'Middle Modeling', 
      folder: 'Middle_modeling',
      description: 'Более сложные работы со вниманием к деталям.',
      images: [
        { file: 'carty.jpg', title: 'Тележка', description: 'Модель тележки.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-05-20' },
        { file: 'cave fantasy.jpg', title: 'Фантастическая пещера', description: 'Фэнтезийная сцена в пещере.', tools: ['Blender'], credits: 'Hp7z', date: '2023-06-01' },
        { file: 'compic.jpg', title: 'Компьютер', description: 'Модель компьютера.', tools: ['Blender'], credits: 'Hp7z', date: '2023-06-15' },
        { file: 'comso ship.jpg', title: 'Космический корабль', description: 'Модель космического корабля.', tools: ['Blender'], credits: 'Hp7z', date: '2023-07-01' },
        { file: 'lesson 3.jpg', title: 'Урок 3', description: 'Результат третьего урока.', tools: ['Blender'], credits: 'Hp7z', date: '2023-07-15' },
        { file: 'lesson 4.jpg', title: 'Урок 4', description: 'Результат четвёртого урока.', tools: ['Blender'], credits: 'Hp7z', date: '2023-08-01' },
        { file: 'mountain.jpg', title: 'Горы', description: 'Горный пейзаж.', tools: ['Blender'], credits: 'Hp7z', date: '2023-08-15' },
        { file: 'planet.jpg', title: 'Планета', description: 'Модель планеты.', tools: ['Blender'], credits: 'Hp7z', date: '2023-09-01' }
      ]
    }
  ];

  if (!window._staticGalleryPreviewIndexes) window._staticGalleryPreviewIndexes = {};
  const previewIndexes = window._staticGalleryPreviewIndexes;
  if (!window._staticGalleryPreviewTimers) window._staticGalleryPreviewTimers = {};
  const previewTimers = window._staticGalleryPreviewTimers;

  let html = '';
  collections.forEach(col => {
    if (!col.images.length) return;

    if (typeof previewIndexes[col.key] !== 'number') {
      previewIndexes[col.key] = Math.floor(Math.random() * col.images.length);
    }
    const previewIdx = previewIndexes[col.key];
    const previewUrl = `models/preview/${col.folder}/${col.images[previewIdx].file}`;

    if (previewTimers[col.key]) clearInterval(previewTimers[col.key]);
    previewTimers[col.key] = setInterval(() => {
      previewIndexes[col.key] = (previewIndexes[col.key] + 1) % col.images.length;
      const imgEl = document.querySelector(`.static-model-preview-img[data-key="${col.key}"]`);
      if (imgEl) imgEl.src = `models/preview/${col.folder}/${col.images[previewIndexes[col.key]].file}`;
    }, 2000);

    html += `
      <div class="project-container model-container static-model-collection color-block">
        <div class="model-content">
          <div class="model-title color-text">${col.title}</div>
          <div class="model-description color-text">${col.description}</div>
          <a href="#" class="project-link" onclick="event.preventDefault(); openStaticGalleryCollection('${col.key}');">
            Открыть галерею
          </a>
        </div>
        <div class="model-preview static-model-preview" onclick="openStaticGalleryCollection('${col.key}')">
          <img src="${previewUrl}" data-key="${col.key}" class="static-model-preview-img" alt="${col.title}">
        </div>
      </div>
    `;
  });
  return html;
}

window.openStaticGalleryCollection = function(key) {
  const collections = {
    favourite: {
      title: 'My Favourite',
      folder: 'My_favourite',
      images: [
        { file: 'amlet.jpg', title: 'Завтрак', description: 'Уютная сцена с французским завтраком в неоновом освещении.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-01-10' },
        { file: 'bottle.jpg', title: 'Бутылочка', description: 'Стеклянная бутылка с жидкостью и подсветкой.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-02-14' },
        { file: 'cake-with-cat.png', title: 'Кото-торт', description: 'Милый торт в виде спящего котика.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-02-14' },
        { file: 'Mango.png', title: 'Манго', description: 'Реалистичное манго со свежими каплями воды.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-02-14' }
      ]
    },
    start: {
      title: 'Start Modeling',
      folder: 'Start_modeling',
      images: [
        { file: 'beach_cave.jpg', title: 'Пляжная пещера', description: 'Живописный вид на пещеру у моря.', tools: ['Blender'], credits: 'Hp7z', date: '2022-10-01' },
        { file: 'bird.jpg', title: 'Птица', description: 'Модель птицы.', tools: ['Blender'], credits: 'Hp7z', date: '2022-10-15' },
        { file: 'cattendo.jpg', title: 'Кити-приставка', description: 'Игровая приставка в стиле кошки.', tools: ['Blender'], credits: 'Hp7z', date: '2022-10-15' },
        { file: 'cofee brake.jpg', title: 'Кофе-брейк', description: 'Сцена с кофе.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-01' },
        { file: 'coffee murshmallow.jpg', title: 'Кофе с маршмеллоу', description: 'Уютная сцена с горячим напитком.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-05' },
        { file: 'first cake.jpg', title: 'Первый торт', description: 'Первая модель торта.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-10' },
        { file: 'lesson 1.jpg', title: 'Урок 1', description: 'Результат первого урока.', tools: ['Blender'], credits: 'Hp7z', date: '2022-09-01' },
        { file: 'lesson 2.jpg', title: 'Урок 2', description: 'Результат второго урока.', tools: ['Blender'], credits: 'Hp7z', date: '2022-09-15' },
        { file: 'soke.jpg', title: 'Сок', description: 'Модель стакана с соком.', tools: ['Blender'], credits: 'Hp7z', date: '2022-11-20' },
        { file: 'toast cat.jpg', title: 'Кот-тост', description: 'Милый кот в виде тоста.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-01' },
        { file: 'toast.jpg', title: 'Тост', description: 'Модель тоста.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-05' },
        { file: 'tv day.jpg', title: 'Телевизор днём', description: 'Сцена с телевизором в дневное время.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-10' },
        { file: 'tv night.jpg', title: 'Телевизор ночью', description: 'Атмосферная сцена с телевизором ночью.', tools: ['Blender'], credits: 'Hp7z', date: '2022-12-15' }
      ]
    },
    middle: {
      title: 'Middle Modeling',
      folder: 'Middle_modeling',
      images: [
        { file: 'carty.jpg', title: 'Тележка', description: 'Модель тележки.', tools: ['Blender', 'ArmorPaint'], credits: 'Hp7z', date: '2023-05-20' },
        { file: 'cave fantasy.jpg', title: 'Фантастическая пещера', description: 'Фэнтезийная сцена в пещере.', tools: ['Blender'], credits: 'Hp7z', date: '2023-06-01' },
        { file: 'compic.jpg', title: 'Компьютер', description: 'Модель компьютера.', tools: ['Blender'], credits: 'Hp7z', date: '2023-06-15' },
        { file: 'comso ship.jpg', title: 'Космический корабль', description: 'Модель космического корабля.', tools: ['Blender'], credits: 'Hp7z', date: '2023-07-01' },
        { file: 'lesson 3.jpg', title: 'Урок 3', description: 'Результат третьего урока.', tools: ['Blender'], credits: 'Hp7z', date: '2023-07-15' },
        { file: 'lesson 4.jpg', title: 'Урок 4', description: 'Результат четвёртого урока.', tools: ['Blender'], credits: 'Hp7z', date: '2023-08-01' },
        { file: 'mountain.jpg', title: 'Горы', description: 'Горный пейзаж.', tools: ['Blender'], credits: 'Hp7z', date: '2023-08-15' },
        { file: 'planet.jpg', title: 'Планета', description: 'Модель планеты.', tools: ['Blender'], credits: 'Hp7z', date: '2023-09-01' }
      ]
    }
  };

  const col = collections[key];
  if (!col) return;

  let current = 0;
  let thumbStart = 0;
  const thumbsToShow = 5;
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const arrowColor = isDarkTheme ? '#fff' : '#000';

  function renderGallery(win) {
    if (current < thumbStart) thumbStart = current;
    if (current >= thumbStart + thumbsToShow) thumbStart = current - thumbsToShow + 1;
    if (thumbStart < 0) thumbStart = 0;
    if (thumbStart > col.images.length - thumbsToShow) thumbStart = Math.max(0, col.images.length - thumbsToShow);

    const thumbs = col.images.slice(thumbStart, thumbStart + thumbsToShow);
    const currentImage = col.images[current];

    win.body.innerHTML = `
      <div class="gallery-window-flex">
        <div class="gallery-viewer-col">
          <div class="gallery-main-img-wrapper">
            <button class="gallery-nav-btn" id="gallery-prev">&#8592;</button>
            <img src="models/preview/${col.folder}/${currentImage.file}" id="gallery-main-img" class="gallery-main-img">
            <button class="gallery-nav-btn" id="gallery-next">&#8594;</button>
            <div>
              ${thumbs.map((img, i) => {
                const realIdx = thumbStart + i;
                return `<img src="models/preview/${col.folder}/${img.file}" class="model-gallery-thumb${realIdx === current ? ' active' : ''}" data-idx="${realIdx}">`;
              }).join('')}
            </div>
          </div>
        </div>
        <div class="gallery-info-col">
          <div class="model-title">${currentImage.title}</div>
          <div class="model-description">${currentImage.description}</div>
          <div class="model-tools">
            <b>Инструменты:</b>
            ${(currentImage.tools || []).map(t => {
              const tool = t.toLowerCase();
              if (tool === 'blender') {
                return `
                  <img src="icons/blender-light.svg" class="dark-theme-icon" alt="Blender" title="Blender">
                  <img src="icons/blender-dark.svg" class="light-theme-icon" alt="Blender" title="Blender">
                  <span class="tool-label">Blender</span>
                `;
              } else if (tool === 'armorpaint') {
                return `
                  <img src="icons/armoryicon-light.svg" class="dark-theme-icon" alt="ArmorPaint" title="Armor paint">
                  <img src="icons/armoryicon-dark.svg" class="light-theme-icon" alt="ArmorPaint" title="Armor paint">
                  <span class="tool-label">Armor paint</span>
                `;
              }
              return '';
            }).join('')}
          </div>
          <div class="model-footer">
            <div class="model-credits"><b>Автор:</b> ${currentImage.credits}</div>
            <div class="model-date"><b>Дата:</b> ${currentImage.date}</div>
          </div>
        </div>
      </div>
    `;

    win.body.querySelector('#gallery-prev').onclick = () => {
      current = (current - 1 + col.images.length) % col.images.length;
      renderGallery(win);
    };
    win.body.querySelector('#gallery-next').onclick = () => {
      current = (current + 1) % col.images.length;
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
      openFullscreenGalleryStatic(col, current);
    };
  }

  // --- Корректная иконка для галереи статичных моделей ---
  let icon = '';
  if (window.getIconForTheme && window.windowIcons && window.windowIcons.model3d) {
    icon = window.getIconForTheme(window.windowIcons.model3d);
  } else {
    icon = isDarkTheme ? 'icons/model3d-light.svg' : 'icons/model3d-dark.svg';
  }

  const type = 'gallery-static-' + key;
  if (window.trayWindows && window.trayWindows[type]) {
    if (typeof window.activateWindow === 'function') window.activateWindow(type);
    return;
  }
  let win = new WinBox({
    title: col.title,
    class: ['adwaita-theme', 'active'],
    width: 900,
    height: 500,
    x: 160,
    y: 120,
    top: 36, // --- фикс: не прятать header за таскбар
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    shadow: true,
    max: false,
    html: '<div></div>',
    header: 36,
    icon: icon,
    onclose: () => {
      if (window.trayWindows) delete window.trayWindows[type];
      if (typeof window.updateTaskbar === 'function') window.updateTaskbar();
      return false;
    },
    onminimize: () => { if (typeof window.updateTaskbar === 'function') window.updateTaskbar(); },
    onrestore: function() {
      win.minimized = false;
      if (win.dom) {
        win.dom.style.top = '36px';
        win.dom.style.height = '';
      }
      if (typeof window.activateWindow === 'function') window.activateWindow(type);
    },
    onfocus: () => { if (typeof window.activateWindow === 'function') window.activateWindow(type); },
    onmaximize: function() {
      setTimeout(() => {
        if (win.dom) {
          win.dom.style.top = '36px';
          win.dom.style.height = 'calc(100% - 36px)';
        }
      }, 10);
    },
    oncreate: function() {
      if (this.dom) {
        this.dom.setAttribute('data-type', type);
        this.dom.classList.add('adwaita-theme');
        this.dom.id = type; // Добавляем id для корректной работы таскбара и смены иконки
      }
    }
  });
  if (window.trayWindows) window.trayWindows[type] = win;
  if (typeof window.activateWindow === 'function') window.activateWindow(type);
  if (win.dom) document.body.appendChild(win.dom);
  renderGallery(win);
  if (typeof window.updateTaskbar === 'function') window.updateTaskbar();
}

// --- Функция полноэкранного просмотра для статичных моделей ---
function openFullscreenGalleryStatic(col, startIdx) {
  let current = startIdx;
  const images = col.images;
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
        <img id="fullscreen-img" src="models/preview/${col.folder}/${images[current].file}" style="max-width:80vw;max-height:80vh;border-radius:12px;box-shadow:0 2px 20px #000a;display:block;">
        <div style="display:flex;gap:10px;margin:10px 0 0 0;justify-content:center;">
          ${images.map((img, i) => `<img src="models/preview/${col.folder}/${img.file}" class="fullscreen-thumb${i === current ? ' active' : ''}" data-idx="${i}" style="width:70px;height:50px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid ${i === current ? '#3584e4' : '#ccc'};">`).join('')}
        </div>
      </div>
      <button id="fullscreen-next" style="position:relative;right:0;z-index:2;font-size:40px;background:none;border:none;cursor:pointer;margin-left:20px;color:${arrowColor};">&#8594;</button>
    </div>
  `;
  document.body.appendChild(overlay);
  function updateFullscreen() {
    overlay.querySelector('#fullscreen-img').src = `models/preview/${col.folder}/${images[current].file}`;
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

// --- Исправление: сброс статуса активного окна у дочерних окон ---
if (!window._winboxActiveFix) {
  window._winboxActiveFix = true;
  document.addEventListener('mousedown', function(e) {
    // Найти ближайший .adwaita-theme
    let winEl = e.target.closest('.adwaita-theme');
    if (!winEl) return;
    // Найти тип окна
    let type = winEl.getAttribute('data-type');
    if (!type && winEl.winboxObject && winEl.winboxObject.type) type = winEl.winboxObject.type;
    // Снять active со всех окон, кроме текущего
    document.querySelectorAll('.adwaita-theme.active').forEach(el => {
      if (el !== winEl) el.classList.remove('active');
    });
    winEl.classList.add('active');
    // Принудительно обновить z-index
    if (window.trayWindows && type && window.trayWindows[type]) {
      let maxZ = 100;
      Object.values(window.trayWindows).forEach(w => {
        if (w.dom && w.dom.style.zIndex) {
          const z = parseInt(w.dom.style.zIndex) || 10;
          if (z > maxZ) maxZ = z;
        }
      });
      winEl.style.zIndex = maxZ + 1;
    }
  }, true);
}

// --- Обновление иконок галерей при смене темы ---
if (!window._galleryThemeListener) {
  window._galleryThemeListener = true;
  const observer = new MutationObserver(() => {
    if (!window.trayWindows || !window.windowIcons || !window.getIconForTheme) return;
    Object.entries(window.trayWindows).forEach(([type, win]) => {
      if (type.startsWith('gallery-static-') && win.setIcon) {
        win.setIcon(window.getIconForTheme(window.windowIcons.model3d));
      }
    });
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

// --- GitHub Stats окно ---
window.renderGitHubStatsContent = function() {
  // Контейнер для динамического контента
  setTimeout(loadGitHubStats, 10);
  return `
    <div id="github-stats-root" style="display:flex;height:100%;">
      <div id="github-profile" style="flex:0 0 20%;max-width:20%;background:rgba(0,0,0,0.04);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 10px;">
        <div class="github-avatar-skeleton" style="width:90px;height:90px;border-radius:50%;background:#ddd;"></div>
        <div style="margin-top:18px;font-size:18px;font-weight:bold;" id="github-username">hp7z</div>
        <a href="https://github.com/hp7z" target="_blank" style="color:#3584e4;font-size:13px;word-break:break-all;">github.com/hp7z</a>
      </div>
      <div id="github-main" style="flex:1 1 80%;max-width:80%;padding:30px 30px 30px 30px;overflow:auto;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <h2 style="margin:0;">GitHub статистика</h2>
        </div>
        <div id="github-stats-summary" style="display:flex;flex-wrap:wrap;gap:30px;margin-bottom:30px;">
          <div><img id="github-stats-img" src="https://github-readme-stats.vercel.app/api?username=hp7z&show_icons=true&theme=default&hide_title=true" alt="GitHub Stats" style="max-width:340px;width:100%;"></div>
          <div><img id="github-streak-img" src="https://github-readme-streak-stats.herokuapp.com?user=hp7z&theme=default&hide_border=true" alt="GitHub Streak" style="max-width:340px;width:100%;"></div>
        </div>
        <div style="margin-bottom:30px;">
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=hp7z&layout=compact&theme=default&hide_title=true" alt="Top Langs" style="max-width:340px;width:100%;">
        </div>
        <div style="margin-bottom:30px;">
          <h3>Репозитории</h3>
          <div id="github-repos-list" style="max-height:220px;overflow:auto;"></div>
        </div>
        <div>
          <h3>Последние коммиты</h3>
          <div id="github-commits-list" style="max-height:220px;overflow:auto;"></div>
        </div>
      </div>
    </div>
  `;
};

function loadGitHubStats() {
  const user = 'hp7z';
  // Аватар и имя
  fetch(`https://api.github.com/users/${user}`)
    .then(r => r.json())
    .then(data => {
      const avatar = document.createElement('img');
      avatar.src = data.avatar_url;
      avatar.alt = user;
      avatar.style.width = '90px';
      avatar.style.height = '90px';
      avatar.style.borderRadius = '50%';
      avatar.style.boxShadow = '0 2px 10px #0002';
      const profile = document.getElementById('github-profile');
      if (profile) {
        const skeleton = profile.querySelector('.github-avatar-skeleton');
        if (skeleton) skeleton.replaceWith(avatar);
        const username = profile.querySelector('#github-username');
        if (username) username.textContent = data.login;
      }
    });

  // Репозитории
  fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`)
    .then(r => r.json())
    .then(repos => {
      const list = document.getElementById('github-repos-list');
      if (!list) return;
      list.innerHTML = repos.slice(0, 10).map(repo => `
        <div style="margin-bottom:10px;">
          <a href="${repo.html_url}" target="_blank" style="font-weight:bold;color:#3584e4;">${repo.name}</a>
          <span style="color:#888;font-size:12px;">${repo.language ? ' • ' + repo.language : ''}</span>
          <span style="color:#888;font-size:12px;">${repo.description ? ' — ' + repo.description : ''}</span>
        </div>
      `).join('');
    });

  // Последние коммиты (по событиям)
  fetch(`https://api.github.com/users/${user}/events/public?per_page=30`)
    .then(r => r.json())
    .then(events => {
      const list = document.getElementById('github-commits-list');
      if (!list) return;
      let html = '';
      let count = 0;
      for (const ev of events) {
        if (ev.type === 'PushEvent' && ev.payload && ev.payload.commits) {
          for (const commit of ev.payload.commits) {
            if (count++ > 10) break;
            html += `
              <div style="margin-bottom:8px;">
                <a href="https://github.com/${ev.repo.name}/commit/${commit.sha}" target="_blank" style="color:#3584e4;">${commit.sha.slice(0,7)}</a>
                <span style="color:#888;font-size:12px;">${commit.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
                <span style="color:#aaa;font-size:11px;">в <a href="https://github.com/${ev.repo.name}" target="_blank" style="color:#888;">${ev.repo.name}</a></span>
              </div>
            `;
            if (count > 10) break;
          }
        }
        if (count > 10) break;
      }
      list.innerHTML = html || '<span style="color:#888;">Нет публичных коммитов за последнее время.</span>';
    });
}