<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import TitleSection from '$lib/components/TitleSection.svelte';
	import CardBi from '$lib/components/CardBi.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Verdetto from '$lib/components/Verdetto.svelte';
	import DataVisualization from '$lib/components/DataVisualization.svelte';

	const accordionItems = [
		{
			label: 'Il Luogo',
			content:
				'Anterselva è uno dei comprensori di sci di fondo più prestigiosi del mondo, situato nel cuore delle Dolomiti. La vallata è caratterizzata da paesaggi alpini straordinari e una tradizione sportiva di eccellenza che risale a decenni.'
		},
		{
			label: 'Cosa Resta Dopo',
			content:
				'Dopo le Olimpiadi, Anterselva rimane un centro internazionale di biathlon e sci di fondo, continuando ad ospitare competizioni mondiali. La struttura si trasforma in un impianto polivalente che serve la comunità locale e gli atleti professionisti.'
		},
		{
			label: 'Cosa sta Cambiando',
			content:
				"L'area sta subendo una trasformazione verso una maggiore sostenibilità ambientale. Sono in corso modernizzazioni infrastrutturali che includono migliori servizi di trasporto, strutture ricettive eco-compatibili e una migliore integrazione con il tessuto urbano locale."
		},
		{
			label: 'Impatto sul Territorio',
			content:
				'La legacy olimpica genera occupazione stabile nel settore turistico e sportivo, attira investimenti internazionali e valorizza il patrimonio naturale e culturale della regione.'
		}
	];

	let selectedVerdetto = $state('POSITIVA');
</script>

<svelte:head>
	<title>Stadio Biathlon — Olympic Mark</title>
</svelte:head>

<div class="biathlon-page">
	<TopBar />

	<main class="biathlon-page__content">
		<TitleSection title="STADIO BIATHLON" subtitle="ANTERSELVA, BOLZANO" />

		<CardBi beforeLabel="BEFORE" afterLabel="AFTER" />

		<section class="biathlon-page__descriptive">
			<p>
				Ad Anterselva la legacy appare concreta, perché sport, mobilità e continuità d'uso
				vengono percepiti come elementi già integrati nel territorio.
			</p>
		</section>

		<DataVisualization mainPercentage={72} leftPercentage={64} rightPercentage={69} />

		<Accordion number="01" title="Stadio Biathlon, Anterselva" items={accordionItems} />

		<Verdetto bind:selected={selectedVerdetto} />
	</main>
</div>

<style>
	.biathlon-page {
		min-height: 100vh;
		background: var(--colors-background-primary);
	}

	.biathlon-page__content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
		padding-inline: var(--spacing-6);
		padding-top: var(--spacing-6);
		padding-bottom: var(--spacing-8);
	}

	.biathlon-page__descriptive {
		max-width: 360px;
		margin-left: auto;
	}

	.biathlon-page__descriptive p {
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--font-size-ui-sm);
		line-height: var(--line-height-normal);
		color: var(--colors-content-secondary);
		text-align: right;
	}

	@media (max-width: 768px) {
		.biathlon-page__content {
			padding-inline: var(--spacing-4);
		}

		.biathlon-page__descriptive {
			max-width: 100%;
			margin-left: 0;
		}

		.biathlon-page__descriptive p {
			text-align: left;
		}
	}
</style>