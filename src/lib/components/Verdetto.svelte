<script>
	import { onDestroy } from 'svelte';

	/** @type {{ value?: string, verdict?: string, statement?: string }} */
	let {
		value = '',
		verdict = 'positivo',
		statement = "LA RICERCA E LO STUDIO DELLA LEGACY CI PORTANO A CONCLUDERE CHE IL VERDETTO È"
	} = $props();

	/** @type {HTMLButtonElement | undefined} */
	let cardElement = $state();
	let animationFrame = 0;
	let pendingProgress = 0;

	let revealText = $derived(String(value || verdict).trim());

	/** @param {number} value */
	function clampProgress(value) {
		return Math.max(0, Math.min(100, value));
	}

	/** @param {number} progress */
	function setRevealProgress(progress) {
		pendingProgress = clampProgress(progress);
		if (!cardElement || animationFrame) return;

		animationFrame = requestAnimationFrame(() => {
			animationFrame = 0;
			const progressValue = `${pendingProgress}%`;

			cardElement?.style.setProperty('--reveal-progress', progressValue);
			cardElement?.style.setProperty('--reveal-opacity', pendingProgress > 0 ? '1' : '0');
			cardElement?.style.setProperty(
				'--reveal-rotation',
				`${(pendingProgress - 50) * 0.08}deg`
			);
		});
	}

	/** @param {PointerEvent} event */
	function updateReveal(event) {
		if (!cardElement) return;

		const { left, width } = cardElement.getBoundingClientRect();
		setRevealProgress(((event.clientX - left) / width) * 100);
	}

	/** @param {PointerEvent} event */
	function handlePointerEnter(event) {
		updateReveal(event);
	}

	/** @param {PointerEvent} event */
	function handlePointerMove(event) {
		updateReveal(event);
	}

	function hideReveal() {
		setRevealProgress(0);
	}

	function showFullReveal() {
		setRevealProgress(100);
	}

	onDestroy(() => {
		if (animationFrame && typeof cancelAnimationFrame === 'function') {
			cancelAnimationFrame(animationFrame);
		}
	});
</script>

<section class="verdetto" aria-labelledby="verdetto-statement">
	<div class="verdetto__inner">
		<p id="verdetto-statement" class="verdetto__statement">{statement}</p>

		<button
			class="verdetto__card"
			type="button"
			aria-label={`Verdetto: ${revealText}`}
			bind:this={cardElement}
			onclick={showFullReveal}
			onfocus={showFullReveal}
			onblur={hideReveal}
			onpointerenter={handlePointerEnter}
			onpointermove={handlePointerMove}
			onpointerleave={hideReveal}
			style="--reveal-progress: 0%; --reveal-opacity: 0; --reveal-rotation: 0deg;"
		>
			<span class="verdetto__word-wrap" aria-hidden="true">
				<span class="verdetto__word verdetto__word--base">{revealText}</span>
				<span class="verdetto__word verdetto__word--reveal">{revealText}</span>
				<span class="verdetto__scan-line"></span>
			</span>
		</button>
	</div>
</section>

<style>
	.verdetto {
		width: 100%;
		min-height: 560px;
		padding-block: var(--spacing-10);
		font-family: var(--font-primary);
	}

	.verdetto__inner {
		width: min(100%, 1280px);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-7);
		text-align: center;
	}

	.verdetto__statement {
		width: min(100%, 1220px);
		margin: 0;
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: clamp(32px, 4.7vw, 82px);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		text-align: center;
	}

	.verdetto__card {
		width: min(100%, 1120px);
		min-height: clamp(170px, 22vw, 300px);
		position: relative;
		overflow: hidden;
		display: block;
		padding: 0;
		border: 0;
		border-radius: var(--radius-xs);
		background:
			linear-gradient(135deg, rgba(var(--colors-content-primary-rgb), 0.16), transparent 42%),
			var(--colors-background-primary);
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.26);
		cursor: pointer;
	}

	.verdetto__card:focus-visible {
		outline: 2px solid var(--colors-content-primary);
		outline-offset: 6px;
	}

	.verdetto__word-wrap {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
		mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
	}

	.verdetto__word {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: var(--spacing-6);
		font-family: var(--font-secondary);
		font-size: clamp(64px, 14vw, 230px);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.verdetto__word--base {
		color: rgba(var(--colors-content-secondary-rgb), 0.14);
		text-shadow: 0 16px 50px rgba(0, 0, 0, 0.34);
	}

	.verdetto__word--reveal {
		z-index: 2;
		color: var(--colors-content-primary);
		clip-path: inset(0 calc(100% - var(--reveal-progress, 0%)) 0 0);
		text-shadow:
			0 0 22px rgba(var(--colors-content-primary-rgb), 0.42),
			0 18px 54px rgba(0, 0, 0, 0.34);
		will-change: clip-path;
	}

	.verdetto__scan-line {
		position: absolute;
		top: 10%;
		bottom: 10%;
		z-index: 3;
		width: 5px;
		left: var(--reveal-progress, 0%);
		border-radius: var(--radius-full);
		background: linear-gradient(
			to bottom,
			transparent,
			rgba(var(--colors-content-secondary-rgb), 0.68),
			var(--colors-content-primary),
			transparent
		);
		box-shadow: 0 0 30px rgba(var(--colors-content-primary-rgb), 0.5);
		opacity: var(--reveal-opacity, 0);
		pointer-events: none;
		transform: translate3d(-50%, 0, 0) rotate(var(--reveal-rotation, 0deg));
		transition: opacity 0.18s ease;
		will-change: left, opacity, transform;
	}

	@media (max-width: 768px) {
		.verdetto {
			min-height: 420px;
			padding-block: var(--spacing-8);
		}

		.verdetto__inner {
			gap: var(--spacing-6);
		}

		.verdetto__statement {
			font-size: var(--font-size-h4);
			line-height: var(--line-height-normal);
		}

		.verdetto__card {
			min-height: 150px;
		}

		.verdetto__word {
			font-size: clamp(52px, 19vw, 110px);
			padding-inline: var(--spacing-4);
		}
	}
</style>
