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
  if (model && model.id === 'mishkakake') model.modelUrl = "models/MIshkaKake.glb";
  if (model && model.id === 'icecream') model.modelUrl = "models/IceCream.glb";
  if (model && model.id === 'theemishk') model.modelUrl = "models/mishki.glb";

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
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { RoomEnvironment } = await import('https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/environments/RoomEnvironment.js');
      // --- Удалено всё, что связано с FBXLoader ---

      const container = document.getElementById(`threejs-viewer-${modelId}`);
      if (!container) return;
      container.innerHTML = '';
      const width = container.clientWidth, height = container.clientHeight;
      const scene = new THREE.Scene();

      // --- Фон всегда #ECD1A2 ---
      scene.background = new THREE.Color('#ECD1A2');

      // --- Камера: индивидуальные позиции для каждой модели ---
      let camPos, camTarget;
      if (model.id === 'mishkakake') {
        camPos = [-1.2, 1.2, 12];
        camTarget = [0, 1.2, 0];
      } else if (model.id === 'icecream') {
        camPos = [0, 0.5, 12];
        camTarget = [0, 0.5, 0];
      } else if (model.id === 'theemishk') {
        camPos = [0, 2.2, 12];
        camTarget = [0, 2.2, 0];
      } else {
        camPos = [0, 1.2, 12];
        camTarget = [0, 1.2, 0];
      }
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(camPos[0], camPos[1], camPos[2]);
      camera.lookAt(camTarget[0], camTarget[1], camTarget[2]);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      // --- Сделать canvas адаптивным ---
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);

      // --- Повышаем контраст сцены (делаем цвета сочнее, но не ярче) ---
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      // --- Индивидуальная насыщенность для mishki ---
      if (model.id === 'theemishk') {
        renderer.domElement.style.filter = "contrast(1.15) saturate(1.40)";
      } else {
        renderer.domElement.style.filter = "contrast(1.15) saturate(1.10)";
      }

      // --- Environment: Room (pmremGenerator на renderer) ---
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
      pmremGenerator.dispose();

      // --- Удалены все источники света ---

      // --- Загрузка модели: только glb/gltf через GLTFLoader ---
      const loader = new GLTFLoader();
      loader.load(model.modelUrl, function(gltf) {
        const obj = gltf.scene;
        obj.position.set(0, 0, 0);
        obj.rotation.y = Math.PI;
        scene.add(obj);

        // --- Billboard для PlaneXXX ---
        function updateBillboards() {
          scene.traverse(child => {
            if (
              child.isMesh &&
              child.geometry &&
              child.geometry.type === 'PlaneGeometry' &&
              typeof child.name === 'string' &&
              /Plane\d{3,}$/.test(child.name)
            ) {
              child.lookAt(camera.position);
            }
          });
        }

        // --- Управление камерой как в Sketchfab + ПКМ для панорамирования (движение target) ---
        let isDragging = false, prevX = 0, prevY = 0;
        let azimuth = 0, elevation = 0, radius = 12;
        let target = new THREE.Vector3(...camTarget);

        // Инициализация углов по начальному положению камеры
        function getSphericalFromCamera() {
          const offset = new THREE.Vector3().subVectors(camera.position, target);
          radius = offset.length();
          azimuth = Math.atan2(offset.x, offset.z);
          elevation = Math.asin(offset.y / radius);
        }
        getSphericalFromCamera();

        function updateCamera() {
          // Ограничения на elevation (угол вверх/вниз)
          const minElev = -Math.PI / 2 + 0.1;
          const maxElev = Math.PI / 2 - 0.1;
          elevation = Math.max(minElev, Math.min(maxElev, elevation));
          // Пересчёт позиции камеры по азимуту/углу/радиусу
          camera.position.x = target.x + radius * Math.sin(azimuth) * Math.cos(elevation);
          camera.position.y = target.y + radius * Math.sin(elevation);
          camera.position.z = target.z + radius * Math.cos(azimuth) * Math.cos(elevation);
          camera.lookAt(target);
        }

        // --- Drag мышью: вращение вокруг центра (ЛКМ) ---
        container.onmousedown = e => {
          if (e.button === 2) { // ПКМ — панорамирование
            isDragging = false;
            isPanning = true;
            prevX = e.clientX;
            prevY = e.clientY;
          } else if (e.button === 0 && !e.shiftKey) { // ЛКМ — вращение
            isDragging = true;
            isPanning = false;
            prevX = e.clientX;
            prevY = e.clientY;
          }
        };
        container.onmouseup = () => { isDragging = false; isPanning = false; };
        container.onmouseleave = () => { isDragging = false; isPanning = false; };

        let isPanning = false;
        container.onmousemove = e => {
          if (isDragging) {
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            azimuth -= dx * 0.01;
            elevation += dy * 0.01;
            updateCamera();
            prevX = e.clientX; prevY = e.clientY;
          } else if (isPanning) {
            // --- Панорамирование: двигаем target по осям X/Y ---
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            // Коэффициенты чувствительности
            const panSpeed = radius * 0.002;
            // Получаем вектор вправо и вверх относительно камеры
            const right = new THREE.Vector3();
            camera.getWorldDirection(right);
            right.cross(camera.up).normalize();
            const up = new THREE.Vector3().copy(camera.up).normalize();
            target.addScaledVector(right, -dx * panSpeed);
            target.addScaledVector(up, dy * panSpeed);
            updateCamera();
            prevX = e.clientX; prevY = e.clientY;
          }
        };

        // --- Отключить контекстное меню по ПКМ ---
        container.oncontextmenu = e => e.preventDefault();

        // --- Zoom колесом мыши ---
        container.onwheel = e => {
          e.preventDefault();
          radius += e.deltaY * 0.01;
          radius = Math.max(2, Math.min(20, radius));
          updateCamera();
        };

        // --- Resize обработчик для canvas и камеры ---
        function handleResize() {
          const w = container.clientWidth;
          const h = container.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', handleResize);
        let parentWin = container.closest('.adwaita-theme');
        if (parentWin) {
          new ResizeObserver(handleResize).observe(parentWin);
        }
        setTimeout(handleResize, 100);

        function animate() {
          updateBillboards();
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }
        animate();
      }, undefined, function(error) {
        container.innerHTML = '<div style="color:red;text-align:center;margin-top:40px;">Ошибка загрузки 3D модели</div>';
      });

      // --- Если модель FBX, то billboard не нужен (оставляем animate как было) ---
      // function animate() {
      //   renderer.render(scene, camera);
      //   requestAnimationFrame(animate);
      // }
      // animate();
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
