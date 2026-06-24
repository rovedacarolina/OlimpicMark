<script>
	let { value = 'VERDETTO POSITIVO' } = $props();

	let hasStarted = $state(false);
	let displayedText = $state('');
	let interval;

	function revealVerdict() {
		if (hasStarted) return;

		hasStarted = true;
		displayedText = '';

		let index = 0;

		interval = setInterval(() => {
			displayedText = value.slice(0, index + 1);
			index++;

			if (index >= value.length) {
				clearInterval(interval);
			}
		}, 70);
	}
</script>

<section class="verdetto">
	<button class="verdetto__trigger" onclick={revealVerdict}>
		{hasStarted ? 'VERDETTO' : 'RIVELA IL VERDETTO'}
	</button>

	<h2 class:visible={hasStarted}>
		{displayedText}
	</h2>
</section>

<style>
	.verdetto {
		min-height: 520px;
		padding-block: var(--spacing-10);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		font-family: var(--font-secondary);
		text-align: center;
	}

	.verdetto__trigger {
		border: 0;
		background: transparent;
		cursor: pointer;

		font-family: var(--font-secondary);
		font-size: var(--font-size-ui);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: var(--letter-spacing-wide);
		text-transform: uppercase;


		color: var(--colors-content-secondary);

		transition: color 0.25s ease;
	}

	.verdetto__trigger:hover {
		color: var(--colors-content-primary);
	}

	h2 {
		min-height: 1em;
		margin: var(--spacing-8) 0 0;

		font-family: var(--font-secondary);
		font-size: clamp(var(--font-size-hero), 15vw, 260px);
		font-weight: var(--font-weight-black);
		line-height: var(--line-height-tight);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		text-align: center;
		color: var(--colors-content-primary);

		opacity: 0;
		transform: translateY(var(--spacing-3));

		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	h2.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>