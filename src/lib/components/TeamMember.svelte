<script>
	/** @type {{ name: string, roles: string[], portrait?: string, accent?: string }} */
	let { name, roles = [], portrait = 'profile', accent = 'blue' } = $props();

	let roleLabel = $derived(roles.join(', '));
</script>

<article class={`team-member team-member--${accent}`} aria-label={`${name}: ${roleLabel}`}>
	<div class="team-member__visual" aria-hidden="true">
		<svg class="team-member__portrait" viewBox="0 0 220 220" role="img">
			<path
				class="portrait-line"
				d="M68 178 C76 145 96 130 112 130 C132 130 150 146 157 178"
			/>
			<path
				class="portrait-line"
				d="M82 119 C71 101 70 76 84 60 C96 46 119 43 137 53 C154 63 162 84 156 104 C151 123 136 135 118 137"
			/>
			<path class="portrait-line portrait-line--soft" d="M102 81 C110 76 121 76 130 82" />
			<path class="portrait-line portrait-line--soft" d="M132 96 C127 101 120 103 113 101" />

			{#if portrait === 'hair'}
				<path
					class="portrait-detail portrait-detail--fill"
					d="M83 61 C59 72 54 104 66 133 C74 153 88 165 104 172 C93 145 94 117 106 93 C114 78 127 64 143 55 C124 43 99 45 83 61 Z"
				/>
				<path class="portrait-detail portrait-detail--line" d="M84 61 C75 88 78 121 98 151" />
			{:else if portrait === 'glasses'}
				<circle class="portrait-detail portrait-detail--fill" cx="101" cy="91" r="17" />
				<circle class="portrait-detail portrait-detail--fill" cx="140" cy="91" r="17" />
				<path class="portrait-detail portrait-detail--line" d="M118 91 L123 91" />
				<path class="portrait-line portrait-line--soft" d="M157 91 C166 92 172 97 175 104" />
			{:else if portrait === 'profile'}
				<path
					class="portrait-detail portrait-detail--fill"
					d="M130 51 C148 62 158 81 156 102 C154 119 145 132 131 139 C138 120 139 95 130 73 C126 64 121 57 114 50 C119 49 125 49 130 51 Z"
				/>
				<path class="portrait-detail portrait-detail--line" d="M136 71 C146 89 146 111 135 128" />
			{:else}
				<path
					class="portrait-detail portrait-detail--fill"
					d="M92 143 C105 156 127 156 143 143 L155 178 L78 178 Z"
				/>
				<path class="portrait-detail portrait-detail--line" d="M93 143 C107 153 128 153 143 143" />
				<path class="portrait-line portrait-line--soft" d="M88 64 C75 81 72 104 82 122" />
			{/if}
		</svg>
	</div>

	<div class="team-member__content">
		<h2 class="team-member__name">{name}</h2>
		<ul class="team-member__roles" aria-label="Ruoli">
			{#each roles as role}
				<li>{role}</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.team-member {
		--team-accent: var(--colors-content-primary);
		--team-accent-rgb: var(--colors-content-primary-rgb);

		position: relative;
		min-height: 420px;
		display: grid;
		grid-template-rows: minmax(190px, 1fr) auto;
		gap: var(--spacing-6);
		padding: var(--spacing-6) 0;
		border-top: 1px solid rgba(var(--colors-content-secondary-rgb), 0.38);
		color: var(--colors-content-secondary);
		transition:
			background-color 0.32s ease,
			border-color 0.32s ease;
	}

	.team-member--blue {
		--team-accent: var(--colors-content-primary);
		--team-accent-rgb: var(--colors-content-primary-rgb);
	}

	.team-member--ice {
		--team-accent: var(--colors-content-secondary);
		--team-accent-rgb: var(--colors-content-secondary-rgb);
	}

	.team-member--steel {
		--team-accent: var(--colors-background-secondary);
		--team-accent-rgb: var(--colors-background-secondary-rgb);
	}

	.team-member--white {
		--team-accent: var(--colors-neutral-white);
		--team-accent-rgb: 255, 255, 255;
	}

	.team-member:hover {
		border-color: rgba(var(--team-accent-rgb), 0.72);
		background-color: rgba(var(--colors-content-secondary-rgb), 0.025);
	}

	.team-member__visual {
		width: min(74%, 280px);
		align-self: start;
		justify-self: end;
		aspect-ratio: 1;
	}

	.team-member__portrait {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.portrait-line,
	.portrait-detail--line {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
	}

	.portrait-line {
		stroke: rgba(var(--colors-content-secondary-rgb), 0.72);
		stroke-width: 2.2;
		transition:
			stroke 0.32s ease,
			opacity 0.32s ease;
	}

	.portrait-line--soft {
		opacity: 0.58;
	}

	.portrait-detail {
		stroke: var(--team-accent);
		transition:
			fill 0.36s ease,
			opacity 0.36s ease,
			stroke 0.36s ease,
			transform 0.36s ease;
		transform-origin: center;
	}

	.portrait-detail--fill {
		fill: rgba(var(--team-accent-rgb), 0.1);
		stroke-width: 1.8;
		opacity: 0.5;
	}

	.portrait-detail--line {
		stroke-width: 2;
		opacity: 0.68;
	}

	.team-member:hover .portrait-detail--fill {
		fill: rgba(var(--team-accent-rgb), 0.38);
		opacity: 1;
		transform: scale(1.015);
	}

	.team-member:hover .portrait-detail--line {
		opacity: 1;
	}

	.team-member:hover .portrait-line {
		stroke: rgba(255, 255, 255, 0.78);
	}

	.team-member__content {
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
		transition:
			color 0.3s ease,
			text-shadow 0.3s ease;
	}

	.team-member:hover .team-member__name {
		color: var(--colors-neutral-white);
		text-shadow: 0 0 24px rgba(var(--team-accent-rgb), 0.26);
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
		color: rgba(var(--team-accent-rgb), 0.86);
	}

	@media (hover: none) {
		.portrait-detail--fill {
			fill: rgba(var(--team-accent-rgb), 0.26);
			opacity: 0.88;
		}
	}

	@media (max-width: 1024px) {
		.team-member {
			min-height: 360px;
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
			width: min(58%, 210px);
			justify-self: start;
		}

		.team-member__name {
			font-size: clamp(32px, 10vw, 52px);
		}

		.team-member__roles {
			font-size: 15px;
			gap: var(--spacing-2) var(--spacing-3);
		}

		.team-member__roles li:not(:last-child)::after {
			margin-left: var(--spacing-3);
		}
	}
</style>
