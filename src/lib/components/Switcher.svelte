<script>
	import { page } from '$app/state';

	let active = $derived(page.url.pathname.startsWith('/mappa') ? 'map' : 'list');
</script>

<nav class="switcher" aria-label="Cambio visualizzazione">
	<div class="switcher__indicator" class:is-list={active === 'list'}></div>

	<a href="/mappa" class="switcher__button" aria-label="Mappa">
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M3 6.5L8.5 4L15.5 6.5L21 4V17.5L15.5 20L8.5 17.5L3 20V6.5Z" />
			<path d="M8.5 4V17.5" />
			<path d="M15.5 6.5V20" />
		</svg>
	</a>

	<a href="/" class="switcher__button" aria-label="Lista">
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
		--switcher-width: 116px;
		--switcher-height: 56px;
		--switcher-padding: 3px;
		--switcher-thumb: calc(var(--switcher-height) - (var(--switcher-padding) * 2));
		--switcher-step: calc(var(--switcher-width) - var(--switcher-thumb) - (var(--switcher-padding) * 2));

		position: relative;
		width: var(--switcher-width);
		height: var(--switcher-height);
		padding: var(--switcher-padding);

		display: flex;
		align-items: center;
		justify-content: space-between;

		background: rgba(var(--colors-neutral-black-rgb), 0.38);
		border: 1px solid rgba(var(--colors-content-secondary-rgb), 0.24);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.switcher__indicator {
		position: absolute;
		top: var(--switcher-padding);
		left: var(--switcher-padding);

		width: 46px;
		height: 46px;

		border-radius: var(--radius-round);
		background: var(--colors-content-primary);

		transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
		z-index: 1;
	}

	.switcher__indicator.is-list {
		transform: translateX(var(--switcher-step));
	}

	.switcher__button {
		position: relative;
		z-index: 2;

		width: var(--switcher-thumb);
		height: var(--switcher-thumb);

		display: flex;
		align-items: center;
		justify-content: center;

		color: var(--colors-content-secondary);
		text-decoration: none;
	}

	.switcher__button svg {
		width: 17px;
		height: 17px;

		fill: none;
		stroke: currentColor;
		stroke-width: 2.2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>