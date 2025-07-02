window.renderAboutContent = function() {
  const t = window.locales[window.currentLang];
  return `
    <div class="tabs">
      <div class="tab active" data-tab="about">${t.aboutTabs[0]}</div>
      <div class="tab" data-tab="skills">${t.aboutTabs[1]}</div>
      <div class="tab" data-tab="experience">${t.aboutTabs[2]}</div>
    </div>
    <div class="tab-content active" id="about-tab">
      <h2>${t.aboutTitle}</h2>
      <p>${t.aboutText1}</p>
      <p>${t.aboutText2}</p>
      <p>${t.aboutText3}</p>
      <p>${t.aboutText4}</p>
    </div>
    <div class="tab-content" id="skills-tab">
      <h2>${t.skillsTitle}</h2>
      <ul>
        ${t.skillsList.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    </div>
    <div class="tab-content" id="experience-tab">
      <h2>${t.experienceTitle}</h2>
      <div class="project-container experience-text">
        <div class="experience-info">
          <div class="project-title">${t.freelancertitle}</div>
          <p>2018 — ${t.present}</p>
          <p>${t.freelancerDescription}</p>
        </div>
      </div>
      <div class="project-container experience-text">
        <div class="experience-info">
          <div class="project-title">${t.leriaAgencytitle}</div>
          <p>2024 — ${t.present}</p>
          <p>${t.leriaAgencyDescription}</p>
        </div>
      </div>
      <div class="project-container experience-text">
        <div class="experience-info">
          <div class="project-title">${t.kasperskyLabtitle}</div>
          <p>2020 — 2021</p>
          <p>${t.kasperskyLabDescription}</p>
        </div>
      </div>
      <div class="project-container experience-text">
        <div class="experience-info">
          <div class="project-title">${t.xyzCompanytitle}</div>
          <p>2019 — 2020</p>
          <p>${t.xyzCompanyDescription}</p>
        </div>
      </div>
    </div>
  `;
};

window.renderPortfolioContent = function() {
  const t = window.locales[window.currentLang];
  return `
    <div class="tabs main-tabs">
      <div class="tab active" data-tab="websites">${t.portfolio || 'Веб-сайты'}</div>
      <div class="tab" data-tab="models3d">3D ${t.models3d || (window.currentLang === 'en' ? 'Models' : 'Модели')}</div>
    </div>
    <div class="tab-content active" id="websites-tab">
      <div class="tabs sub-tabs">
        <div class="tab active" data-tab="landing">${t.calculatorLanding ? t.calculatorLanding.split('(')[0].trim() : (window.currentLang === 'en' ? 'Landing' : 'Лендинг')}</div>
        <div class="tab" data-tab="shop">${t.calculatorShop ? t.calculatorShop.split('(')[0].trim() : (window.currentLang === 'en' ? 'Online store' : 'Магазин')}</div>
        <div class="tab" data-tab="corporate">${t.calculatorCorp ? t.calculatorCorp.split('(')[0].trim() : (window.currentLang === 'en' ? 'Corporate' : 'Корпоративный')}</div>
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
        <div class="tab active" data-tab="interactive">${window.locales[window.currentLang].interactive}</div>
        <div class="tab" data-tab="static">${window.locales[window.currentLang].static}</div>
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
  const t = window.locales[window.currentLang];
  return `
    <div class="tabs">
      <div class="tab active" data-tab="web">${t.servicesWeb}</div>
      <div class="tab" data-tab="design">${t.servicesDesign}</div>
      <div class="tab" data-tab="seo">${t.servicesSeo}</div>
      <div class="tab" data-tab="model3d">${t.services3d}</div>
      <div class="tab" data-tab="gamedev">${t.servicesGamedev}</div>
    </div>
    <div class="tab-content active" id="web-tab">
      <h2>${t.servicesWeb}</h2>
      <p>${t.servicesWebDesc}</p>
      <ul>
        <li>${t.calculatorLanding.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesLandingDesc}</p>
      <ul>
        <li>${t.calculatorShop.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesShopDesc}</p>
      <ul>
        <li>${t.calculatorCorp.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesCorpDesc}</p>
      <p>${t.servicesWebNote}</p>
    </div>
    <div class="tab-content" id="design-tab">
      <h2>${t.servicesDesign}</h2>
      <p>${t.servicesDesignDesc}</p>
      <ul>
        <li>${t.servicesUiux.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesUiuxDesc}</p>
      <ul>
        <li>${t.servicesLogo.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesLogoDesc}</p>
      <ul>
        <li>${t.servicesBanner.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesBannerDesc}</p>
    </div>
    <div class="tab-content" id="seo-tab">
      <h2>${t.servicesSeo}</h2>
      <p>${t.servicesSeoDesc}</p>
      <ul>
        <li>${t.servicesAudit.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesAuditDesc}</p>
      <ul>
        <li>${t.servicesContent.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesContentDesc}</p>
      <ul>
        <li>${t.servicesTechSeo.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesTechSeoDesc}</p>
      <ul>
        <li>${t.servicesCompetitors.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p class="service-description">${t.servicesCompetitorsDesc}</p>
    </div>
    <div class="tab-content" id="model3d-tab">
      <h2>${t.services3d}</h2>
      <p>${t.services3dDesc}</p>
      <ul>
        <li>${t.services3dModeling.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.services3dRender.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.services3dInteractive.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.services3dIntegration.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.services3dAnimation.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p>${t.services3dNote}</p>
    </div>
    <div class="tab-content" id="gamedev-tab">
      <h2>${t.servicesGamedev}</h2>
      <p>${t.servicesGamedevDesc}</p>
      <ul>
        <li>${t.servicesGamedevUnity.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.servicesGamedevUnreal.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.servicesGamedevWeb.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.servicesGamedevDesign.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.servicesGamedevIntegration.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
        <li>${t.servicesGamedevOptimization.replace(/\s*\(.*?\)/, '').replace(/\s*—.*$/, '').trim()}</li>
      </ul>
      <p>${t.servicesGamedevNote}</p>
    </div>
  `;
};

window.renderContactsContent = function() {
  const t = window.locales[window.currentLang];
  return `
    <div class="contacts-container">
      <h2>${t.contactsTitle}</h2>
      <h3>${t.contactsName}</h3>
      <p><strong>${t.contactsEmailLabel}:</strong> luzan.maksim@mail.ru</p>
      <p><strong>${t.contactsPhoneLabel}:</strong> +7 999 475-95-92</p>
      <div class="social-links-container">
        <h3>${t.contactsSocials}</h3>
        <div class="social-links">
          <a href="https://vk.com/hp7zk" target="_blank" class="social-link vk-link" title="ВКонтакте">
            <span class="social-link-icon">
              <img src="icons/vk-dark.svg" class="dark-theme-icon" alt="VK" style="width:35px;height:35px;">
              <img src="icons/vk-light.svg" class="light-theme-icon" alt="VK" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">${t.contactsVk}</span>
          </a>
          <a href="https://t.me/looptoquit" target="_blank" class="social-link telegram-link" title="Telegram">
            <span class="social-link-icon">
              <img src="icons/telegram-dark.svg" class="light-theme-icon" alt="Telegram" style="width:35px;height:35px;">
              <img src="icons/telegram-light.svg" class="dark-theme-icon" alt="Telegram" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">${t.contactsTelegram}</span>
          </a>
          <a href="https://github.com/hp7z" target="_blank" class="social-link github-link" title="GitHub">
            <span class="social-link-icon">
              <img src="icons/github-dark.svg" class="dark-theme-icon" alt="GitHub" style="width:35px;height:35px;">
              <img src="icons/github-light.svg" class="light-theme-icon" alt="GitHub" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">${t.contactsGitHub}</span>
          </a>
        </div>
      </div>
    </div>
  `;
};

window.renderProjects = function(projects) {
  const isMobile = window.innerWidth <= 992;
  const lang = window.currentLang;
  const t = window.locales[lang];
  return projects.map(project => {
    const title = lang === 'en' && project.title_en ? project.title_en : project.title;
    const description = lang === 'en' && project.description_en ? project.description_en : (project.description || '');
    // Локализуем дату
    let date = project.date;
    if (date && t.dateFormat && lang === 'en') {
      // Попробуем распознать русскую дату и перевести
      const match = date.match(/^(\d{1,2})\s([а-яА-ЯёЁ]+)\s(\d{4})$/);
      if (match) {
        const months = [
          "января", "февраля", "марта", "апреля", "мая", "июня",
          "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];
        const mIdx = months.indexOf(match[2].toLowerCase());
        if (mIdx >= 0) {
          const d = new Date(+match[3], mIdx, +match[1]);
          date = d.toLocaleDateString(t.dateFormat, { day: 'numeric', month: 'long', year: 'numeric' });
        }
      }
    }
    if (isMobile) {
      return `
        <div class="project-container">
          <div class="project-content">
            <div class="project-title">${title}</div>
            <p class="project-description">${description || getLocaleString('noProjectDescription')}</p>
            <div class="project-preview">
              <img src="${project.preview}" alt="${title}">
            </div>
            <a href="#" class="project-link" data-url="${project.url}">${getLocaleString('openProject') || 'Открыть проект'}</a>
            <div class="project-footer">
              <span class="project-credits">${project.credits}</span>
              <span class="project-date">${date || ''}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="project-container">
          <div class="project-content">
            <div class="project-title">${title}</div>
            <p class="project-description">${description || getLocaleString('noProjectDescription')}</p>
            <a href="#" class="project-link" data-url="${project.url}">${getLocaleString('openProject') || 'Открыть проект'}</a>
            <div class="project-footer">
              <span class="project-credits">${project.credits}</span>
              <span class="project-date">${date || ''}</span>
            </div>
          </div>
          <div class="project-preview">
            <img src="${project.preview}" alt="${title}">
          </div>
        </div>
      `;
    }
  }).join('');
};

window.render3DModels = function(models) {
  const isMobile = window.innerWidth <= 992;
  const lang = window.currentLang;
  const t = window.locales[lang];
  return models.map(model => {
    const title = lang === 'en' && model.title_en ? model.title_en : model.title;
    const description = lang === 'en' && model.description_en ? model.description_en : (model.description || '');
    let date = model.date;
    if (date && t.dateFormat && lang === 'en') {
      const match = date.match(/^(\d{1,2})\s([а-яА-ЯёЁ]+)\s(\d{4})$/);
      if (match) {
        const months = [
          "января", "февраля", "марта", "апреля", "мая", "июня",
          "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];
        const mIdx = months.indexOf(match[2].toLowerCase());
        if (mIdx >= 0) {
          const d = new Date(+match[3], mIdx, +match[1]);
          date = d.toLocaleDateString(t.dateFormat, { day: 'numeric', month: 'long', year: 'numeric' });
        }
      }
    }
    if (isMobile) {
      // Мобильная структура: заголовок, описание, превью, футер
      if (model.type === 'interactive' && model.modelUrl) {
        return `
          <div class="project-container model-container color-block">
            <div class="model-content">
              <div class="model-title color-text">${title}</div>
              <p class="model-description color-text">${description || 'Описание модели отсутствует'}</p>
              <div class="model-preview static-model-preview" onclick="open3DModelViewer('${model.id}')">
                <img src="${model.preview}" alt="${title}">
                <div class="model-play-btn"></div>
              </div>
              <div class="model-footer">
                <span class="model-credits color-text">${model.credits}</span>
                <span class="model-date color-text">${model.date || ''}</span>
              </div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="project-container model-container color-block">
            <div class="model-content">
              <div class="model-title color-text">${title}</div>
              <p class="model-description color-text">${description || 'Описание модели отсутствует'}</p>
              <div class="model-preview static-model-preview" onclick="openModelGallery('${model.id}')">
                <img src="${model.preview}" alt="${title}">
              </div>
              <div class="model-footer">
                <span class="model-credits color-text">${model.credits}</span>
                <span class="model-date color-text">${model.date || ''}</span>
              </div>
            </div>
          </div>
        `;
      }
    } else {
      // ПК-структура: контент слева, превью справа
      if (model.type === 'interactive' && model.modelUrl) {
        return `
          <div class="project-container model-container color-block">
            <div class="model-content">
              <div class="model-title color-text">${title}</div>
              <p class="model-description color-text">${description || 'Описание модели отсутствует'}</p>
              <div class="model-footer">
                <span class="model-credits color-text">${model.credits}</span>
                <span class="model-date color-text">${model.date || ''}</span>
              </div>
            </div>
            <div class="model-preview static-model-preview" onclick="open3DModelViewer('${model.id}')">
              <img src="${model.preview}" alt="${title}">
              <div class="model-play-btn"></div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="project-container model-container color-block">
            <div class="model-content">
              <div class="model-title color-text">${title}</div>
              <p class="model-description color-text">${description || 'Описание модели отсутствует'}</p>
              <div class="model-footer">
                <span class="model-credits color-text">${model.credits}</span>
                <span class="model-date color-text">${model.date || ''}</span>
              </div>
            </div>
            <div class="model-preview static-model-preview" onclick="openModelGallery('${model.id}')">
              <img src="${model.preview}" alt="${title}">
            </div>
          </div>
        `;
      }
    }
  }).join('');
};

// renderCalculatorContent должен быть в этом файле! Не удаляйте его.
// Оставьте функцию как есть, чтобы калькулятор корректно отображался и работал.
// Вот правильный блок:
window.renderCalculatorContent = function() {
  const t = window.locales[window.currentLang];
  // Убираем цену в скобках из названий услуг
  return `
    <h2>${t.calculator}</h2>
    <p>${t.calculatorDesc}</p>
    <div class="calculator-section">
      <h3>${t.calculatorWeb}</h3>
      <div class="calculator-item">
        <input type="checkbox" id="landing" class="service-checkbox" data-price="20000" data-type="website">
        <label for="landing">${t.calculatorLanding.replace(/\s*\(.*?\)/, '').trim()}</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="shop" class="service-checkbox" data-price="50000" data-type="website">
        <label for="shop">${t.calculatorShop.replace(/\s*\(.*?\)/, '').trim()}</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="corporate" class="service-checkbox" data-price="80000" data-type="website">
        <label for="corporate">${t.calculatorCorp.replace(/\s*\(.*?\)/, '').trim()}</label>
      </div>
    </div>
    <div class="calculator-section">
      <h3>${t.calculatorAdd}</h3>
      <div class="calculator-item">
        <input type="checkbox" id="design" class="service-checkbox" data-price="35000" data-type="additional">
        <label for="design">${t.calculatorDesign.replace(/\s*\(.*?\)/, '').trim()}</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="seo" class="service-checkbox" data-price="20000" data-type="additional">
        <label for="seo">${t.calculatorSeo.replace(/\s*\(.*?\)/, '').trim()}</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="content" class="service-checkbox" data-price="10000" data-type="additional">
        <label for="content">${t.calculatorContent.replace(/\s*\(.*?\)/, '').trim()}</label>
      </div>
      <div class="calculator-item">
        <input type="checkbox" id="hosting" class="service-checkbox" data-price="5000" data-type="additional">
        <label for="hosting">${t.calculatorHosting.replace(/\s*\(.*?\)/, '').trim()}</label>
      </div>
    </div>
    <div class="calculator-result">
      <div class="calculator-note">
        <p>${t.calculatorDiscountNote}</p>
        <p class="calculator-note-inline" style="font-size:12px;opacity:0.7;margin-top:4px;">
          ${t.calculatorDesignNote}
        </p>
      </div>
      <div class="calculator-total">
        <h3>${t.calculatorTotal}: <span id="total-price">0</span></h3>
      </div>
      <button class="btn" id="order-button">${t.calculatorOrder}</button>
    </div>
  `;
};

// --- Полная локализация staticModelCollections (title/description для коллекций и изображений) ---
const staticModelCollections = {
  favourite: {
    title: { ru: 'Любимые сцены', en: 'Favourite Scenes' },
    folder: 'My_favourite',
    description: {
      ru: 'Атмосферные и любимые сцены с особым настроением.',
      en: 'Atmospheric and favourite scenes with a special mood.'
    },
    images: [
      {
        file: 'amlet.jpg',
        title: { ru: 'Завтрак', en: 'Breakfast' },
        description: { ru: 'Уютная сцена с французским завтраком в неоновом освещении.', en: 'Cozy scene with French breakfast in neon light.' },
        tools: ['Blender', 'ArmorPaint'],
        credits: 'Hp7z',
        date: '2023-01-10'
      },
      {
        file: 'bottle.jpg',
        title: { ru: 'Бутылочка', en: 'Bottle' },
        description: { ru: 'Стеклянная бутылка с жидкостью и подсветкой.', en: 'Glass bottle with liquid and lighting.' },
        tools: ['Blender', 'ArmorPaint'],
        credits: 'Hp7z',
        date: '2023-02-14'
      },
      {
        file: 'cake-with-cat.png',
        title: { ru: 'Кото-торт', en: 'Cat Cake' },
        description: { ru: 'Милый торт в виде спящего котика.', en: 'Cute cake in the form of a sleeping cat.' },
        tools: ['Blender', 'ArmorPaint'],
        credits: 'Hp7z',
        date: '2023-02-14'
      },
      {
        file: 'Mango.png',
        title: { ru: 'Манго', en: 'Mango' },
        description: { ru: 'Реалистичное манго со свежими каплями воды.', en: 'Realistic mango with fresh water drops.' },
        tools: ['Blender', 'ArmorPaint'],
        credits: 'Hp7z',
        date: '2023-02-14'
      }
    ]
  },
  start: {
    title: { ru: 'Первые шаги', en: 'Start Modeling' },
    folder: 'Start_modeling',
    description: {
      ru: 'Первые шаги в мире 3D моделирования.',
      en: 'First steps in the world of 3D modeling.'
    },
    images: [
      {
        file: 'beach_cave.jpg',
        title: { ru: 'Пляжная пещера', en: 'Beach Cave' },
        description: { ru: 'Живописный вид на пещеру у моря.', en: 'Picturesque view of a cave by the sea.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-10-01'
      },
      {
        file: 'bird.jpg',
        title: { ru: 'Птица', en: 'Bird' },
        description: { ru: 'Модель птицы.', en: 'Bird model.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-10-15'
      },
      {
        file: 'cattendo.jpg',
        title: { ru: 'Кити-приставка', en: 'Kitty Console' },
        description: { ru: 'Игровая приставка в стиле кошки.', en: 'Game console in cat style.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-10-15'
      },
      {
        file: 'cofee brake.jpg',
        title: { ru: 'Кофе-брейк', en: 'Coffee Break' },
        description: { ru: 'Сцена с кофе.', en: 'Scene with coffee.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-11-01'
      },
      {
        file: 'coffee murshmallow.jpg',
        title: { ru: 'Кофе с маршмеллоу', en: 'Coffee with Marshmallow' },
        description: { ru: 'Уютная сцена с горячим напитком.', en: 'Cozy scene with a hot drink.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-11-05'
      },
      {
        file: 'first cake.jpg',
        title: { ru: 'Первый торт', en: 'First Cake' },
        description: { ru: 'Первая модель торта.', en: 'First cake model.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-11-10'
      },
      {
        file: 'lesson 1.jpg',
        title: { ru: 'Урок 1', en: 'Lesson 1' },
        description: { ru: 'Результат первого урока.', en: 'Result of the first lesson.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-09-01'
      },
      {
        file: 'lesson 2.jpg',
        title: { ru: 'Урок 2', en: 'Lesson 2' },
        description: { ru: 'Результат второго урока.', en: 'Result of the second lesson.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-09-15'
      },
      {
        file: 'soke.jpg',
        title: { ru: 'Сок', en: 'Juice' },
        description: { ru: 'Модель стакана с соком.', en: 'Glass of juice model.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-11-20'
      },
      {
        file: 'toast cat.jpg',
        title: { ru: 'Кот-тост', en: 'Cat Toast' },
        description: { ru: 'Милый кот в виде тоста.', en: 'Cute cat in the form of toast.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-12-01'
      },
      {
        file: 'toast.jpg',
        title: { ru: 'Тост', en: 'Toast' },
        description: { ru: 'Модель тоста.', en: 'Toast model.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-12-05'
      },
      {
        file: 'tv day.jpg',
        title: { ru: 'Телевизор днём', en: 'TV Day' },
        description: { ru: 'Сцена с телевизором в дневное время.', en: 'Scene with TV during the day.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-12-10'
      },
      {
        file: 'tv night.jpg',
        title: { ru: 'Телевизор ночью', en: 'TV Night' },
        description: { ru: 'Атмосферная сцена с телевизором ночью.', en: 'Atmospheric scene with TV at night.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2022-12-15'
      }
    ]
  },
  middle: {
    title: { ru: 'Средний уровень', en: 'Middle Modeling' },
    folder: 'Middle_modeling',
    description: {
      ru: 'Более сложные работы со вниманием к деталям.',
      en: 'More complex works with attention to detail.'
    },
    images: [
      {
        file: 'carty.jpg',
        title: { ru: 'Тележка', en: 'Cart' },
        description: { ru: 'Модель тележки.', en: 'Cart model.' },
        tools: ['Blender', 'ArmorPaint'],
        credits: 'Hp7z',
        date: '2023-05-20'
      },
      {
        file: 'cave fantasy.jpg',
        title: { ru: 'Фантастическая пещера', en: 'Fantasy Cave' },
        description: { ru: 'Фэнтезийная сцена в пещере.', en: 'Fantasy scene in a cave.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2023-06-01'
      },
      {
        file: 'compic.jpg',
        title: { ru: 'Компьютер', en: 'Computer' },
        description: { ru: 'Модель компьютера.', en: 'Computer model.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2023-06-15'
      },
      {
        file: 'comso ship.jpg',
        title: { ru: 'Космический корабль', en: 'Space Ship' },
        description: { ru: 'Модель космического корабля.', en: 'Space ship model.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2023-07-01'
      },
      {
        file: 'lesson 3.jpg',
        title: { ru: 'Урок 3', en: 'Lesson 3' },
        description: { ru: 'Результат третьего урока.', en: 'Result of the third lesson.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2023-07-15'
      },
      {
        file: 'lesson 4.jpg',
        title: { ru: 'Урок 4', en: 'Lesson 4' },
        description: { ru: 'Результат четвёртого урока.', en: 'Result of the fourth lesson.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2023-08-01'
      },
      {
        file: 'mountain.jpg',
        title: { ru: 'Горы', en: 'Mountains' },
        description: { ru: 'Горный пейзаж.', en: 'Mountain landscape.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2023-08-15'
      },
      {
        file: 'planet.jpg',
        title: { ru: 'Планета', en: 'Planet' },
        description: { ru: 'Модель планеты.', en: 'Planet model.' },
        tools: ['Blender'],
        credits: 'Hp7z',
        date: '2023-09-01'
      }
    ]
  }
};

// --- renderStaticModelCollections с полной локализацией ---
function renderStaticModelCollections() {
  const lang = window.currentLang;
  if (!window._staticGalleryPreviewIndexes) window._staticGalleryPreviewIndexes = {};
  const previewIndexes = window._staticGalleryPreviewIndexes;
  if (!window._staticGalleryPreviewTimers) window._staticGalleryPreviewTimers = {};
  const previewTimers = window._staticGalleryPreviewTimers;

  let html = '';
  Object.entries(staticModelCollections).forEach(([key, col]) => {
    if (!col.images.length) return;

    if (typeof previewIndexes[key] !== 'number') {
      previewIndexes[key] = Math.floor(Math.random() * col.images.length);
    }
    const previewIdx = previewIndexes[key];
    const previewUrl = `models/preview/${col.folder}/${col.images[previewIdx].file}`;

    if (previewTimers[key]) clearInterval(previewTimers[key]);
    previewTimers[key] = setInterval(() => {
      previewIndexes[key] = (previewIndexes[key] + 1) % col.images.length;
      const imgEl = document.querySelector(`.static-model-preview-img[data-key="${key}"]`);
      if (imgEl) imgEl.src = `models/preview/${col.folder}/${col.images[previewIndexes[key]].file}`;
    }, 2000);

    let title = typeof col.title === 'object' ? (col.title[lang] || col.title['ru']) : col.title;
    let description = typeof col.description === 'object' ? (col.description[lang] || col.description['ru']) : col.description;

    html += `
      <div class="project-container model-container static-model-collection color-block">
        <div class="model-content">
          <div class="model-title color-text">${title}</div>
          <div class="model-description color-text">${description}</div>
          <a href="#" class="project-link" onclick="event.preventDefault(); openStaticGalleryCollection('${key}');">
            ${window.locales[lang].openGallery}
          </a>
        </div>
        <div class="model-preview static-model-preview" onclick="openStaticGalleryCollection('${key}')">
          <img src="${previewUrl}" data-key="${key}" class="static-model-preview-img" alt="${title}">
        </div>
      </div>
    `;
  });
  return html;
}

// --- Локализация для статичных моделей внутри галереи ---
window.openStaticGalleryCollection = function(key) {
  const lang = window.currentLang;
  const t = window.locales[lang];
  const col = staticModelCollections[key];
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

    const imgTitle = typeof currentImage.title === 'object' ? (currentImage.title[lang] || currentImage.title['ru']) : currentImage.title;
    const imgDesc = typeof currentImage.description === 'object' ? (currentImage.description[lang] || currentImage.description['ru']) : currentImage.description;

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
          <div class="model-title">${imgTitle}</div>
          <div class="model-description" style="margin-bottom:18px;">${imgDesc}</div>
          <div class="model-tools">
            <b>${t.tools}:</b>
            <span class="tool-icons"></span>
          </div>
          <div class="model-footer">
            <div class="model-credits"><b>${t.author}:</b> ${currentImage.credits}</div>
            <div class="model-date"><b>${t.date}:</b> ${currentImage.date}</div>
          </div>
        </div>
      </div>
    `;
    // Показываем только одну иконку инструмента по теме
    const toolIcons = win.body.querySelector('.tool-icons');
    if (toolIcons && currentImage.tools) {
      const isDark = document.body.classList.contains('dark-theme');
      toolIcons.innerHTML = currentImage.tools.map(t => {
        const tool = t.toLowerCase();
        if (tool === 'blender') {
          return `<img src="icons/blender-${isDark ? 'light' : 'dark'}.svg" alt="Blender" title="Blender" style="width:28px;height:28px;vertical-align:middle;margin-right:6px;">`;
        } else if (tool === 'armorpaint') {
          return `<img src="icons/armoryicon-${isDark ? 'light' : 'dark'}.svg" alt="ArmorPaint" title="Armor paint" style="width:28px;height:28px;vertical-align:middle;margin-right:6px;">`;
        }
        return '';
      }).join('');
    }

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
        <div style="color:#fff;font-size:16px;margin-top:10px;"><b>${t.date}:</b> ${images[current].date}</div>
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
  const t = window.locales[window.currentLang];
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
          <h2 style="margin:0;">${t.githubStatsTitle}</h2>
        </div>
        <div id="github-stats-summary" style="display:flex;flex-wrap:wrap;gap:30px;margin-bottom:30px;">
          <div><img id="github-stats-img" src="https://github-readme-stats.vercel.app/api?username=hp7z&show_icons=true&theme=default&hide_title=true" alt="GitHub Stats" style="max-width:100%;width:100%;"></div>
          <div><img id="github-streak-img" src="https://github-readme-streak-stats.herokuapp.com?user=hp7z&theme=default&hide_border=true" alt="GitHub Streak" style="max-width:100%;width:100%;"></div>
        </div>
        <div style="margin-bottom:30px;">
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=hp7z&layout=compact&theme=default&hide_title=true" alt="Top Langs" style="max-width:100%;width:100%;">
        </div>
        <div style="margin-bottom:30px;">
          <h3>${t.githubRepos}</h3>
          <div id="github-repos-list" style="max-height:220px;overflow:auto;"></div>
        </div>
        <div>
          <h3>${t.githubCommits}</h3>
          <div id="github-commits-list" style="max-height:220px;overflow:auto;"></div>
        </div>
      </div>
    </div>
  `;
};

function loadGitHubStats() {
  const t = window.locales[window.currentLang];
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
            if (count >= 10) break;
            html += `
              <div style="margin-bottom:8px;">
                <a href="${ev.repo.url}" target="_blank" style="font-weight:bold;color:#3584e4;">${ev.repo.name}</a>
                <div style="color:#888;font-size:12px;">
                  ${commit.message.split('\n')[0]}
                </div>
              </div>
            `;
            count++;
          }
        }
      }
      list.innerHTML = html;
    });
}