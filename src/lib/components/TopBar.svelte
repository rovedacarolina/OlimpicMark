<script>
	import Switcher from './Switcher.svelte';
</script>

<header class="top-bar">
	<a href="/" class="top-bar__brand">OLYMPIC MARK</a>

	<Switcher />

	<a href="/about" class="top-bar__link">ABOUT US</a>
</header>

<style>
	.top-bar {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;

		width: 100%;

		padding-top: var(--unit-20);
		padding-inline: var(--spacing-6);

		background: var(--colors-background-primary);
	}

	.top-bar__brand {
		justify-self: start;
	}

	.top-bar__link {
		justify-self: end;
	}

	.top-bar__brand,
	.top-bar__link {
		font-family: var(--font-primary);
		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;
		color: var(--colors-content-secondary);
		text-decoration: none;
	}

	.top-bar__brand:hover,
	.top-bar__link:hover {
		color: var(--colors-content-primary);
	}
</style>