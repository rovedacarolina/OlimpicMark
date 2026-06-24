<script>
	let hovered = $state(false);
	let typedCity = $state('');
	let interval;

	let { title = '', city = '', href = '' } = $props();

	function startTyping() {
		hovered = true;
		typedCity = '';
		clearInterval(interval);

		let index = 0;

		interval = setInterval(() => {
			typedCity = city.slice(0, index + 1);
			index++;

			if (index >= city.length) {
				clearInterval(interval);
			}
		}, 45);
	}

	function stopTyping() {
		hovered = false;
		typedCity = '';
		clearInterval(interval);
	}
</script>

<a
	href={href}
	class="struttura-titolo"
	onmouseenter={startTyping}
	onmouseleave={stopTyping}
>
	<h2 class="struttura-titolo__text">
		{#if hovered}
			<span class="struttura-titolo__city">{typedCity}</span>
			<span class="struttura-titolo__separator"> / </span>
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
	}
</style>