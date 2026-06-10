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
		padding-top: var(--unit-20);
	}

	h1 {
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-display-lg);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-primary);
	}

	p {
		margin: 0;
		margin-top: var(--spacing-1);
		font-family: var(--font-primary);
		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		text-transform: uppercase;
		color: var(--colors-content-primary);
	}
</style>