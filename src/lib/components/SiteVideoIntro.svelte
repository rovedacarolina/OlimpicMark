<script>
	import { onMount } from 'svelte';

	let {
		src = '/videos/animazione-load-intro.mp4',
		fallbackDuration = 4200,
		playOnce = false
	} = $props();

	let isVisible = $state(true);
	let isLeaving = $state(false);
	/** @type {HTMLVideoElement | undefined} */
	let videoElement = $state();
	/** @type {number | undefined} */
	let fallbackTimer;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const alreadyPlayed = playOnce && sessionStorage.getItem('olympicmark-intro-played') === 'true';

		if (prefersReducedMotion || alreadyPlayed) {
			isVisible = false;
			return;
		}

		fallbackTimer = window.setTimeout(closeIntro, fallbackDuration);
		videoElement?.play().catch(() => {
			closeIntro();
		});

		return () => {
			if (fallbackTimer) window.clearTimeout(fallbackTimer);
		};
	});

	function closeIntro() {
		if (!isVisible || isLeaving) return;

		if (fallbackTimer) window.clearTimeout(fallbackTimer);
		if (playOnce) sessionStorage.setItem('olympicmark-intro-played', 'true');

		isLeaving = true;
		window.setTimeout(() => {
			isVisible = false;
		}, 520);
	}
</script>

{#if isVisible}
	<div class="site-video-intro" class:is-leaving={isLeaving} aria-hidden="true">
		<video
			bind:this={videoElement}
			class="site-video-intro__video"
			src={src}
			muted
			playsinline
			preload="auto"
			onended={closeIntro}
			onerror={closeIntro}
		></video>
	</div>
{/if}

<style>
	.site-video-intro {
		position: fixed;
		inset: 0;
		z-index: 1200;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--colors-background-primary);
		pointer-events: auto;
		opacity: 1;
		transition: opacity 0.48s ease;
	}

	.site-video-intro.is-leaving {
		opacity: 0;
		pointer-events: none;
	}

	.site-video-intro__video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: var(--colors-background-primary);
	}

	@media (prefers-reduced-motion: reduce) {
		.site-video-intro {
			display: none;
		}
	}
</style>
