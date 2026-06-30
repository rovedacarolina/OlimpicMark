<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import TitleSection from '$lib/components/TitleSection.svelte';

	let { data } = $props();
	let structure = $derived(data.structure);
</script>

<svelte:head>
	<title>{structure.title} - Olympic Mark</title>
</svelte:head>

<div class="detail-page">
	<TopBar />

	<main class="detail-page__content">
		<TitleSection title={structure.title} subtitle={structure.place} />

		<section class="detail-page__intro">
			<p>
				{structure.title} e il territorio di {structure.city} entrano nella mappa di
				Olympic Mark come caso da approfondire: trasformazioni, uso dopo i Giochi e
				impatto locale.
			</p>
		</section>

		<section class="detail-page__status" aria-label="Stato della scheda">
			<span>scheda in preparazione</span>
		</section>
	</main>
</div>

<style>
	.detail-page {
		min-height: 100vh;
		background: var(--colors-background-primary);
	}

	.detail-page__content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		padding-inline: var(--spacing-6);
		padding-top: var(--spacing-6);
		padding-bottom: var(--spacing-10);
	}

	.detail-page__intro {
		max-width: 1180px;
		padding-block: var(--spacing-8);
	}

	.detail-page__intro p {
		font-family: var(--font-primary);
		font-size: clamp(36px, 5vw, 88px);
		font-weight: var(--font-weight-black);
		line-height: 1.05;
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-secondary);
	}

	.detail-page__status {
		width: fit-content;
		border-top: 1px solid rgba(var(--colors-content-secondary-rgb), 0.35);
		padding-top: var(--spacing-4);
	}

	.detail-page__status span {
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-primary);
	}

	@media (max-width: 768px) {
		.detail-page__content {
			padding-inline: 20px;
			padding-top: 32px;
		}
	}
</style>
