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
		max-width: 100%;
	}

	h1 {
		margin: 0;
		font-family: var(--font-primary);
		font-size: clamp(72px, 8.5vw, var(--font-size-hero));
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-primary);
		overflow-wrap: anywhere;
	}

	p {
		margin: var(--spacing-4) 0 0;
		font-family: var(--font-primary);
		font-size: clamp(44px, 6vw, var(--font-size-display-lg));
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-secondary);
		overflow-wrap: anywhere;
	}

	@media (max-width: 1024px) {
		.title-section {
			padding-top: var(--spacing-7);
			padding-bottom: var(--spacing-7);
		}

		h1 {
			font-size: clamp(58px, 10vw, 104px);
		}

		p {
			font-size: clamp(34px, 7vw, 72px);
		}
	}

	@media (max-width: 768px) {
		.title-section {
			padding-top: var(--spacing-6);
			padding-bottom: var(--spacing-6);
		}

		h1 {
			font-size: clamp(42px, 14vw, var(--font-size-display-lg));
		}

		p {
			margin-top: var(--spacing-3);
			font-size: clamp(26px, 8.5vw, var(--font-size-h2));
		}
	}

	@media (max-width: 480px) {
		h1 {
			font-size: clamp(36px, 13vw, 62px);
		}

		p {
			font-size: clamp(22px, 8vw, 36px);
		}
	}
</style>
