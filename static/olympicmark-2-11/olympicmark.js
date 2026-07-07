mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlc3NpYXZhc2lsaXUiLCJhIjoiY21wZHNjM2dhMDlwaTJzc2NsN3JoMGhzNSJ9.25VVjXm9hRy_VOh8MD2q1w';

/*
  Struttura:
  1. Landing → mappa generale: resta come nel tuo file.
  2. Nella vista generale i marker NON si vedono.
  3. Scroll successivo: focus fluido su Milano → Cortina → Anterselva.
  4. I marker compaiono solo nella tappa relativa.
*/

const landingView = {
  center: [11.2, 46.1],
  zoom: 7.2,
  pitch: 45,
  bearing: -10
};

const mapView = {
  center: [10.8, 46.0],
  zoom: 7.8,
  pitch: 70,
  bearing: -20
};

const focusViews = {
  milano: {
    center: [9.175, 45.475],
    zoom: 10.15,
    pitch: 48,
    bearing: -12
  },
  cortina: {
    center: [12.1357, 46.5404],
    zoom: 10.15,
    pitch: 48,
    bearing: -12
  },
  anterselva: {
    center: [12.035, 46.855],
    zoom: 10.15,
    pitch: 48,
    bearing: -12
  }
};

const transitViews = {
  milanoToCortina: {
    center: [10.65, 46.10],
    zoom: 8.05,
    pitch: 54,
    bearing: -16
  },
  cortinaToAnterselva: {
    center: [12.08, 46.69],
    zoom: 8.85,
    pitch: 54,
    bearing: -16
  }
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alessiavasiliu/cmr0dpf74000201si6i01hhi8/draft',
  center: landingView.center,
  zoom: landingView.zoom,
  pitch: landingView.pitch,
  bearing: landingView.bearing,
  antialias: true,
  minZoom: 6.8,
  maxZoom: 15,
  maxBounds: [[7.2, 43.8], [14.0, 47.8]],
  interactive: true
});

const initialView = { ...mapView };

// Coordinate adattate per ricadere dentro i confini comunali disegnati (Milano, Cortina d'Ampezzo, Rasun Anterselva).
// Nota: la Fiera Milano Rho nella realtà è nel comune di Rho, quindi è stata spostata
// leggermente verso l'interno di Milano per restare dentro la zona circoscritta richiesta.
const locations = [
  {
    id: 'villaggio-olimpico',
    region: 'milano',
    name: 'Villaggio Olimpico',
    subtitle: 'Milano — sede principale',
    coords: [9.204, 45.484],
    photo: 'images/vo.jpg',
    href: '/villaggio'
  },
  {
    id: 'arena-santa-giulia',
    region: 'milano',
    name: 'Arena Santa Giulia',
    subtitle: 'Milano — hockey su ghiaccio',
    coords: [9.245, 45.450],
    photo: 'images/sgiulia.jpg',
    href: '/arena'
  },
  {
    id: 'fiera-milano-rho',
    region: 'milano',
    name: 'Fiera Milano Rho',
    subtitle: 'Milano — palasport',
    coords: [9.156, 45.479],
    photo: 'images/rho.jpg',
    href: '/palahockey'
  },
  {
    id: 'pista-bob-cortina',
    region: 'cortina',
    name: 'Pista da Bob Cortina',
    subtitle: "Cortina d'Ampezzo",
    coords:  [12.135, 46.537],
    photo: 'images/pistadabob.jpg',
    href: '/bob'
  },
  {
    id: 'anterselva-biathlon',
    region: 'anterselva',
    name: 'Anterselva Biathlon',
    subtitle: 'Alto Adige',
    coords: [12.1696, 46.9300],
    photo: 'images/sb3.jpg',
    href: '/biathlon'
  }
];

let activeLocation = null;
let mapReady = false;
let currentProgress = 0;
let activeRegion = null;
const markerElements = [];

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolateView(a, b, t) {
  const e = easeInOutCubic(clamp(t));
  return {
    center: [
      lerp(a.center[0], b.center[0], e),
      lerp(a.center[1], b.center[1], e)
    ],
    zoom: lerp(a.zoom, b.zoom, e),
    pitch: lerp(a.pitch, b.pitch, e),
    bearing: lerp(a.bearing, b.bearing, e)
  };
}

function setMapInteractivity(enabled) {
  map.scrollZoom.disable();

  const actions = [
    map.boxZoom,
    map.dragRotate,
    map.dragPan,
    map.keyboard,
    map.doubleClickZoom,
    map.touchZoomRotate
  ];

  actions.forEach(action => enabled ? action.enable() : action.disable());
}

function jumpCamera(view) {
  if (!mapReady) return;
  map.jumpTo(view);
}

function updateMapCamera(progress) {
  if (!mapReady) return;

  const t = easeInOutCubic(progress);
  jumpCamera({
    center: [
      lerp(landingView.center[0], mapView.center[0], t),
      lerp(landingView.center[1], mapView.center[1], t)
    ],
    zoom: lerp(landingView.zoom, mapView.zoom, t),
    pitch: lerp(landingView.pitch, mapView.pitch, t),
    bearing: lerp(landingView.bearing, mapView.bearing, t)
  });
}

function getFocusView(progress) {
  const p = clamp(progress);

  if (p < 0.20) {
    return {
      view: interpolateView(mapView, focusViews.milano, p / 0.20),
      region: null
    };
  }

  if (p < 0.34) {
    return { view: focusViews.milano, region: 'milano' };
  }

  if (p < 0.48) {
    return {
      view: interpolateView(focusViews.milano, transitViews.milanoToCortina, (p - 0.34) / 0.14),
      region: null
    };
  }

  if (p < 0.60) {
    return {
      view: interpolateView(transitViews.milanoToCortina, focusViews.cortina, (p - 0.48) / 0.12),
      region: null
    };
  }

  if (p < 0.72) {
    return { view: focusViews.cortina, region: 'cortina' };
  }

  if (p < 0.81) {
    return {
      view: interpolateView(focusViews.cortina, transitViews.cortinaToAnterselva, (p - 0.72) / 0.09),
      region: null
    };
  }

  if (p < 0.92) {
    return {
      view: interpolateView(transitViews.cortinaToAnterselva, focusViews.anterselva, (p - 0.81) / 0.11),
      region: null
    };
  }

  return { view: focusViews.anterselva, region: 'anterselva' };
}

function getRegionScrollTop(region) {
  const focusSpace = document.querySelector('.focus-space');
  if (!focusSpace) return window.innerHeight * 2.2;

  const start = focusSpace.offsetTop;
  const height = Math.max(focusSpace.offsetHeight - window.innerHeight, 1);

  const progressByRegion = {
    milano: 0.28,
    cortina: 0.66,
    anterselva: 0.97
  };

  return start + height * (progressByRegion[region] ?? 0.30);
}

function scrollToRegion(region) {
  const target = getRegionScrollTop(region);
  if (typeof lenis !== 'undefined') {
    lenis.scrollTo(target, { duration: 1.2, easing: t => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}

function inferRegionFromFeature(feature, lngLat = null) {
  const props = feature?.properties || {};
  const rawName = [
    props.name,
    props.NAME,
    props.comune,
    props.name_it,
    props['name:it'],
    props.official_name,
    props.title
  ].filter(Boolean).join(' ').toLowerCase();

  if (rawName.includes('milano') || rawName.includes('milan')) return 'milano';
  if (rawName.includes('cortina')) return 'cortina';
  if (
    rawName.includes('rasun') ||
    rawName.includes('anterselva') ||
    rawName.includes('antholz') ||
    rawName.includes('rasen')
  ) return 'anterselva';

  if (lngLat) {
    const lng = lngLat.lng;
    const lat = lngLat.lat;

    if (lng > 8.85 && lng < 9.45 && lat > 45.30 && lat < 45.65) return 'milano';
    if (lng > 11.85 && lng < 12.45 && lat > 46.35 && lat < 46.75) return 'cortina';
    if (lng > 11.85 && lng < 12.45 && lat > 46.75 && lat < 47.05) return 'anterselva';
  }

  return null;
}

function setVisibleRegion(region) {
  activeRegion = region;

  document.body.classList.toggle('focus-region-active', Boolean(region));
  document.body.classList.toggle('markers-enabled', Boolean(region));
  document.body.dataset.focusRegion = region || '';

  markerElements.forEach(({ el, location }) => {
    const visible = Boolean(region) && location.region === region;
    el.classList.toggle('marker-visible', visible);
    el.setAttribute('aria-hidden', visible ? 'false' : 'true');
  });

  if (!region) hidePlacePreview();
}

function hideAllMarkers() {
  activeRegion = null;
  document.body.classList.remove('focus-region-active', 'markers-enabled');
  document.body.dataset.focusRegion = '';

  markerElements.forEach(({ el }) => {
    el.classList.remove('marker-visible', 'marker-hovered');
    el.setAttribute('aria-hidden', 'true');
  });
  hidePlacePreview();
}

function positionPlacePreview(location) {
  const preview = document.getElementById('placePreview');
  if (!preview || !location) return;

  const point = map.project(location.coords);
  const offsetX = 34;
  const offsetY = 28;

  preview.style.left = `${point.x + offsetX}px`;
  preview.style.top = `${point.y + offsetY}px`;
}

function showPlacePreview(location, el) {
  if (!document.body.classList.contains('focus-region-active')) return;
  if (!el.classList.contains('marker-visible')) return;

  markerElements.forEach(({ el: otherEl }) => {
    if (otherEl !== el) otherEl.classList.remove('marker-hovered');
  });

  const preview = document.getElementById('placePreview');
  const previewImg = document.getElementById('placePreviewImg');
  const title = document.getElementById('placeTitle');

  if (preview && previewImg) {
    previewImg.src = location.photo;
    previewImg.alt = location.name;
    preview.dataset.locationId = location.id;
    positionPlacePreview(location);
    preview.classList.add('visible');
  }

  if (title) {
    title.textContent = location.name;
    title.classList.add('visible');
  }

  el.classList.add('marker-hovered');
}

function hidePlacePreview() {
  const preview = document.getElementById('placePreview');
  const title = document.getElementById('placeTitle');

  if (preview) {
    preview.classList.remove('visible');
    preview.dataset.locationId = '';
  }

  if (title) title.classList.remove('visible');

  markerElements.forEach(({ el }) => el.classList.remove('marker-hovered'));
}

function openPhoto(location) {
  activeLocation = location;
  document.getElementById('photoImg').src = location.photo;
  document.getElementById('photoCaption').textContent = location.name;
  document.getElementById('photoModal').classList.add('open');
}

function resetView() {
  hideAllMarkers();
  activeLocation = null;

  map.flyTo({
    ...initialView,
    duration: 1700,
    curve: 1.25,
    speed: 0.9,
    essential: true
  });

  const overviewScroll = window.innerHeight * 1.35;
  if (typeof lenis !== 'undefined') {
    lenis.scrollTo(overviewScroll, { duration: 0.9 });
  } else {
    window.scrollTo({ top: overviewScroll, behavior: 'smooth' });
  }
}

map.on('load', () => {
  mapReady = true;
  setMapInteractivity(false);
  hideAllMarkers();

  if (!map.getSource('olympic-areas')) {
    map.addSource('olympic-areas', {
      type: 'geojson',
      data: 'data/olympic-areas.geojson',
      generateId: true
    });

    const firstLabelId = map.getStyle().layers.find(
      l => l.type === 'symbol' && l.layout && l.layout['text-field']
    )?.id;

    map.addLayer({
      id: 'olympic-areas-fill',
      type: 'fill',
      source: 'olympic-areas',
      paint: {
        'fill-color': '#0870ED',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.26,
          0.12
        ]
      }
    }, firstLabelId);

    map.addLayer({
      id: 'olympic-areas-line',
      type: 'line',
      source: 'olympic-areas',
      paint: {
        'line-color': '#0870ED',
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          3.8,
          2
        ],
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0.85
        ]
      }
    }, firstLabelId);

    let hoveredRegionFeatureId = null;

    function clearHoveredRegion() {
      if (hoveredRegionFeatureId !== null && map.getSource('olympic-areas')) {
        map.setFeatureState(
          { source: 'olympic-areas', id: hoveredRegionFeatureId },
          { hover: false }
        );
      }
      hoveredRegionFeatureId = null;
    }

    function handleRegionClick(region) {
      if (!region) return;
      hidePlacePreview();
      scrollToRegion(region);
    }

    map.on('mousemove', 'olympic-areas-fill', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      if (!e.features || !e.features.length) return;

      const featureId = e.features[0].id;
      if (featureId === undefined || featureId === null) return;

      if (hoveredRegionFeatureId !== featureId) {
        clearHoveredRegion();
        hoveredRegionFeatureId = featureId;
        map.setFeatureState(
          { source: 'olympic-areas', id: hoveredRegionFeatureId },
          { hover: true }
        );
      }
    });

    map.on('mouseleave', 'olympic-areas-fill', () => {
      map.getCanvas().style.cursor = '';
      clearHoveredRegion();
    });

    map.on('click', 'olympic-areas-fill', (e) => {
      if (!e.features || !e.features.length) return;
      const region = inferRegionFromFeature(e.features[0], e.lngLat);
      handleRegionClick(region);
    });

    const studioRegionLayerIds = map.getStyle().layers
      .filter(layer => {
        if (layer.id === 'olympic-areas-fill' || layer.id === 'olympic-areas-line') return false;
        if (layer.type !== 'fill') return false;
        const sourceName = String(layer.source || '').toLowerCase();
        return sourceName.includes('alessiavasiliu') || sourceName.includes('export') || sourceName.includes('olympic');
      })
      .map(layer => layer.id);

    studioRegionLayerIds.forEach(layerId => {
      let originalOpacity = map.getPaintProperty(layerId, 'fill-opacity');

      map.on('mousemove', layerId, () => {
        map.getCanvas().style.cursor = 'pointer';
        try { map.setPaintProperty(layerId, 'fill-opacity', 0.28); } catch (_) {}
      });

      map.on('mouseleave', layerId, () => {
        map.getCanvas().style.cursor = '';
        try { map.setPaintProperty(layerId, 'fill-opacity', originalOpacity ?? 0.14); } catch (_) {}
      });

      map.on('click', layerId, (e) => {
        if (!e.features || !e.features.length) return;
        const region = inferRegionFromFeature(e.features[0], e.lngLat);
        handleRegionClick(region);
      });
    });
  }

  locations.forEach(location => {
    const el = document.createElement('div');
    el.className = 'site-marker';
    el.dataset.region = location.region;
    el.setAttribute('aria-label', location.name);

    el.innerHTML = `
      <button class="marker-dot" type="button" aria-label="${location.name}"></button>
    `;

    const btn = el.querySelector('.marker-dot');

    el.addEventListener('mouseenter', () => showPlacePreview(location, el));
    el.addEventListener('mouseleave', hidePlacePreview);
    btn.addEventListener('focus', () => showPlacePreview(location, el));
    btn.addEventListener('blur', hidePlacePreview);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!el.classList.contains('marker-visible')) return;
      if (location.href) {
        window.top.location.href = location.href;
        return;
      }
      openPhoto(location);
    });

    new mapboxgl.Marker({ element: el, draggable: false, anchor: 'center' })
      .setLngLat(location.coords)
      .addTo(map);

    markerElements.push({ el, location });
  });

  updateMapCamera(currentProgress);
});


map.on('move', () => {
  const preview = document.getElementById('placePreview');
  const activeId = preview?.dataset.locationId;
  if (!activeId) return;

  const location = locations.find(item => item.id === activeId);
  if (location) positionPlacePreview(location);
});

/* ── CONTROLLI MAPPA ── */
document.getElementById('resetBtn').addEventListener('click', resetView);

document.getElementById('photoClose').addEventListener('click', () => {
  document.getElementById('photoModal').classList.remove('open');
});

document.getElementById('zoomInBtn').addEventListener('click', () => {
  map.zoomIn({ duration: 400 });
});

document.getElementById('zoomOutBtn').addEventListener('click', () => {
  map.zoomOut({ duration: 400 });
});

/* ── NAV SWITCH ── */
const mapBtn = document.getElementById('mapBtn');
const indexBtn = document.getElementById('indexBtn');

mapBtn.addEventListener('click', () => {
  if (typeof lenis !== 'undefined') {
    lenis.scrollTo(window.innerHeight * 1.35, { duration: 0.85 });
  } else {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }
});

indexBtn.addEventListener('click', () => {
  window.top.location.href = '/';
});

/* ── TRANSIZIONE FLUIDA: GSAP + SCROLLTRIGGER + LENIS ── */
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.18,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.78,
  easing: t => 1 - Math.pow(1 - t, 3)
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const title = document.getElementById('mainTitle');
const label = document.querySelector('.hero-label');
const desc = document.querySelector('.hero-desc');
const hint = document.querySelector('.scroll-hint');
const bgOverlay = document.querySelector('.bg-overlay');
const mapOverlay = document.querySelector('.overlay');
const controls = document.querySelector('.map-controls');
const fadingEls = [label, desc, hint].filter(Boolean);

/* ── HOVER SUL TITOLO "OLYMPIC MARK": leggero ingrandimento al passaggio del mouse ──
   Attivo SOLO mentre il titolo è ancora grande (stato iniziale della landing).
   Appena parte lo scroll e il titolo inizia a rimpicciolirsi/spostarsi, l'hover si disattiva. */
let titleHoverTween = null;
let titleHoverEnabled = true;

if (title) {
  title.style.transformOrigin = 'top left';
  title.style.willChange = 'transform';
  title.style.cursor = 'default';

  title.addEventListener('mouseenter', () => {
    if (!titleHoverEnabled) return;
    if (titleHoverTween) titleHoverTween.kill();
    titleHoverTween = gsap.to(title, {
      scale: 1.045,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  });

  title.addEventListener('mouseleave', () => {
    if (!titleHoverEnabled) return;
    if (titleHoverTween) titleHoverTween.kill();
    titleHoverTween = gsap.to(title, {
      scale: 1,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  });
}

function buildTitleAnimation() {
  gsap.set(title, {
    clearProps: 'transform,color,letterSpacing'
  });

  const titleRect = title.getBoundingClientRect();
  const targetLeft = 40;
  const targetTop = 40;
  const targetFontSize = 35.2;
  const currentFontSize = parseFloat(getComputedStyle(title).fontSize);
  const scale = targetFontSize / currentFontSize;

  const x = targetLeft - titleRect.left;
  const y = targetTop - titleRect.top;

  return { x, y, scale };
}

let titleMotion = buildTitleAnimation();

window.addEventListener('resize', () => {
  titleMotion = buildTitleAnimation();
  ScrollTrigger.refresh();
});

// PRIMA TRANSIZIONE: landing → vista generale della mappa.
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.scroll-space',
    start: 'top top',
    end: '+=120%',
    scrub: 0.85,
    invalidateOnRefresh: true,
    onUpdate: self => {
      currentProgress = self.progress;
      updateMapCamera(currentProgress);

      // Disattiva l'hover-ingrandimento del titolo appena inizia a rimpicciolirsi/spostarsi.
      // Lo riattiva solo se si torna del tutto all'inizio (progress 0).
      const shouldEnableHover = self.progress <= 0.001;
      if (shouldEnableHover !== titleHoverEnabled) {
        titleHoverEnabled = shouldEnableHover;
        if (!titleHoverEnabled && titleHoverTween) {
          titleHoverTween.kill();
        }
      }

      const active = self.progress > 0.82;
      document.body.classList.toggle('map-active', active);
      setMapInteractivity(active);

      if (!active) hideAllMarkers();

      mapBtn.classList.toggle('active', active);
      indexBtn.classList.toggle('active', !active);
    }
  }
});

tl.to(title, {
  x: () => titleMotion.x,
  y: () => titleMotion.y,
  scale: () => titleMotion.scale,
  color: '#0870ED',
  letterSpacing: '-1px',
  ease: 'power2.inOut',
  duration: 1
}, 0);

tl.to(fadingEls, {
  autoAlpha: 0,
  y: -18,
  ease: 'power2.out',
  duration: 0.45,
  stagger: 0.03
}, 0.08);

tl.to(bgOverlay, {
  autoAlpha: 0,
  ease: 'power2.inOut',
  duration: 0.9
}, 0.12);

tl.to(mapOverlay, {
  autoAlpha: 1,
  ease: 'power2.inOut',
  duration: 0.8
}, 0.25);

tl.to(controls, {
  autoAlpha: 1,
  ease: 'power2.out',
  duration: 0.45
}, 0.72);

ScrollTrigger.addEventListener('refresh', () => {
  titleMotion = buildTitleAnimation();
});

/* ─────────────────────────────────────────────
   NUOVE TAPPE DI SCROLL: Milano → Cortina → Anterselva.
   Scrub leggermente più morbido per eliminare i micro-scatti
   percepibili nei passaggi tra una regione e l'altra.
───────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.focus-space',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 0.9,
  onUpdate: self => {
    if (!mapReady) return;

    document.body.classList.add('map-active');
    setMapInteractivity(true);

    const { view, region } = getFocusView(self.progress);
    jumpCamera(view);

    setVisibleRegion(region);
    if (!region) hidePlacePreview();
  },
  onLeaveBack: () => {
    hideAllMarkers();
    jumpCamera(mapView);
  }
});

if (new URLSearchParams(window.location.search).get('view') === 'map') {
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      const target = window.innerHeight * 1.35;
      if (typeof lenis !== 'undefined') {
        lenis.scrollTo(target, { duration: 0.01, immediate: true });
      } else {
        window.scrollTo(0, target);
      }
    });
  });
}
