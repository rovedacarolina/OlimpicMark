<script>
	import { onMount } from 'svelte';
	import ImageCompare from 'image-compare-viewer';
	import 'image-compare-viewer/dist/image-compare-viewer.min.css';

	let {
		beforeImage = '',
		afterImage = '',
		beforeLabel = 'BEFORE',
		afterLabel = 'AFTER',
		beforeAlt = 'Immagine prima dell’intervento',
		afterAlt = 'Immagine dopo l’intervento',
		height = 'clamp(380px, 56vh, 650px)'
	} = $props();

	/** @type {HTMLDivElement | undefined} */
	let compareElement;

	onMount(() => {
		if (!compareElement || !beforeImage || !afterImage) return;

		const viewer = new ImageCompare(compareElement, {
			controlColor: '#DEE6EF',
			controlShadow: true,
			addCircle: true,
			addCircleBlur: true,
			showLabels: true,
			labelOptions: {
				before: beforeLabel,
				after: afterLabel,
				onHover: false
			},
			smoothing: true,
			smoothingAmount: 140,
			startingPoint: 75,
			fluidMode: true
		});

		viewer.mount();
	});
</script>

<section class="card-bi" style={`--card-bi-height: ${height};`} aria-label="Confronto fotografico prima e dopo">
	<div class="card-bi__compare" bind:this={compareElement}>
		{#if beforeImage}
			<img src={beforeImage} alt={beforeAlt} />
		{/if}

		{#if afterImage}
			<img src={afterImage} alt={afterAlt} />
		{/if}
	</div>
</section>

<style>
	.card-bi {
		width: 100%;
		background: rgba(var(--colors-neutral-black-rgb), 0.18);
		overflow: hidden;
	}

	.card-bi__compare {
		position: relative;
		width: 100%;
		height: min(var(--card-bi-height), 720px);
		overflow: hidden;
		background: rgba(var(--colors-neutral-black-rgb), 0.2);
	}

	.card-bi__compare img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	:global(.card-bi__compare.icv) {
		cursor: ew-resize;
	}

	:global(.card-bi__compare .icv__label) {
		bottom: auto;
		top: var(--spacing-6);
		border-radius: 0;
		padding: 10px 14px;
		background: rgba(var(--colors-background-primary-rgb), 0.78);
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0;
		text-transform: uppercase;
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	:global(.card-bi__compare .icv__label-before) {
		left: var(--spacing-6);
	}

	:global(.card-bi__compare .icv__label-after) {
		right: var(--spacing-6);
	}

	:global(.card-bi__compare .icv__circle) {
		background: rgba(var(--colors-background-primary-rgb), 0.62);
	}

	:global(.card-bi__compare .icv__control-line) {
		width: 2px;
	}

	@media (max-width: 1024px) {
		.card-bi__compare {
			height: clamp(420px, 62vh, 620px);
		}
	}

	@media (max-width: 768px) {
		.card-bi__compare {
			height: clamp(320px, 54vh, 500px);
		}

		:global(.card-bi__compare .icv__label) {
			top: var(--spacing-4);
			font-size: clamp(14px, 3vw, 18px);
			padding: 8px 10px;
		}

		:global(.card-bi__compare .icv__label-before) {
			left: var(--spacing-4);
		}

		:global(.card-bi__compare .icv__label-after) {
			right: var(--spacing-4);
		}
	}

	@media (max-width: 480px) {
		.card-bi__compare {
			height: clamp(260px, 46vh, 390px);
		}

		:global(.card-bi__compare .icv__label) {
			top: var(--spacing-3);
			font-size: 12px;
		}

		:global(.card-bi__compare .icv__label-before) {
			left: var(--spacing-3);
		}

		:global(.card-bi__compare .icv__label-after) {
			right: var(--spacing-3);
		}
	}
</style>
