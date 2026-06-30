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

		padding-top: 24px;
		padding-inline: var(--spacing-6);
		gap: var(--spacing-4);

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
		font-size: var(--font-size-ui-sm);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0;
		text-transform: uppercase;
		color: var(--colors-content-secondary);
		text-decoration: none;
		white-space: nowrap;
	}

	.top-bar__brand:hover,
	.top-bar__link:hover {
		color: var(--colors-content-primary);
	}

	@media (max-width: 768px) {
		.top-bar {
			padding-top: 18px;
			padding-inline: 20px;
			gap: var(--spacing-3);
		}

		.top-bar__brand,
		.top-bar__link {
			font-size: 16px;
		}
	}
</style>
