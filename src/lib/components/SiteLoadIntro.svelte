<script>
	import { onMount } from 'svelte';

	let isRunning = $state(false);
	let isComplete = $state(false);
	/** @type {number | undefined} */
	let fallbackTimer;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			isComplete = true;
			document.documentElement.classList.add('site-intro-complete');
			return;
		}

		document.documentElement.classList.add('site-intro-running');

		requestAnimationFrame(() => {
			isRunning = true;
		});

		fallbackTimer = window.setTimeout(finishIntro, 3200);

		return () => {
			if (fallbackTimer) window.clearTimeout(fallbackTimer);
			document.documentElement.classList.remove('site-intro-running');
		};
	});

	function finishIntro() {
		isComplete = true;
		document.documentElement.classList.remove('site-intro-running');
		document.documentElement.classList.add('site-intro-complete');
		if (fallbackTimer) window.clearTimeout(fallbackTimer);
	}

	/** @param {AnimationEvent} event */
	function handleIntroEnd(event) {
		if (event.target !== event.currentTarget) return;
		finishIntro();
	}
</script>

{#if !isComplete}
	<div
		class="site-load-intro"
		class:is-running={isRunning}
		aria-hidden="true"
		onanimationend={handleIntroEnd}
	>
		<div class="site-load-intro__panel site-load-intro__panel--top"></div>
		<div class="site-load-intro__panel site-load-intro__panel--bottom"></div>

		<div class="site-load-intro__frame">
			<p class="site-load-intro__eyebrow">
				<span>Milano · Cortina 2026</span>
			</p>

			<h1 class="site-load-intro__title" aria-label="Olympic Mark">
				<span class="site-load-intro__word">
					<span>OLYMPIC</span>
				</span>
				<span class="site-load-intro__word">
					<span>MARK</span>
				</span>
			</h1>

			<p class="site-load-intro__caption">
				<span>Atlante delle legacy olimpiche</span>
			</p>
		</div>
	</div>
{/if}

<style>
	.site-load-intro {
		position: fixed;
		inset: 0;
		z-index: 1200;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: var(--colors-background-primary);
		color: var(--colors-content-secondary);
		pointer-events: auto;
	}

	.site-load-intro.is-running {
		animation: intro-remove 1ms linear 2.72s forwards;
	}

	.site-load-intro__panel {
		position: absolute;
		left: 0;
		width: 100%;
		height: 50%;
		background: var(--colors-background-primary);
		will-change: transform;
	}

	.site-load-intro__panel--top {
		top: 0;
	}

	.site-load-intro__panel--bottom {
		bottom: 0;
	}

	.site-load-intro.is-running .site-load-intro__panel--top {
		animation: panel-top-out 0.92s cubic-bezier(0.76, 0, 0.24, 1) 1.7s forwards;
	}

	.site-load-intro.is-running .site-load-intro__panel--bottom {
		animation: panel-bottom-out 0.92s cubic-bezier(0.76, 0, 0.24, 1) 1.7s forwards;
	}

	.site-load-intro__frame {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(1120px, calc(100vw - (var(--spacing-6) * 2)));
		text-align: center;
	}

	.site-load-intro__eyebrow,
	.site-load-intro__caption {
		margin: 0;
		overflow: hidden;
		color: rgba(var(--colors-content-secondary-rgb), 0.68);
		font-family: var(--font-primary);
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wider);
		text-transform: uppercase;
	}

	.site-load-intro__eyebrow span,
	.site-load-intro__caption span {
		display: block;
		transform: translateY(120%);
		will-change: transform;
	}

	.site-load-intro__eyebrow {
		margin-bottom: var(--spacing-5);
		color: var(--colors-content-primary);
	}

	.site-load-intro__caption {
		margin-top: var(--spacing-5);
	}

	.site-load-intro.is-running .site-load-intro__eyebrow span {
		animation: text-mask-in 0.82s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
	}

	.site-load-intro.is-running .site-load-intro__caption span {
		animation: text-mask-in 0.82s cubic-bezier(0.22, 1, 0.36, 1) 0.62s forwards;
	}

	.site-load-intro__title {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: clamp(5.4rem, 14vw, 14.5rem);
		font-weight: var(--font-weight-black);
		line-height: 0.82;
		letter-spacing: 0;
		text-transform: uppercase;
	}

	.site-load-intro__word {
		display: block;
		overflow: hidden;
		padding-bottom: 0.08em;
	}

	.site-load-intro__word span {
		display: block;
		transform: translateY(112%);
		will-change: transform;
	}

	.site-load-intro__word:nth-child(2) span {
		color: var(--colors-content-primary);
	}

	.site-load-intro.is-running .site-load-intro__word span {
		animation: title-mask-in 1.02s cubic-bezier(0.22, 1, 0.36, 1) 0.24s forwards;
	}

	.site-load-intro.is-running .site-load-intro__word:nth-child(2) span {
		animation-delay: 0.36s;
	}

	.site-load-intro.is-running .site-load-intro__frame {
		animation: frame-scale-out 0.92s cubic-bezier(0.76, 0, 0.24, 1) 1.7s forwards;
	}

	@keyframes text-mask-in {
		to {
			transform: translateY(0);
		}
	}

	@keyframes title-mask-in {
		to {
			transform: translateY(0);
		}
	}

	@keyframes frame-scale-out {
		to {
			opacity: 0;
			transform: translateY(-18px) scale(0.985);
		}
	}

	@keyframes panel-top-out {
		to {
			transform: translateY(-101%);
		}
	}

	@keyframes panel-bottom-out {
		to {
			transform: translateY(101%);
		}
	}

	@keyframes intro-remove {
		to {
			opacity: 0;
			visibility: hidden;
		}
	}

	@media (max-width: 768px) {
		.site-load-intro__frame {
			width: calc(100vw - 40px);
		}

		.site-load-intro__title {
			font-size: clamp(4rem, 20vw, 7rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-load-intro {
			display: none;
		}
	}
</style>
