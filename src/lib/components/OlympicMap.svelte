<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const MAPBOX_JS = 'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js';
	const MAPBOX_CSS = 'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css';
	const MAPBOX_TOKEN =
		'pk.eyJ1IjoiYWxlc3NpYXZhc2lsaXUiLCJhIjoiY21wZHNjM2dhMDlwaTJzc2NsN3JoMGhzNSJ9.25VVjXm9hRy_VOh8MD2q1w';

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
			center: [10.65, 46.1],
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

	const locations = [
		{
			id: 'villaggio-olimpico',
			region: 'milano',
			name: 'Villaggio Olimpico',
			coords: [9.204, 45.484],
			photo: '/olympicmark-2-11/images/vo.jpg',
			href: '/villaggio'
		},
		{
			id: 'arena-santa-giulia',
			region: 'milano',
			name: 'Arena Santa Giulia',
			coords: [9.245, 45.45],
			photo: '/olympicmark-2-11/images/sgiulia.jpg',
			href: '/arena'
		},
		{
			id: 'fiera-milano-rho',
			region: 'milano',
			name: 'Fiera Milano Rho',
			coords: [9.156, 45.479],
			photo: '/olympicmark-2-11/images/rho.jpg',
			href: '/palahockey'
		},
		{
			id: 'pista-bob-cortina',
			region: 'cortina',
			name: 'Pista da Bob Cortina',
			coords: [12.135, 46.537],
			photo: '/olympicmark-2-11/images/pistadabob.jpg',
			href: '/bob'
		},
		{
			id: 'anterselva-biathlon',
			region: 'anterselva',
			name: 'Anterselva Biathlon',
			coords: [12.1696, 46.93],
			photo: '/olympicmark-2-11/images/sb3.jpg',
			href: '/biathlon'
		}
	];

	/** @type {HTMLElement | undefined} */
	let rootElement;
	/** @type {HTMLDivElement | undefined} */
	let mapElement;
	/** @type {HTMLElement | undefined} */
	let introSpace;
	/** @type {HTMLElement | undefined} */
	let focusSpace;
	/** @type {HTMLDivElement | undefined} */
	let placePreview;
	/** @type {HTMLImageElement | undefined} */
	let placePreviewImg;
	/** @type {HTMLDivElement | undefined} */
	let placeTitle;

	/** @type {any} */
	let map;
	/** @type {{ el: HTMLElement, location: (typeof locations)[number] }[]} */
	let markerElements = [];
	let mapReady = $state(false);
	let mapError = $state('');
	let frameRequested = false;

	/** @param {string} src */
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const existing = document.querySelector(`script[src="${src}"]`);

			if (existing) {
				existing.addEventListener('load', () => resolve(undefined), { once: true });
				resolve(undefined);
				return;
			}

			const script = document.createElement('script');
			script.src = src;
			script.async = true;
			script.addEventListener('load', () => resolve(undefined), { once: true });
			script.addEventListener('error', () => reject(new Error(`Impossibile caricare ${src}`)), {
				once: true
			});
			document.head.append(script);
		});
	}

	/** @param {number} value */
	function clamp(value, min = 0, max = 1) {
		return Math.max(min, Math.min(max, value));
	}

	/** @param {number} a @param {number} b @param {number} t */
	function lerp(a, b, t) {
		return a + (b - a) * t;
	}

	/** @param {number} t */
	function easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}

	/**
	 * @param {{ center: number[], zoom: number, pitch: number, bearing: number }} a
	 * @param {{ center: number[], zoom: number, pitch: number, bearing: number }} b
	 * @param {number} t
	 */
	function interpolateView(a, b, t) {
		const eased = easeInOutCubic(clamp(t));

		return {
			center: [
				lerp(a.center[0], b.center[0], eased),
				lerp(a.center[1], b.center[1], eased)
			],
			zoom: lerp(a.zoom, b.zoom, eased),
			pitch: lerp(a.pitch, b.pitch, eased),
			bearing: lerp(a.bearing, b.bearing, eased)
		};
	}

	/** @param {number} progress */
	function getIntroView(progress) {
		const t = easeInOutCubic(clamp(progress));

		return {
			center: [
				lerp(landingView.center[0], mapView.center[0], t),
				lerp(landingView.center[1], mapView.center[1], t)
			],
			zoom: lerp(landingView.zoom, mapView.zoom, t),
			pitch: lerp(landingView.pitch, mapView.pitch, t),
			bearing: lerp(landingView.bearing, mapView.bearing, t)
		};
	}

	/** @param {number} progress */
	function setIntroProgress(progress) {
		const p = clamp(progress);

		rootElement?.style.setProperty('--map-intro-progress', p.toFixed(4));
		rootElement?.classList.toggle('is-map-active', p > 0.82);
		rootElement?.classList.toggle('is-intro-complete', p > 0.98);
	}

	function getOverviewScrollTop() {
		const focusStart = focusSpace?.offsetTop ?? (introSpace?.offsetHeight || window.innerHeight * 1.35);
		return Math.max(focusStart - 1, 0);
	}

	/** @param {number} progress */
	function getFocusView(progress) {
		const p = clamp(progress);

		if (p < 0.2) {
			return {
				view: interpolateView(mapView, focusViews.milano, p / 0.2),
				region: ''
			};
		}

		if (p < 0.34) return { view: focusViews.milano, region: 'milano' };

		if (p < 0.48) {
			return {
				view: interpolateView(focusViews.milano, transitViews.milanoToCortina, (p - 0.34) / 0.14),
				region: ''
			};
		}

		if (p < 0.6) {
			return {
				view: interpolateView(transitViews.milanoToCortina, focusViews.cortina, (p - 0.48) / 0.12),
				region: ''
			};
		}

		if (p < 0.72) return { view: focusViews.cortina, region: 'cortina' };

		if (p < 0.81) {
			return {
				view: interpolateView(focusViews.cortina, transitViews.cortinaToAnterselva, (p - 0.72) / 0.09),
				region: ''
			};
		}

		if (p < 0.92) {
			return {
				view: interpolateView(transitViews.cortinaToAnterselva, focusViews.anterselva, (p - 0.81) / 0.11),
				region: ''
			};
		}

		return { view: focusViews.anterselva, region: 'anterselva' };
	}

	/** @param {{ center: number[], zoom: number, pitch: number, bearing: number }} view */
	function jumpCamera(view) {
		if (!mapReady || !map) return;
		map.jumpTo(view);
	}

	/** @param {boolean} enabled */
	function setMapInteractivity(enabled) {
		if (!map) return;

		map.scrollZoom.disable();

		const actions = [
			map.boxZoom,
			map.dragRotate,
			map.dragPan,
			map.keyboard,
			map.doubleClickZoom,
			map.touchZoomRotate
		];

		actions.forEach((action) => (enabled ? action.enable() : action.disable()));
	}

	/** @param {string} region */
	function setVisibleRegion(region) {
		rootElement?.classList.toggle('is-focus-region-active', Boolean(region));
		rootElement?.classList.toggle('is-markers-enabled', Boolean(region));

		if (rootElement) rootElement.dataset.focusRegion = region;

		markerElements.forEach(({ el, location }) => {
			const visible = Boolean(region) && location.region === region;
			el.classList.toggle('marker-visible', visible);
			el.setAttribute('aria-hidden', visible ? 'false' : 'true');
		});

		if (!region) hidePlacePreview();
	}

	function hideAllMarkers() {
		rootElement?.classList.remove('is-focus-region-active', 'is-markers-enabled');
		if (rootElement) rootElement.dataset.focusRegion = '';

		markerElements.forEach(({ el }) => {
			el.classList.remove('marker-visible', 'marker-hovered');
			el.setAttribute('aria-hidden', 'true');
		});

		hidePlacePreview();
	}

	/** @param {(typeof locations)[number]} location */
	function positionPlacePreview(location) {
		if (!placePreview || !map) return;

		const point = map.project(location.coords);
		placePreview.style.left = `${point.x + 34}px`;
		placePreview.style.top = `${point.y + 28}px`;
	}

	/**
	 * @param {(typeof locations)[number]} location
	 * @param {HTMLElement} el
	 */
	function showPlacePreview(location, el) {
		if (!el.classList.contains('marker-visible')) return;

		markerElements.forEach(({ el: otherEl }) => {
			if (otherEl !== el) otherEl.classList.remove('marker-hovered');
		});

		if (placePreview && placePreviewImg) {
			placePreviewImg.src = location.photo;
			placePreviewImg.alt = location.name;
			placePreview.dataset.locationId = location.id;
			positionPlacePreview(location);
			placePreview.classList.add('visible');
		}

		if (placeTitle) {
			placeTitle.textContent = location.name;
			placeTitle.classList.add('visible');
		}

		el.classList.add('marker-hovered');
	}

	function hidePlacePreview() {
		if (placePreview) {
			placePreview.classList.remove('visible');
			placePreview.dataset.locationId = '';
		}

		placeTitle?.classList.remove('visible');
		markerElements.forEach(({ el }) => el.classList.remove('marker-hovered'));
	}

	/** @param {string} region */
	function getRegionScrollTop(region) {
		if (!focusSpace) return window.innerHeight;

		const start = focusSpace.offsetTop;
		const height = Math.max(focusSpace.offsetHeight - window.innerHeight, 1);
		/** @type {Record<string, number>} */
		const progressByRegion = {
			milano: 0.28,
			cortina: 0.66,
			anterselva: 0.97
		};

		return start + height * (progressByRegion[region] ?? 0.3);
	}

	/** @param {string} region */
	function scrollToRegion(region) {
		window.scrollTo({
			top: getRegionScrollTop(region),
			behavior: 'smooth'
		});
	}

	function resetView() {
		hideAllMarkers();
		setIntroProgress(1);
		window.scrollTo({ top: getOverviewScrollTop(), behavior: 'smooth' });

		map?.flyTo({
			...mapView,
			duration: 1400,
			curve: 1.2,
			speed: 0.9,
			essential: true
		});
	}

	function zoomIn() {
		map?.zoomIn({ duration: 400 });
	}

	function zoomOut() {
		map?.zoomOut({ duration: 400 });
	}

	/** @param {any} feature @param {any} lngLat */
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
		]
			.filter(Boolean)
			.join(' ')
			.toLowerCase();

		if (rawName.includes('milano') || rawName.includes('milan')) return 'milano';
		if (rawName.includes('cortina')) return 'cortina';
		if (
			rawName.includes('rasun') ||
			rawName.includes('anterselva') ||
			rawName.includes('antholz') ||
			rawName.includes('rasen')
		) {
			return 'anterselva';
		}

		if (lngLat) {
			const lng = lngLat.lng;
			const lat = lngLat.lat;

			if (lng > 8.85 && lng < 9.45 && lat > 45.3 && lat < 45.65) return 'milano';
			if (lng > 11.85 && lng < 12.45 && lat > 46.35 && lat < 46.75) return 'cortina';
			if (lng > 11.85 && lng < 12.45 && lat > 46.75 && lat < 47.05) return 'anterselva';
		}

		return '';
	}

	function updateFromScroll() {
		frameRequested = false;
		if (!focusSpace) return;

		const start = focusSpace.offsetTop;
		const end = start + Math.max(focusSpace.offsetHeight - window.innerHeight, 1);

		if (window.scrollY < start) {
			const introProgress = clamp(window.scrollY / Math.max(start, 1));
			setIntroProgress(introProgress);

			if (!mapReady || !map) return;

			setMapInteractivity(introProgress > 0.82);
			hideAllMarkers();
			jumpCamera(getIntroView(introProgress));
			return;
		}

		if (!mapReady || !map) return;

		setIntroProgress(1);
		setMapInteractivity(true);

		const progress = clamp((window.scrollY - start) / Math.max(end - start, 1));
		const { view, region } = getFocusView(progress);
		jumpCamera(view);
		setVisibleRegion(region);
	}

	function requestScrollUpdate() {
		if (frameRequested) return;
		frameRequested = true;
		requestAnimationFrame(updateFromScroll);
	}

	/** @param {(typeof locations)[number]} location */
	function createMarkerElement(location) {
		const el = document.createElement('div');
		const button = document.createElement('button');

		el.className = 'site-marker';
		el.dataset.region = location.region;
		el.setAttribute('aria-label', location.name);
		el.setAttribute('aria-hidden', 'true');

		button.className = 'marker-dot';
		button.type = 'button';
		button.setAttribute('aria-label', location.name);
		el.append(button);

		el.addEventListener('mouseenter', () => showPlacePreview(location, el));
		el.addEventListener('mouseleave', hidePlacePreview);
		button.addEventListener('focus', () => showPlacePreview(location, el));
		button.addEventListener('blur', hidePlacePreview);
		button.addEventListener('click', (event) => {
			event.stopPropagation();
			if (!el.classList.contains('marker-visible')) return;
			goto(location.href);
		});

		return el;
	}

	onMount(() => {
		let cancelled = false;

		async function initMap() {
			try {
				await loadScript(MAPBOX_JS);
				if (cancelled || !mapElement) return;

				const mapboxgl = /** @type {Window & { mapboxgl?: any }} */ (window).mapboxgl;
				if (!mapboxgl) throw new Error('Mapbox non disponibile');

				mapboxgl.accessToken = MAPBOX_TOKEN;

				map = new mapboxgl.Map({
					container: mapElement,
					style: 'mapbox://styles/alessiavasiliu/cmr0dpf74000201si6i01hhi8/draft',
					center: landingView.center,
					zoom: landingView.zoom,
					pitch: landingView.pitch,
					bearing: landingView.bearing,
					antialias: true,
					minZoom: 6.8,
					maxZoom: 15,
					maxBounds: [
						[7.2, 43.8],
						[14.0, 47.8]
					],
					interactive: true
				});

				map.scrollZoom.disable();

				map.on('load', () => {
					if (cancelled) return;

					mapReady = true;
					setMapInteractivity(false);
					hideAllMarkers();

					if (!map.getSource('olympic-areas')) {
						map.addSource('olympic-areas', {
							type: 'geojson',
							data: '/olympicmark-2-11/data/olympic-areas.geojson',
							generateId: true
						});

						const firstLabelId = map.getStyle().layers.find(
							/** @param {any} layer */
							(layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
						)?.id;

						map.addLayer(
							{
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
							},
							firstLabelId
						);

						map.addLayer(
							{
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
							},
							firstLabelId
						);

						/** @type {number | string | null} */
						let hoveredRegionFeatureId = null;

						function clearHoveredRegion() {
							if (hoveredRegionFeatureId === null || !map.getSource('olympic-areas')) return;

							map.setFeatureState(
								{ source: 'olympic-areas', id: hoveredRegionFeatureId },
								{ hover: false }
							);
							hoveredRegionFeatureId = null;
						}

						/** @param {any} event */
						function handleAreaMouseMove(event) {
							map.getCanvas().style.cursor = 'pointer';
							if (!event.features?.length) return;

							const featureId = event.features[0].id;
							if (featureId === undefined || featureId === null) return;

							if (hoveredRegionFeatureId !== featureId) {
								clearHoveredRegion();
								hoveredRegionFeatureId = featureId;
								map.setFeatureState(
									{ source: 'olympic-areas', id: hoveredRegionFeatureId },
									{ hover: true }
								);
							}
						}

						/** @param {any} event */
						function handleAreaClick(event) {
							if (!event.features?.length) return;
							const region = inferRegionFromFeature(event.features[0], event.lngLat);
							if (!region) return;
							hidePlacePreview();
							scrollToRegion(region);
						}

						map.on('mousemove', 'olympic-areas-fill', handleAreaMouseMove);
						map.on('mouseleave', 'olympic-areas-fill', () => {
							map.getCanvas().style.cursor = '';
							clearHoveredRegion();
						});
						map.on('click', 'olympic-areas-fill', handleAreaClick);

						/** @type {string[]} */
						const studioRegionLayerIds = map
							.getStyle()
							.layers.filter(
								/** @param {any} layer */
								(layer) => {
									if (layer.id === 'olympic-areas-fill' || layer.id === 'olympic-areas-line') {
										return false;
									}
									if (layer.type !== 'fill') return false;

									const sourceName = String(layer.source || '').toLowerCase();
									return (
										sourceName.includes('alessiavasiliu') ||
										sourceName.includes('export') ||
										sourceName.includes('olympic')
									);
								}
							)
							.map(/** @param {any} layer */ (layer) => String(layer.id));

						studioRegionLayerIds.forEach((layerId) => {
							const originalOpacity = map.getPaintProperty(layerId, 'fill-opacity');

							map.on('mousemove', layerId, () => {
								map.getCanvas().style.cursor = 'pointer';
								try {
									map.setPaintProperty(layerId, 'fill-opacity', 0.28);
								} catch (_) {
									// Mapbox studio layers can vary between style versions.
								}
							});

							map.on('mouseleave', layerId, () => {
								map.getCanvas().style.cursor = '';
								try {
									map.setPaintProperty(layerId, 'fill-opacity', originalOpacity ?? 0.14);
								} catch (_) {
									// Mapbox studio layers can vary between style versions.
								}
							});

							/** @param {any} event */
							function handleStudioLayerClick(event) {
								if (!event.features?.length) return;
								const region = inferRegionFromFeature(event.features[0], event.lngLat);
								if (region) scrollToRegion(region);
							}

							map.on('click', layerId, handleStudioLayerClick);
						});
					}

					locations.forEach((location) => {
						const el = createMarkerElement(location);

						new mapboxgl.Marker({ element: el, draggable: false, anchor: 'center' })
							.setLngLat(location.coords)
							.addTo(map);

						markerElements.push({ el, location });
					});

					map.on('move', () => {
						const activeId = placePreview?.dataset.locationId;
						if (!activeId) return;

						const location = locations.find((item) => item.id === activeId);
						if (location) positionPlacePreview(location);
					});

					requestScrollUpdate();
				});
			} catch (_) {
				mapError = 'La mappa non riesce a caricarsi.';
			}
		}

		window.addEventListener('scroll', requestScrollUpdate, { passive: true });
		window.addEventListener('resize', requestScrollUpdate);
		initMap();

		return () => {
			cancelled = true;
			window.removeEventListener('scroll', requestScrollUpdate);
			window.removeEventListener('resize', requestScrollUpdate);
			markerElements = [];
			map?.remove();
			map = undefined;
		};
	});
</script>

<svelte:head>
	<link href={MAPBOX_CSS} rel="stylesheet" />
</svelte:head>

<section class="olympic-map" bind:this={rootElement} aria-label="Mappa dei luoghi olimpici">
	<div class="olympic-map__stage" aria-hidden={mapError ? 'true' : 'false'}>
		<div class="olympic-map__canvas" bind:this={mapElement}></div>
		<div class="olympic-map__overlay"></div>
	</div>

	<div class="olympic-map__landing-overlay" aria-hidden="true"></div>

	<div class="olympic-map__hero">
		<p class="olympic-map__hero-label olympic-map__hero-hover">Milano · Cortina 2026</p>
		<h1 class="olympic-map__hero-title olympic-map__hero-hover" id="mainTitle">
			<span>I LUOGHI <br />OLIMPICI</span>
		</h1>
		<p class="olympic-map__hero-desc olympic-map__hero-hover">
			Esplora i luoghi olimpici sul territorio.<br />Un atlante interattivo delle eredità dei Giochi.
		</p>
		<p class="olympic-map__scroll-hint">Scorri verso il basso <span></span></p>
	</div>

	{#if !mapReady && !mapError}
		<p class="olympic-map__status">Caricamento mappa</p>
	{/if}

	{#if mapError}
		<p class="olympic-map__status olympic-map__status--error">{mapError}</p>
	{/if}

	<div class="map-controls" aria-label="Controlli mappa">
		<button class="map-ctrl-btn" type="button" title="Vista generale" aria-label="Vista generale" onclick={resetView}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="3" />
				<path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
				<path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
			</svg>
		</button>

		<button class="map-ctrl-btn" type="button" title="Zoom in" aria-label="Zoom in" onclick={zoomIn}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
		</button>

		<button class="map-ctrl-btn" type="button" title="Zoom out" aria-label="Zoom out" onclick={zoomOut}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
		</button>
	</div>

	<div class="place-preview" bind:this={placePreview} aria-hidden="true">
		<img bind:this={placePreviewImg} src="" alt="" />
	</div>

	<div class="place-title" bind:this={placeTitle} aria-hidden="true"></div>

	<div class="olympic-map__intro-space" bind:this={introSpace} aria-hidden="true"></div>
	<div class="olympic-map__focus-space" bind:this={focusSpace} aria-hidden="true"></div>
</section>

<style>
	.olympic-map {
		--map-intro-progress: 0;

		position: relative;
		min-height: 540vh;
		background: #080810;
		color: #ffffff;
	}

	.olympic-map__stage {
		position: fixed;
		inset: 0;
		z-index: 0;
		background: #080810;
	}

	.olympic-map__canvas {
		position: absolute;
		inset: 0;
		width: 100vw;
		height: 100vh;
	}

	.olympic-map__overlay {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.65) 0%,
			rgba(0, 0, 0, 0.05) 40%,
			rgba(0, 0, 0, 0.05) 60%,
			rgba(0, 0, 0, 0.65) 100%
		);
		opacity: var(--map-intro-progress);
		transition: opacity 0.12s linear;
	}

	.olympic-map__landing-overlay {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: linear-gradient(
			90deg,
			#080810 0%,
			#080810 30%,
			rgba(8, 8, 16, 0.98) 40%,
			rgba(8, 8, 16, 0.9) 50%,
			rgba(8, 8, 16, 0.75) 60%,
			rgba(8, 8, 16, 0.45) 70%,
			rgba(8, 8, 16, 0.15) 85%,
			transparent 100%
		);
		opacity: calc(1 - var(--map-intro-progress));
		transition: opacity 0.12s linear;
	}

	.olympic-map__hero {
		position: fixed;
		top: 50%;
		left: 8vw;
		z-index: 10;
		max-width: 500px;
		pointer-events: none;
		opacity: calc(1 - var(--map-intro-progress));
		transform: translateY(-50%);
		animation: map-hero-enter 0.9s ease;
	}

	.olympic-map__hero-label {
		margin: 0 0 13px;
		color: var(--colors-content-primary);
		font-family: var(--font-primary);
		font-size: 0.78rem;
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 3px;
		text-transform: uppercase;
	}

	.olympic-map__hero-title {
		margin: 0 0 24px;
		color: #ffffff;
		font-family: var(--font-primary);
		font-size: clamp(3.5rem, 8vw, 7rem);
		font-weight: var(--font-weight-black);
		line-height: 0.92;
		letter-spacing: 0;
		text-transform: uppercase;
		transition: color 0.16s linear;
	}

	.olympic-map__hero-title span {
		display: inline-block;
	}

	.olympic-map__hero-desc {
		margin: 0 0 40px;
		color: rgba(255, 255, 255, 0.5);
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: var(--font-weight-regular);
		line-height: 1.65;
		letter-spacing: 0;
	}

	.olympic-map__hero-hover {
		width: fit-content;
		pointer-events: auto;
		transition:
			transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
			color 0.35s ease,
			opacity 0.35s ease,
			text-shadow 0.35s ease;
	}

	.olympic-map__hero-title.olympic-map__hero-hover {
		transition:
			color 0.35s ease,
			opacity 0.35s ease,
			text-shadow 0.35s ease;
	}

	.olympic-map__hero-title span {
		transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.olympic-map__hero-hover:hover {
		color: var(--colors-neutral-white);
		text-shadow:
			0 0 14px rgba(var(--colors-content-primary-rgb), 0.32),
			0 0 34px rgba(var(--colors-content-primary-rgb), 0.18);
	}

	.olympic-map__hero-label:hover,
	.olympic-map__hero-desc:hover {
		transform: translateX(5px) scale(1.025);
	}

	.olympic-map__hero-title:hover span {
		transform: translateX(5px) scale(1.025);
	}

	.olympic-map__scroll-hint {
		margin: 4px 0 0;
		color: rgba(255, 255, 255, 0.45);
		font-family: var(--font-primary);
		font-size: 0.74rem;
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 4px;
		text-transform: uppercase;
	}

	.olympic-map__scroll-hint span {
		display: inline-block;
		width: 30px;
		height: 1px;
		margin-left: 12px;
		background: rgba(255, 255, 255, 0.35);
		vertical-align: middle;
	}

	.olympic-map:global(.is-map-active) .olympic-map__hero,
	.olympic-map:global(.is-map-active) .olympic-map__landing-overlay {
		pointer-events: none;
	}

	@keyframes map-hero-enter {
		from {
			opacity: 0;
			transform: translateY(-50%);
		}

		to {
			opacity: 1;
			transform: translateY(-50%);
		}
	}

	.olympic-map__status {
		position: fixed;
		left: var(--spacing-6);
		bottom: var(--spacing-6);
		z-index: 24;
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
	}

	.olympic-map__status--error {
		color: var(--colors-content-primary);
	}

	.olympic-map__intro-space {
		position: relative;
		z-index: -1;
		height: 180vh;
		pointer-events: none;
	}

	.olympic-map__focus-space {
		position: relative;
		z-index: -1;
		height: 360vh;
		pointer-events: none;
	}

	.map-controls {
		position: fixed;
		right: 20px;
		top: 50%;
		z-index: 20;
		display: flex;
		flex-direction: column;
		gap: 8px;
		opacity: 0;
		pointer-events: none;
		transform: translateY(-50%);
		transition:
			opacity 0.24s ease,
			transform 0.24s ease;
	}

	.olympic-map:global(.is-map-active) .map-controls {
		opacity: 1;
		pointer-events: auto;
	}

	.map-ctrl-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 12px;
		background: rgba(15, 15, 15, 0.88);
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		transition:
			background 0.2s,
			color 0.2s,
			transform 0.15s;
	}

	.map-ctrl-btn:hover {
		background: var(--colors-content-primary);
		color: #ffffff;
		transform: scale(1.08);
	}

	.place-preview {
		position: fixed;
		z-index: 19;
		width: 190px;
		aspect-ratio: 16 / 9;
		background: #020204;
		overflow: hidden;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		box-shadow: 0 18px 46px rgba(0, 0, 0, 0.58);
		transform: translateY(10px) scale(0.96);
		transition:
			opacity 0.22s ease,
			transform 0.22s ease,
			visibility 0.22s ease;
	}

	.place-preview:global(.visible) {
		opacity: 1;
		visibility: visible;
		transform: translateY(0) scale(1);
	}

	.place-preview img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.place-title {
		position: fixed;
		left: 32px;
		bottom: 48px;
		z-index: 18;
		max-width: 82vw;
		color: #ffffff;
		font-family: var(--font-primary);
		font-size: clamp(2.6rem, 5.4vw, 5.6rem);
		font-weight: var(--font-weight-black);
		line-height: 0.95;
		letter-spacing: 0;
		text-transform: uppercase;
		opacity: 0;
		transform: translateY(18px);
		pointer-events: none;
		text-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
		transition:
			opacity 0.22s ease,
			transform 0.22s ease;
	}

	.olympic-map:global(.is-focus-region-active) .place-title:global(.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	:global(.site-marker) {
		position: relative;
		width: 42px;
		height: 42px;
		opacity: 0 !important;
		visibility: hidden !important;
		pointer-events: none !important;
		transform: translateY(4px) scale(0.92);
		transition:
			opacity 0.24s ease,
			visibility 0.24s ease,
			transform 0.24s ease;
	}

	.olympic-map:global(.is-markers-enabled) :global(.site-marker.marker-visible) {
		opacity: 1 !important;
		visibility: visible !important;
		pointer-events: auto !important;
		transform: translateY(0) scale(1);
	}

	:global(.marker-dot) {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 30px;
		height: 30px;
		border: none;
		border-radius: 50% 50% 50% 0;
		background: rgba(245, 245, 245, 0.96);
		box-shadow:
			0 10px 24px rgba(0, 0, 0, 0.48),
			0 0 0 5px rgba(255, 255, 255, 0.13);
		cursor: pointer;
		user-select: none;
		-webkit-user-drag: none;
		transform: translate(-50%, -50%) rotate(-45deg);
		transition:
			background 0.18s ease,
			box-shadow 0.18s ease,
			transform 0.18s ease;
	}

	:global(.marker-dot::before) {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--colors-content-primary);
		transform: translate(-50%, -50%);
	}

	:global(.site-marker.marker-hovered .marker-dot),
	:global(.marker-dot:hover),
	:global(.marker-dot:focus-visible) {
		background: var(--colors-content-primary);
		box-shadow:
			0 14px 34px rgba(0, 0, 0, 0.56),
			0 0 0 8px rgba(8, 112, 237, 0.34);
		outline: none;
		transform: translate(-50%, -50%) rotate(-45deg) scale(1.12);
	}

	:global(.site-marker.marker-hovered .marker-dot::before),
	:global(.marker-dot:hover::before),
	:global(.marker-dot:focus-visible::before) {
		background: rgba(255, 255, 255, 0.95);
	}

	:global(.mapboxgl-ctrl-attrib) {
		background: rgba(0, 0, 0, 0.5) !important;
		color: rgba(255, 255, 255, 0.4) !important;
		font-size: 10px !important;
	}

	:global(.mapboxgl-ctrl-attrib a) {
		color: rgba(255, 255, 255, 0.4) !important;
	}

	:global(.mapboxgl-marker) {
		pointer-events: auto !important;
		user-select: none;
		-webkit-user-drag: none;
		will-change: transform;
	}

	@media (max-width: 768px) {
		.olympic-map__landing-overlay {
			background: linear-gradient(
				to bottom,
				#080810 0%,
				rgba(8, 8, 16, 0.94) 34%,
				rgba(8, 8, 16, 0.38) 72%,
				transparent 100%
			);
		}

		.olympic-map__hero {
			left: 20px;
			right: 20px;
			max-width: none;
		}

		.olympic-map__hero-title {
			font-size: clamp(3.4rem, 17vw, 5.8rem);
		}

		.olympic-map__hero-desc {
			font-size: 0.95rem;
		}

		.olympic-map__scroll-hint {
			font-size: 0.68rem;
			letter-spacing: 3px;
		}

		.map-controls {
			right: 14px;
		}

		.place-preview {
			display: none;
		}

		.place-title {
			left: 20px;
			bottom: 28px;
			font-size: clamp(2.2rem, 12vw, 4.4rem);
		}
	}
</style>
