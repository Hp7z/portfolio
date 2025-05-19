// --- Three.js плеер и окно для 3D моделей ---

// Используйте importmaps в index.html для three и GLTFLoader

window.open3DModelViewer = async function(modelId) {
  // --- Безопасно получаем window.projects и window.projects.models3d ---
  let model = null;
  let errorMsg = '';
  try {
    if (
      window.projects &&
      window.projects.models3d &&
      (Array.isArray(window.projects.models3d.interactive) || Array.isArray(window.projects.models3d.static))
    ) {
      if (Array.isArray(window.projects.models3d.interactive)) {
        model = window.projects.models3d.interactive.find(m => m.id === modelId);
      }
      if (!model && Array.isArray(window.projects.models3d.static)) {
        model = window.projects.models3d.static.find(m => m.id === modelId);
      }
      if (!model) errorMsg = 'Модель не найдена';
    } else {
      errorMsg = '3D проекты не загружены';
    }
  } catch (e) {
    errorMsg = 'Ошибка данных 3D моделей';
  }

  // --- Исправляем пути к моделям ---
  if (model && model.id === 'mishkakake') model.modelUrl = "models/mishk9aKake.fbx";
  if (model && model.id === 'icecream') model.modelUrl = "models/IceCream.fbx";
  if (model && model.id === 'theemishk') model.modelUrl = "models/mishki.fbx";

  const trayWindows = window.trayWindows || (window.trayWindows = {});
  // --- Добавляем поддержку иконки для 3D моделей в зависимости от темы ---
  const getIconForTheme = window.getIconForTheme || function(iconType) {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    return isDarkTheme ? iconType.dark : iconType.light;
  };
  // --- Убедимся, что windowIcons содержит model3d ---
  const windowIcons = window.windowIcons || {
    model3d: { light: 'icons/model3d-dark.svg', dark: 'icons/model3d-light.svg' }
  };
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const type = 'model-' + modelId;
  if (trayWindows[type]) {
    if (typeof window.activateWindow === 'function') window.activateWindow(type);
    return;
  }
  const tools = [
    { name: 'Blender', icon: 'icons/blender.svg' },
    { name: 'ArmorPaint', icon: 'icons/armorpaint.svg' }
  ];
  // --- Окно как у галереи, но слева 3D-плеер ---
  const html = `
    <div class="model3d-window-flex">
      <div class="model3d-viewer-col">
        <div id="threejs-viewer-${modelId}" class="model-3d-viewer"></div>
      </div>
      <div class="model3d-info-col">
        <div class="model-title">${model ? model.title : 'Ошибка'}</div>
        <div class="model-description">${model ? (model.description || '') : errorMsg}</div>
        <div class="model-tools">
          <b>Инструменты:</b>
          ${(model && model.tools ? model.tools : ['Blender', 'ArmorPaint']).map(t => {
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
          <div class="model-credits"><b>Автор:</b> ${model ? model.credits : ''}</div>
          <div class="model-date"><b>Дата:</b> ${model ? (model.date || '') : ''}</div>
        </div>
      </div>
    </div>
  `;
  const win = new WinBox({
    title: model ? model.title : 'Ошибка',
    class: ['adwaita-theme', 'active'],
    width: 900,
    height: 500,
    x: 140,
    y: 100,
    top: 36, // --- фикс: не прятать header за таскбар
    background: isDarkTheme ? '#2e3436' : '#f6f5f4',
    border: isDarkTheme ? '1px solid #1e1e1e' : '1px solid #d3d2d2',
    borderRadius: '8px',
    shadow: true,
    max: false,
    html,
    header: 36,
    icon: getIconForTheme(windowIcons.model3d || {light: 'icons/model3d-dark.svg', dark: 'icons/model3d-light.svg'}),
    onclose: () => {
      delete trayWindows[type];
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
      // --- Гарантируем, что setIcon доступен для смены темы ---
      if (typeof this.setIcon === 'function') {
        this.setIcon(getIconForTheme(windowIcons.model3d));
      }
    }
  });
  trayWindows[type] = win;
  if (typeof window.activateWindow === 'function') window.activateWindow(type);
  if (win.dom) document.body.appendChild(win.dom);
  if (typeof window.updateTaskbar === 'function') window.updateTaskbar();

  // --- Three.js плеер через importmaps ---
  if (!model || !model.modelUrl) return;

  setTimeout(async () => {
    try {
      // --- Исправление: FBXLoader не входит в стандартный importmap three ---
      // Нужно загрузить FBXLoader через CDN динамически
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      let FBXLoader;
      try {
        // Попробуем импортировать FBXLoader через CDN (jsdelivr)
        FBXLoader = (await import('https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/FBXLoader.min.js')).FBXLoader;
      } catch (e) {
        // Если не удалось, покажем ошибку
        throw new Error('FBXLoader не загружен');
      }
      const container = document.getElementById(`threejs-viewer-${modelId}`);
      if (!container) return;
      container.innerHTML = '';
      const width = container.clientWidth, height = container.clientHeight;
      const scene = new THREE.Scene();

      // --- Фон из модели, если есть ---
      if (model.background) {
        if (/^#([0-9a-f]{3,8})$/i.test(model.background)) {
          scene.background = new THREE.Color(model.background);
        } else {
          const loader = new THREE.TextureLoader();
          loader.load(model.background, texture => {
            scene.background = texture;
          });
        }
      } else {
        scene.background = new THREE.Color(isDarkTheme ? 0x222222 : 0xf6f5f4);
      }

      // --- Камера: отдалена по умолчанию ---
      let camPos = [0, 2.5, 12]; // Было 7, стало 12
      if (Array.isArray(model.cameraPosition) && model.cameraPosition.length === 3) {
        camPos = model.cameraPosition;
      }
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(camPos[0], camPos[1], camPos[2]);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // --- Полное освещение со всех сторон ---
      // Гемисферный свет
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.1);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);
      // Основной направленный свет
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
      dirLight.position.set(3, 10, 10);
      scene.add(dirLight);
      // Дополнительные источники света со всех сторон
      const lightPositions = [
        [10, 10, 10], [-10, 10, 10], [10, 10, -10], [-10, 10, -10],
        [0, -10, 0], [0, 20, 0], [0, 0, 20], [0, 0, -20]
      ];
      lightPositions.forEach(pos => {
        const l = new THREE.DirectionalLight(0xffffff, 0.35);
        l.position.set(...pos);
        scene.add(l);
      });

      // --- Загрузка модели: glb/gltf через GLTFLoader, fbx через FBXLoader ---
      let loader, ext = model.modelUrl.split('.').pop().toLowerCase();
      if (ext === 'fbx') {
        loader = new FBXLoader();
        loader.load(model.modelUrl, function(obj) {
          obj.position.set(0, 0, 0);
          obj.rotation.y = Math.PI;
          scene.add(obj);
          animate();
        }, undefined, function(error) {
          container.innerHTML = '<div style="color:red;text-align:center;margin-top:40px;">Ошибка загрузки 3D модели (FBX)</div>';
        });
      } else {
        loader = new GLTFLoader();
        loader.load(model.modelUrl, function(gltf) {
          const obj = gltf.scene;
          obj.position.set(0, 0, 0);
          obj.rotation.y = Math.PI;
          scene.add(obj);
          animate();
        }, undefined, function(error) {
          container.innerHTML = '<div style="color:red;text-align:center;margin-top:40px;">Ошибка загрузки 3D модели</div>';
        });
      }

      // --- Управление мышью: вращение и zoom колесом ---
      let isDragging = false, prevX = 0, prevY = 0;
      let targetRotationX = 0, targetRotationY = 0;
      let distance = camera.position.z;
      const minDistance = 2, maxDistance = 20;

      container.onmousedown = e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; };
      container.onmouseup = () => { isDragging = false; };
      container.onmouseleave = () => { isDragging = false; };
      container.onmousemove = e => {
        if (!isDragging) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        targetRotationY += dx * 0.01;
        targetRotationX += dy * 0.01;
        scene.rotation.y = targetRotationY;
        scene.rotation.x = targetRotationX;
        prevX = e.clientX; prevY = e.clientY;
      };
      // Zoom колесом мыши
      container.onwheel = e => {
        e.preventDefault();
        distance += e.deltaY * 0.01;
        distance = Math.max(minDistance, Math.min(maxDistance, distance));
        camera.position.z = distance;
      };

      function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
    } catch (e) {
      const container = document.getElementById(`threejs-viewer-${modelId}`);
      if (container) container.innerHTML = '<div style="color:red;text-align:center;margin-top:40px;">Ошибка загрузки 3D-плеера</div>';
    }
  }, 200);
};

// ---
// Как именовать модели в папке models:
// Для загрузки через GLTFLoader указывайте путь к файлу в поле modelUrl, например:
// modelUrl: "models/mishkaKake.glb"
// Имя файла (например, mishkaKake.glb) может быть любым, главное чтобы путь был корректен и файл был доступен по этому пути.
// ---

// --- Обновление иконки дочерних окон при смене темы ---
if (!window._modelThemeListener) {
  window._modelThemeListener = true;
  const observer = new MutationObserver(() => {
    if (!window.trayWindows || !window.windowIcons || !window.getIconForTheme) return;
    Object.entries(window.trayWindows).forEach(([type, win]) => {
      if (type.startsWith('model-') && typeof win.setIcon === 'function') {
        win.setIcon(window.getIconForTheme(window.windowIcons.model3d));
      }
    });
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}
