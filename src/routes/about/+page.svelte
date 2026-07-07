<script>
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<svelte:head>
	<title>About - Olympic Mark</title>
</svelte:head>

<div class="about-page">
	<TopBar />

	<main class="about-page__content">
		<h1>ABOUT OLYMPIC MARK</h1>

		<section class="about-page__copy">
			<p>
				Olympic Mark osserva le infrastrutture di Milano Cortina 2026 attraverso una
				domanda semplice: cosa resta davvero dopo il grande evento?
			</p>

			<p>
				Il progetto mette in relazione luoghi, trasformazioni e percezione pubblica,
				concentrandosi sulla legacy che ogni intervento lascia nel territorio.
			</p>
		</section>
	</main>
</div>

<style>
	.about-page {
		min-height: 100vh;
		background: transparent;
	}

	.about-page__content {
		position: relative;
		z-index: 1;
		padding-inline: var(--spacing-6);
		padding-top: var(--spacing-8);
		padding-bottom: var(--spacing-10);
	}

	h1 {
		max-width: 1300px;
		font-family: var(--font-primary);
		font-size: var(--font-size-hero);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-primary);
	}

	.about-page__copy {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--spacing-6);
		margin-top: var(--spacing-8);
	}

	p {
		font-family: var(--font-primary);
		font-size: clamp(32px, 4vw, 72px);
		font-weight: var(--font-weight-black);
		line-height: 1.08;
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-secondary);
	}

	@media (max-width: 768px) {
		.about-page__content {
			padding-inline: 20px;
		}

		h1 {
			font-size: var(--font-size-display-lg);
		}

		.about-page__copy {
			grid-template-columns: 1fr;
		}
	}
</style>
