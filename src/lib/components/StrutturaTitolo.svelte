<script>
	let hovered = $state(false);
	let prefixWidth = $state(0);
	/** @type {HTMLSpanElement | undefined} */
	let prefixMeasure = $state();

	let { title = '', city = '', href = '' } = $props();
	let prefixText = $derived(city ? `${city} / ` : '');
	let typewriterDuration = $derived(Math.min(Math.max(city.length * 88, 720), 1320));

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
	<h2 class="struttura-titolo__text">
		{#if city}
			<span
				class="struttura-titolo__typewriter"
				class:is-active={hovered}
				style={`--typewriter-width: ${prefixWidth}px; --typewriter-duration: ${typewriterDuration}ms;`}
				aria-hidden={!hovered}
			>
				<span class="struttura-titolo__measure" bind:this={prefixMeasure}>{prefixText}</span>
				<span class="struttura-titolo__prefix">
					<span class="struttura-titolo__city">{city}</span>
					<span class="struttura-titolo__separator"> / </span>
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
		text-decoration: none;
		cursor: pointer;
	}

	.struttura-titolo__text {
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-hero);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		white-space: nowrap;
	}

	.struttura-titolo__typewriter {
		position: relative;
		display: inline-block;
		width: 0;
		overflow: hidden;
		white-space: nowrap;
		vertical-align: top;
		transition: width var(--typewriter-duration) linear;
	}

	.struttura-titolo__typewriter.is-active {
		width: var(--typewriter-width);
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
		color: var(--colors-content-primary);
	}

	@media (max-width: 768px) {
		.struttura-titolo__text {
			font-size: var(--font-size-display-lg);
			white-space: normal;
		}

		.struttura-titolo__typewriter {
			vertical-align: baseline;
		}
	}
</style>
