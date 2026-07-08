<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import TitleSection from '$lib/components/TitleSection.svelte';
	import CardBi from '$lib/components/CardBi.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Verdetto from '$lib/components/Verdetto.svelte';
	import DataVisualization from '$lib/components/DataVisualization.svelte';
	import AnimatedLegacyStatement from '$lib/components/AnimatedLegacyStatement.svelte';

	const accordionItems = [
		{
			label: 'Il Luogo',
			tabs: [
				{
					title: 'Posizione',
					value: 'posizione',
					content:
						'L’Anterselva Biathlon Arena si trova in Val Anterselva, nel comune di Rasun-Anterselva, in Alto Adige, all’interno di un contesto alpino di grande valore paesaggistico, vicino al Parco Naturale Vedrette di Ries-Aurina. Lo stadio è situato a circa 1.600 metri di altitudine.'
				},
				{
					title: 'Rilevanza sportiva',
					value: 'rilevanza-sportiva',
					content:
						'L’arena è considerata uno dei luoghi più importanti al mondo per il biathlon. Ospita gare internazionali fin dagli anni Settanta ed è diventata nel tempo una tappa fissa della Coppa del Mondo IBU. Nel 2020 ha inoltre accolto i Campionati Mondiali di Biathlon, confermando il ruolo centrale di Anterselva nel panorama sportivo invernale internazionale.'
				},
				{
					title: 'Ruolo nei Giochi 2026',
					value: 'ruolo-giochi-2026',
					content:
						'Per Milano-Cortina 2026 l’Anterselva Biathlon Arena sarà sede di tutte le gare olimpiche di biathlon. Questo la rende uno dei luoghi chiave dell’intero sistema olimpico invernale italiano.'
				},
				{
					title: 'Legacy e riuso',
					value: 'legacy-riuso',
					content:
						'A differenza di altri impianti costruiti appositamente per i Giochi, Anterselva rappresenta un esempio di infrastruttura già consolidata, che viene aggiornata e potenziata invece di essere realizzata ex novo. Questa scelta rientra nella strategia generale di Milano-Cortina 2026, basata sul riutilizzo di sedi esistenti per limitare consumo di suolo e costi infrastrutturali.'
				}
			]
		},
		{
			label: 'Cosa Resta Dopo',
			tabs: [
				{
					title: 'Dopo i Giochi',
					value: 'dopo-i-giochi',
					content:
						'Dopo Milano-Cortina 2026, l’Anterselva Biathlon Arena continuerà a essere utilizzata come uno dei principali centri mondiali del biathlon.'
				},
				{
					title: 'Attività future',
					value: 'attivita-future',
					content:
						'La struttura manterrà il proprio calendario internazionale, ospitando gare di Coppa del Mondo, eventi IBU, allenamenti federali e attività dedicate ai giovani atleti.'
				},
				{
					title: 'Tipo di legacy',
					value: 'tipo-legacy',
					content:
						'La legacy dell’impianto non consiste nella creazione di una nuova funzione urbana, ma nel rafforzamento di una struttura sportiva già esistente e pienamente attiva. Gli investimenti olimpici consentiranno infatti di aumentarne la competitività internazionale per i prossimi decenni.'
				},
				{
					title: 'Impatto sul territorio',
					value: 'impatto-territorio-futuro',
					content:
						'L’impianto continuerà inoltre a rappresentare una risorsa fondamentale per il turismo sportivo dell’Alto Adige.'
				}
			]
		},
		{
			label: 'Cosa sta Cambiando',
			tabs: [
				{
					title: 'Obiettivo',
					value: 'obiettivo',
					content:
						'Gli interventi realizzati per Milano-Cortina 2026 hanno l’obiettivo di modernizzare l’impianto, mantenendone però la struttura storica e il rapporto con il paesaggio alpino circostante.'
				},
				{
					title: 'Nuovo edificio',
					value: 'nuovo-edificio',
					content:
						'Il progetto prevede la costruzione di un nuovo edificio multifunzionale destinato ad atleti, media e servizi tecnici.'
				},
				{
					title: 'Sostenibilità',
					value: 'sostenibilita',
					content:
						'La nuova struttura integra tecnologie energetiche sostenibili, tra cui una grande facciata fotovoltaica progettata per ridurre il consumo energetico complessivo dell’impianto.'
				},
				{
					title: 'Miglioramenti tecnici',
					value: 'miglioramenti-tecnici',
					content:
						'Sono stati inoltre rinnovati il poligono di tiro e parte delle piste gara, migliorando standard tecnici e sicurezza.'
				}
			]
		},
		{
			label: 'Impatto sul Territorio',
			tabs: [
				{
					title: 'Impatto territoriale',
					value: 'impatto-territoriale',
					content:
						'La riqualificazione dell’Anterselva Biathlon Arena rafforza il ruolo della Val Pusteria e dell’Alto Adige nel turismo sportivo internazionale.'
				},
				{
					title: 'Visibilità globale',
					value: 'visibilita-globale',
					content:
						'Milano-Cortina 2026 porterà milioni di spettatori televisivi a conoscere Anterselva.'
				},
				{
					title: 'Promozione turistica',
					value: 'promozione-turistica',
					content:
						'Questo contribuirà ad aumentare la promozione internazionale della valle come destinazione turistica alpina.'
				},
				{
					title: 'Criticità',
					value: 'criticita',
					content:
						'L’aumento del turismo durante i grandi eventi può però generare pressione ambientale su un ecosistema alpino fragile.'
				}
			]
		}
	];

	const legacyTerms = [
		"SPORT, MOBILITÀ E CONTINUITÀ D'USO",
		'PAESAGGIO, SERVIZI E ATTIVITÀ SPORTIVA',
		'EVENTO, COMUNITÀ E USO FUTURO'
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
			beforeImage="/images/biathlonbefore.jpg"
			afterImage="/images/biathlonafter.jpg"
			beforeLabel="BEFORE"
			afterLabel="AFTER"
			beforeAlt="Area dello stadio del biathlon prima degli interventi"
			afterAlt="Stadio del biathlon dopo gli interventi"
			height="80dvh"
		/>

		<AnimatedLegacyStatement terms={legacyTerms} />

		<section class="biathlon-page__data">
			<DataVisualization />
		</section>

		<section class="biathlon-page__accordion">
			<Accordion number="01" title="Stadio Biathlon, Anterselva" items={accordionItems} />
		</section>

		<section class="biathlon-page__verdetto">
			<Verdetto verdict="positivo" />
		</section>
	</main>
</div>

<style>
	.biathlon-page {
		min-height: 100vh;
		background: transparent;
	}

	.biathlon-page__content {
		display: flex;
		flex-direction: column;
		padding-inline: var(--spacing-6);
		padding-top: var(--spacing-6);
		padding-bottom: var(--spacing-10);
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

	.biathlon-page__content {
		position: relative;
		z-index: 1;
	}
</style>
