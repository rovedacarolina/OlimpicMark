<script>
	import { page } from '$app/state';

	let active = $derived(page.url.pathname.startsWith('/mappa') ? 'map' : 'list');
</script>

<nav class="switcher" aria-label="Cambio visualizzazione">
	<a href="/mappa" class="switcher__button" class:is-active={active === 'map'} aria-label="Mappa">
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
			<line x1="8" y1="2" x2="8" y2="18" />
			<line x1="16" y1="6" x2="16" y2="22" />
		</svg>
	</a>

	<a href="/" class="switcher__button" class:is-active={active === 'list'} aria-label="Lista">
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M8 6H21" />
			<path d="M8 12H21" />
			<path d="M8 18H21" />
			<path d="M3 6H3.01" />
			<path d="M3 12H3.01" />
			<path d="M3 18H3.01" />
		</svg>
	</a>
</nav>

<style>
	.switcher {
		position: relative;
		display: flex;
		gap: 4px;
		align-items: center;
		justify-content: space-between;
		padding: 6px;

		background: rgba(15, 15, 15, 0.88);
		border: 4px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius-full);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		overflow: hidden;
	}

	.switcher__button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);

		color: rgba(255, 255, 255, 0.45);
		text-decoration: none;
		transition:
			background 0.25s ease,
			color 0.25s ease;
	}

	.switcher__button.is-active {
		background: var(--colors-content-primary);
		color: var(--colors-neutral-white);
	}

	.switcher__button:not(.is-active):hover {
		color: rgba(255, 255, 255, 0.8);
	}

	.switcher__button svg {
		width: 22px;
		height: 22px;

		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@media (max-width: 768px) {
		.switcher {
			padding: 5px;
		}

		.switcher__button {
			width: 42px;
			height: 42px;
		}
	}
</style>
