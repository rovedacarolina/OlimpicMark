<script>
	import { onMount } from 'svelte';

	const SLOT_TEXT_CDN = 'https://esm.sh/slot-text@0.2.2?bundle';

	let {
		before = 'AD ANTERSELVA LA LEGACY APPARE CONCRETA, PERCHÉ',
		after = 'VENGONO PERCEPITI COME ELEMENTI GIÀ INTEGRATI NEL TERRITORIO.',
		terms = ["SPORT, MOBILITÀ E CONTINUITÀ D'USO"],
		intervalDelay = 4200
	} = $props();

	const slotOptions = {
		direction: 'down',
		duration: 900,
		stagger: 78,
		exitOffset: 130,
		bounce: 0.18,
		skipUnchanged: false,
		interrupt: false,
		easing: 'cubic-bezier(0.2, 0, 0, 1)'
	};

	let activeIndex = $state(0);
	let activeTerm = $derived(terms[activeIndex] ?? '');
	/** @type {HTMLSpanElement | undefined} */
	let slotElement;
	/** @type {{ set: (text: string, options?: typeof slotOptions) => void; destroy: () => void } | undefined} */
	let slotController;

	function setFallbackText() {
		if (!slotController && slotElement) slotElement.textContent = activeTerm;
	}

	onMount(() => {
		let cancelled = false;
		/** @type {number | undefined} */
		let interval;

		async function initSlotText() {
			if (!slotElement) return;

			try {
				const module = await import(/* @vite-ignore */ SLOT_TEXT_CDN);
				if (cancelled) return;

				slotController = module.slotText(slotElement, activeTerm, slotOptions);
			} catch (_) {
				setFallbackText();
			}
		}

		initSlotText();

		if (terms.length > 1) {
			interval = window.setInterval(() => {
				activeIndex = (activeIndex + 1) % terms.length;
			}, intervalDelay);
		}

		return () => {
			cancelled = true;
			if (interval) window.clearInterval(interval);
			slotController?.destroy();
		};
	});

	$effect(() => {
		if (slotController) {
			slotController.set(activeTerm, slotOptions);
		} else {
			setFallbackText();
		}
	});
</script>

<section class="legacy-statement" aria-label="Sintesi della legacy">
	<p>
		<span>{before}</span>
		<span class="legacy-statement__slot" bind:this={slotElement}>{activeTerm}</span>
		<span>{after}</span>
	</p>
</section>

<style>
	.legacy-statement {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-inline: 0;
		padding-block: var(--spacing-10);
	}

	.legacy-statement p {
		width: min(100%, 1400px);
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: clamp(42px, 4.6vw, 64px);
		font-weight: var(--font-weight-regular);
		line-height: 1.35;
		letter-spacing: 0.08em;
		text-align: center;
		text-transform: uppercase;
		overflow-wrap: anywhere;
	}

	.legacy-statement p > span {
		display: block;
		width: 100%;
		text-align: center;
	}

	.legacy-statement__slot {
		display: flex;
		justify-content: center;
		max-width: 100%;
		white-space: normal;
		vertical-align: baseline;
		overflow-wrap: anywhere;
	}

	:global(.legacy-statement__slot.slot-text) {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 100%;
		white-space: normal;
		vertical-align: baseline;
	}

	:global(.legacy-statement__slot .char-slot) {
		position: relative;
		display: inline-flex;
		flex: none;
		justify-content: center;
		overflow: hidden;
		overflow-x: visible;
		overflow-y: clip;
		line-height: 1.3;
		vertical-align: bottom;
	}

	:global(.legacy-statement__slot .char-slot.is-resizing) {
		overflow-x: clip;
	}

	:global(.legacy-statement__slot .char-sizer) {
		visibility: hidden;
		white-space: pre;
	}

	:global(.legacy-statement__slot .char-face) {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: pre;
		will-change: transform;
	}

	@media (max-width: 1024px) {
		.legacy-statement {
			padding-block: var(--spacing-9);
		}

		.legacy-statement p {
			font-size: clamp(30px, 5.2vw, var(--font-size-body-lg));
			letter-spacing: 0.04em;
		}
	}

	@media (max-width: 768px) {
		.legacy-statement {
			padding-inline: 0;
			padding-block: var(--spacing-8);
		}

		.legacy-statement p {
			width: 100%;
			font-size: clamp(24px, 8vw, var(--font-size-h2));
			line-height: var(--line-height-normal);
			letter-spacing: 0;
		}

		.legacy-statement__slot {
			justify-content: center;
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.legacy-statement {
			padding-block: var(--spacing-7);
		}

		.legacy-statement p {
			font-size: clamp(20px, 7.4vw, 30px);
		}
	}
</style>
