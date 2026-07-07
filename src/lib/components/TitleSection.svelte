<script>
	let { title = '', subtitle = '' } = $props();
</script>

<section class="title-section">
	{#if title}
		<h1>{title}</h1>
	{/if}

	{#if subtitle}
		<p>{subtitle}</p>
	{/if}
</section>

<style>
	.title-section {
		padding-top: var(--spacing-8);
		padding-bottom: var(--spacing-8);
	}

	h1 {
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-hero);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-primary);
	}

	p {
		margin: var(--spacing-4) 0 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-display-lg);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-secondary);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: var(--font-size-display-lg);
		}

		p {
			font-size: var(--font-size-h2);
		}
	}
</style>