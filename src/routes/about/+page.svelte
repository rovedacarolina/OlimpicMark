<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import TeamMember from '$lib/components/TeamMember.svelte';

	const introText =
		'Olympic Mark nasce da una ricerca condivisa sul lascito delle Olimpiadi Milano-Cortina 2026: un progetto che unisce contenuti, dati, luoghi e sguardi diversi per raccontare ciò che resta dopo i Giochi.';

	const teamMembers = [
		{
			name: 'Carolina Roveda',
			roles: ['Research', 'Content', 'UX', 'Structure', 'Coding'],
			portrait: 'glasses',
			accent: 'blue'
		},
		{
			name: 'Alessia Vasiliu',
			roles: ['Research', 'Content', 'Mapping'],
			portrait: 'hair',
			accent: 'steel'
		},
		{
			name: 'Mariana Cardoso',
			roles: ['Research', 'Content'],
			portrait: 'profile',
			accent: 'ice'
		},
		{
			name: 'Madalena de Gusmão',
			roles: ['Research', 'Content'],
			portrait: 'collar',
			accent: 'white'
		}
	];
</script>

<svelte:head>
	<title>About Us - Olympic Mark</title>
</svelte:head>

<div class="about-page">
	<TopBar />

	<main class="about-page__content">
		<section class="about-page__intro" aria-labelledby="about-title">
			<h1 id="about-title">La nostra squadra</h1>
			<p>{introText}</p>
		</section>

		<section class="about-page__team" aria-label="Team Olympic Mark">
			{#each teamMembers as member (member.name)}
				<TeamMember {...member} />
			{/each}
		</section>
	</main>
</div>

<style>
	.about-page {
		min-height: 100vh;
		background: transparent;
		text-transform:uppercase;
	}

	.about-page__content {
		position: relative;
		z-index: 1;
		width: 100%;
		padding-inline: var(--spacing-6);
		padding-top: var(--spacing-9);
		padding-bottom: var(--spacing-10);
	}

	.about-page__intro {
		display: grid;
		grid-template-columns: minmax(0, 1.18fr) minmax(340px, 0.82fr);
		align-items: start;
		gap: var(--spacing-10);
		padding-top: var(--spacing-4);
		padding-bottom: var(--spacing-10);
		border-top: 1px solid rgba(var(--colors-content-secondary-rgb), 0.28);
	}

	h1 {
		max-width: 980px;
		margin: 0;
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: clamp(66px, 8.8vw, var(--font-size-hero));
		font-weight: var(--font-weight-black);
		line-height: 0.95;
		letter-spacing: 0;
	}

	h1 span {
		display: block;
		color: var(--colors-content-primary);
	}

	.about-page__intro p {
		max-width: 760px;
		margin: 0;
		padding-top: var(--spacing-2);
		color: rgba(var(--colors-content-secondary-rgb), 0.88);
		font-family: var(--font-primary);
		font-size: clamp(24px, 2.5vw, 40px);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-normal);
		letter-spacing: 0;
	}

	.about-page__team {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0 var(--spacing-6);
		border-bottom: 1px solid rgba(var(--colors-content-secondary-rgb), 0.38);
	}

	@media (max-width: 1024px) {
		.about-page__content {
			padding-top: var(--spacing-8);
		}

		.about-page__intro {
			grid-template-columns: 1fr;
			gap: var(--spacing-6);
			padding-bottom: var(--spacing-9);
		}

		h1 {
			max-width: 860px;
		}

		.about-page__intro p {
			max-width: 920px;
			font-size: var(--font-size-body-lg);
			line-height: var(--line-height-relaxed);
		}
	}

	@media (max-width: 768px) {
		.about-page__content {
			padding-inline: 20px;
			padding-top: var(--spacing-7);
			padding-bottom: var(--spacing-9);
		}

		.about-page__intro {
			gap: var(--spacing-5);
			padding-top: var(--spacing-3);
			padding-bottom: var(--spacing-8);
		}

		h1 {
			font-size: clamp(50px, 17vw, var(--font-size-display-lg));
			line-height: var(--line-height-tight);
		}

		.about-page__intro p {
			font-size: var(--font-size-ui-sm);
			line-height: var(--line-height-relaxed);
		}

		.about-page__team {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}
</style>
