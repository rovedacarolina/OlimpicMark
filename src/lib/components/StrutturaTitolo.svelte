<script>
	let hovered = $state(false);
	let prefixWidth = $state(0);
	/** @type {HTMLSpanElement | undefined} */
	let prefixMeasure = $state();

	let { title = '', city = '', href = '' } = $props();
	let prefixText = $derived(city ? `${city} /` : '');
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
	<h2
		class="struttura-titolo__text"
		class:is-active={hovered}
		style={`--prefix-width: ${prefixWidth}px; --typewriter-duration: ${typewriterDuration}ms;`}
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
		position: relative;
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
		transform: translateX(0);
		transition: transform var(--typewriter-duration) linear;
	}

	.struttura-titolo__text.is-active .struttura-titolo__title {
		transform: translateX(var(--prefix-width));
	}

	@media (max-width: 768px) {
		.struttura-titolo__text {
			font-size: var(--font-size-display-lg);
			white-space: normal;
		}
	}
</style>
