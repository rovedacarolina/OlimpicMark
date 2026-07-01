<script>
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	const paths = {
		step1: {
			unfilled: 'M 0 0 H 0 V 100 H 0 V 0 Z',
			filled: 'M 0 0 H 100 V 100 H 0 V 0 Z'
		},
		step2: {
			filled: 'M 100 0 H 0 V 100 H 100 V 0 Z',
			unfilled: 'M 100 0 H 100 V 100 H 100 V 0 Z'
		}
	};

	/** @type {SVGPathElement | undefined} */
	let overlayPath;
	/** @type {HTMLDivElement | undefined} */
	let transitionLayer;
	/** @type {typeof import('gsap').gsap | undefined} */
	let gsapInstance = $state();
	/** @type {ReturnType<typeof import('gsap').gsap.timeline> | undefined} */
	let currentTimeline;
	let prefersReducedMotion = $state(false);

	onMount(() => {
		let cancelled = false;
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotionPreference = () => {
			prefersReducedMotion = media.matches;
		};

		updateMotionPreference();
		media.addEventListener('change', updateMotionPreference);

		import('gsap').then((module) => {
			if (!cancelled) gsapInstance = module.gsap;
		});

		return () => {
			cancelled = true;
			media.removeEventListener('change', updateMotionPreference);
			currentTimeline?.kill();
		};
	});

	/** @param {import('@sveltejs/kit').OnNavigate} navigation */
	function shouldAnimateNavigation(navigation) {
		if (prefersReducedMotion || !gsapInstance || !overlayPath || !transitionLayer) return false;
		if (!navigation.from || !navigation.to || !navigation.to.route.id) return false;

		const fromUrl = navigation.from.url;
		const toUrl = navigation.to.url;

		return fromUrl.pathname !== toUrl.pathname || fromUrl.search !== toUrl.search;
	}

	function playCover() {
		return new Promise((resolve) => {
			if (!gsapInstance || !overlayPath || !transitionLayer) {
				resolve(undefined);
				return;
			}

			currentTimeline?.kill();
			currentTimeline = gsapInstance
				.timeline({ onComplete: () => resolve(undefined) })
				.set(transitionLayer, { visibility: 'visible' })
				.set(overlayPath, { attr: { d: paths.step1.unfilled } })
				.to(overlayPath, {
					duration: 0.58,
					ease: 'power1.inOut',
					attr: { d: paths.step1.filled }
				});
		});
	}

	function playReveal() {
		if (!gsapInstance || !overlayPath || !transitionLayer) return;

		currentTimeline?.kill();
		currentTimeline = gsapInstance
			.timeline({
				onComplete: () => {
					if (transitionLayer) transitionLayer.style.visibility = 'hidden';
				}
			})
			.set(transitionLayer, { visibility: 'visible' })
			.set(overlayPath, { attr: { d: paths.step2.filled } })
			.to(overlayPath, {
				duration: 0.58,
				ease: 'power1.inOut',
				attr: { d: paths.step2.unfilled }
			});
	}

	onNavigate((navigation) => {
		if (!shouldAnimateNavigation(navigation)) return;

		return playCover().then(() => {
			return () => playReveal();
		});
	});
</script>

<div class="page-transition" bind:this={transitionLayer} aria-hidden="true">
	<svg
		class="page-transition__svg"
		width="100%"
		height="100%"
		viewBox="0 0 100 100"
		preserveAspectRatio="none"
	>
		<path
			bind:this={overlayPath}
			class="page-transition__path"
			vector-effect="non-scaling-stroke"
			d={paths.step1.unfilled}
		/>
	</svg>
</div>

<style>
	.page-transition {
		position: fixed;
		inset: 0;
		z-index: 1000;
		width: 100vw;
		height: 100vh;
		visibility: hidden;
		pointer-events: none;
	}

	.page-transition__svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.page-transition__path {
		fill: var(--colors-content-primary);
	}
</style>
