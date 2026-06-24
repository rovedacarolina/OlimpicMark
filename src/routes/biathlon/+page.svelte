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
			content: `L’Anterselva Biathlon Arena si trova in Val Anterselva, nel comune di Rasun-Anterselva, in Alto Adige, all’interno di un contesto alpino di grande valore paesaggistico vicino al Parco Naturale Vedrette di Ries-Aurina. Lo stadio è situato a circa 1.600 metri di altitudine ed è considerato uno dei luoghi più importanti al mondo per il biathlon.

La struttura ospita gare internazionali sin dagli anni Settanta ed è diventata nel tempo una tappa fissa della Coppa del Mondo IBU. Nel 2020 ha inoltre ospitato i Campionati Mondiali di Biathlon, confermando il ruolo centrale di Anterselva nel panorama sportivo invernale internazionale.

Per Milano-Cortina 2026 l’arena sarà sede di tutte le gare olimpiche di biathlon. A differenza di altri impianti costruiti appositamente per i Giochi, Anterselva rappresenta un esempio di infrastruttura già consolidata, che viene aggiornata e potenziata invece di essere realizzata ex novo.`
		},
		{
			label: 'Cosa Resta Dopo',
			content: `Dopo Milano-Cortina 2026, l’Anterselva Biathlon Arena continuerà a essere utilizzata come uno dei principali centri mondiali del biathlon. La struttura manterrà il proprio calendario internazionale ospitando gare di Coppa del Mondo, eventi IBU, allenamenti federali e attività dedicate ai giovani atleti.

La legacy dell’impianto non consiste nella creazione di una nuova funzione urbana, ma nel rafforzamento di una struttura sportiva già esistente e pienamente attiva. Gli investimenti olimpici consentiranno infatti di aumentare la competitività internazionale dell’arena per i prossimi decenni.

L’impianto continuerà inoltre a rappresentare una risorsa fondamentale per il turismo sportivo dell’Alto Adige.`
		},
		{
			label: 'Cosa sta Cambiando',
			content: `Gli interventi realizzati per Milano-Cortina 2026 hanno l’obiettivo di modernizzare l’impianto mantenendone però la struttura storica e il rapporto con il paesaggio alpino circostante.

Il progetto prevede la costruzione di un nuovo edificio multifunzionale destinato ad atleti, media e servizi tecnici. La nuova struttura integra tecnologie energetiche sostenibili, tra cui una grande facciata fotovoltaica progettata per ridurre il consumo energetico complessivo dell’impianto.

Sono stati inoltre rinnovati il poligono di tiro e parte delle piste gara, migliorando standard tecnici e sicurezza.`
		},
		{
			label: 'Impatto sul Territorio',
			content: `La riqualificazione dell’Anterselva Biathlon Arena rafforza il ruolo della Val Pusteria e dell’Alto Adige nel turismo sportivo internazionale.

L’impatto principale riguarda la crescita della visibilità globale del territorio. Milano-Cortina 2026 porterà infatti milioni di spettatori televisivi a conoscere Anterselva, aumentando la promozione internazionale della valle come destinazione turistica alpina.

Restano però alcune criticità. L’aumento del turismo durante i grandi eventi può generare pressione ambientale su un ecosistema alpino fragile.`
		}
	];

	
</script>

<svelte:head>
	<title>Stadio Biathlon — Olympic Mark</title>
</svelte:head>

<div class="biathlon-page">
	<TopBar />

	<main class="biathlon-page__content">
		<TitleSection title="STADIO BIATHLON" subtitle="ANTERSELVA, BOLZANO" />

	<CardBi
        beforeImage="/images/biathlon-before.jpg"
        afterImage="/images/biathlon-after.jpg"
        beforeLabel="BEFORE"
        afterLabel="AFTER"
    />

		<section class="intro-text">
	<p>
		AD ANTERSELVA LA LEGACY APPARE CONCRETA, PERCHÉ SPORT,
		MOBILITÀ E CONTINUITÀ D'USO VENGONO PERCEPITI COME
		ELEMENTI GIÀ INTEGRATI NEL TERRITORIO.
	</p>
</section>

		<section class="biathlon-page__data">
			<DataVisualization />
		</section>

		<section class="biathlon-page__accordion">
			<Accordion number="01" title="Stadio Biathlon, Anterselva" items={accordionItems} />
		</section>

		<section class="biathlon-page__verdetto">
			<Verdetto verdict="POSITIVA" />
		</section>
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
		padding-inline: var(--spacing-6);
		padding-top: var(--spacing-6);
		padding-bottom: var(--spacing-10);
	}

.intro-text {
	display: flex;
	justify-content: center;
	padding-inline: var(--spacing-6);
	padding-block: var(--spacing-10);
}

.intro-text p {
	width: min(85%, 1400px);

	margin: 0;

	text-align: center;
	text-transform: uppercase;

	font-family: var(--font-primary);
	font-size: 64px;
	font-weight: var(--font-weight-regular);
	line-height: 1.35;
	letter-spacing: 0.08em;

	color: var(--colors-content-secondary);
}

	.biathlon-page__data {
		padding-top: var(--spacing-10);
        padding-bottom: var(--spacing-10);
	}

	.biathlon-page__accordion {
		padding-top: var(--spacing-10);
	}

	.biathlon-page__verdetto {
		padding-top: var(--spacing-10);
	}
</style>