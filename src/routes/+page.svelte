<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import StrutturaTitolo from '$lib/components/StrutturaTitolo.svelte';

	const strutture = [
		{ title: 'STADIO BIATHLON', city: 'ANTERSELVA', href: '/biathlon' },
		{ title: 'PISTA DA BOB', city: 'CORTINA', href: '/bob' },
		{ title: 'BACINO DI INNEVAMENTO', city: 'LIVIGNO', href: '/innevamento' },
		{ title: 'NUOVA CABINOVIA', city: 'BORMIO', href: '/cabinovia' },
		{ title: 'VILLAGGIO OLIMPICO', city: 'MILANO', href: '/villaggio' },
		{ title: 'ARENA SANTA GIULIA', city: 'MILANO', href: '/arena' },
		{ title: 'PALAHOCKEY RHO FIERA', city: 'RHO', href: '/palahockey' }
	];
</script>

<svelte:head>
	<title>Olympic Mark</title>
</svelte:head>

<div class="home-page">
	<TopBar />

	<main class="home-page__content">
		{#each strutture as struttura (struttura.href)}
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
		background: var(--colors-background-primary);
		color: var(--colors-content-primary);
	}

	.home-page__content {
	display: flex;
	flex-direction: column;
	gap: 0;

	max-width: 1400px;

	padding-inline: var(--spacing-6);
	padding-top: var(--spacing-6);
	padding-bottom: var(--spacing-7);
}

	@media (max-width: 768px) {
		.home-page__content {
			padding-inline: 20px;
			padding-top: 32px;
		}
	}
</style>