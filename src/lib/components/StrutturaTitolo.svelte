<script>
	let hovered = $state(false);
	let prefixWidth = $state(0);
	/** @type {HTMLSpanElement | undefined} */
	let prefixMeasure = $state();

	let { title = '', city = '', href = '' } = $props();
	let prefixText = $derived(city ? `${city} /` : '');
	let typewriterDuration = $derived(Math.min(Math.max(city.length * 88, 720), 1320));
	let titleFitRatio = $derived(Math.max(title.length * 0.58, 1));

	$effect(() => {
		if (prefixMeasure) prefixWidth = prefixMeasure.scrollWidth;
	});

	function showPrefix() {
		hovered = true;
	}

	function hidePrefix() {
		hovered = false;
	}
</script>

<a
	href={href}
	class="struttura-titolo"
	onmouseenter={showPrefix}
	onmouseleave={hidePrefix}
	onfocus={showPrefix}
	onblur={hidePrefix}
>
	<h2
		class="struttura-titolo__text"
		class:is-active={hovered}
		style={`--prefix-width: ${prefixWidth}px; --typewriter-duration: ${typewriterDuration}ms; --title-fit-ratio: ${titleFitRatio};`}
	>
		{#if city}
			<span
				class="struttura-titolo__typewriter"
				class:is-active={hovered}
				aria-hidden={!hovered}
			>
				<span class="struttura-titolo__measure" bind:this={prefixMeasure}>{prefixText}</span>
				<span class="struttura-titolo__prefix">
					<span class="struttura-titolo__city">{city}</span>
					<span class="struttura-titolo__separator">/</span>
				</span>
			</span>
		{/if}

		<span class="struttura-titolo__title">{title}</span>
	</h2>
</a>

<style>
	.struttura-titolo {
		display: block;
		width: fit-content;
		max-width: 100%;
		text-decoration: none;
		cursor: pointer;
	}

	.struttura-titolo__text {
		position: relative;
		margin: 0;
		font-family: var(--font-primary);
		font-size: min(
			clamp(72px, 8.4vw, var(--font-size-hero)),
			calc((100vw - (var(--spacing-6) * 2)) / var(--title-fit-ratio))
		);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		white-space: nowrap;
	}

	.struttura-titolo__typewriter {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		width: 0;
		overflow: hidden;
		white-space: nowrap;
		pointer-events: none;
		transition: width var(--typewriter-duration) linear;
	}

	.struttura-titolo__typewriter.is-active {
		width: var(--prefix-width);
	}

	.struttura-titolo__measure {
		position: absolute;
		visibility: hidden;
		white-space: nowrap;
		pointer-events: none;
	}

	.struttura-titolo__prefix {
		display: inline-block;
		white-space: nowrap;
	}

	.struttura-titolo__city,
	.struttura-titolo__separator {
		color: var(--colors-content-secondary);
	}

	.struttura-titolo__title {
		display: inline-block;
		color: var(--colors-content-primary);
		max-width: 100%;
		white-space: nowrap;
		transform: translateX(0);
		transition: transform var(--typewriter-duration) linear;
	}

	.struttura-titolo__text.is-active .struttura-titolo__title {
		transform: translateX(var(--prefix-width));
	}

	@media (max-width: 1024px) {
		.struttura-titolo__text {
			font-size: min(
				clamp(42px, 7.2vw, 96px),
				calc((100vw - (var(--spacing-5) * 2)) / var(--title-fit-ratio))
			);
		}
	}

	@media (max-width: 768px) {
		.struttura-titolo {
			width: 100%;
		}

		.struttura-titolo__text {
			font-size: min(
				clamp(22px, 7.2vw, var(--font-size-display-lg)),
				calc((100vw - 40px) / var(--title-fit-ratio))
			);
			white-space: nowrap;
		}
	}

	@media (max-width: 480px) {
		.struttura-titolo__text {
			font-size: min(
				clamp(20px, 7.2vw, 34px),
				calc((100vw - 32px) / var(--title-fit-ratio))
			);
		}
	}

	@media (hover: none) {
		.struttura-titolo__typewriter {
			display: none;
		}

		.struttura-titolo__text.is-active .struttura-titolo__title {
			transform: none;
		}
	}
</style>
