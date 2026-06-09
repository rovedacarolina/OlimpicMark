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
      content: 'Anterselva è uno dei comprensori di sci di fondo più prestigiosi del mondo, situato nel cuore delle Dolomiti. La vallata è caratterizzata da paesaggi alpini straordinari e una tradizione sportiva di eccellenza che risale a decenni.'
    },
    {
      label: 'Cosa Resta Dopo',
      content: 'Dopo le Olimpiadi, Anterselva rimane un centro internazionale di biathlon e sci di fondo, continuando ad ospitare competizioni mondiali. La struttura si trasforma in un impianto polivalente che serve la comunità locale e gli atleti professionisti.'
    },
    {
      label: 'Cosa sta Cambiando',
      content: 'L\'area sta subendo una trasformazione verso una maggiore sostenibilità ambientale. Sono in corso modernizzazioni infrastrutturali che includono migliori servizi di trasporto, strutture ricettive eco-compatibili e una migliore integrazione con il tessuto urbano locale.'
    },
    {
      label: 'Impatto sul Territorio',
      content: 'La legacy olimpica genera occupazione stabile nel settore turistico e sportivo, attira investimenti internazionali e valorizza il patrimonio naturale e culturale della regione. Lo sviluppo sostenibile garantisce benefici economici a lungo termine per le comunità locali.'
    }
  ];

  let selectedVerdetto = $state('');
</script>

<div class="biathlon-page">
  <TopBar />

  <main class="biathlon-page__content">
    <TitleSection title="STADIO BIATHLON" subtitle="ANTERSELVA, BOLZANO" />

    <CardBi beforeLabel="BEFORE" afterLabel="AFTER" />

    <section class="biathlon-page__descriptive">
      <p class="descriptive-text">
        Ad Anterselva la legacy appare concreta, perché sport, mobilità e continuità d'uso vengono percepiti come elementi già integrati nel territorio.
      </p>
    </section>

    <section class="biathlon-page__accordion">
      <Accordion number="01" title="Stadio Biathlon, Anterselva" items={accordionItems} />
    </section>


    <section class="biathlon-page__data-viz">
      <DataVisualization mainPercentage={72} leftPercentage={64} rightPercentage={69} />
    </section>

    <section class="biathlon-page__verdetto">
      <Verdetto bind:selected={selectedVerdetto} />
    </section>
  </main>
</div>

<style>
  .biathlon-page {
    width: 100%;
    min-height: 100vh;
    background-color: var(--colors-background-primary);
  }

  .biathlon-page__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-10);
    padding: var(--spacing-6);
    padding-top: var(--spacing-6);
  }

  .biathlon-page__descriptive {
    max-width: 600px;
    margin-left: auto;
    padding: var(--spacing-6) 0;
  }

  .descriptive-text {
    font-family: var(--font-primary);
    font-size: var(--font-size-body-lg);
    color: var(--colors-content-secondary);
    line-height: var(--line-height-relaxed);
    letter-spacing: var(--letter-spacing-wide);
    text-align: right;
    margin: 0;
  }

  .biathlon-page__accordion {
    padding: var(--spacing-8) var(--spacing-10);
  }

  .biathlon-page__verdetto {
    padding: var(--spacing-8) var(--spacing-10);
  }

  .biathlon-page__data-viz {
    padding: var(--spacing-10) 0;
  }
</style>
