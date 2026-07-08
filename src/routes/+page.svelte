<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import StrutturaTitolo from '$lib/components/StrutturaTitolo.svelte';
	import { structures } from '$lib/data/structures.js';
</script>

<svelte:head>
	<title>Olympic Mark</title>
</svelte:head>

<div class="home-page">
	<TopBar />

	<main class="home-page__content">
		{#each structures as struttura (struttura.href)}
			<StrutturaTitolo
				title={struttura.title}
				city={struttura.city}
				href={struttura.href}
			/>
		{/each}
	</main>
</div>

<style>
	.home-page {
		width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
		background: transparent;
		color: var(--colors-content-primary);
	}

	.home-page__content {
		display: flex;
		flex-direction: column;
		gap: 0;

		width: 100%;
		max-width: 1400px;

		padding-inline: var(--spacing-6);
		padding-top: var(--spacing-6);
		padding-bottom: var(--spacing-7);

		position: relative;
		z-index: 1;
	}

	:global(.top-bar) {
		position: relative;
		z-index: 1;
	}

	@media (max-width: 1024px) {
		.home-page__content {
			padding-top: var(--spacing-5);
		}
	}

	@media (max-width: 768px) {
		.home-page__content {
			padding-inline: 20px;
			padding-top: 32px;
		}
	}

	@media (max-width: 480px) {
		.home-page__content {
			padding-inline: 16px;
			padding-top: var(--spacing-5);
			padding-bottom: var(--spacing-6);
		}
	}
</style>
