<script>
	let hovered = $state(false);

	let { title = '', city = '', href = '' } = $props();

	let displayTitle = $derived(hovered && city ? `${city} / ${title}` : title);
</script>

<a
	href={href}
	class="struttura-titolo"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
>
	<h2 class="struttura-titolo__text" class:is-hovered={hovered}>
		{displayTitle}
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
	color: var(--colors-content-primary);
	white-space: nowrap;
	transition: color 0.2s ease;
}

	.struttura-titolo__text.is-hovered {
		color: white;
	}

	@media (max-width: 768px) {
		.struttura-titolo__text {
			font-size: clamp(2.3rem, 10vw, 4rem);
			white-space: normal;
		}
	}
</style>