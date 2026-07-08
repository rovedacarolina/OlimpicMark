<script>
	/** @type {{ name: string, roles: string[], image: string }} */
	let { name, roles = [], image } = $props();

	let roleLabel = $derived(roles.join(', '));
</script>

<article class="team-member" aria-label={`${name}: ${roleLabel}`}>
	<div class="team-member__visual" aria-hidden="true">
		<img class="team-member__portrait" src={image} alt="" loading="lazy" />
	</div>

	<div class="team-member__content">
		<h2 class="team-member__name" class:is-long-name={name === 'Madalena de Gusmão'}>
			{name}
		</h2>
		<ul class="team-member__roles" aria-label="Ruoli">
			{#each roles as role}
				<li>{role}</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.team-member {
		position: relative;
		min-width: 0;
		min-height: 440px;
		display: grid;
		grid-template-rows: minmax(210px, 1fr) auto;
		gap: var(--spacing-6);
		padding: var(--spacing-6) 0;
		border-top: 1px solid rgba(var(--colors-content-secondary-rgb), 0.38);
		color: var(--colors-content-secondary);
		transition:
			background-color 0.32s ease,
			border-color 0.32s ease;
	}

	.team-member:hover {
		border-color: rgba(var(--colors-content-primary-rgb), 0.72);
		background-color: rgba(var(--colors-content-secondary-rgb), 0.025);
	}

	.team-member__visual {
		width: min(82%, 340px);
		align-self: start;
		justify-self: end;
		aspect-ratio: 1;
		overflow: visible;
		border-radius: 0;
		background: transparent;
	}

	.team-member__portrait {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
		object-position: center;
		mix-blend-mode: screen;
		filter: grayscale(1) saturate(0) brightness(1.04) contrast(1.08);
		opacity: 0.82;
		transform: scale(1.01);
		transition:
			filter 0.42s ease,
			opacity 0.42s ease,
			transform 0.42s ease;
	}

	.team-member:hover .team-member__portrait {
		filter: grayscale(0) saturate(1.1) brightness(1) contrast(1.04);
		opacity: 1;
		transform: scale(1.025);
	}

	.team-member__content {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.team-member__name {
		margin: 0;
		color: var(--colors-content-secondary);
		font-family: var(--font-primary);
		font-size: clamp(34px, 4vw, 64px);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0;
		text-transform: uppercase;
		overflow-wrap: anywhere;
		transition:
			color 0.3s ease,
			text-shadow 0.3s ease;
	}

	.team-member__name.is-long-name {
		font-size: clamp(30px, 3.35vw, 56px);
		white-space: nowrap;
	}

	.team-member:hover .team-member__name {
		color: var(--colors-content-primary);
		text-shadow: 0 0 24px rgba(var(--colors-content-primary-rgb), 0.26);
	}

	.team-member__roles {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-2) var(--spacing-4);
		margin: 0;
		padding: 0;
		list-style: none;
		color: rgba(var(--colors-content-secondary-rgb), 0.74);
		font-family: var(--font-primary);
		font-size: clamp(16px, 1.25vw, 22px);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-normal);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
	}

	.team-member__roles li {
		position: relative;
	}

	.team-member__roles li:not(:last-child)::after {
		content: '/';
		margin-left: var(--spacing-4);
		color: rgba(var(--colors-content-primary-rgb), 0.86);
	}

	@media (hover: none) {
		.team-member__portrait {
			filter: grayscale(0.35) saturate(0.9) brightness(1.02) contrast(1.05);
			opacity: 0.94;
		}
	}

	@media (max-width: 1024px) {
		.team-member {
			min-height: 380px;
		}

		.team-member__visual {
			width: min(78%, 300px);
		}
	}

	@media (max-width: 768px) {
		.team-member {
			min-height: auto;
			grid-template-rows: auto auto;
			gap: var(--spacing-5);
			padding: var(--spacing-5) 0;
		}

		.team-member__visual {
			width: min(68%, 240px);
			justify-self: start;
		}

		.team-member__name {
			font-size: clamp(32px, 10vw, 52px);
		}

		.team-member__name.is-long-name {
			font-size: clamp(26px, 7.3vw, 38px);
		}

		.team-member__roles {
			font-size: 15px;
			gap: var(--spacing-2) var(--spacing-3);
		}

		.team-member__roles li:not(:last-child)::after {
			margin-left: var(--spacing-3);
		}
	}

	@media (max-width: 480px) {
		.team-member {
			gap: var(--spacing-4);
			padding: var(--spacing-4) 0;
		}

		.team-member__visual {
			width: min(78%, 220px);
		}

		.team-member__name {
			font-size: clamp(28px, 9vw, 42px);
		}

		.team-member__name.is-long-name {
			font-size: clamp(23px, 6.6vw, 30px);
		}

		.team-member__roles {
			font-size: 13px;
		}
	}
</style>
