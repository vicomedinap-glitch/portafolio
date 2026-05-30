const introOverlay = document.getElementById('introOverlay');
const enterButton = document.getElementById('enterButton');
let boardItems = Array.from(document.querySelectorAll('[data-section]'));
const pagePanel = document.getElementById('pagePanel');
const panelContent = document.getElementById('panelContent');
const closePanel = document.getElementById('closePanel');
const corkWall = document.getElementById('corkWall');
const openingPhrases = [
  'Las mejores ideas rara vez nacen en orden.',
  'Cada proyecto comienza con una historia.',
  'Transformo ideas en experiencias visuales.'
];

let activeSection = null;

function randomPhrase() {
  const index = Math.floor(Math.random() * openingPhrases.length);
  document.getElementById('openingPhrase').textContent = openingPhrases[index];
}

function openSection(section, el) {
  activeSection = section;
  history.pushState({ section }, '', section === 'home' ? '/' : `/${section}`);
  pagePanel.classList.add('active');
  renderSection(section);
  playClickSound();

  if (el && corkWall) {
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const itemRect = el.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const itemCenterY = itemRect.top + itemRect.height / 2;

    const deltaX = `${viewportCenterX - itemCenterX}px`;
    const deltaY = `${viewportCenterY - itemCenterY}px`;

    corkWall.style.setProperty('--zoomX', deltaX);
    corkWall.style.setProperty('--zoomY', deltaY);
    corkWall.classList.add('zoomed');

    boardItems.forEach((it) => {
      if (it !== el) it.classList.add('muted');
    });
  }
}

function closeSection() {
  activeSection = null;
  pagePanel.classList.remove('active');
  history.pushState({ section: 'home' }, '', '/');
  if (corkWall) corkWall.classList.remove('zoomed');
  boardItems.forEach((it) => it.classList.remove('muted'));
}

function renderSection(section) {
  const sections = {
    'sobre-mi': {
      title: 'Sobre mí',
      description: 'Un viaje visual entre un estudio artesanal y un método estratégico. Tras cada detalle hay una historia, una textura y una decisión con propósito.',
      cards: [
        {
          title: 'Mi filosofía',
          body: 'Combino la ciencia del branding con una sensibilidad editorial. Diseño para crear experiencias que se sienten auténticas, memorables y profundamente personales.'
        },
        {
          title: 'Lo que me inspira',
          body: 'Libretas, moodboards, viajes, olores de papel recién cortado y conversaciones espontáneas sobre creatividad. Me nutro de lo cotidiano para convertirlo en algo visual.'
        },
        {
          title: 'Detrás del estudio',
          body: 'Trabajo con procesos manuales e iteraciones digitales. Mis días mezclan bocetos, prototipos, sesiones de revisión y exploraciones visuales con materiales reales.'
        }
      ],
      footer: '<p>Victoria Medina es una diseñadora gráfica que ama las piezas con alma, los sistemas visuales contundentes y las historias que se cuentan a través de cada detalle.</p>'
    },
    proyectos: {
      title: 'Proyectos',
      description: 'Galería editorial premium con casos de estudio que combinan fotografía, motion, packaging y branding en una experiencia visual envolvente.',
      cards: [
        { title: 'Branding', body: 'Identidades estratégicas con una narrativa sólida y aplicaciones para marcas que buscan destacar en mercados competitivos.' },
        { title: 'Diseño editorial', body: 'Layouts expresivos, tipografías con carácter y composiciones que elevan la lectura en revistas, catálogos y propuestas editoriales.' },
        { title: 'Packaging', body: 'Empaques con presencia, materiales únicos y acabados que construyen sensación física antes de abrir el producto.' }
      ],
      footer: '<p>Descubre casos que muestran cómo cada proyecto evoluciona desde un moodboard hasta una propuesta visual completa.</p>'
    },
    experiencia: {
      title: 'Experiencia',
      description: 'Timeline interactivo con campañas, colaboraciones freelance y roles en estudios creativos, presentado como una carpeta de recortes del pasado profesional.',
      cards: [
        { title: 'Trayectoria', body: 'Experiencia en branding, diseño editorial, dirección de arte y proyectos digitales para clientes locales e internacionales.' },
        { title: 'Clientes', body: 'Marcas de moda, cultura, gastronomía, tecnología y editorial con propuestas visuales frescas y una ejecución impecable.' },
        { title: 'Logros', body: 'Proyectos destacados que fueron reconocidos por su creatividad, resultado estratégico y calidad de entrega.' }
      ],
      footer: '<p>Más que un CV: una colección de historias visuales y momentos que demuestran cómo cada paso aporta valor creativo.</p>'
    },
    habilidades: {
      title: 'Habilidades',
      description: 'Muestras reales de capacidades creativas sin barras de progreso, presentadas como resultados palpables de cada talento.',
      cards: [
        { title: 'Branding', body: 'Sistemas de identidad, naming, arquitectura visual y aplicaciones en todos los puntos de contacto.' },
        { title: 'Diseño editorial', body: 'Producción de piezas impresas y digitales con un lenguaje tipográfico y de composición muy definido.' },
        { title: 'Motion graphics', body: 'Animaciones de marca, contenido social y presentaciones con ritmo y mensaje claro.' }
      ],
      footer: '<p>Cada habilidad se muestra con ejemplos tangibles e ideas aplicadas a proyectos reales.</p>'
    },
    software: {
      title: 'Software',
      description: 'Herramientas con las que trabajo para llevar ideas desde el boceto hasta la animación y la dirección de arte.',
      cards: [
        { title: 'Adobe Photoshop', body: 'Edición y composición fotográfica para presentaciones, collages y retoque creativo.' },
        { title: 'Adobe Illustrator', body: 'Ilustraciones, sistemas vectoriales y piezas editorialmente sólidas.' },
        { title: 'Figma', body: 'Interfaces, prototipos y sistemas visuales interactivos para proyectos web y plataformas digitales.' }
      ],
      footer: '<p>Estas herramientas son el motor de mi proceso, usadas siempre en función de la idea y del resultado.</p>'
    },
    proceso: {
      title: 'Proceso creativo',
      description: 'Seis etapas narrativas con ejemplos reales que muestran cómo una idea se convierte en ejecución tangible.',
      cards: [
        { title: 'Descubrir', body: 'Entender el contexto, revisar referencias y encontrar patrones significativos.' },
        { title: 'Investigar', body: 'Explorar tendencias, analizar audiencia y construir un moodboard con intenciones claras.' },
        { title: 'Idear', body: 'Generar variantes visuales, bocetos y conceptos que hablen con sentido propio.' },
        { title: 'Diseñar', body: 'Resolver la idea con tipografía, color, composición y materialidad.' },
        { title: 'Refinar', body: 'Probar, ajustar y elevar la propuesta para que funcione en cada soporte.' },
        { title: 'Implementar', body: 'Entregar soluciones listas para producción, digitalización o activación.' }
      ],
      footer: '<p>El proceso diseñado para que cada proyecto sea flexible, narrativo y con una identidad clara.</p>'
    },
    servicios: {
      title: 'Servicios',
      description: 'Ofrezco soluciones creativas que se sienten propias, pensadas para marcas ambiciosas y proyectos con intención editorial.',
      cards: [
        { title: 'Branding', body: 'Identidades visuales completas y sistemas con personalidad.' },
        { title: 'Diseño para redes sociales', body: 'Contenidos visuales con presencia y ritmo editorial.' },
        { title: 'Producción audiovisual', body: 'Conceptos visuales para video, motion y contenido en movimiento.' }
      ],
      footer: '<p>El servicio se adapta a cada necesidad: desde proyectos completados hasta colaboraciones creativas continuas.</p>'
    },
    testimonios: {
      title: 'Testimonios',
      description: 'Voces de clientes y equipos que hablan del proceso, del resultado y de la experiencia de trabajar juntos.',
      cards: [
        { title: 'Cliente A', body: '"La propuesta fue impecable: una mezcla de personalidad, claridad y ejecución perfecta."' },
        { title: 'Cliente B', body: '"Su enfoque creativo transformó nuestra identidad y la hizo totalmente distintiva."' },
        { title: 'Cliente C', body: '"El trabajo combinó sensibilidad estética con una claridad estratégica impresionante."' }
      ],
      footer: '<p>Comentarios que reflejan profesionalismo, cercanía creativa y resultados con impacto.</p>'
    },
    logros: {
      title: 'Logros y reconocimientos',
      description: 'Un portafolio de certificaciones, publicaciones y participaciones que demuestran compromiso con el diseño de calidad.',
      cards: [
        { title: 'Premios', body: 'Reconocimientos en concursos de branding, packaging y diseño editorial.' },
        { title: 'Publicaciones', body: 'Proyectos destacados en revistas de diseño y plataformas creativas.' },
        { title: 'Eventos', body: 'Charlas, talleres y colaboraciones en espacios de creatividad.' }
      ],
      footer: '<p>Estos logros complementan una práctica creativa basada en resultados y presencia.</p>'
    },
    lab: {
      title: 'Laboratorio creativo',
      description: 'Un descubrimiento secreto dentro del portafolio: ideas experimentales, bocetos y conceptos fuera de lo esperado.',
      cards: [
        { title: 'Sketchbooks', body: 'Bocetos íntimos que muestran cómo nace una forma, una frase y un concepto.' },
        { title: 'Proyectos experimentales', body: 'Exploraciones visuales que no siempre llegan a producción, pero que alimentan el proceso.' },
        { title: 'Detrás de cámaras', body: 'Historias visuales del trabajo manual, las texturas y los momentos creativos del estudio.' }
      ],
      footer: '<p>Un espacio reservado para lo más libre, personal y exploratorio dentro de la práctica creativa.</p>'
    },
    contacto: {
      title: 'Contacto',
      description: '¿Tienes una idea? Convirtámosla en algo inolvidable.',
      cards: [
        { title: 'Email', body: 'hola@victoriamedina.com' },
        { title: 'LinkedIn', body: 'linkedin.com/in/victoriamedina' },
        { title: 'Instagram', body: '@victoriamedina' }
      ],
      footer: '<p>También disponible para proyectos en Behance, WhatsApp y colaboraciones de dirección de arte.</p>'
    }
  };

  const section = sections[section];
  if (!section) return;

  panelContent.innerHTML = `
    <article>
      <h1>${section.title}</h1>
      <p>${section.description}</p>
      <div class="panel-grid">
        ${section.cards
          .map(
            (card) => `
          <section class="panel-card">
            <h2>${card.title}</h2>
            <p>${card.body}</p>
          </section>
        `
          )
          .join('')}
      </div>
      <div class="panel-highlight">${section.footer}</div>
    </article>
  `;
}

function playClickSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.frequency.value = 380;
  gain.gain.value = 0.03;
  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.08);
}

function playTackSound() {
  // Reproducir archivo local si está presente
  const fileAudio = document.getElementById('tackFile');
  if (fileAudio) {
    fileAudio.currentTime = 0;
    fileAudio.volume = 0.9;
    fileAudio.play().catch(() => {
      // fallback a dataURL o síntesis
      if (window.TACK_WAV_DATAURL) {
        const a = new Audio(window.TACK_WAV_DATAURL);
        a.volume = 0.9;
        a.play().catch(synthTack);
      } else {
        synthTack();
      }
    });
    return;
  }

  // Si existe un WAV pre-generado (data URL), usarlo para reproducir
  if (window.TACK_WAV_DATAURL) {
    const a = new Audio(window.TACK_WAV_DATAURL);
    a.volume = 0.9;
    a.play().catch(() => {
      // fallback a síntesis si autoplay bloqueado
      synthTack();
    });
  } else {
    synthTack();
  }
}

function synthTack() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioCtx();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);

  const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.06, audioCtx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  noise.connect(noiseGain).connect(gain);

  osc.connect(gain).connect(audioCtx.destination);
  noise.start();
  osc.start();
  osc.stop(audioCtx.currentTime + 0.12);
  noise.stop(audioCtx.currentTime + 0.06);
}

// Genera un WAV (data URL) con OfflineAudioContext y lo expone como window.TACK_WAV_DATAURL
async function generateTackWavDataUrl() {
  const sampleRate = 44100;
  const duration = 0.12;
  const offline = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

  const osc = offline.createOscillator();
  const g = offline.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, 0);
  osc.frequency.exponentialRampToValueAtTime(260, 0.08);
  g.gain.setValueAtTime(0.0001, 0);
  g.gain.exponentialRampToValueAtTime(0.6, 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, 0.12);
  osc.connect(g).connect(offline.destination);

  // ruido breve
  const noiseBuf = offline.createBuffer(1, sampleRate * 0.06, sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const nsrc = offline.createBufferSource();
  nsrc.buffer = noiseBuf;
  const ng = offline.createGain();
  ng.gain.setValueAtTime(0.04, 0);
  nsrc.connect(ng).connect(offline.destination);

  osc.start(0);
  nsrc.start(0);
  osc.stop(duration);
  nsrc.stop(duration);

  const rendered = await offline.startRendering();

  // encode to wav
  const wav = encodeWAV(rendered.getChannelData(0), sampleRate);
  const dataUrl = 'data:audio/wav;base64,' + btoa(wav);
  window.TACK_WAV_DATAURL = dataUrl;

  // crear enlace de descarga oculto para el .wav
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'tack.wav';
  a.style.display = 'none';
  a.id = 'tackDownload';
  document.body.appendChild(a);
}

function encodeWAV(samples, sampleRate) {
  // convert Float32Array to 16-bit PCM and build WAV file as binary string
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  // PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  // convert to binary string
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return binary;
}

function initParallax() {
  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('resize', () => {
    cx = window.innerWidth / 2;
    cy = window.innerHeight / 2;
  });

  document.addEventListener('pointermove', (e) => {
    mouseX = (e.clientX - cx) / cx; // -1 .. 1
    mouseY = (e.clientY - cy) / cy;
  });

  boardItems.forEach((item, index) => {
    if (!item.dataset.depth) item.dataset.depth = ((index % 4) + 1).toString();
    item.dataset.baseR = item.style.getPropertyValue('--r') || '0deg';
    item.addEventListener('pointerenter', () => item.classList.add('hovered'));
    item.addEventListener('pointerleave', () => item.classList.remove('hovered'));
    item.addEventListener('pointerdown', () => item.classList.add('pressed'));
    item.addEventListener('pointerup', () => item.classList.remove('pressed'));
  });

  function loop() {
    const tx = mouseX * 36;
    const ty = mouseY * 28;

    boardItems.forEach((item) => {
      const depth = parseFloat(item.dataset.depth) || 1;
      const r = item.dataset.baseR || '0deg';

      const offsetX = tx / depth;
      const offsetY = ty / depth;
      const lift = item.classList.contains('hovered') ? -10 : 0;
      const press = item.classList.contains('pressed') ? 0.985 : 1;

      item.style.transform = `translate(-50%, -50%) rotate(${r}) translate3d(${offsetX}px, ${offsetY + lift}px, 0) scale(${press})`;

      const baseShadow = 14 + Math.abs(offsetY) / 2;
      item.style.boxShadow = `0 ${baseShadow}px ${24 + Math.abs(offsetY)}px rgba(0,0,0,0.28)`;
    });

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

function init() {
  randomPhrase();

  enterButton.addEventListener('click', () => {
    // sonido de tachuela y transición cinematográfica
    playTackSound();
    corkWall.classList.add('entered');
    introOverlay.classList.add('hidden');
    setTimeout(() => introOverlay.remove(), 900);
  });

  boardItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (item.dataset.section) openSection(item.dataset.section, item);
    });
  });

  closePanel.addEventListener('click', closeSection);

  window.addEventListener('popstate', (event) => {
    const section = (event.state && event.state.section) || 'home';
    if (section === 'home') {
      closeSection();
    } else {
      openSection(section);
    }
  });

  initParallax();
  // generar WAV descargable en background
  generateTackWavDataUrl().catch(() => {/* no bloquear si falla */});
}

init();
