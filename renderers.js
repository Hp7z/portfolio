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
        <div class="tab active" data-tab="interactive">${t.interactive || (window.currentLang === 'en' ? 'Interactive' : 'Интерактивные')}</div>
        <div class="tab" data-tab="static">${t.static || (window.currentLang === 'en' ? 'Static' : 'Статичные')}</div>
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

window.contactData = window.contactData || window.portfolioData?.contacts || {
  email: 'luzan.maksim@mail.ru',
  phone: '+7 999 475-95-92',
  vkUrl: 'https://vk.com/hp7zk',
  telegramUrl: 'https://t.me/looptoquit',
  gitHubUrl: 'https://github.com/hp7z'
};

window.renderContactsContent = function() {
  const t = window.locales[window.currentLang];
  const data = window.contactData;
  return `
    <div class="contacts-container">
      <h2>${t.contactsTitle}</h2>
      <h3>${t.contactsName}</h3>
      <p><strong>${t.contactsEmailLabel}:</strong> ${data.email}</p>
      <p><strong>${t.contactsPhoneLabel}:</strong> ${data.phone}</p>
      <div class="social-links-container">
        <h3>${t.contactsSocials}</h3>
        <div class="social-links">
          <a href="${data.vkUrl}" target="_blank" class="social-link vk-link" title="ВКонтакте">
            <span class="social-link-icon">
              <img src="icons/vk-dark.svg" class="dark-theme-icon" alt="VK" style="width:35px;height:35px;">
              <img src="icons/vk-light.svg" class="light-theme-icon" alt="VK" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">${t.contactsVk}</span>
          </a>
          <a href="${data.telegramUrl}" target="_blank" class="social-link telegram-link" title="Telegram">
            <span class="social-link-icon">
              <img src="icons/telegram-dark.svg" class="light-theme-icon" alt="Telegram" style="width:35px;height:35px;">
              <img src="icons/telegram-light.svg" class="dark-theme-icon" alt="Telegram" style="width:35px;height:35px;">
            </span>
            <span class="social-link-text">${t.contactsTelegram}</span>
          </a>
          <a href="${data.gitHubUrl}" target="_blank" class="social-link github-link" title="GitHub">
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
              <img src="${project.cardImage || project.preview}" alt="${title}">
            </div>
            <div class="project-actions">
              <a href="#" class="project-link" data-url="${project.url}">${getLocaleString('openProject') || 'Открыть проект'}</a>
              <button type="button" class="project-link project-preview-btn" data-preview="${project.previewImage || project.preview}" data-title="${title}" data-url="${project.url}">${window.portfolioData?.preview?.buttonLabel?.[lang] || window.portfolioData?.preview?.buttonLabel?.ru || 'Превью'}</button>
            </div>
            ${project.cms ? `<div class="project-cms"><span class="project-cms-label">CMS:</span> <span class="project-cms-value">${project.cms}</span></div>` : ''}
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
            <div class="project-actions">
              <a href="#" class="project-link" data-url="${project.url}">${getLocaleString('openProject') || 'Открыть проект'}</a>
              <button type="button" class="project-link project-preview-btn" data-preview="${project.previewImage || project.preview}" data-title="${title}" data-url="${project.url}">${window.portfolioData?.preview?.buttonLabel?.[lang] || window.portfolioData?.preview?.buttonLabel?.ru || 'Превью'}</button>
            </div>
            ${project.cms ? `<div class="project-cms"><span class="project-cms-label">CMS:</span> <span class="project-cms-value">${project.cms}</span></div>` : ''}
            <div class="project-footer">
              <span class="project-credits">${project.credits}</span>
              <span class="project-date">${date || ''}</span>
            </div>
          </div>
          <div class="project-preview">
            <img src="${project.cardImage || project.preview}" alt="${title}">
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
    const hasVideo = Boolean(model.video);
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
              ${hasVideo ? '<div class="model-video-badge">Видео</div>' : ''}
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
              ${hasVideo ? '<div class="model-video-badge">Видео</div>' : ''}
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
  const calculatorData = window.portfolioData?.calculator || {};
  const services = calculatorData.services || [];
  const contactMethods = calculatorData.contactMethods || [];
  const websiteServices = services.filter(service => service.group === 'website');
  const modelServices = services.filter(service => service.group === 'model');
  const additionalServices = services.filter(service => service.group === 'additional');;

  const renderServiceList = (groupServices, sectionTitleKey) => `
    <div class="calculator-section">
      <h3>${t[sectionTitleKey]}</h3>
      ${groupServices.map(service => {
        const label = typeof service.label === 'object' ? service.label[window.currentLang] || service.label.ru : service.label;
        return `
          <div class="calculator-item">
            <input type="checkbox" id="${service.id}" class="service-checkbox" data-price="${service.price}" data-type="${service.type}">
            <label for="${service.id}">${label}</label>
          </div>`;
      }).join('')}
    </div>`;

  return `
    <h2>${t.calculator}</h2>
    <p>${t.calculatorDesc}</p>
    ${renderServiceList(websiteServices, 'calculatorWeb')}
    ${renderServiceList(modelServices, 'calculator3d')}
    ${renderServiceList(additionalServices, 'calculatorAdd')}
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
      <div class="calculator-contact-method-title">${t.calculatorContactMethodTitle}</div>
      <div class="calculator-contact-method">
        ${contactMethods.map(method => `
          <label>
            <input type="radio" name="contact-method" value="${method.id}" class="order-contact-method" ${method.id === 'vk' ? 'checked' : ''}>
            ${t[method.labelKey]}
          </label>`).join('')}
      </div>
      <div id="feedback-block" class="calculator-feedback-panel" style="display:none;">
        <label>${t.feedbackNameLabel}:
          <input type="text" id="feedback-name" placeholder="${t.feedbackNamePlaceholder || t.feedbackNameLabel}" />
        </label>
        <label>${t.feedbackPhoneLabel}:
          <input type="text" id="feedback-phone" placeholder="${t.feedbackPhonePlaceholder || t.feedbackPhoneLabel}" />
        </label>
        <label>${t.feedbackEmailLabel}:
          <input type="email" id="feedback-email" placeholder="${t.feedbackEmailPlaceholder || ''}" />
        </label>
        <label>${t.feedbackPreferredLabel}:
          <textarea id="feedback-preferred" placeholder="${t.feedbackPreferredPlaceholder || t.feedbackPreferredLabel}"></textarea>
        </label>
        <div id="feedback-services" class="calculator-feedback-services"></div>
      </div>
      <button class="btn" id="order-button">${t.calculatorOrder}</button>
    </div>
  `;
};

// --- renderStaticModelCollections с полной локализацией ---
function renderStaticModelCollections() {
  const staticModelCollections = window.portfolioData?.staticModelCollections || {};

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
  const staticModelCollections = window.portfolioData?.staticModelCollections || {};
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
      <div class="kitty-gallery-flex" style="display:flex;flex-direction:row;height:100%;">
        <div class="kitty-gallery-viewer-col" style="flex:0 0 65%;max-width:65%;position:relative;">
          <div class="kitty-gallery-main-img-wrapper" style="position:relative;width:100%;height:70%;display:flex;align-items:center;justify-content:center;">
            <button class="gallery-nav-btn" id="static-gallery-prev" style="left:10px;position:absolute;top:50%;transform:translateY(-50%);">&#8592;</button>
            <img src="models/preview/${col.folder}/${currentImage.file}" id="static-gallery-main-img" class="gallery-main-img" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:10px;box-shadow:0 2px 10px #0003;">
            <button class="gallery-nav-btn" id="static-gallery-next" style="right:10px;position:absolute;top:50%;transform:translateY(-50%);">&#8594;</button>
          </div>
          <div style="width:100%;display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px;">
            ${col.images.map((img, i) => `<img src="models/preview/${col.folder}/${img.file}" class="static-gallery-thumb${i === current ? ' active' : ''}" data-idx="${i}" style="width:84px;height:56px;object-fit:cover;border-radius:6px;border:2px solid ${i===current? '#3584e4':'transparent'};cursor:pointer;">`).join('')}
          </div>
        </div>
        <div class="kitty-gallery-info-col" style="flex:0 0 35%;max-width:35%;padding:0 22px 22px 22px;box-sizing:border-box;overflow-y:auto;display:flex;flex-direction:column;justify-content:flex-start;">
          <div style="margin-bottom:auto;">
            <div class="model-title" style="font-size:20px;font-weight:600;margin:0 0 8px 0;">${imgTitle}</div>
            <div class="model-description" style="margin-bottom:18px;">${imgDesc}</div>
            <div class="model-tools" style="margin-bottom:12px;"><b>${t.tools}:</b> <span class="tool-icons" ></span></div>
          </div>
          <div class="model-footer" style="margin-top:auto;">
            <div class="model-credits"><b>${t.author}:</b> ${currentImage.credits}</div>
            <div class="model-date"><b>${t.date}:</b> ${currentImage.date}</div>
          </div>
        </div>
      </div>
    `;
    const toolIcons = win.body.querySelector('.tool-icons');
    if (toolIcons && currentImage.tools) {
      const isDark = document.body.classList.contains('dark-theme');
      toolIcons.innerHTML = currentImage.tools.map(t => {
        const tool = t.toLowerCase();
        if (tool === 'blender') {
          return `<div class="tool-badge"><img src="icons/blender-${isDark ? 'light' : 'dark'}.svg" alt="Blender" title="Blender"><span>Blender</span></div>`;
        } else if (tool === 'armorpaint') {
          return `<div class="tool-badge"><img src="icons/armoryicon-${isDark ? 'light' : 'dark'}.svg" alt="ArmorPaint" title="Armor paint"><span>Armor paint</span></div>`;
        }
        return `<div class="tool-badge"><span>${t}</span></div>`;
      }).join('');
    }

    win.body.querySelector('#static-gallery-prev').onclick = () => {
      current = (current - 1 + col.images.length) % col.images.length;
      renderGallery(win);
    };
    win.body.querySelector('#static-gallery-next').onclick = () => {
      current = (current + 1) % col.images.length;
      renderGallery(win);
    };
    win.body.querySelectorAll('.static-gallery-thumb').forEach(thumb => {
      thumb.onclick = () => {
        current = parseInt(thumb.dataset.idx);
        renderGallery(win);
      };
    });
    win.body.querySelector('#static-gallery-main-img').onclick = () => {
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
  let winTitle = typeof col.title === 'object' ? (col.title[lang] || col.title['ru']) : col.title;
  let win = new WinBox({
    title: winTitle,
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
      list.innerHTML = html || `<span style="color:#888;">${t.githubNoCommits}</span>`;
    });
}

window.renderKittyGalleryContent = function() {
  const t = window.locales[window.currentLang];
  return `
    <div class="kitty-gallery-flex" style="display:flex;flex-direction:row;height:100%;">
      <div class="kitty-gallery-viewer-col" style="flex:0 0 65%;max-width:65%;min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;height:100%;box-sizing:border-box;">
        <div class="kitty-gallery-main-img-wrapper gallery-main-img-wrapper" style="position:relative;width:100%;height:70%;display:flex;align-items:center;justify-content:center;">
          <button class="gallery-nav-btn" id="kitty-gallery-prev" style="left:10px;position:absolute;top:50%;transform:translateY(-50%);">&#8592;</button>
          <img src="img/kitty/1.jpg" id="kitty-gallery-main-img" class="gallery-main-img" style="max-width:100%;max-height:100%;border-radius:12px;box-shadow:0 2px 10px #0003;display:block;margin:0 auto;">
          <button class="gallery-nav-btn" id="kitty-gallery-next" style="right:10px;position:absolute;top:50%;transform:translateY(-50%);">&#8594;</button>
          <div style="position:absolute;bottom:-60px;left:0;width:100%;display:flex;gap:10px;justify-content:center;">
            ${[1,2,3,4,5,6,7,8,9].map(i => `<img src="img/kitty/${i}.jpg" class="kitty-gallery-thumb${i===1?' active':''}" data-idx="${i-1}" style="width:60px;height:45px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid ${i===1?'#3584e4':'#ccc'};">`).join('')}
          </div>
        </div>
      </div>
      <div class="kitty-gallery-info-col" style="flex:0 0 35%;max-width:35%;min-width:0;min-height:0;padding:30px 30px 30px 30px;display:flex;flex-direction:column;justify-content:space-around;height:100%;box-sizing:border-box;overflow-y:auto;max-height:100%;">
        <div class="model-title" style="font-size:22px;font-weight:bold;margin-bottom:10px;">${t.kittyTitle}</div>
        <div class="model-description" id="kitty-gallery-description" style="margin-bottom:15px;">
          ${t.kittyDesc}
        </div>
        <div class="model-footer">
          <div class="model-credits"><b>${t.author}:</b> ${t.kittyAuthor}</div>
          <div class="model-date" id="kitty-gallery-date"><b>${t.date}:</b> 01.10.2023</div>
        </div>
      </div>
    </div>
  `;
};

window.initKittyGallery = function() {
  const t = window.locales[window.currentLang];
  const images = [
    { file: '1.jpg', date: '01.10.2023' },
    { file: '2.jpg', date: '15.10.2023' },
    { file: '3.jpg', date: '01.11.2023' },
    { file: '4.jpg', date: '20.11.2023' },
    { file: '5.jpg', date: '05.12.2023' },
    { file: '6.jpg', date: '25.12.2023' },
    { file: '7.jpg', date: '10.01.2024' },
    { file: '8.jpg', date: '14.02.2024' },
    { file: '9.jpg', date: '01.03.2024' }
  ];
  let current = 0;
  const mainImg = document.getElementById('kitty-gallery-main-img');
  const thumbs = document.querySelectorAll('.kitty-gallery-thumb');
  const dateEl = document.getElementById('kitty-gallery-date');
  function updateGallery() {
    mainImg.src = `img/kitty/${images[current].file}`;
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === current);
      thumb.style.border = i === current ? '2px solid #3584e4' : '2px solid #ccc';
    });
    dateEl.innerHTML = `<b>${t.date}:</b> ${images[current].date}`;
  }
  document.getElementById('kitty-gallery-prev').onclick = () => {
    current = (current - 1 + images.length) % images.length;
    updateGallery();
  };
  document.getElementById('kitty-gallery-next').onclick = () => {
    current = (current + 1) % images.length;
    updateGallery();
  };
  thumbs.forEach((thumb, i) => {
    thumb.onclick = () => {
      current = i;
      updateGallery();
    };
  });
  mainImg.onclick = () => {
    openKittyFullscreenGallery(images, current);
  };
  updateGallery();
};

function openKittyFullscreenGallery(images, startIdx) {
  const t = window.locales[window.currentLang];
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
        <img id="fullscreen-img" src="img/kitty/${images[current].file}" style="max-width:80vw;max-height:80vh;border-radius:12px;box-shadow:0 2px 20px #000a;display:block;">
        <div style="display:flex;gap:10px;margin:10px 0 0 0;justify-content:center;">
          ${images.map((img, i) => `<img src="img/kitty/${img.file}" class="fullscreen-thumb${i === current ? ' active' : ''}" data-idx="${i}" style="width:70px;height:50px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid ${i === current ? '#3584e4' : '#ccc'};">`).join('')}
        </div>
      </div>
      <button id="fullscreen-next" style="position:relative;right:0;z-index:2;font-size:40px;background:none;border:none;cursor:pointer;margin-left:20px;color:${arrowColor};">&#8594;</button>
    </div>
  `;
  document.body.appendChild(overlay);
  function updateFullscreen() {
    overlay.querySelector('#fullscreen-img').src = `img/kitty/${images[current].file}`;
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

// --- setupTabs экспортируется из app.js, не дублируем здесь ---
const origRenderPortfolioContent = window.renderPortfolioContent;
window.renderPortfolioContent = function() {
  const html = origRenderPortfolioContent();
  // После вставки HTML, восстановим вкладки (если есть контейнер)
  // setTimeout(() => {
  //   const container = document.querySelector('.adwaita-theme.active .wb-body') || document.body;
  //   if (typeof restoreActiveTabsState === 'function') restoreActiveTabsState(container);
  // }, 0);
  return html;
};

// --- Переопределяем window.renderServicesContent для восстановления вкладок ---
const origRenderServicesContent = window.renderServicesContent;
window.renderServicesContent = function() {
  const html = origRenderServicesContent();
  setTimeout(() => {
    const container = document.querySelector('.adwaita-theme.active .wb-body') || document.body;
    restoreActiveTabsState(container);
  }, 0);
  return html;
};